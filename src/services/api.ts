import type {GeneratedMeme} from '../types/meme';

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export async function generateMemeFromText(
  backendUrl: string,
  text: string,
): Promise<GeneratedMeme> {
  const response = await fetch(`${normalizeBaseUrl(backendUrl)}/api/context`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text}),
  });

  if (!response.ok) {
    let payload: ApiErrorPayload = {};

    try {
      payload = await response.json();
    } catch {
      payload = {};
    }

    throw new Error(
      payload.error ??
        payload.message ??
        `Backend indisponible (${response.status})`,
    );
  }

  return response.json();
}

export async function checkBackendHealth(backendUrl: string) {
  const response = await fetch(`${normalizeBaseUrl(backendUrl)}/health`);

  if (!response.ok) {
    throw new Error(`Backend indisponible (${response.status})`);
  }

  return response.json();
}

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, '');
}
