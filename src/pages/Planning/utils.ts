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

export function formatDateDDMM(date: string) {
  const date_instance = new Date(date);
  const day = date_instance.getDate().toString().padStart(2, "0"); // Get the day and pad it with leading zeroes if needed
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
  const month = monthNames[date_instance.getMonth()]; // Get the month name from the array
  return `${day}, ${month}`; // Return the formatted string
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

export const planTrip = (selectedDates: Date[], plannedTrip: MyObject) => {
  const [startDate, endDate] = selectedDates;

  for (const dateStr in plannedTrip) {
    const date = new Date(dateStr);

    // determine whether date is inside start-end range
    if (date >= selectedDates[0] && date <= selectedDates[1]) {
      // date is already in range, do nothing
    } else {
      // date is not in range, delete it
      delete plannedTrip[dateStr as string];
    }
  }
  // add new dates from start-end range if they are not present in plannedTrip
  for (
    let d: Date = startDate;
    d.getTime() <= endDate.getTime();
    d = addDays(d, 2)
  ) {
    const dateStr: any = d.toISOString().substring(0, 10);
    if (!(dateStr in plannedTrip)) {
      plannedTrip[dateStr] = [];
    }
  }
  // sort dates in ascending order
  const sortedDates = Object.keys(plannedTrip).sort();
  const sortedTrip: MyObject = {};
  for (const dateStr of sortedDates) {
    sortedTrip[dateStr] = plannedTrip[dateStr as any];
  }
  return sortedTrip;
};
