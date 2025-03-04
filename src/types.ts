export interface TranscriptRequest {
    url: string;
}

export interface ChatRequest {
    prompt: string;
}

export interface APIResponse<T> {
    data?: T;
    error?: string;
}

export interface TranscriptResponse {
    transcript: string;
}

export interface ChatResponse {
    result: string;
}
