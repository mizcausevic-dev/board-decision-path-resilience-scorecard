import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-path-resilience-scorecard app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Path Resilience Scorecard");
    expect(response.text).toContain("Product depth");
    expect(response.text).toContain("What these repos have in common");
  });

  it("serves the resilience lanes route", async () => {
    const response = await request(app).get("/resilience-lanes");
    expect(response.status).toBe(200);
  });

  it("serves the failure thresholds route", async () => {
    const response = await request(app).get("/failure-thresholds");
    expect(response.status).toBe(200);
  });

  it("serves the reinforcement posture route", async () => {
    const response = await request(app).get("/reinforcement-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves all public JSON APIs", async () => {
    const routes = [
      "/api/dashboard/summary",
      "/api/resilience-lanes",
      "/api/failure-thresholds",
      "/api/reinforcement-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of routes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
    }
  });

  it("serves the resilience lanes API", async () => {
    const response = await request(app).get("/api/resilience-lanes");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the failure thresholds API", async () => {
    const response = await request(app).get("/api/failure-thresholds");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
