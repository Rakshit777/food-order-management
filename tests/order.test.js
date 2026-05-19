import request from "supertest";
import app from "../app.js";
describe("GET /", () => {
    test("Should return API running message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});