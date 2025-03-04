import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONFIG } from "../config";

export class AIService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI(CONFIG.API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: CONFIG.GEMINI_MODEL });
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            const result = await this.model.generateContent([prompt]);
            return result.response.text();
        } catch (error) {
            console.error("Error generating AI response:", error);
            throw new Error("Failed to generate AI response");
        }
    }

    async summarizeTranscript(transcript: string): Promise<string> {
        const prompt = `Summarize the following transcript: ${transcript}`;
        return this.generateResponse(prompt);
    }
}
