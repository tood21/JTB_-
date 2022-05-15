export const dateChanger = (data) => {
  const newDate = new Date(data);
  const getYear = newDate.getFullYear();
  const getMonth = newDate.getMonth() + 1;
  const getDate = newDate.getDate();
  const getHours = String(newDate.getHours()).padStart(2, "0");
  const getMinutes = String(newDate.getMinutes()).padStart(2, "0");

  return (
    <div>{`${getYear}년 ${getMonth}월 ${getDate}일 ${getHours}:${getMinutes}`}</div>
  );
};
