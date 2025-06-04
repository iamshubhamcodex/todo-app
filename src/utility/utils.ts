export const getUniqueId = () => {
  return Date.now();
};
export const getFormattedDate = (date?: Date | string): string => {
  if (!date) date = new Date();
  if (typeof date === "string") date = new Date(date);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  if (day >= 11 && day <= 13) {
    return `${day}th ${month}, ${year}`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st ${month}, ${year}`;
    case 2:
      return `${day}nd ${month}, ${year}`;
    case 3:
      return `${day}rd ${month}, ${year}`;
    default:
      return `${day}th ${month}, ${year}`;
  }
};
export const isTodaysTask = (date: Date): boolean => {
  const currDate = new Date();

  if (
    date.getDate() === currDate.getDate() &&
    date.getMonth() === currDate.getMonth() &&
    date.getFullYear() === currDate.getFullYear()
  )
    return true;
  return false;
};
