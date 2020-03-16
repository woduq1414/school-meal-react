from flask import Blueprint
from flask import copy_current_request_context
from app.db import *
from flask_restful import Api, Resource, reqparse
import requests
import json
import datetime
import itertools
from threading import Thread

schools_bp = Blueprint('schools', __name__)
# http://marshmallow.readthedocs.org/en/latest/quickstart.html#declaring-schemas
# https://github.com/marshmallow-code/marshmallow-jsonapi

api = Api(schools_bp)


# Users
class SearchSchoolName(Resource):
    def get(self, school_name):
        parser = reqparse.RequestParser()
        parser.add_argument('limit', type=int)
        parser.add_argument('now', type=str)
        parser.add_argument('schoolCode', type=str)
        args = parser.parse_args()

        limit = args["limit"]
        now = args["now"]
        school_code = args["schoolCode"]

        if limit is None:
            limit = 30

        with requests.Session() as s:
            headers = {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
            form = {
                "HG_CD": "",
                "SEARCH_KIND": "",
                "HG_JONGRYU_GB": "",
                "GS_HANGMOK_CD": "",
                "GS_HANGMOK_NM": "",
                "GU_GUN_CODE": "",
                "SIDO_CODE": "",
                "GUGUN_CODE": "",
                "SRC_HG_NM": school_name
            }
            school_page = s.post('https://www.schoolinfo.go.kr/ei/ss/Pneiss_a01_l0.do', data=form, headers=headers)

            data = school_page.text
            data = json.loads(data, encoding="utf-8")

            result = []
            # return data
            for school_type, schools in data.items():

                for school in schools:

                    if len(result) >= limit:
                        break;

                    if school_type == "schoolList02":
                        type = "초등"
                    elif school_type == "schoolList03":
                        type = "중등"
                    elif school_type == "schoolList04":
                        type = "고등"
                    else:
                        type = "특수"

                    result.append({
                        "schoolType": type,
                        "schoolRegion": school['LCTN_NM'],
                        "schoolAddress": school['SCHUL_RDNMA'] if "SCHUL_RDNMA" in school else "주소를 찾을 수 없습니다.",
                        "schoolName": school['SCHUL_NM'],
                        "schoolCode": school["SCHUL_CODE"]
                    })

            if result:
                @copy_current_request_context
                def InsertSchoolsDB(result, limit, school_code, thread):
                    print("aaaaaaaaaaaa")
                    print(Schools.query.all())
                    print("SDDDDDDDDDDDDDDDD")
                    now = datetime.datetime.now()
                    # result[0]['insertDate'] = str(now)
                    result = result[:limit]

                    if thread is True:
                        schools = list()

                        schoolCodes = Schools.query.with_entities(Schools.schoolCode).all()
                        schoolCodes = list((itertools.chain.from_iterable(schoolCodes)))  # flatten

                        for school in result:

                            if school["schoolCode"] not in schoolCodes:
                                schools.append(Schools(**school, insertDate=now))

                            print(school)
                        db.session.add_all(schools)

                        db.session.commit()

                    else:

                        for school in result:
                            if school["schoolCode"] == school_code:
                                try:
                                    db.session.add(Schools(**school, insertDate=now))
                                    db.session.commit()
                                except:
                                    pass
                                break

                if now is None and school_code is None:
                    thread = Thread(target=InsertSchoolsDB,
                                    kwargs={'result': result, 'limit': limit, 'school_code': None, 'thread': True})
                    thread.start()

                else:
                    print("ghfhfhfhfhf")
                    InsertSchoolsDB(result, limit, school_code, False)

                return result[:limit], 200
            else:
                return {"message": "학교를 찾을 수 없음"}, 404


class GetSchoolNameWithSchoolCode(Resource):
    def get(self, school_code):
        school = Schools.query.filter_by(schoolCode=school_code).first()
        if school is not None:
            return {
                "schoolType": school.schoolType,
                "schoolRegion": school.schoolRegion,
                "schoolAddress": school.schoolAddress,
                "schoolName": school.schoolName,
                "schoolCode": school.schoolCode
            }
        else:
            return {"message": "학교를 찾을 수 없음"}, 404


api.add_resource(SearchSchoolName, '/name/<school_name>')
api.add_resource(GetSchoolNameWithSchoolCode, '/code/<school_code>')
