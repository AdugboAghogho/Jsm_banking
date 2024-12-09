import { Client, Account, Databases } from "node-appwrite";

// Use hardcoded fallback values for development or testing (remove in production)
const DEFAULT_APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const DEFAULT_APPWRITE_PROJECT_ID = "67532921002245b820c4";
const DEFAULT_APPWRITE_API_KEY = "standard_08c82e324c1700ac6cd9eb1602c2cc981452369021f280dcbe6d19b859618eba81eba33636178ac631ba421b6c1d7995d1ccea313b2a0a8996eb78fa257883f275333ef05720567aca2c89cddce62b47186cd1a6942d360485139e1c3286201060dfcdcb31659a36aa8753ddd098ce055d294cc25fd291ccd5ecb2dee25b6c64";

/**
 * Creates an admin client for Appwrite operations.
 */
export const createAdminClient = () => {
  const client = new Client();

  const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || DEFAULT_APPWRITE_ENDPOINT;
  const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || DEFAULT_APPWRITE_PROJECT_ID;
  const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || DEFAULT_APPWRITE_API_KEY;

  // Ensure required environment variables are set
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
    throw new Error(
      "Missing required environment variables: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, or APPWRITE_API_KEY."
    );
  }

  client
    .setEndpoint(APPWRITE_ENDPOINT) // Appwrite server endpoint
    .setProject(APPWRITE_PROJECT_ID) // Appwrite project ID
    .setKey(APPWRITE_API_KEY); // Admin API key

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
};

/**
 * Creates a session-based client for Appwrite operations.
 */
export const createSessionClient = () => {
  const client = new Client();

  const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || DEFAULT_APPWRITE_ENDPOINT;
  const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || DEFAULT_APPWRITE_PROJECT_ID;

  // Ensure required environment variables are set
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
    throw new Error(
      "Missing required environment variables: APPWRITE_ENDPOINT or APPWRITE_PROJECT_ID."
    );
  }

  client
    .setEndpoint(APPWRITE_ENDPOINT) // Appwrite server endpoint
    .setProject(APPWRITE_PROJECT_ID); // Appwrite project ID

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
};
