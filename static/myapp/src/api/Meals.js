import {getCookie, API} from './api'


export const getMeal = params => {
    console.log(`/meals/${params.schoolCode}/day/${params.date}`)
    return API.get(`/meals/${params.schoolCode}/day/${params.date}`)
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


export const getMealDetailStat = params => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.get(`/meals/stat/detail/${params.schoolCode}?startDate=${params.startDate}&lastDate=${params.lastDate}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log("request", error.request);

                return "timeout"
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};


export const getMealMenuCountStat = params => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.get(`/meals/stat/menu/${params.schoolCode}?startDate=${params.startDate}&lastDate=${params.lastDate}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log("request", error.request);

                return "timeout"
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};


export const getMealMenuStat = params => {
    console.log("SDFFFFFFFFFFFFFFFFFFF")
    return API.get(`/meals/stat/menu/${params.schoolCode}/${btoa(encodeURIComponent(params.menu))
    }?startDate=${params.startDate}&lastDate=${params.lastDate}`)
        .then((response) => {

            return response;
        })
        .catch((error) => {
            // Error 😨
            if (error.response) {

                return error.response


            } else if (error.request) {

                console.log("request", error.request);

                return "timeout"
            } else {

                console.log('Error', error.message);
            }
        });
    ;

};