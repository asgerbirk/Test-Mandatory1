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
    {
      birthDate: "0000-00-00",
      gender: FakeInfo.GENDER_FEMININE,
      expectedCprPrefix: "000000",
      expectedGenderParity: 0,
    },
    {
      birthDate: "",
      gender: FakeInfo.GENDER_MASCULINE,
      expectedCprPrefix: "",
      expectedGenderParity: 1,
    },
  ];

  describe("Random CPR generation", () => {
    it.each(cprTestCases)(
      "should generate a valid CPR for birthDate: $birthDate and gender: $gender",
      ({ birthDate, gender, expectedCprPrefix, expectedGenderParity }) => {
        fakeInfo.birthDate = birthDate;
        console.log(fakeInfo.birthDate);

        fakeInfo.gender = gender;
        console.log(fakeInfo);
        console.log(fakeInfo.gender);

        fakeInfo.setCpr();
        const cpr = fakeInfo.getCpr();

        console.log("Generated CPR:", cpr);

        expect(cpr).toHaveLength(10);
        expect(cpr.startsWith(expectedCprPrefix)).toBe(true);

        const finalDigit = parseInt(cpr[cpr.length - 1], 10);
        expect(finalDigit % 2).toBe(expectedGenderParity);
      }
    );
  });

  // CPR generation tests
  describe('FakeInfo CPR generation', () => {
    it('should generate a CPR of length 10', () => {
      const cpr = fakeInfo.getCpr();
      expect(cpr).toHaveLength(10);
    });
  
    it('should have a gender-based final digit for female', () => {
      fakeInfo['gender'] = FakeInfo.GENDER_FEMININE;
      fakeInfo.setCpr();
      const cpr = fakeInfo.getCpr();
      const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
      expect(finalDigit % 2).toBe(0); // Females should have even final digits
    });
  
    it('should have a gender-based final digit for male', () => {
      fakeInfo['gender'] = FakeInfo.GENDER_MASCULINE;
      fakeInfo.setCpr();
      const cpr = fakeInfo.getCpr();
      const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
      expect(finalDigit % 2).toBe(1); // Males should have odd final digits
    });
  });

  // Birthdate generation tests
  describe('FakeInfo birthdate generation', () => {
    it('should generate a valid birthdate in YYYY-MM-DD format', () => {
      const birthDate = fakeInfo.getBirthDate();
      expect(birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should generate a birthdate with a year greater than or equal to 1900', () => {
      const birthDate = fakeInfo.getBirthDate();
      const year = parseInt(birthDate.slice(0, 4), 10);
      expect(year).toBeGreaterThanOrEqual(1900);
    });

    it('should generate a birthdate with a year less than or equal to the current year', () => {
      const birthDate = fakeInfo.getBirthDate();
      const year = parseInt(birthDate.slice(0, 4), 10);
      const currentYear = new Date().getFullYear();
      expect(year).toBeLessThanOrEqual(currentYear);
    });
  });


// Name generation tests
  describe('FakeInfo full name and gender generation', () => {
    it('should generate a non-empty first name', () => {
      const { firstName } = fakeInfo.getFullNameAndGender();
      expect(firstName).not.toBe('');
    });
    
    it('should generate a non-empty last name', () => {
      const { lastName } = fakeInfo.getFullNameAndGender();
      expect(lastName).not.toBe('');
    });
    
    it('should generate a valid gender (male or female)', () => {
      const { gender } = fakeInfo.getFullNameAndGender();
      expect([FakeInfo.GENDER_FEMININE, FakeInfo.GENDER_MASCULINE]).toContain(gender);
    });
  });


// Phone generation tests
  describe('FakeInfo phone number generation', () => {
    it('should generate a phone number of length 8', () => {
      const phoneNumber = fakeInfo['phone'];
      expect(phoneNumber).toHaveLength(8);
    });

    it('should generate a phone number starting with a valid prefix', () => {
      fakeInfo.setPhone();
      const phoneNumber = fakeInfo['phone'];
    
      const validPrefix = FakeInfo['PHONE_PREFIXES'].find(prefix =>
        phoneNumber.startsWith(prefix)
      );
    
      expect(validPrefix).toBeDefined();  // Tjek, at der findes et gyldigt præfiks
    });
  })  


// Address generation tests
  describe('FakeInfo address generation', () => {
    it('should generate an address with a street', () => {
      const address = fakeInfo['address'];
      expect(address).toHaveProperty('street');
    });

    it('should generate an address with a number', () => {
      const address = fakeInfo['address'];
      expect(address).toHaveProperty('number');
    });

    it('should generate an address with a postal code', () => {
      const address = fakeInfo['address'];
      expect(address).toHaveProperty('postal_code');
    });

    it('should generate an address with a town name', () => {
      const address = fakeInfo['address'];
      expect(address).toHaveProperty('town_name');
    });
  });

});
