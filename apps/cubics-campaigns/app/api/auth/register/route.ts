import prisma from "@/prisma/client";
import {
  apiErrorResponse,
  itemExistsResponse,
  successResponse,
} from "@/shared/functions/apiResponses";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    // validate email and password on server
    const userExists = await prisma.next_auth_users.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return itemExistsResponse("User");
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.next_auth_users.create({
      data: {
        email,
        name,
      },
    });
    if (!user) throw new Error("User could not be created");
    const account = await prisma.accounts.create({
      data: {
        type: "local",
        provider: "credentials",
        providerAccountId: process.env.LOCAL_PROVIDER_ID!,
        credential_keys: [hashedPassword],
        // users: user,
      },
    });
    if (!account) throw new Error("Account could not be created");

    return successResponse({
      message: "Successfully created user.",
      data: {
        id: user.id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
