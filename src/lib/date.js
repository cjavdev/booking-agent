export function todayString() {
  return new Date().toISOString().split("T")[0];
}

export function today() {
  // Ignoring timezones to save... time.
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function checkDate(date) {
  // parse date and confirm it's a date that is from today until 3 months from today
  const parsedDate = new Date(date);

  if (parsedDate < today()) {
    console.log("Date is in the past", parsedDate, today());
    return "Date is in the past";
  }

  if (parsedDate > today().setMonth(today().getMonth() + 3)) {
    console.log("Date is too far in the future", parsedDate, today());
    return "Date is too far in the future";
  }

  console.log("Valid date", parsedDate, today());
  return "Valid date";
}
