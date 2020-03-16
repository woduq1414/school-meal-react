// search blog api
import {getCookie, API} from './api'

export const schoolSearch = params => {
    console.log()
    return API.get(`/schools/name/${params}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};

export const InsertSchoolNow = params => {
    console.log()
    return API.get(`/schools/name/${params.schoolName}?now=true&schoolCode=${params.schoolCode}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};

export const getSchoolByCode = params => {
    console.log()
    return API.get(`/schools/code/${params}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};
