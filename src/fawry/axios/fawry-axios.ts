import axios from 'axios';
import type { CreateAxiosDefaults } from 'axios';
import { base_url } from './endpoints/fawry.endpoints';
import process from 'process';
import { FawryHeaders } from '../interfaces/payment-options';

const FawryAPIAxios = () => {
  const defaultOptions: CreateAxiosDefaults = {
    baseURL: base_url,
    timeout: 6000,
  };

  const fawryHeaders: FawryHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
  const instance = axios.create(defaultOptions);

  // Request interceptors
  instance.interceptors.request.use(async (req) => {
    req.headers.Accept = fawryHeaders.Accept;
    req.headers['Content-Type'] = fawryHeaders['Content-Type'];
    return req;
  });

  return instance;
};

export default FawryAPIAxios();
