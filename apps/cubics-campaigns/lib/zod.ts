import type { ZodError } from "zod";
import { object, string } from "zod";

export function actionError(msg: string) {
  return {
    errors: [{ message: msg }],
  } as unknown as ZodError;
}

export const registerSchema = object({
  name: string({ required_error: "Full Name is required" })
    .min(1, "Full Name is required")
    .max(10, "Please enter a shorter name"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
