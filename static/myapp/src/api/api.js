import axios from "axios";

// const Kakao = axios.create({
//   baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
//   headers: {
//     Authorization: `KakaoAK 59218beddcaf075c5b745f560b6702a7` // 공통으로 요청 할 헤더
//   }
// });
//
// // search blog api
// export const blogSearch = params => {
//   return Kakao.get("/v2/search/blog", { params });
// };
export const getCookie = (cookie_name) => {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}


export const API = axios.create({
    baseURL: (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost") ? "http://127.0.0.1:5000/api" : "http://f6540883.ngrok.io/api", // 공통 요청 경로를 지정해준다.  process.env.baseURL ||
});




