"use server";

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: "Invalid credentials. Please try again." };
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();

    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw new Error("Sign-up failed. Please try again later.");
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    await account.deleteSession("current");

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: "Unable to sign out. Please try again." };
  }
};
