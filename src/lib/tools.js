import { z } from "zod";
import { tool } from "ai";

import {
  getAvailableServiceProvidersByDate,
  getAvailableServiceProvidersByDateAndTime,
  getAvailableUpcomingDates,
  bookAppointment,
} from "./serviceProviders";
import { checkDate } from "./date";

export const tools = {
  checkDate: tool({
    description:
      "Check if a date is valid and within a reasonable booking range from today until 3 months from today.",
    parameters: z.object({
      date: z.string().describe("The date in YYYY-MM-DD format to check"),
    }),
    execute: async ({ date }) => {
      try {
        return checkDate(date);
      } catch (error) {
        return error.message;
      }
    },
  }),
  bookAppointment: tool({
    description:
      "Book an appointment with a garage door repair service provider.",
    parameters: z.object({
      name: z.string().describe("The name of the customer"),
      phone: z.string().describe("The phone number of the customer"),
      date: z
        .string()
        .describe("The date in YYYY-MM-DD format to check availability"),
      time: z
        .string()
        .describe("The time in HH:MM format to check availability"),
    }),
    execute: async ({ name, phone, date, time }) => {
      try {
        return bookAppointment(name, phone, date, time);
      } catch (error) {
        return error.message;
      }
    },
  }),
  getAvailableUpcomingDates: tool({
    description:
      "Retrieve the next 5 upcoming dates that have availability for garage door repair service providers.",
    parameters: z.object({}),
    execute: async () => {
      try {
        const upcomingDates = getAvailableUpcomingDates(getTodayDate());
        if (upcomingDates.length === 0) {
          return "No upcoming dates with availability";
        }
        return upcomingDates;
      } catch (error) {
        return error.message;
      }
    },
  }),
  getAvailableSlotsByDate: tool({
    description:
      "Retrieve a list of slots available on a given day for garage door repair service providers.",
    parameters: z.object({
      date: z
        .string()
        .describe("The date in YYYY-MM-DD format to check availability"),
    }),
    execute: async ({ date }) => {
      try {
        return [
          ...new Set(
            getAvailableServiceProvidersByDate(date).flatMap(
              (provider) =>
                provider.availability.find(
                  (a) => Date.parse(a.date) == Date.parse(date)
                )?.timeSlots || []
            )
          ),
        ];
      } catch (error) {
        return error.message;
      }
    },
  }),
  getAvailableServiceProvidersByDateAndTime: tool({
    description:
      "Retrieve a list of garage door repair service providers available at a given date and time.",
    parameters: z.object({
      date: z
        .string()
        .describe("The date in YYYY-MM-DD format to check availability"),
      time: z
        .string()
        .describe("The time in HH:MM format to check availability"),
    }),
    execute: async ({ date, time }) => {
      try {
        return getAvailableServiceProvidersByDateAndTime(date, time).map(
          (provider) => ({
            id: provider.id,
            name: provider.name,
            slots: provider.availability.find((a) => a.date === date).timeSlots,
          })
        );
      } catch (error) {
        return error.message;
      }
    },
  }),
};
