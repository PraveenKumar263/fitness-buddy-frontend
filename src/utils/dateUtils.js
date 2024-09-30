import { fromZonedTime, toZonedTime, format } from "date-fns-tz";

// Convert a date from a given time zone to UTC.
const convertToUTC = (date, timeZone) => {
  return fromZonedTime(date, timeZone);
};

// Converts a date from UTC to a given time zone.
const convertFromUTC = (date, timeZone) => {
  return toZonedTime(date, timeZone);
};

// Extract date from UTC
const extractDateFromUTC = (utcString, timeZone, dateFormat = "dd/MM/yyyy") => {
  const dateObject = new Date(utcString);
  const datePart = format(toZonedTime(dateObject, timeZone), dateFormat);
  return datePart;
};

// Extract time from UTC
const extractTimeFromUTC = (utcString, timeZone, timeFormat = "hh:mm a") => {
  const dateObject = new Date(utcString);
  const timePart = format(toZonedTime(dateObject, timeZone), timeFormat);
  return timePart;
};

// Format date for input - convert UTC to local timzone
const formatDateForInput = (dateString, localTimeZone) => {
  const localDate = convertFromUTC(dateString, localTimeZone);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");
  // Format: YYYY-MM-DDTHH:MM
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export {
  convertToUTC,
  convertFromUTC,
  extractDateFromUTC,
  extractTimeFromUTC,
  formatDateForInput,
};
