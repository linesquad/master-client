import instance from "@/lib/axios";
import type { GmailSubscribeSchemaInput } from "../schemas";

export const gmailSubscribe = async (data: GmailSubscribeSchemaInput) => {
  const response = await instance.post("/api/home/gmail-users", data);
  return response.data;
};

export const getRandomMasters = async () => {
  const response = await instance.get("/api/home/random-masters");
  if (response.status !== 200) {
    throw new Error("Failed to fetch random masters");
  }
  return response.data;
};

export const getUserCount = async () => {
  const response = await instance.get("/api/home/user-count");
  if (response.status !== 200) {
    throw new Error("Failed to fetch user count");
  }
  return response.data;
};

export const getRandomCities = async () => {
  const response = await instance.get("/api/home/random-cities");
  if (response.status !== 200) {
    throw new Error("Failed to fetch random cities");
  }
  return response.data;
};

export const getRandomCategories = async () => {
  const response = await instance.get("/api/home/random-categories");
  if (response.status !== 200) {
    throw new Error("Failed to fetch random categories");
  }
  return response.data;
};
