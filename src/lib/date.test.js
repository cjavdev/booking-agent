import { todayString, today, checkDate } from "./date";

describe("date utils", () => {
  let mockDate;

  beforeEach(() => {
    // Mock current date to 2024-01-15
    mockDate = new Date(2024, 0, 15);
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("todayString", () => {
    it("returns today's date in YYYY-MM-DD format", () => {
      expect(todayString()).toBe("2024-01-15");
    });
  });

  describe("today", () => {
    it("returns today's date at midnight", () => {
      const result = today();
      expect(new Date(result).toISOString()).toBe("2024-01-15T00:00:00.000Z");
    });
  });

  describe("checkDate", () => {
    it("returns 'Valid date' for date within 3 months", () => {
      const futureDate = "2024-03-15";
      expect(checkDate(futureDate)).toBe("Valid date");
    });

    it("returns error for past date", () => {
      const pastDate = "2024-01-14";
      expect(checkDate(pastDate)).toBe("Date is in the past");
    });

    it("returns error for date more than 3 months in future", () => {
      const farFutureDate = "2024-04-16";
      expect(checkDate(farFutureDate)).toBe("Date is too far in the future");
    });

    it("returns 'Valid date' for today", () => {
      const todayDate = "2024-01-15";
      expect(checkDate(todayDate)).toBe("Valid date");
    });

    it("returns 'Valid date' for exactly 3 months from today", () => {
      const threeMonthsDate = "2024-04-14";
      expect(checkDate(threeMonthsDate)).toBe("Valid date");
    });
  });
});
