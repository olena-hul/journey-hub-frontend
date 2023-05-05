import type { MyObject } from "@/common/interfaces";

export function formatDate(date: Date) {
  date = date || new Date();
  const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad it with leading zeroes if needed
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; // Create an array of month names
  const month = monthNames[date.getMonth()]; // Get the month name from the array
  const year = date.getFullYear();
  return `${day}, ${month} ${year}`; // Return the formatted string
}

export function addDays(date: Date, dayNumber: number = 1) {
  date = date || new Date();

  return new Date(date.getTime() + 24 * 60 * 60 * 1000 * (dayNumber - 1)); // Add n days to the timestamp (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
}

export function formatDateToBackendFormat(date: Date) {
  const [month, day, year] = date.toLocaleDateString().split("/");
  return `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
}

const CURRENCY_MAPPING_USD: MyObject = {
  $: 1,
  "₴": 38,
  "€": 0.98,
};

export const convertCurrency = (target: string, amount: number) => {
  const rate = CURRENCY_MAPPING_USD[target];
  return amount * rate;
};
