import fetch from "../auth/FetchInterceptor";

const JwtAuthService = {};

JwtAuthService.login = function (data) {
  return fetch({
    url: "/auth/login",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  });
};

JwtAuthService.signUp = function (data) {
  return fetch({
    url: "/auth/user",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default JwtAuthService;
