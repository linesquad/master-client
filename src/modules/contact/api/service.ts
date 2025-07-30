import instance from "@/lib/axios";
import type { ContactSchemaInput } from "../schemas";

export const createContact = async (data: ContactSchemaInput) => {
  const response = await instance.post("/api/home/contact-messages", data);
  return response.data;
};
