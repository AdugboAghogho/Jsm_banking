"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67532921002245b820c4');

  const session = cookies().get("appwrite-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const NEXT_APPWRITE_KEY = 'standard_08c82e324c1700ac6cd9eb1602c2cc981452369021f280dcbe6d19b859618eba81eba33636178ac631ba421b6c1d7995d1ccea313b2a0a8996eb78fa257883f275333ef05720567aca2c89cddce62b47186cd1a6942d360485139e1c3286201060dfcdcb31659a36aa8753ddd098ce055d294cc25fd291ccd5ecb2dee25b6c64'
 
  console.log(process.env.NEXT_APPWRITE_KEY);

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67532921002245b820c4');

  if (!NEXT_APPWRITE_KEY) {
    throw new Error('Appwrite API key is not configured');
  }

  client.setKey(NEXT_APPWRITE_KEY);
  
  return {
    get account() {
      return new Account(client);
    },
  };
  
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}