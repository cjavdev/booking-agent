import { jest } from "@jest/globals";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { tools } from "@/lib/tools";
import { booking } from "@/lib/prompts";
import { getTodayDate } from "./date";

// Mock the getTodayDate function
jest.mock("./date", () => ({
  getTodayDate: jest.fn(),
}));

// Helper function to check if response contains key booking concepts
const containsBookingConcepts = (text, concepts) => {
  return concepts.every((concept) => {
    if (typeof concept === "string") {
      return text.toLowerCase().includes(concept.toLowerCase());
    }
    // For regex patterns
    return concept.test(text);
  });
};

describe("Booking Agent Tests", () => {
  let mockDate;

  beforeEach(() => {
    // Mock current date to 2024-11-07
    mockDate = new Date("2024-11-07");
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe("Standard Booking Flow", () => {
    test("should handle valid booking request", async () => {
      const { text } = await generateText({
        tools,
        model: openai("gpt-4o"),
        system: booking.system,
        messages: [
          {
            role: "user",
            content: "I need to book a garage door repair for tomorrow at 2pm",
          },
        ],
        maxSteps: 5,
      });

      // Example Result:
      // There is availability for a garage door repair appointment tomorrow, November 7, 2024, from 1:00 PM to 3:00 PM. Would you like to book this time slot? If so, please provide your name and phone number to proceed with the booking.
      //
      // Expected semantic concepts
      const expectedConcepts = [
        // Check for time-related information
        /\d{1,2}[:h]\d{2}|PM|AM/i,
        // Check for availability indication
        /(availab|time slot|schedule|book)/i,
        // Check for date reference
        /(tomorrow|next day|\bNov(ember)?\b)/i,
      ];

      expect(containsBookingConcepts(text, expectedConcepts)).toBe(true);

      // Additional semantic checks
      expect(text).toMatch(/\d{1,2}[:h]\d{2}/); // Contains time format
      expect(text).toMatch(/(PM|AM)/i); // Contains time period

      // Negative checks
      const unexpectedPhrases = ["error", "invalid", "cannot", "unavailable"];

      unexpectedPhrases.forEach((phrase) => {
        expect(text.toLowerCase()).not.toContain(phrase);
      });
    });

    test("should handle when no availability", async () => {
      const response = await generateText({
        tools,
        model: openai("gpt-4o"),
        system: booking.system,
        messages: [
          {
            role: "user",
            content:
              "I need to book a garage door repair for 2024-12-31 at 2pm",
          },
        ],
        maxSteps: 5,
      });

      // Example Result:
      // Not available
      const expectedPhrases = ["error", "invalid", "cannot", "unavailable"];
      console.log(response.text);
      console.log(JSON.stringify(response.steps, null, 2));
      expect(containsBookingConcepts(response.text, expectedPhrases)).toBe(
        true
      );
    });
  });
});
