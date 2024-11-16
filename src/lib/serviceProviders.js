import { sendTextMessage } from "./messaging";

export const serviceProviders = [
  {
    companyName: "DoorFix Solutions",
    ownerName: "Alice Johnson",
    phoneNumber: "+1 (555) 123-4567",
    website: "https://www.doorfixsolutions.com",
    availability: [
      {
        date: "2024-11-05",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-11-12",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-11-19",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-11-26",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-03",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-10",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-17",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-24",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-31",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
    ],
  },
  {
    companyName: "Quick Garage Repairs",
    ownerName: "Bob Smith",
    phoneNumber: "+1 (555) 987-6543",
    website: "https://www.quickgaragerepairs.com",
    availability: [
      {
        date: "2024-11-07",
        timeSlots: [
          { start: "08:00", end: "10:00" },
          { start: "13:00", end: "15:00" },
        ],
      },
      {
        date: "2024-11-14",
        timeSlots: [
          { start: "11:00", end: "13:00" },
          { start: "16:00", end: "18:00" },
        ],
      },
      {
        date: "2024-11-21",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-11-28",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-05",
        timeSlots: [
          { start: "08:00", end: "10:00" },
          { start: "13:00", end: "15:00" },
        ],
      },
      {
        date: "2024-12-12",
        timeSlots: [
          { start: "11:00", end: "13:00" },
          { start: "16:00", end: "18:00" },
        ],
      },
      {
        date: "2024-12-19",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-26",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
    ],
  },
  {
    companyName: "Elite Garage Door Services",
    ownerName: "Carol Lee",
    phoneNumber: "+1 (555) 456-7890",
    website: "https://www.elitegaragedoorservices.com",
    availability: [
      {
        date: "2024-11-10",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-11-17",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-11-24",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-01",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-08",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-15",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
      {
        date: "2024-12-22",
        timeSlots: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        date: "2024-12-29",
        timeSlots: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
    ],
  },
];

export const getAvailableServiceProvidersByDate = (date) => {
  return serviceProviders.filter((provider) => {
    return provider.availability.some((a) => a.date == date);
  });
};

// Helper function to get available service providers based on date and time
export const getAvailableServiceProvidersByDateAndTime = (date, time) => {
  const providers = getAvailableServiceProvidersByDate(date).filter(
    (provider) => {
      const slots =
        provider.availability.find((a) => a.date === date)?.timeSlots || [];
      return slots.some((slot) => {
        const inputDate = new Date(date);
        inputDate.setHours(time.split(":")[0], time.split(":")[1], 0);
        const inputTimestamp = inputDate.getTime();

        const startDate = new Date(date);
        startDate.setHours(
          slot.start.split(":")[0],
          slot.start.split(":")[1],
          0
        );
        const startTimestamp = startDate.getTime();

        const endDate = new Date(date);
        endDate.setHours(slot.end.split(":")[0], slot.end.split(":")[1], 0);
        const endTimestamp = endDate.getTime();

        return (
          inputTimestamp >= startTimestamp && inputTimestamp < endTimestamp
        );
      });
    }
  );

  return providers;
};

// The next 5 upcoming dates that have availability
export const getAvailableUpcomingDates = (todayDate) => {
  return serviceProviders
    .flatMap((provider) => provider.availability.map((a) => new Date(a.date)))
    .sort((a, b) => a - b)
    .filter((date) => date >= todayDate)
    .slice(0, 5)
    .map((date) => date.toISOString().split("T")[0]);
};

export const bookAppointment = (name, phone, date, time) => {
  const provider = getAvailableServiceProvidersByDateAndTime(date, time)[0];

  if (!provider) return { error: "No provider available" };

  console.log(
    `[bookAppointment] booking with: ${name} (${phone}) at ${provider.companyName}`
  );

  try {
    sendTextMessage(
      process.env.YOUR_PHONE_NUMBER,
      `New Customer Appointment booked with ${name} (${phone}) on ${date} at ${time}`
    );
  } catch (error) {
    console.error("[bookAppointment] error: ", error);
  }

  return { success: true, provider };
};
