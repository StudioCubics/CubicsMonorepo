import prisma from "@/prisma/client";
import { hash } from "bcryptjs";
import { actionError, registerSchema } from "../zod";
import { v5 } from "uuid";

export async function register(formData: FormData) {
  const { success, data, error } = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (error)
    throw new Error(JSON.stringify(error.errors.map((e) => e.message)));
  console.log("success", success);
  console.log("data", data);

  const userExists = await prisma.next_auth_users.findUnique({
    where: {
      email: data.email,
    },
  });
  if (userExists) {
    return actionError("Operation not allowed are you trying to log in?");
  }
  const hashedPassword = await hash(data.password, 10);
  const user = await prisma.next_auth_users.create({
    data: {
      email: data.email,
      name: data.name,
    },
  });
  if (!user) throw new Error("User could not be created");
  const providerAccountId = v5(data.email, process.env.LOCAL_PROVIDER_NAMESPACE!);
  const account = await prisma.accounts.create({
    data: {
      type: "local",
      provider: "credentials",
      providerAccountId,
      credential_keys: [hashedPassword],
      userId: user.id,
    },
  });
  if (!account) throw new Error("Account could not be created");
}
