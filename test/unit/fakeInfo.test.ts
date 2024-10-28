import { describe, it, expect, beforeEach } from "vitest";
import FakeInfo from "../../src/routes/FakeInfoRouter";

describe("Unit test for FakeInfo class", () => {
  let fakeInfo: FakeInfo;

  beforeEach(() => {
    fakeInfo = new FakeInfo();
  });

  // CPR generation tests
  describe("FakeInfo CPR generation", () => {
    it("should generate a CPR of length 10", () => {
      const cpr = fakeInfo.getCpr();
      expect(cpr).toHaveLength(10);
    });

    it("should have a gender-based final digit for female", () => {
      fakeInfo["gender"] = FakeInfo.GENDER_FEMININE;
      fakeInfo.setCpr();
      const cpr = fakeInfo.getCpr();
      const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
      expect(finalDigit % 2).toBe(0); // Female even
    });

    it("should have a gender-based final digit for male", () => {
      fakeInfo["gender"] = FakeInfo.GENDER_MASCULINE;
      fakeInfo.setCpr();
      const cpr = fakeInfo.getCpr();
      const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
      expect(finalDigit % 2).toBe(1); // Males odd
    });
  });

  it("should throw an error for a CPR with 9 digits", () => {
    fakeInfo["cpr"] = "123456789";
    // callback for at sikre at expect håndtere fejlen
    expect(() => {
      fakeInfo.getCpr();
    }).toThrowError("Invalid CPR length: CPR must be exactly 10 digits long.");
  });

  it("should throw an error for a CPR with 11 digits", () => {
    fakeInfo["cpr"] = "12345678901";
    expect(() => {
      fakeInfo.getCpr();
    }).toThrowError("Invalid CPR length: CPR must be exactly 10 digits long.");
  });

  // Birthdate generation tests
  describe("FakeInfo birthdate generation", () => {
    it("should generate a valid birthdate in YYYY-MM-DD format", () => {
      const birthDate = fakeInfo.getBirthDate();
      expect(birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should generate a birthdate with a year greater than or equal to 1900", () => {
      const birthDate = fakeInfo.getBirthDate();
      const year = parseInt(birthDate.slice(0, 4), 10);
      expect(year).toBeGreaterThanOrEqual(1900);
    });

    it("should generate a birthdate with a year less than or equal to the current year", () => {
      const birthDate = fakeInfo.getBirthDate();
      const year = parseInt(birthDate.slice(0, 4), 10);
      const currentYear = new Date().getFullYear();
      expect(year).toBeLessThanOrEqual(currentYear);
    });
  });

  it("should correctly generate the lower boundary birthdate (1900-01-01)", () => {
    fakeInfo.setBirthDate("1900-01-01");
    const birthDate = fakeInfo.getBirthDate();
    expect(birthDate).toBe("1900-01-01");
  });

  it("should correctly generate the upper boundary birthdate (current date)", () => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    fakeInfo.setBirthDate(formattedToday);
    const birthDate = fakeInfo.getBirthDate();
    expect(birthDate).toBe(formattedToday);
  });

  it("should throw an error for birthdate before 1900-01-01", () => {
    expect(() => {
      fakeInfo.setBirthDate("1899-12-31");
    }).toThrowError(
      "Invalid birthdate: Birthdate must be on or after 1900-01-01."
    );
  });

  it("should throw an error for a future birthdate", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateString = `${futureDate.getFullYear()}-${String(
      futureDate.getMonth() + 1
    ).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;

    expect(() => {
      fakeInfo.setBirthDate(futureDateString);
    }).toThrowError(
      "Invalid birthdate: Birthdate must be in the past or present."
    );
  });

  it("should generate valid random birthdates consistently", () => {
    for (let i = 0; i < 200; i++) {
      fakeInfo.setBirthDate();
      const birthDate = fakeInfo.getBirthDate();
      const year = parseInt(birthDate.slice(0, 4), 10);
      const currentYear = new Date().getFullYear();

      expect(year).toBeGreaterThanOrEqual(1900);
      expect(year).toBeLessThanOrEqual(currentYear);

      expect(birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  // Name generation tests
  describe("FakeInfo full name and gender generation", () => {
    it("should generate a non-empty first name", () => {
      const { firstName } = fakeInfo.getFullNameAndGender();
      expect(firstName).not.toBe("");
    });

    it("should generate a non-empty last name", () => {
      const { lastName } = fakeInfo.getFullNameAndGender();
      expect(lastName).not.toBe("");
    });

    it("should generate a valid gender (male or female)", () => {
      const { gender } = fakeInfo.getFullNameAndGender();
      expect([FakeInfo.GENDER_FEMININE, FakeInfo.GENDER_MASCULINE]).toContain(
        gender
      );
    });
  });

  // Phone generation tests
  describe("FakeInfo phone number generation", () => {
    it("should generate a phone number of length 8", () => {
      const phoneNumber = fakeInfo["phone"];
      expect(phoneNumber).toHaveLength(8);
    });

    it("should generate a phone number starting with a valid prefix", () => {
      fakeInfo.setPhone();
      const phoneNumber = fakeInfo["phone"];

      const validPrefix = FakeInfo["PHONE_PREFIXES"].find((prefix) =>
        phoneNumber.startsWith(prefix)
      );

      expect(validPrefix).toBeDefined(); // Tjek, at der findes et gyldigt præfiks
    });
  });

  // Address generation tests
  describe("FakeInfo address generation", () => {
    it("should generate an address with a street", () => {
      const address = fakeInfo["address"];
      expect(address).toHaveProperty("street");
    });

    it("should generate an address with a number", () => {
      const address = fakeInfo["address"];
      expect(address).toHaveProperty("number");
    });

    it("should generate an address with a postal code", () => {
      const address = fakeInfo["address"];
      expect(address).toHaveProperty("postal_code");
    });

    it("should generate an address with a town name", () => {
      const address = fakeInfo["address"];
      expect(address).toHaveProperty("town_name");
    });
  });
});
