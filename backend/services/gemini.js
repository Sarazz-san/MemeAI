const fs = require('fs');
const endpointBase =
  'https://generativelanguage.googleapis.com/v1beta/models';

async function generateCaptionFromText(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  const allowMock = process.env.ALLOW_MOCK_AI !== 'false';

  if (!apiKey) {
    if (allowMock) {
      return mockCaption(text);
    }

    const error = new Error('GEMINI_API_KEY manquante');
    error.status = 500;
    error.publicMessage = 'Service IA non configure.';
    throw error;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const prompt = [
    'Tu es MemeAI, un generateur de captions de memes en francais.',
    'Reponds uniquement en JSON valide avec les champs caption et tone.',
    'La caption doit etre courte, drole, partageable, sans contenu haineux.',
    `Contexte utilisateur: ${text}`,
  ].join('\n');

  const response = await fetch(
    `${endpointBase}/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{text: prompt}],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 180,
        },
      }),
    },
  );

  if (!response.ok) {
    if (allowMock) {
      return mockCaption(text);
    }

    const error = new Error(`Gemini error ${response.status}`);
    error.status = 502;
    error.publicMessage = 'Generation IA indisponible.';
    throw error;
  }

  const payload = await response.json();
  const rawText =
    payload.candidates?.[0]?.content?.parts
      ?.map(part => part.text)
      .filter(Boolean)
      .join('\n') || '';

  const parsed = parseJsonResponse(rawText);
  return {
    caption: parsed.caption || mockCaption(text).caption,
    tone: parsed.tone || 'Humour',
  };
}

async function generateCaptionFromVoice(audioFilePath, mimeType) {
  const apiKey = process.env.GEMINI_API_KEY;
  const allowMock = process.env.ALLOW_MOCK_AI !== 'false';

  if (!apiKey) {
    if (allowMock) {
      return mockVoice();
    }
    const error = new Error('GEMINI_API_KEY manquante');
    error.status = 500;
    error.publicMessage = 'Service IA non configure.';
    throw error;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const audioBase64 = fs.readFileSync(audioFilePath).toString('base64');
  const prompt = [
    'Tu es MemeAI, un transcripteur et generateur de captions de memes en francais.',
    'Analyse le fichier audio fourni.',
    'Reponds uniquement en JSON valide avec les champs: transcription (la transcription fidele et concise de l\'audio), caption (une legende de meme drole basee sur l\'audio), et tone.',
    'La caption doit etre courte, drole, partageable, sans contenu haineux.',
  ].join('\n');

  const response = await fetch(
    `${endpointBase}/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'audio/mp3',
                  data: audioBase64,
                },
              },
              {text: prompt},
            ],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 250,
        },
      }),
    },
  );

  if (!response.ok) {
    if (allowMock) {
      return mockVoice();
    }
    const error = new Error(`Gemini error ${response.status}`);
    error.status = 502;
    error.publicMessage = 'Generation IA audio indisponible.';
    throw error;
  }

  const payload = await response.json();
  const rawText =
    payload.candidates?.[0]?.content?.parts
      ?.map(part => part.text)
      .filter(Boolean)
      .join('\n') || '';

  const parsed = parseJsonResponse(rawText);
  return {
    transcription: parsed.transcription || 'Transcription indisponible.',
    caption: parsed.caption || 'Quand ton message vocal dit tout sans filtre.',
    tone: parsed.tone || 'Humour',
  };
}

async function generateCaptionFromImage(imageFilePath, mimeType) {
  const apiKey = process.env.GEMINI_API_KEY;
  const allowMock = process.env.ALLOW_MOCK_AI !== 'false';

  if (!apiKey) {
    if (allowMock) {
      return mockImage();
    }
    const error = new Error('GEMINI_API_KEY manquante');
    error.status = 500;
    error.publicMessage = 'Service IA non configure.';
    throw error;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const imageBase64 = fs.readFileSync(imageFilePath).toString('base64');
  const prompt = [
    'Tu es MemeAI, un generateur de captions de memes visuels en francais.',
    'Analyse l\'image fournie.',
    'Reponds uniquement en JSON valide avec les champs: caption (une legende de meme drole et pertinente pour l\'image), suggestion (des conseils de mise en page dans l\'atelier), et tone.',
    'La caption doit etre courte, drole, partageable, sans contenu haineux.',
  ].join('\n');

  const response = await fetch(
    `${endpointBase}/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: mimeType || 'image/jpeg',
                  data: imageBase64,
                },
              },
              {text: prompt},
            ],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 250,
        },
      }),
    },
  );

  if (!response.ok) {
    if (allowMock) {
      return mockImage();
    }
    const error = new Error(`Gemini error ${response.status}`);
    error.status = 502;
    error.publicMessage = 'Generation IA image indisponible.';
    throw error;
  }

  const payload = await response.json();
  const rawText =
    payload.candidates?.[0]?.content?.parts
      ?.map(part => part.text)
      .filter(Boolean)
      .join('\n') || '';

  const parsed = parseJsonResponse(rawText);
  return {
    caption: parsed.caption || 'Ce statut avait deja choisi son camp.',
    suggestion: parsed.suggestion || 'Ajoute un texte blanc avec contour noir en bas de l’image.',
    tone: parsed.tone || 'Humour',
  };
}

function parseJsonResponse(rawText) {
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {caption: cleaned.slice(0, 160), tone: 'Humour'};
  }
}

function mockCaption(text) {
  const shortText = text.length > 60 ? `${text.slice(0, 57)}...` : text;
  return {
    caption: `Quand "${shortText}" devient beaucoup trop reel.`,
    tone: 'Mock gratuit',
  };
}

function mockVoice() {
  return {
    transcription: 'Transcription audio mockee pour le TP.',
    caption: 'Quand ton vocal devient officiellement une preuve.',
    tone: 'Humour',
  };
}

function mockImage() {
  return {
    caption: 'Ce statut avait deja choisi son camp.',
    suggestion: 'Ajoute un texte blanc avec contour noir en bas de l’image.',
    tone: 'Ironique',
  };
}

module.exports = {
  generateCaptionFromText,
  generateCaptionFromVoice,
  generateCaptionFromImage,
};
