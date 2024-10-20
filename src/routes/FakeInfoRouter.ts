import personNames from "../data/person-names.json" assert { type: "json" };
/**
 * Class FakeInfo.
 * It generates information about fake persons.
 *
 * @version 1.0.0 March 2023
 */
class FakeInfo {
  public static readonly GENDER_FEMININE = "female";
  public static readonly GENDER_MASCULINE = "male";
  // private static readonly FILE_PERSON_NAMES = path.resolve(
  //  path.dirname(fileURLToPath(import.meta.url)),
  //    "data/person-names.json"
  // );

  private static readonly PHONE_PREFIXES = [
    "2",
    "30",
    "31",
    "40",
    "41",
    "42",
    "50",
    "51",
    "52",
    "53",
    "60",
    "61",
    "71",
    "81",
    "91",
    "92",
    "93",
    "342",
    "344",
    "345",
    "346",
    "347",
    "348",
    "349",
    "356",
    "357",
    "359",
    "362",
    "365",
    "366",
    "389",
    "398",
    "431",
    "441",
    "462",
    "466",
    "468",
    "472",
    "474",
    "476",
    "478",
    "485",
    "486",
    "488",
    "489",
    "493",
    "494",
    "495",
    "496",
    "498",
    "499",
  ];

  private static readonly MIN_BULK_PERSONS = 2;
  private static readonly MAX_BULK_PERSONS = 100;

  private cpr: string;
  private firstName: string;
  private lastName: string;
  private gender: string;
  public birthDate: string;
  private address: { [key: string]: string | number } = {};
  private phone!: string;

  constructor() {
    this.setFullNameAndGender();
    this.setBirthDate();
    this.setCpr();
    this.setAddress();
    this.setPhone();
  }

  public setCpr(cpr?: string): void {
    if (!this.birthDate) {
      this.setBirthDate();
    }
    if (!this.firstName || !this.lastName || !this.gender) {
      this.setFullNameAndGender();
    }
    const finalDigit = Math.floor(Math.random() * 10);
    const genderBasedFinalDigit =
      this.gender === FakeInfo.GENDER_FEMININE && finalDigit % 2 !== 0
        ? finalDigit + 1
        : finalDigit;

    this.cpr =
      this.birthDate.slice(8, 10) +
      this.birthDate.slice(5, 7) +
      this.birthDate.slice(2, 4) +
      FakeInfo.getRandomDigit() +
      FakeInfo.getRandomDigit() +
      FakeInfo.getRandomDigit() +
      genderBasedFinalDigit.toString();
  }

  public getCpr(): string {
    return this.cpr;
  }

  public getBirthDate(): string {
    return this.birthDate;
  }
  public setBirthDate(date?: string): string {
    const year =
      Math.floor(Math.random() * (new Date().getFullYear() - 1900 + 1)) + 1900;
    const month = Math.floor(Math.random() * 12) + 1;
    const day =
      month === 2
        ? Math.floor(Math.random() * 28) + 1
        : [4, 6, 9, 11].includes(month)
        ? Math.floor(Math.random() * 30) + 1
        : Math.floor(Math.random() * 31) + 1;

    this.birthDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return this.birthDate;
  }

  public setFullNameAndGender(): void {
    const person =
      personNames.persons[
        Math.floor(Math.random() * personNames.persons.length)
      ];

    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.gender = person.gender;
  }

  private setAddress(): void {
    this.address["street"] = FakeInfo.getRandomText(40);
    this.address["number"] = Math.floor(Math.random() * 999) + 1;

    if (Math.random() < 0.3) {
      this.address["number"] =
        String(this.address["number"]) + FakeInfo.getRandomText(1, false);
    }

    this.address["floor"] =
      Math.random() < 0.4 ? "st" : Math.floor(Math.random() * 99) + 1;

    const doorType = Math.floor(Math.random() * 20) + 1;
    this.address["door"] = this.generateDoorType(doorType);

    // TODO: Add logic for getting postal codes from a database or predefined list
    this.address["postal_code"] = "1234";
    this.address["town_name"] = "SomeTown";
  }

  public generateDoorType(doorType: number): string {
    if (doorType < 8) return "th";
    if (doorType < 15) return "tv";
    if (doorType < 17) return "mf";
    if (doorType < 19) return Math.floor(Math.random() * 50 + 1).toString();

    const letters = "abcdefghijklmnopqrstuvwxyzøæå";
    let door = letters[Math.floor(Math.random() * letters.length)];
    if (doorType === 20) door += "-";
    return door + Math.floor(Math.random() * 999).toString();
  }

  public setPhone(): void {
    const phonePrefix =
      FakeInfo.PHONE_PREFIXES[
        Math.floor(Math.random() * FakeInfo.PHONE_PREFIXES.length)
      ];
    this.phone =
      phonePrefix +
      Array.from({ length: 8 - phonePrefix.length }, () =>
        FakeInfo.getRandomDigit()
      ).join("");
  }

  public getFullNameAndGender(): {
    firstName: string;
    lastName: string;
    gender: string;
  } {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
    };
  }

  public getFakePerson(): {
    [key: string]: string | { [key: string]: string | number };
  } {
    return {
      CPR: this.cpr,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      birthDate: this.birthDate,
      address: this.address,
      phoneNumber: this.phone,
    };
  }

  public getFakePersons(
    amount = FakeInfo.MIN_BULK_PERSONS
  ): Array<{ [key: string]: string | { [key: string]: string | number } }> {
    const bulkInfo: Array<{
      [key: string]: string | { [key: string]: string | number };
    }> = [];
    for (
      let i = 0;
      i <
      Math.max(
        FakeInfo.MIN_BULK_PERSONS,
        Math.min(FakeInfo.MAX_BULK_PERSONS, amount)
      );
      i++
    ) {
      bulkInfo.push(new FakeInfo().getFakePerson());
    }
    return bulkInfo;
  }

  private static getRandomDigit(): string {
    return Math.floor(Math.random() * 10).toString();
  }

  private static getRandomText(
    length = 1,
    includeDanishCharacters = true
  ): string {
    const validCharacters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
    const danishCharacters = "æøåÆØÅ".split("");
    if (includeDanishCharacters) {
      validCharacters.push(...danishCharacters);
    }

    return Array.from(
      { length },
      () => validCharacters[Math.floor(Math.random() * validCharacters.length)]
    ).join("");
  }
}

export default FakeInfo;
