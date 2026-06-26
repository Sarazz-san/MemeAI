# MemeAI

MemeAI est une application mobile React Native CLI pour creer des memes avec une approche multimodale : texte, audio, image, atelier manuel et partage social.

Le projet est un TP et doit rester entierement gratuit : pas de service payant, pas d'asset payant, pas de cle API exposee dans l'application mobile.

## Documentation

- Cahier des charges : [Docs/cahier_des_charges_meme_generator.md](Docs/cahier_des_charges_meme_generator.md)
- Design system : [Docs/design.md](Docs/design.md)
- Walkthrough de developpement jusqu'a l'APK release : [Docs/walkthrough_developpement_apk.md](Docs/walkthrough_developpement_apk.md)

## Ecrans actuels

- `Home` : packages de memes en bandes horizontales.
- `Context` : entree multimodale texte/camera/micro/import.
- `Atelier` : canvas et outils manuels type sticker maker.
- `Social` : hub de partage vers reseaux sociaux.
- `Settings` : theme clair/sombre.

## Commandes utiles

Installer les dependances :

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

Verifier le projet :

```sh
npm run verify
```

Lancer le backend en mode developpement :

```sh
cd backend
npm install
cp .env.example .env
npm run dev
```

Preparer un APK release :

```sh
npm run android:release
```

APK attendu :

```txt
android/app/build/outputs/apk/release/app-release.apk
```

## Regle de securite IA

La cle IA ne doit jamais etre placee dans le code React Native. Le mobile doit appeler un backend Node/Express, et le backend seul doit lire `GEMINI_API_KEY` depuis un fichier `.env` local non commite.

## Backend local

Par defaut, l'application mobile utilise :

```txt
http://10.0.2.2:3000
```

Cette adresse fonctionne pour l'emulateur Android. Sur un telephone physique, remplacer l'URL dans `Settings` par l'adresse IP locale du PC, par exemple :

```txt
http://192.168.1.20:3000
```

Le backend fonctionne aussi sans cle Gemini si `ALLOW_MOCK_AI=true`, ce qui permet de faire la demo gratuitement meme si le quota IA est indisponible.
