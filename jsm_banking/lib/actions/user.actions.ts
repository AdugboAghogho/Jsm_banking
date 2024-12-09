'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
// import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";

// import { plaidClient } from '@/lib/plaid';
import { revalidatePath } from "next/cache";
// import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

// Environment Variables (Hardcoded for now)
const DATABASE_ID = "67532b2000245f2349fc";
const USER_COLLECTION_ID = "67532b450032464be297";
const BANK_COLLECTION_ID = "67532ba5000f8565c44a";

// Define Interfaces (Ensure these are defined appropriately)
interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // Add other fields as necessary
}

interface SignInProps {
  email: string;
  password: string;
}

interface getUserInfoProps {
  userId: string;
}

interface getBanksProps {
  userId: string;
}

interface getBankProps {
  documentId: string;
}

interface getBankByAccountIdProps {
  accountId: string;
}

// Function to get user info
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal('userId', [userId])]
    );

    if (user.total === 0) {
      throw new Error("User not found");
    }

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user information.");
  }
};

// Function to sign in
export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Error during sign-in process:", error);
    throw new Error("Sign-in process failed. Please check your credentials.");
  }
};

// Function to sign up
export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  try {
    const { account, database } = await createAdminClient();

    // Create a new user account
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) {
      throw new Error("Error creating user account");
    }

    // Create a document in the user collection
    const newUser = await database.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        // Add other fields as necessary
      }
    );

    if (!newUser) {
      throw new Error("Error creating user document");
    }

    // Create an email-password session for the new user
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error during sign-up process:", error);
    throw new Error("Sign-up process failed. Please try again later.");
  }
};

// Function to get the logged-in user
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}

// Function to logout (uncomment if needed)
export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

// Function to get banks for a user
export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      [Query.equal('userId', [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw new Error("Failed to fetch banks.");
  }
};

// Function to get a bank by document ID
export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    // Use getDocument for efficiency since $id is unique
    const bank = await database.getDocument(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      documentId
    );

    return parseStringify(bank);
  } catch (error) {
    console.error("Error fetching bank:", error);
    throw new Error("Failed to fetch bank information.");
  }
};

// Function to get a bank by account ID
export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      [Query.equal('accountId', [accountId])]
    );

    if (banks.total !== 1) return null;

    return parseStringify(banks.documents[0]);
  } catch (error) {
    console.error("Error fetching bank by account ID:", error);
    throw new Error("Failed to fetch bank information.");
  }
};
