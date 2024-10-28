import { describe, it, expect } from "vitest";
import FakeInfo from "../../src/routes/FakeInfoRouter";

describe("FakeInfo Class - Integration Tests", () => {
  it("should generate a complete and consistent fake person", () => {
    const fakeInfo = new FakeInfo();
    const fakePerson = fakeInfo.getFakePerson();

    // Verify all core properties are present
    expect(fakePerson).toHaveProperty("CPR");
    expect(fakePerson).toHaveProperty("firstName");
    expect(fakePerson).toHaveProperty("lastName");
    expect(fakePerson).toHaveProperty("gender");
    expect(fakePerson).toHaveProperty("birthDate");
    expect(fakePerson).toHaveProperty("address");
    expect(fakePerson).toHaveProperty("phoneNumber");

    // Verify address fields are valid
    const address = fakePerson.address as { [key: string]: string | number };
    expect(address).toHaveProperty("street");
    expect(address.street).toBeTypeOf("string");
    expect(address).toHaveProperty("number");
    expect(address).toHaveProperty("postal_code", "1234"); // Default value

    const phone = fakePerson.phoneNumber as string;
    expect(phone).toHaveLength(8);

    // Verify if the generated phone number starts with a valid prefix
    const isValidPrefix = FakeInfo["PHONE_PREFIXES"].some((prefix) =>
      phone.startsWith(prefix)
    );
    expect(isValidPrefix).toBe(true);

    if (!isValidPrefix) {
      console.error(
        `Generated phone number ${phone} does not start with a valid prefix`
      );
    }
  });

  it("should generate 100 complete and consistent fake person with valid CPR", () => {
    const fakeInfo = new FakeInfo();

    // Generate and test multiple fake persons
    for (let i = 0; i < 100; i++) {
      const fakePerson = fakeInfo.getFakePerson();

      // Verify all core properties are present
      expect(fakePerson).toHaveProperty("CPR");
      expect(fakePerson).toHaveProperty("firstName");
      expect(fakePerson).toHaveProperty("lastName");
      expect(fakePerson).toHaveProperty("gender");
      expect(fakePerson).toHaveProperty("birthDate");
      expect(fakePerson).toHaveProperty("address");
      expect(fakePerson).toHaveProperty("phoneNumber");

      // Verify gender-related CPR digit
      const gender = fakePerson.gender;
      const cpr = fakePerson.CPR as string;
      const lastDigit = parseInt(cpr[cpr.length - 1], 10);
      const isFemale = gender === FakeInfo.GENDER_FEMININE;

      if (isFemale) {
        expect(
          lastDigit % 2,
          `Female CPR ${cpr} should end with an even digit (gender: ${gender})`
        ).toBe(0);
      } else {
        expect(
          lastDigit % 2,
          `Male CPR ${cpr} should end with an odd digit (gender: ${gender})`
        ).toBe(1);
      }

      // Verify address fields are valid
      const address = fakePerson.address as { [key: string]: string | number };
      expect(address).toHaveProperty("street");
      expect(address.street).toBeTypeOf("string");
      expect(address).toHaveProperty("number");
      expect(address).toHaveProperty("postal_code");
      expect(address.postal_code).toBeTypeOf("string");

      // Verify phone number structure
      const phone = fakePerson.phoneNumber as string;
      expect(phone).toHaveLength(8);

      // Check if the generated phone number starts with a valid prefix
      const isValidPrefix = FakeInfo["PHONE_PREFIXES"].some((prefix) =>
        phone.startsWith(prefix)
      );
      expect(
        isValidPrefix,
        `Phone number ${phone} does not start with a valid prefix`
      ).toBe(true);
    }
  });

  it("should generate multiple persons with consistent data", () => {
    const bulkPersons = new FakeInfo().getFakePersons(3);

    // Check the number of persons generated
    expect(bulkPersons).toHaveLength(3);

    // Verify consistency of data across persons
    bulkPersons.forEach((person) => {
      expect(person).toHaveProperty("CPR");
      expect(person).toHaveProperty("firstName");
      expect(person).toHaveProperty("lastName");
      expect(person).toHaveProperty("gender");
      expect(person).toHaveProperty("birthDate");
      expect(person).toHaveProperty("address");
      expect(person).toHaveProperty("phoneNumber");
    });
  });
});
