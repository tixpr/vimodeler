createAxiosResponseInterceptor(){
    const interceptor = axios.interceptors.response.use(
        response => response,
        error => {
            // Reject promise if usual error
            if (errorResponse.status !== 401) {
                return Promise.reject(error);
            }

            /* 
             * When response code is 401, try to refresh the token.
             * Eject the interceptor so it doesn't loop in case
             * token refresh causes the 401 response
             */
            axios.interceptors.response.eject(interceptor);
			let s = localStorage.getItem('tokens');
			let tokens = JSON.parse(s);
            return axios.post('/api/refresh_token', {
                'refresh_token': tokens.refresh_token
            }).then(response => {
                let data = response.data;
				localStorage.setItem('tokens',JSON.stringify(data));
				axios.defaults.headers.common['Authorization'] = data.token_type+' '+data.access_token;
				window.v_is_autenticated = true;
                return axios(error.response.config);
            }).catch(error => {
				axios.defaults.headers.common['Authorization'] = "";
				window.v_is_autenticated = false;
				localStorage.removeItem('tokens');
				let h = useHistory();
				h.push('/login');
                return Promise.reject(error);
            }).finally(createAxiosResponseInterceptor);
        }
    );
}