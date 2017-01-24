import { camelizeKeys } from 'humps';
import config from '../config';
import axios from 'axios';

// TODO: ADD Normalizr: https://github.com/gaearon/normalizr
const methods: Array<string> = [ 'get', 'post', 'put', 'patch', 'delete' ];
function formatUrl(path: string, external: boolean) {
  if (external) return path;
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' +
      config.apiHost +
      ':' +
      config.apiPort +
      adjustedPath +
      '/';
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath + '/';
}

class ApiClient {
  constructor() {
    for (const method of methods) {
      this[method] = (
        path: string,
        { params, data, headers } = {},
        external: boolean = false,
      ) =>
        new Promise(async (resolve, reject) => {
          const url = formatUrl(path, external);
          const requestConfig = { method, url, data, headers, params };
          try {
            const response = await axios.request(requestConfig);
            console.log('[SERVER_RESPONSE]', response);
            if (response.data) {
              resolve(response.data);
            } else {
              resolve({});
            }
          } catch (err) {
            reject(err);
          }
        });
    }
  }
  empty() {
  }
}

const api = new ApiClient();

export const app = {
  load(docName) {
    return api.get('/app/load');
  },
};

const dadataClient = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/',
});
dadataClient.interceptors.response.use(
  response => {
    const data = response.data;
    if (
      data.suggestions[0] &&
        data.suggestions[0].data &&
        data.suggestions[0].data.inn
    ) {
      data.suggestions = data.suggestions.map(val => ({
        ...val,
        value: companyName(val.value),
      }));
    }
    return data;
  },
  error => error,
);

export const dadata = {
  company(value: string) {
    return dadataClient.post('/suggest/party', { query: value });
  },
  email(value: string) {
    return dadataClient.post('/suggest/email', { query: value });
  },
  address(value: string) {
    return dadataClient.post('/suggest/address', { query: value });
  },
  bank(value: string) {
    return dadataClient.post('/suggest/bank', { query: value });
  },
  name(value: string) {
    return dadataClient.post('/suggest/fio', { query: value });
  },
};
