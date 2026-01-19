const getBaseDateTime = () => {
  const now = new Date();
  const hours = [23, 20, 17, 14, 11, 8, 5, 2];

  const hh = now.getHours();

  const baseHour = hours.find((h) => hh >= h) ?? 23;

  if (hh < 2) {
    now.setDate(now.getDate() - 1);
  }

  const yyyyMMdd = now.toISOString().slice(0, 10).replace(/-/g, '');

  return {
    base_date: yyyyMMdd,
    base_time: `${String(baseHour).padStart(2, '0')}00`,
  };
};

export default getBaseDateTime;
