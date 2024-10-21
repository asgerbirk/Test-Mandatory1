import express, { Request, Response } from "express";
import FakeInfo from "./routes/FakeInfoRouter.js";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get("/cpr", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json({ CPR: fakePerson.getCpr() });
});

app.get("/name-gender", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json(fakePerson.getFullNameAndGender());
});

app.get("/name-gender-dob", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json({
    ...fakePerson.getFullNameAndGender(),
    birthDate: fakePerson["birthDate"],
  });
});

app.get("/cpr-name-gender", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json({
    CPR: fakePerson.getCpr(),
    ...fakePerson.getFullNameAndGender(),
  });
});

app.get("/cpr-name-gender-dob", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json({
    CPR: fakePerson.getCpr(),
    ...fakePerson.getFullNameAndGender(),
    birthDate: fakePerson["birthDate"],
  });
});

app.get("/address", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json(fakePerson["address"]);
});

app.get("/phone", (req: Request, res: Response) => {
  const fakePerson = new FakeInfo();
  res.json({ phoneNumber: fakePerson["phone"] });
});

app.get("/person", (req: Request, res: Response) => {
  const numPersons = Math.abs(parseInt(req.query.n as string) || 1);
  const fakePerson = new FakeInfo();
  if (numPersons === 1) {
    res.json(fakePerson.getFakePerson());
  } else if (numPersons > 1 && numPersons <= 100) {
    res.json(fakePerson.getFakePersons(numPersons));
  } else {
    res.status(400).json({ error: "Invalid number of persons" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
