export const CONFIG = {
    PORT: 3000,
    GEMINI_MODEL: "gemini-1.5-flash",
    API_KEY: process.env.API_KEY as string,
};

// Validate required environment variables
if (!CONFIG.API_KEY) {
    throw new Error("API_KEY environment variable is required");
}
