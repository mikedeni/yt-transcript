import { Elysia, t } from "elysia";
import { CONFIG } from "./config";
import { YoutubeService } from "./services/youtube.service";
import { AIService } from "./services/ai.service";
import { APIResponse, ChatResponse, TranscriptResponse } from "./types";

const app = new Elysia();
const youtubeService = new YoutubeService();
const aiService = new AIService();

app
  .get("/", () => "Welcome to YouTube Transcript API")
  .post(
    "/transcript",
    async ({
      body: { url },
    }: {
      body: { url: string };
    }): Promise<APIResponse<TranscriptResponse>> => {
      try {
        const transcript = await youtubeService.getTranscript(url);
        return { data: { transcript } };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    }
  )
  .post(
    "/chat",
    async ({
      body: { prompt },
    }: {
      body: { prompt: string };
    }): Promise<APIResponse<ChatResponse>> => {
      try {
        const result = await aiService.generateResponse(prompt);
        return { data: { result } };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
    {
      body: t.Object({
        prompt: t.String(),
      }),
    }
  )
  .post(
    "/summarize",
    async ({
      body: { url },
    }: {
      body: { url: string };
    }): Promise<APIResponse<ChatResponse>> => {
      try {
        const transcript = await youtubeService.getTranscript(url);
        const result = await aiService.summarizeTranscript(transcript);
        return { data: { result } };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    }
  )
  .listen(CONFIG.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
