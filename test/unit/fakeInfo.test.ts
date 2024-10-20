import { describe, it, expect, beforeEach } from "vitest";
import FakeInfo from "../../src/routes/FakeInfoRouter";

describe("Unit test for FakeInfo class", () => {
  let fakeInfo: FakeInfo;

  beforeEach(() => {
    fakeInfo = new FakeInfo();
  });

  describe("Random CPR generation", () => {
    it("should generate a valid CPR based on birthDate and gender", () => {
      // Arrange: Set a birth date and gender
      fakeInfo.birthDate = "1990-01-01"; // Directly setting the birthDate
      // fakeInfo.gender = FakeInfo.GENDER_MASCULINE; // Make sure the gender is set

      // Act: Generate a CPR
      fakeInfo.setCpr();

      // Assert: Check the CPR format
      const cpr = fakeInfo.getCpr();
      expect(cpr).toHaveLength(10); // CPR should have 10 characters
      expect(cpr.startsWith("010190")).toBe(true); // CPR should start with ddmmyy
      const finalDigit = parseInt(cpr[cpr.length - 1], 10);
      //expect(finalDigit % 2).toBe(1); // Final digit should be odd for males
    });
  });
});
