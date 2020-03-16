from flask import Blueprint
from flask_restful import Api

from app.meals.api import GetMealByDayWithDetailFromNeis, GetMealByMonthFromNeis, GetMealByWeekWithDetailFromNeis, \
    GetMealDetailStat, GetMealMenuCountStat, GetMealMenuStat

meals_bp = Blueprint('meals', __name__)

api = Api(meals_bp)

api.add_resource(GetMealByMonthFromNeis, '/<school_code>/month/<target_date>')
api.add_resource(GetMealByWeekWithDetailFromNeis, '/<school_code>/week/<target_date>')
api.add_resource(GetMealByDayWithDetailFromNeis, '/<school_code>/day/<target_date>')
api.add_resource(GetMealDetailStat, '/stat/detail/<school_code>')
api.add_resource(GetMealMenuCountStat, '/stat/menu/<school_code>')
api.add_resource(GetMealMenuStat, '/stat/menu/<school_code>/<menu>')
