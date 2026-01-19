import { API_KEY, SERVICE_KEY } from '../config/constants';
import { getBaseDateTime } from '../lib';
import axiosClient from './axios-client';

const getWeather = async (nx: number, ny: number) => {
  const { base_date, base_time } = getBaseDateTime();

  const res = await axiosClient.get(API_KEY, {
    params: {
      serviceKey: SERVICE_KEY,
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date,
      base_time,
      nx,
      ny,
    },
  });

  return res.data.response.body.items.item;
};

export default getWeather;
