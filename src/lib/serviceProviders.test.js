import {
  getAvailableServiceProvidersByDate,
  getAvailableServiceProvidersByDateAndTime,
  getAvailableUpcomingDates,
} from "./serviceProviders";

describe("Service Provider Helper Methods", () => {
  describe("getAvailableUpcomingDates", () => {
    it("should return the next 5 available dates", () => {
      const startDate = new Date("2024-11-07");
      const dates = getAvailableUpcomingDates(startDate);

      expect(dates).toHaveLength(5);
      expect(dates[0]).toBe("2024-11-07");
      expect(dates[1]).toBe("2024-11-10");
      expect(dates[2]).toBe("2024-11-12");
      expect(dates[3]).toBe("2024-11-14");
      expect(dates[4]).toBe("2024-11-17");
    });
  });

  describe("getAvailableServiceProvidersByDate", () => {
    it("should return providers available on a specific date", () => {
      const providers = getAvailableServiceProvidersByDate("2024-11-07");

      expect(providers).toHaveLength(1);
      expect(providers[0].companyName).toBe("Quick Garage Repairs");
      expect(providers[0].availability[0].timeSlots).toHaveLength(2);
      expect(providers[0].availability[0].timeSlots[0]).toEqual({
        start: "08:00",
        end: "10:00",
      });
    });

    it("should return empty array when no providers available", () => {
      const providers = getAvailableServiceProvidersByDate("2024-11-08");
      expect(providers).toHaveLength(0);
    });
  });

  describe("getAvailableServiceProvidersByDateAndTime", () => {
    it("should return providers available at specific date and time", () => {
      const providers = getAvailableServiceProvidersByDateAndTime(
        "2024-11-07",
        "08:00"
      );

      expect(providers).toHaveLength(1);
      expect(providers[0].companyName).toBe("Quick Garage Repairs");
    });

    it("should return empty array when no providers available at specified time", () => {
      const providers = getAvailableServiceProvidersByDateAndTime(
        "2024-11-07",
        "12:00"
      );
      expect(providers).toHaveLength(0);
    });

    it("should return empty array for non-existent date", () => {
      const providers = getAvailableServiceProvidersByDateAndTime(
        "2024-11-08",
        "09:00"
      );
      expect(providers).toHaveLength(0);
    });
  });
});
