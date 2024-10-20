import { describe, it, expect } from "vitest";
import FakeInfo from "../../src/routes/FakeInfoRouter";


// CPR generation tests
describe('FakeInfo CPR generation', () => {
  it('should generate a CPR of length 10', () => {
    const fakePerson = new FakeInfo();
    const cpr = fakePerson.getCpr();
    expect(cpr).toHaveLength(10);
  });

  it('should have a gender-based final digit for female', () => {
    const fakePerson = new FakeInfo();
    fakePerson['gender'] = FakeInfo.GENDER_FEMININE;
    fakePerson.setCpr();
    const cpr = fakePerson.getCpr();
    const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
    expect(finalDigit % 2).toBe(0); // Females should have even final digits
  });

  it('should have a gender-based final digit for male', () => {
    const fakePerson = new FakeInfo();
    fakePerson['gender'] = FakeInfo.GENDER_MASCULINE;
    fakePerson.setCpr();
    const cpr = fakePerson.getCpr();
    const finalDigit = parseInt(cpr.charAt(cpr.length - 1), 10);
    expect(finalDigit % 2).toBe(1); // Males should have odd final digits
  });
});


// Birthdate generation tests
describe('FakeInfo birthdate generation', () => {
  it('should generate a valid birthdate in YYYY-MM-DD format', () => {
    const fakePerson = new FakeInfo();
    const birthDate = fakePerson.getBirthDate();
    expect(birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should generate a birthdate with a year greater than or equal to 1900', () => {
    const fakePerson = new FakeInfo();
    const birthDate = fakePerson.getBirthDate();
    const year = parseInt(birthDate.slice(0, 4), 10);
    expect(year).toBeGreaterThanOrEqual(1900);
  });

  it('should generate a birthdate with a year less than or equal to the current year', () => {
    const fakePerson = new FakeInfo();
    const birthDate = fakePerson.getBirthDate();
    const year = parseInt(birthDate.slice(0, 4), 10);
    const currentYear = new Date().getFullYear();
    expect(year).toBeLessThanOrEqual(currentYear);
  });
});


// Full name
describe('FakeInfo full name and gender generation', () => {
  it('should generate a non-empty first name', () => {
    const fakePerson = new FakeInfo();
    const { firstName } = fakePerson.getFullNameAndGender();
    expect(firstName).not.toBe('');
  });
  
  it('should generate a non-empty last name', () => {
    const fakePerson = new FakeInfo();
    const { lastName } = fakePerson.getFullNameAndGender();
    expect(lastName).not.toBe('');
  });
  
  it('should generate a valid gender (male or female)', () => {
    const fakePerson = new FakeInfo();
    const { gender } = fakePerson.getFullNameAndGender();
    expect([FakeInfo.GENDER_FEMININE, FakeInfo.GENDER_MASCULINE]).toContain(gender);
  });
});


// Phone generation tests
describe('FakeInfo phone number generation', () => {
  it('should generate a phone number of length 8', () => {
    const fakePerson = new FakeInfo();
    const phoneNumber = fakePerson['phone'];
    expect(phoneNumber).toHaveLength(8);
  });

  it('should generate a phone number starting with a valid prefix', () => {
    const fakePerson = new FakeInfo();
    fakePerson.setPhone();
    const phoneNumber = fakePerson['phone'];
  
    // Find det længste præfiks, telefonnummeret starter med
    const validPrefix = FakeInfo['PHONE_PREFIXES'].find(prefix =>
      phoneNumber.startsWith(prefix)
    );
  
    expect(validPrefix).toBeDefined();  // Tjek, at der findes et gyldigt præfiks
  });
})  


// Address generation tests
describe('FakeInfo address generation', () => {
  it('should generate an address with a street', () => {
    const fakePerson = new FakeInfo();
    const address = fakePerson['address'];
    expect(address).toHaveProperty('street');
  });

  it('should generate an address with a number', () => {
    const fakePerson = new FakeInfo();
    const address = fakePerson['address'];
    expect(address).toHaveProperty('number');
  });

  it('should generate an address with a postal code', () => {
    const fakePerson = new FakeInfo();
    const address = fakePerson['address'];
    expect(address).toHaveProperty('postal_code');
  });

  it('should generate an address with a town name', () => {
    const fakePerson = new FakeInfo();
    const address = fakePerson['address'];
    expect(address).toHaveProperty('town_name');
  });
});
