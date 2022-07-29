// axios.defaults.baseURL='http://localhost:3000'
axios.interceptors.request.use(
    function (config) {
      console.log("请求前");
      // if (config?.url.includes("https://mu-two.vercel.app")) {
      //   return config;
      // }
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) config.headers.auth = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
       console.log('请求后')
      const { auth } = response.headers;
      console.log(response.headers)
      auth && localStorage.setItem("token", auth);
      return response;
    },
    function (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/api/login";
      }
      return Promise.reject(error);
    }
  );