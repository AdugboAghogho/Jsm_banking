"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

/**
 * Creates a session client for user session-based operations.
 */
export async function createSessionClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "67532921002245b820c4";
  const session = cookies().get("appwrite-session");

  if (!endpoint || !projectId) {
    throw new Error("Appwrite configuration is missing required public environment variables.");
  }

  if (!session || !session.value) {
    throw new Error("No session found. Please log in.");
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

/**
 * Creates an admin client with elevated permissions.
 */
export async function createAdminClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT  || "https://cloud.appwrite.io/v1";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "67532921002245b820c4";
  const apiKey = process.env.NEXT_APPWRITE_API_KEY || "standard_08c82e324c1700ac6cd9eb1602c2cc981452369021f280dcbe6d19b859618eba81eba33636178ac631ba421b6c1d7995d1ccea313b2a0a8996eb78fa257883f275333ef05720567aca2c89cddce62b47186cd1a6942d360485139e1c3286201060dfcdcb31659a36aa8753ddd098ce055d294cc25fd291ccd5ecb2dee25b6c64";

  if (!endpoint || !projectId || !apiKey) {
    throw new Error("Appwrite configuration is missing required environment variables.");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    }
  };
}

/**
 * Fetches the currently logged-in user.
 */
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}
