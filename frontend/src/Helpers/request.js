import axios from 'axios';

const request = async (url, method, data = null) => {
  const config = {
    url: `/${url}`,
    method,
    data,
    baseURL: 'http://localhost:9000/'
  };
  const response = await axios(config);

  if(!response) return false;
  return response.data.data.results;
}

export default request;
