import { LOCALSTORAGE_KEYS } from "@/common/constants";

export const isAuthenticated = () => {
  const value = localStorage.getItem(LOCALSTORAGE_KEYS.isAuthenticated);
  return value ? JSON.parse(value) === true : false;
};
