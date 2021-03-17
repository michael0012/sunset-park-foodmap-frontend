import axios from 'axios';
if(process.env.NODE_ENV === "development"){
    axios.defaults.baseURL = 'http://localhost:8000';
}
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;