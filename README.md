# MemeAI

MemeAI est une application mobile React Native CLI pour créer des mèmes avec une approche multimodale : texte, audio, image, atelier manuel et partage social.

Le projet est un TP et doit rester entièrement gratuit : pas de service payant, pas d'asset payant, pas de clé API exposée dans l'application mobile.

## Documentation

- Cahier des charges : [Docs/cahier_des_charges_meme_generator.md](Docs/cahier_des_charges_meme_generator.md)
- Design system : [Docs/design.md](Docs/design.md)
- Walkthrough de développement jusqu'à l'APK release : [Docs/walkthrough_developpement_apk.md](Docs/walkthrough_developpement_apk.md)

## Écrans

| Écran | Description |
|-------|-------------|
| `Home` | Packages de mèmes en bandes horizontales scrollables. Bouton "Utiliser" vers l'Atelier. |
| `Context` | Entrée multimodale : texte, caméra, micro (enregistrement), import fichier. Génération IA via backend. |
| `Atelier` | Canvas de création avec calques texte/emoji/sticker/image. Drag'n'drop, rotation, taille, export PNG. |
| `Social` | Hub de partage natif Android vers WhatsApp, Instagram, TikTok, Facebook, X, Telegram. |
| `Settings` | Toggle thème clair/sombre, URL backend configurable, version app, vider cache. |

## Commandes utiles

Installer les dépendances :

```sh
npm install
```

Lancer Android en debug :

```sh
npm run android
```

Lancer Metro :

```sh
npm start
```

Vérifier le projet (TypeScript + Jest + ESLint) :

```sh
npm run verify
```

Lancer le backend en mode développement :

```sh
cd backend
npm install
cp .env.example .env
# Renseigner GEMINI_API_KEY dans .env
npm run dev
```

Préparer un APK release :

```sh
npm run android:release
```

APK attendu :

```txt
android/app/build/outputs/apk/release/app-release.apk
```

## CI / GitHub Actions

Chaque push sur `main` déclenche automatiquement un build Android debug et release. Les APK sont disponibles en tant qu'artefacts GitHub Actions.

Pour activer la signature release dans la CI, configurer ces secrets GitHub :

| Secret | Description |
|--------|-------------|
| `MEMEAI_KEYSTORE_BASE64` | Contenu de `memeai-release-key.keystore` encodé en base64 |
| `MEMEAI_UPLOAD_STORE_PASSWORD` | Mot de passe du keystore |
| `MEMEAI_UPLOAD_KEY_ALIAS` | Alias de la clé (ex: `memeai`) |
| `MEMEAI_UPLOAD_KEY_PASSWORD` | Mot de passe de la clé |

Sans ces secrets, la CI signe avec le debug keystore (APK debug uniquement).

## Règle de sécurité IA

La clé IA ne doit jamais être placée dans le code React Native. Le mobile appelle un backend Node/Express, et le backend seul lit `GEMINI_API_KEY` depuis `.env` (non commité).

## Backend local

Par défaut, l'application mobile utilise :

```txt
http://10.0.2.2:3000
```

Cette adresse fonctionne pour l'émulateur Android. Sur un téléphone physique, remplacer l'URL dans `Settings` par l'IP locale du PC :

```txt
http://192.168.x.x:3000
```

Le backend fonctionne sans clé Gemini si `ALLOW_MOCK_AI=true` dans `.env` — utile pour la démo même si le quota IA est indisponible.

## Limites de l'IA Gemini (offre gratuite)

| Limite | Valeur (Google AI Studio — gratuit) |
|--------|--------------------------------------|
| Quota requêtes/min | ~15 RPM (Gemini 1.5 Flash) |
| Quota requêtes/jour | ~1 500 RPD |
| Taille image max | 20 MB par requête |
| Taille audio max | 20 MB par requête |
| Latence moyenne | 1–3 s (texte), 3–8 s (image/audio) |
| Erreur quota | HTTP 429 — le backend retourne un fallback local si `ALLOW_MOCK_AI=true` |

**Parade si quota atteint pendant la démo :** mettre `ALLOW_MOCK_AI=true` dans `backend/.env`. Le backend retournera des réponses générées localement, sans appel IA.

## Permissions Android

Les permissions suivantes sont déclarées dans `AndroidManifest.xml` :

- `CAMERA` — caméra dans ContextScreen
- `RECORD_AUDIO` — micro dans ContextScreen
- `READ_MEDIA_IMAGES` — galerie Android 13+
- `READ_EXTERNAL_STORAGE` — galerie Android < 13

Les permissions runtime sont demandées au moment de l'utilisation (pas au démarrage) avec affichage d'une raison claire à l'utilisateur.
