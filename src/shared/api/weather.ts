import { SERVICE_KEY } from '../config/constants';
import { getBaseDateTime } from '../lib';
import axiosClient from './axios-client';

const getWeather = async (nx: number, ny: number) => {
  const { base_date, base_time } = getBaseDateTime();

  const res = await axiosClient.get(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
    {
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
    }
  );

  return res.data.response.body.items.item;
};

export default getWeather;
