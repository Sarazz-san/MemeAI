# Cahier des Charges — Mème Generator Multimodal
**Cours :** ICT202 G1/G2 — Développement Mobile  
**Délai :** 1 semaine  
**Stack imposée :** React Native CLI + Node.js/Express + Google Gemini API

---

## 1. Présentation du projet

L'application est un **générateur de mèmes dopé à l'IA**, pensé comme une évolution des sticker makers du Play Store. Elle permet à l'utilisateur de créer des mèmes humoristiques à partir de texte, de sa voix, ou directement depuis les statuts WhatsApp présents sur son téléphone.

---

## 2. Architecture générale

```
[App Mobile - React Native CLI]
        |
        | HTTP (fetch/axios)
        v
[Backend - Node.js + Express]
        |
        | HTTPS (Gemini API)
        v
[Google Gemini API - Gratuit]
```

**Principe clé :** le mobile ne contacte jamais l'IA directement. Tout passe par le backend pour protéger la clé API.

---

## 3. Fonctionnalités

### 3.1 Context Reader (Core)
**Description :** L'utilisateur saisit ou colle un extrait de texte (discussion, blague, phrase). L'IA analyse le ton et génère une caption de mème adaptée.

**Flux :**
1. Utilisateur saisit du texte dans l'app
2. L'app envoie le texte au backend (`POST /api/context`)
3. Le backend interroge Gemini pour générer une caption humoristique
4. L'app affiche la caption sur un template de mème

**Endpoint backend :**
```
POST /api/context
Body : { "text": "..." }
Response : { "caption": "...", "tone": "..." }
```

---

### 3.2 Voice-to-Meme (Core)
**Description :** L'utilisateur enregistre une note vocale. L'app transcrit l'audio, analyse le contenu et génère un mème avec la transcription en sous-titre.

**Flux :**
1. Utilisateur appuie sur le bouton d'enregistrement
2. L'app capture l'audio (permission `RECORD_AUDIO`)
3. Le fichier audio est envoyé au backend (`POST /api/voice`)
4. Le backend envoie l'audio à Gemini pour transcription + analyse
5. L'app affiche le mème avec le sous-titre

**Endpoint backend :**
```
POST /api/voice
Body : fichier audio (multipart/form-data via Multer)
Response : { "transcription": "...", "caption": "..." }
```

---

### 3.3 Status Remixer — avec import WhatsApp (Core + Feature distinctive)
**Description :** L'app lit le dossier local des statuts WhatsApp vus par l'utilisateur, affiche une galerie, et permet de transformer n'importe quel statut en mème via l'IA.

**Flux :**
1. L'utilisateur ouvre l'écran "Status Remixer"
2. L'app demande la permission d'accès au stockage
3. L'app lit le dossier WhatsApp Statuses :
   ```
   /sdcard/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/
   ```
4. Une galerie affiche les statuts disponibles (images + vidéos)
5. L'utilisateur sélectionne une image
6. L'image est envoyée au backend (`POST /api/remixer`)
7. Gemini Vision analyse l'image et génère une caption drôle
8. L'app superpose la caption sur l'image (overlay texte)
9. L'utilisateur peut sauvegarder ou partager le mème

**Endpoint backend :**
```
POST /api/remixer
Body : fichier image (multipart/form-data via Multer)
Response : { "caption": "...", "suggestion": "..." }
```

**Permissions Android requises :**
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE"/>
```

---

## 4. Stack technique détaillée

### Frontend — React Native CLI
| Élément | Choix |
|---|---|
| Framework | React Native CLI (pas Expo) |
| Navigation | React Navigation v6 |
| Requêtes HTTP | Axios |
| Audio | react-native-audio-recorder-player |
| Accès fichiers | react-native-fs |
| Superposition texte/image | react-native-view-shot |
| UI Components | react-native-paper ou custom |

### Backend — Node.js + Express
| Élément | Choix |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Upload fichiers | Multer |
| Appels IA | node-fetch ou axios |
| Variables d'env | dotenv |

### IA — Google Gemini (Gratuit)
| Modèle | Usage |
|---|---|
| `gemini-1.5-flash` | Génération de captions (texte) |
| `gemini-1.5-flash` (vision) | Analyse d'images (Status Remixer) |
| `gemini-1.5-flash` (audio) | Transcription vocale (Voice-to-Meme) |

> **Obtenir la clé gratuitement :** [https://aistudio.google.com](https://aistudio.google.com) → "Get API Key"

---

## 5. Structure des dossiers

```
meme-generator/
│
├── backend/
│   ├── index.js                  # Point d'entrée Express
│   ├── .env                      # GEMINI_API_KEY=...
│   ├── routes/
│   │   ├── context.js            # Route POST /api/context
│   │   ├── voice.js              # Route POST /api/voice
│   │   └── remixer.js            # Route POST /api/remixer
│   ├── services/
│   │   └── gemini.js             # Logique d'appel à l'API Gemini
│   └── uploads/                  # Fichiers temporaires (Multer)
│
└── frontend/
    ├── android/                  # Config Android native
    │   └── app/src/main/
    │       └── AndroidManifest.xml
    ├── src/
    │   ├── screens/
    │   │   ├── HomeScreen.tsx        # Accueil + navigation
    │   │   ├── ContextReaderScreen.tsx
    │   │   ├── VoiceToMemeScreen.tsx
    │   │   └── StatusRemixerScreen.tsx
    │   ├── services/
    │   │   └── api.ts                # Fonctions d'appel au backend
    │   └── components/
    │       ├── MemePreview.tsx        # Affichage du mème final
    │       └── StatusGallery.tsx      # Galerie des statuts WhatsApp
    └── App.tsx                       # Racine + navigation stack
```

---


## 7. Livrables attendus

- [ ] **Dépôt Git** avec historique de commits (frontend + backend séparés ou monorepo)
- [ ] **README** avec instructions d'installation et configuration de la clé API
- [ ] **Vidéo de démo** (3 à 5 minutes) sur téléphone physique ou émulateur

---

## 8. Points de vigilance

- Ne jamais exposer la clé Gemini dans le code frontend
- Vider le dossier `uploads/` après chaque requête (fichiers temporaires)
- Tester les permissions Android sur un vrai téléphone (le dossier `.Statuses` n'existe pas sur émulateur)
- Le dossier `.Statuses` ne contient que les statuts **déjà vus** par l'utilisateur dans WhatsApp

---

*Cahier des charges rédigé pour ICT202 — Projet Générateur de Mèmes Multimodal*
