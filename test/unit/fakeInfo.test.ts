import { describe, it, expect, beforeEach } from "vitest";
import FakeInfo from "../../src/routes/FakeInfoRouter";

describe("Unit test for FakeInfo class", () => {
  let fakeInfo: FakeInfo;

  beforeEach(() => {
    fakeInfo = new FakeInfo();
  });

  const cprTestCases = [
    {
      birthDate: "1990-01-01",
      gender: FakeInfo.GENDER_MASCULINE,
      expectedCprPrefix: "010190",
      expectedGenderParity: 1,
    },
    {
      birthDate: "1985-12-31",
      gender: FakeInfo.GENDER_FEMININE,
      expectedCprPrefix: "311285",
      expectedGenderParity: 0,
    },
  ];

  describe("Random CPR generation", () => {
    it.each(cprTestCases)(
      "should generate a valid CPR for birthDate: $birthDate and gender: $gender",
      ({ birthDate, gender, expectedCprPrefix, expectedGenderParity }) => {
        // Arrange
        fakeInfo.birthDate = birthDate;
        console.log(fakeInfo.birthDate);

        fakeInfo.gender = gender;
        console.log(fakeInfo);
        console.log(fakeInfo.gender);

        // Act
        fakeInfo.setCpr();
        const cpr = fakeInfo.getCpr();

        console.log("Generated CPR:", cpr);

        // Assert
        expect(cpr).toHaveLength(10);
        expect(cpr.startsWith(expectedCprPrefix)).toBe(true);

        const finalDigit = parseInt(cpr[cpr.length - 1], 10);
        expect(finalDigit % 2).toBe(expectedGenderParity);
      }
    );
  });
});
