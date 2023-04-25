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
