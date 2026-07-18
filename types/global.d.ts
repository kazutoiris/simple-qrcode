export interface ContentScriptResponse {
  success: boolean;
  result?: string;
  error?: string;
}

export interface ContentScriptRequest {
  imageUrl: string;
}
