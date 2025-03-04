import { YtTranscript } from "yt-transcript";
import { getYoutubeId } from "../utils/getYoutubeId";

export class YoutubeService {
    async getTranscript(url: string): Promise<string> {
        const videoId = getYoutubeId(url);
        if (!videoId) {
            throw new Error("Invalid Youtube URL");
        }

        try {
            const ytTranscript = new YtTranscript({ videoId });
            const transcripts = await ytTranscript.getTranscript("en");
            return transcripts?.map((t) => t.text).join("") as string;
        } catch (error) {
            console.error("Error fetching transcript:", error);
            throw new Error("Failed to fetch video transcript");
        }
    }
}
