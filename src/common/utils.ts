import { LOCALSTORAGE_KEYS } from "@/common/constants";

export const isAuthenticated = () => {
  const value = localStorage.getItem(LOCALSTORAGE_KEYS.isAuthenticated);
  return value ? JSON.parse(value) === true : false;
};

export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}.${month}`;
};

export const groupActivities = (suggestedTrip: Array<any> | null) => {
  return suggestedTrip?.reduce((acc, obj) => {
    const key = obj.day;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  // month is 0-indexed
  return new Date(year, month - 1, day);
};
