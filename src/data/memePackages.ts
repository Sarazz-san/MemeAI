import {colors as baseColors, rainbow} from '../theme/theme';
import type {MemePackage} from '../types/meme';

export const memePackages: MemePackage[] = [
  {
    id: 'reaction',
    title: 'Réactions rapides',
    subtitle: 'Réponses prêtes pour discussions et statuts',
    memes: [
      {
        id: 'reaction-1',
        title: 'No way',
        caption: 'Quand le groupe découvre enfin la vérité',
        palette: [baseColors.danger, baseColors.orange],
      },
      {
        id: 'reaction-2',
        title: 'Silence',
        caption: 'Moi après avoir envoyé le mauvais vocal',
        palette: [baseColors.blue, baseColors.violet],
      },
      {
        id: 'reaction-3',
        title: 'Regard',
        caption: 'La preuve était dans le screenshot',
        palette: [baseColors.success, baseColors.info],
      },
      {
        id: 'reaction-4',
        title: 'Drama',
        caption: 'Personne n’a demandé mais tout le monde suit',
        palette: [baseColors.pink, baseColors.warning],
      },
    ],
  },
  {
    id: 'school',
    title: 'Campus',
    subtitle: 'Cours, deadlines, exposés et travaux de groupe',
    memes: [
      {
        id: 'school-1',
        title: 'Deadline',
        caption: 'Quand le devoir sort la veille',
        palette: [baseColors.warning, baseColors.danger],
      },
      {
        id: 'school-2',
        title: 'Exposé',
        caption: 'Le membre absent devient expert le jour J',
        palette: [baseColors.info, baseColors.blue],
      },
      {
        id: 'school-3',
        title: 'Notes',
        caption: 'Le barème avait ses propres projets',
        palette: [baseColors.violet, baseColors.pink],
      },
      {
        id: 'school-4',
        title: 'Groupe',
        caption: 'Travail de groupe, effort individuel',
        palette: [baseColors.success, baseColors.warning],
      },
    ],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Status',
    subtitle: 'Formats carrés faciles à partager',
    memes: [
      {
        id: 'whatsapp-1',
        title: 'Vu',
        caption: 'Vu à 14:03, réponse prévue en 2029',
        palette: rainbow,
      },
      {
        id: 'whatsapp-2',
        title: 'Statut',
        caption: 'Ce statut ne vise personne officiellement',
        palette: [baseColors.success, baseColors.blue],
      },
      {
        id: 'whatsapp-3',
        title: 'Famille',
        caption: 'Quand tata découvre les stickers',
        palette: [baseColors.orange, baseColors.pink],
      },
      {
        id: 'whatsapp-4',
        title: 'Online',
        caption: 'En ligne mais émotionnellement absent',
        palette: [baseColors.info, baseColors.violet],
      },
    ],
  },
  {
    id: 'family',
    title: 'Famille et quotidien',
    subtitle: 'Mèmes simples pour scènes de tous les jours',
    memes: [
      {
        id: 'family-1',
        title: 'Tata',
        caption: 'Quand la famille découvre ton statut avant toi',
        palette: [baseColors.orange, baseColors.warning],
      },
      {
        id: 'family-2',
        title: 'Courses',
        caption: 'Parti acheter le pain, revenu avec une histoire',
        palette: [baseColors.success, baseColors.orange],
      },
      {
        id: 'family-3',
        title: 'Salon',
        caption: 'La télécommande a encore disparu mystérieusement',
        palette: [baseColors.blue, baseColors.info],
      },
      {
        id: 'family-4',
        title: 'Repas',
        caption: 'Quand on dit "viens manger" mais rien n’est prêt',
        palette: [baseColors.pink, baseColors.violet],
      },
    ],
  },
];
