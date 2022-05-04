export const dateChanger = (data) => {
  const newDate = new Date(data);
  const getYear = newDate.getFullYear();
  const getMonth = newDate.getMonth() + 1;
  const getDate = newDate.getDate();
  const getHours = newDate.getHours();
  const getMinutes = newDate.getMinutes();

  return (
    <p>{`${getYear}년 ${getMonth}월 ${getDate}일 ${getHours}:${getMinutes}`}</p>
  );
};
