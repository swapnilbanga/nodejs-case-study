const supertest = require("supertest");
require("dotenv").config();
const app = require("../src/app");
const mongoose = require("mongoose");

const request = supertest(app);
const endpoint = "/v1/records";

describe("Fetch records valid requests", () => {
  it("Should filter records by startdate, enddate, mincount and maxcount", async () => {
    const filterPayload = {
      startDate: "2016-01-26",
      endDate: "2016-05-26",
      minCount: 2700,
      maxCount: 3000,
    };
    const response = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(filterPayload);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("records");
    expect(response.body.msg).toEqual("Success");
    expect(Array.isArray(response.body.records)).toEqual(true);
    expect(response.body.records.length).toBeGreaterThan(0);
  });

  it("Should return Empty records if no results", async () => {
    const filterPayload = {
      startDate: "2016-01-26",
      endDate: "2016-05-26",
      minCount: 2000,
      maxCount: 2000,
    };
    const response = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(filterPayload);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("records");
    expect(response.body.msg).toEqual("Success");
    expect(Array.isArray(response.body.records)).toEqual(true);
    expect(response.body.records).toHaveLength(0);
  });
});

describe("Fetch records invalid requests", () => {
  it("Should throw an error if a field is not sent", async () => {
    const filterPayload = {
      startDate: "2016-01-26",
      endDate: "2017-01-26",
      minCount: 2700,
      // no max count
    };
    const response = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(filterPayload);

    expect(response.status).toEqual(422);
    expect(response.body.code).toEqual("1");
  });

  it("Should throw an error if a field is not valid", async () => {
    const filterPayload = {
      startDate: "2016-04-26",
      endDate: "2024-01-26", // future date
      minCount: 2700,
      maxCount: 3000,
    };
    const response = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(filterPayload);

    expect(response.status).toEqual(422);
    expect(response.body.code).toEqual("1");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
