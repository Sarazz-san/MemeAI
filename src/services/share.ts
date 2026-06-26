import {Share} from 'react-native';

export async function shareMemeText(caption: string, tone?: string) {
  const suffix = tone ? `\nTon: ${tone}` : '';

  await Share.share({
    title: 'MemeAI',
    message: `${caption}${suffix}\n\nCréé avec MemeAI`,
  });
}

export async function shareAppIntro() {
  await Share.share({
    title: 'MemeAI',
    message:
      'MemeAI permet de créer des mèmes à partir de texte, audio, images et d’un atelier manuel.',
  });
}
