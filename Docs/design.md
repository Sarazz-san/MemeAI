# Design System — Mème Generator Multimodal
> Spécification visuelle complète — au pixel près

---

## 1. Identité visuelle

### Nom de l'app
**MemeAI** *(provisoire, modifiable)*

### Concept visuel
Style **arc-en-ciel gradient** : l'app doit dégager énergie, humour et créativité.  
Chaque écran utilise des dégradés colorés, des cartes arrondies et des boutons vibrants.  
L'ambiance est **dark mode** avec des accents arc-en-ciel — comme un fond noir sur lequel les couleurs explosent.

### Personnalité
- Fun, jeune, énergique
- Pas de blanc pur ni de gris terne
- Les couleurs parlent avant le texte

---

## 2. Palette de couleurs

### Couleurs principales (Gradient arc-en-ciel)
```
Rouge       #FF4E50
Orange      #FF8C42
Jaune       #FFD700
Vert        #00E676
Cyan        #00E5FF
Bleu        #2979FF
Violet      #AA00FF
Rose        #FF4081
```

### Gradient principal (utilisé partout)
```
Direction : 135deg (diagonal)
Stops :
  0%   → #FF4E50  (rouge)
  20%  → #FF8C42  (orange)
  40%  → #FFD700  (jaune)
  60%  → #00E676  (vert)
  80%  → #2979FF  (bleu)
  100% → #AA00FF  (violet)
```
> Utilisation : boutons principaux, headers, bordures actives, icônes sélectionnées

### Couleurs de fond (dark)
```
Background principal   #0A0A0F   (noir profond, légèrement bleuté)
Background carte       #13131A   (noir un peu plus clair)
Background input       #1C1C27   (champ de saisie)
Background bottom bar  #0D0D14   (navigation)
```

### Couleurs de texte
```
Texte primaire         #FFFFFF   (blanc pur)
Texte secondaire       #A0A0B0   (gris clair)
Texte placeholder      #505060   (gris foncé)
Texte sur gradient     #FFFFFF   (blanc toujours)
```

### Couleurs d'état
```
Succès    #00E676   (vert néon)
Erreur    #FF4E50   (rouge)
Warning   #FFD700   (jaune)
Info      #00E5FF   (cyan)
```

### Bordures
```
Bordure inactive    #2A2A3A   (gris foncé discret)
Bordure active      gradient arc-en-ciel (2px)
Bordure carte       #1E1E2E   (légèrement visible)
```

---

## 3. Typographie

### Police principale
**Inter** (Google Fonts, disponible via react-native-google-fonts)  
Fallback : `System font` (San Francisco sur iOS, Roboto sur Android)

### Échelle typographique
```
Display (titre écran)      : Inter Bold,    32px,  line-height 40px
H1 (titre section)         : Inter Bold,    24px,  line-height 32px
H2 (sous-titre)            : Inter SemiBold,20px,  line-height 28px
H3 (titre carte)           : Inter SemiBold,17px,  line-height 24px
Body (texte courant)       : Inter Regular, 15px,  line-height 22px
Caption (texte secondaire) : Inter Regular, 13px,  line-height 18px
Label (bouton, tab)        : Inter SemiBold,14px,  line-height 20px
Micro (badges, tags)       : Inter Medium,  11px,  line-height 16px
```

### Règles typo
- Pas de texte en dessous de 11px
- Titres toujours en blanc `#FFFFFF`
- Descriptions en `#A0A0B0`
- Jamais d'italic sauf pour les placeholders
- Letter-spacing sur les labels de bouton : `0.5px`

---

## 4. Espacements et grille

### Unité de base : 4px

```
XS   : 4px
S    : 8px
M    : 12px
L    : 16px
XL   : 20px
XXL  : 24px
3XL  : 32px
4XL  : 48px
```

### Marges horizontales de page
```
Padding gauche/droite : 20px (L + XL/2 = 20px)
```

### Grille
- 1 colonne pour les écrans d'action (Context Reader, Voice)
- 2 colonnes pour la galerie (Status Remixer)
- Gouttière entre colonnes : 12px

---

## 5. Composants UI

---

### 5.1 Bouton principal (CTA)

**Dimensions :**
- Hauteur : 56px
- Largeur : 100% (pleine largeur avec margin 20px de chaque côté)
- Border-radius : 16px

**Style :**
- Background : gradient arc-en-ciel (135deg)
- Texte : Inter SemiBold, 16px, blanc, letter-spacing 0.5px
- Shadow : `0px 4px 20px rgba(170, 0, 255, 0.35)`

**États :**
- Repos : gradient plein
- Pressed : opacité 0.85 + légère scale(0.97)
- Disabled : gradient grisé opacité 0.4, texte #505060
- Loading : spinner blanc centré, texte masqué

**Exemple :**
```
[        ✨ Générer le mème        ]
   ←————————————————————————————→
              56px haut
```

---

### 5.2 Bouton secondaire

**Dimensions :**
- Hauteur : 48px
- Largeur : auto ou 100%
- Border-radius : 12px

**Style :**
- Background : transparent
- Bordure : 1.5px solid gradient arc-en-ciel (via `borderWidth` + `borderColor` animé)
- Texte : Inter SemiBold, 15px, blanc

**États :**
- Repos : bordure gradient, fond transparent
- Pressed : fond `#1C1C27`

---

### 5.3 Bouton icône rond

**Dimensions :**
- Taille : 52px × 52px
- Border-radius : 26px (cercle parfait)

**Style :**
- Background : `#1C1C27`
- Icône : 24px, couleur gradient ou blanc
- Shadow : `0px 2px 10px rgba(0,0,0,0.4)`

**Variante active :**
- Background : gradient arc-en-ciel
- Icône : blanc

---

### 5.4 Champ de saisie texte

**Dimensions :**
- Hauteur minimale : 56px (s'étend verticalement si multiline)
- Largeur : 100% − 40px (marges)
- Border-radius : 14px
- Padding interne : 16px horizontal, 14px vertical

**Style repos :**
- Background : `#1C1C27`
- Bordure : 1px solid `#2A2A3A`
- Texte : Inter Regular, 15px, `#FFFFFF`
- Placeholder : Inter Regular, 15px, `#505060`

**Style focus :**
- Bordure : 1.5px solid gradient arc-en-ciel
- Légère glow : `shadow 0px 0px 12px rgba(41,121,255,0.3)`

**Variante multiline (Context Reader) :**
- Hauteur minimale : 140px
- Hauteur maximale : 240px (scroll interne après)
- Alignement texte : top

---

### 5.5 Carte (Card)

**Dimensions :**
- Largeur : 100% − 40px
- Border-radius : 20px
- Padding : 20px

**Style :**
- Background : `#13131A`
- Bordure : 1px solid `#1E1E2E`
- Shadow : `0px 4px 24px rgba(0,0,0,0.5)`

**Variante "résultat mème" :**
- Bordure : 1.5px solid gradient arc-en-ciel
- Background : `#0F0F1A`
- Glow externe : `0px 0px 20px rgba(255,78,80,0.15)`

---

### 5.6 Barre de navigation (Bottom Tab Bar)

**Dimensions :**
- Hauteur : 64px + safe area bottom (iPhone notch)
- Largeur : 100%

**Style :**
- Background : `#0D0D14`
- Bordure top : 1px solid `#1E1E2E`
- Pas de shadow (fond déjà sombre)

**Onglets (3) :**
```
[ 📝 Texte ]  [ 🎙️ Voix ]  [ 🖼️ Status ]
```

**Icône inactive :**
- Taille : 24px
- Couleur : `#505060`
- Label : 11px, `#505060`

**Icône active :**
- Taille : 24px
- Couleur : blanc ou gradient (via image colorée)
- Label : 11px, `#FFFFFF`, Inter SemiBold
- Indicateur : point 4px ou underline 2px gradient sous l'icône

---

### 5.7 Badge / Tag

**Dimensions :**
- Hauteur : 24px
- Padding : 0 10px
- Border-radius : 12px (pilule)

**Variantes :**
- Succès : fond `#00E67620`, texte `#00E676`, bordure `#00E67640`
- Erreur : fond `#FF4E5020`, texte `#FF4E50`
- Info : fond `#00E5FF20`, texte `#00E5FF`
- Gradient : fond gradient arc-en-ciel, texte blanc

---

### 5.8 Loader / Spinner

**Style :**
- Cercle animé 40px × 40px
- Stroke : 3px gradient arc-en-ciel (ou blanc si sur fond gradient)
- Animation : rotation 360° en 0.8s, easing linear, infini

**Message sous le spinner :**
- Inter Regular, 14px, `#A0A0B0`
- Exemples : *"L'IA réfléchit..."*, *"Génération en cours..."*

---

### 5.9 Snackbar / Toast

**Dimensions :**
- Position : bas de l'écran, 16px au-dessus de la tab bar
- Largeur : 100% − 40px
- Hauteur : 48px
- Border-radius : 12px

**Style :**
- Background : `#1C1C27`
- Texte : 14px blanc
- Icône gauche : 20px (✅ ❌ ℹ️)
- Animation : slide up + fade in (0.3s), disparaît après 3s

---

## 6. Écrans — Description pixel par pixel

---

### 6.1 Écran d'accueil (HomeScreen / Splash)

> Affiché 2 secondes au lancement puis redirect vers l'app principale

**Fond :** `#0A0A0F`

**Contenu centré verticalement et horizontalement :**

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│           [Logo 80×80px]            │
│         emoji 🎭 ou icône SVG       │
│                                     │
│           MemeAI                    │
│     Inter Bold, 36px, blanc         │
│                                     │
│    Génère des mèmes avec l'IA       │
│   Inter Regular, 16px, #A0A0B0      │
│                                     │
│         ════════════                │
│    barre gradient 60px×3px          │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Animation :** logo scale de 0.8 → 1.0 avec fade in (0.6s, ease-out)

---

### 6.2 Écran Context Reader

**Header :**
- Hauteur : 56px
- Padding top : 16px (status bar)
- Titre : "Context Reader", Inter Bold, 22px, blanc, aligné gauche, margin left 20px
- Sous-titre : "Colle un texte, reçois un mème", Inter Regular, 13px, `#A0A0B0`, margin left 20px

**Corps (scroll vertical) :**

```
margin : 20px horizontal

┌──────────────────────────────────┐
│  Ton texte ici...                │  ← TextInput multiline
│                                  │     min-height 140px
│                                  │     border gradient si focus
│                                  │
└──────────────────────────────────┘

                16px gap

[ Compteur : 0 / 500 caractères ]   ← Caption, aligné droite, #505060

                24px gap

[      ✨ Générer le mème          ]  ← Bouton principal 56px

                32px gap

┌──────────────────────────────────┐
│  🎭  Résultat                    │  ← Carte résultat (visible après génération)
│                                  │
│  "Caption générée par l'IA ici" │  ← Inter SemiBold, 17px, blanc
│                                  │
│  Ton : 😂 Humour / 😏 Ironique  │  ← Badge ton détecté
│                                  │
│  [💾 Sauvegarder] [📤 Partager] │  ← 2 boutons secondaires côte à côte
└──────────────────────────────────┘
```

**État vide (avant génération) :**
- La carte résultat est masquée
- Une illustration placeholder centrée : emoji 🤔 + texte "Saisis un texte pour commencer"

**État loading :**
- Bouton affiche spinner blanc
- Carte résultat affiche skeleton (rectangles gris animés)

**Skeleton loader :**
- 3 rectangles : 100% largeur × 16px, 80% × 16px, 60% × 16px
- Border-radius : 8px
- Couleur : `#1E1E2E` avec shimmer animation (gauche → droite, 1.5s)

---

### 6.3 Écran Voice-to-Meme

**Header :**
- Titre : "Voice-to-Meme", Inter Bold, 22px, blanc
- Sous-titre : "Parle, l'IA fait le reste", `#A0A0B0`, 13px

**Corps :**

```
                48px gap depuis header

        ┌───────────────────────┐
        │                       │
        │   Visualiseur audio   │  ← Waveform animée (barres qui bougent)
        │   Hauteur : 80px      │     couleur gradient arc-en-ciel
        │   Largeur : 100%−40px │     barres grises si pas d'enregistrement
        │                       │
        └───────────────────────┘

                32px gap

              00:00             ← Chronomètre, Inter Mono Bold, 48px, blanc
                                   centré horizontalement

                24px gap

         ┌──────────────────┐
         │  🎙️  Enregistrer │  ← Bouton rond 80×80px gradient
         └──────────────────┘   centré horizontalement
                                état : IDLE / RECORDING / PROCESSING

                16px gap

    [ Appuie pour commencer ]    ← Caption 13px #505060, centré
    (change selon l'état)

                40px gap

┌──────────────────────────────────┐
│  📝  Transcription               │  ← Carte résultat (après enregistrement)
│                                  │
│  "Texte transcrit ici..."       │  ← Italic, 15px, #A0A0B0
│                                  │
│  ──────────────────────────────  │
│                                  │
│  🎭  Mème généré                 │
│                                  │
│  "Caption drôle ici"            │  ← Bold, 17px, blanc
│                                  │
│  [💾 Sauvegarder] [📤 Partager] │
└──────────────────────────────────┘
```

**États du bouton d'enregistrement :**

| État | Couleur | Icône | Label bas |
|---|---|---|---|
| IDLE | Gradient arc-en-ciel | 🎙️ | "Appuie pour commencer" |
| RECORDING | Rouge pulsant `#FF4E50` | ⏹️ | "En cours... 00:12" |
| PROCESSING | Gradient + spinner | ⏳ | "L'IA analyse..." |
| DONE | Vert `#00E676` | ✅ | "Terminé !" |

**Animation RECORDING :**
- Le bouton pulse : scale 1.0 → 1.08 → 1.0, durée 1s, infini
- Les barres de la waveform s'animent en temps réel

---

### 6.4 Écran Status Remixer

**Header :**
- Titre : "Status Remixer", Inter Bold, 22px, blanc
- Sous-titre : "Transforme tes statuts WhatsApp en mèmes", `#A0A0B0`, 13px

**Section 1 — Bannière info (si permission pas encore accordée) :**
```
┌──────────────────────────────────┐
│ 📁  Accès au stockage requis     │
│                                  │
│ L'app a besoin d'accéder à tes  │
│ statuts WhatsApp sauvegardés.    │
│                                  │
│    [ Autoriser l'accès ]         │
└──────────────────────────────────┘
```
- Carte fond `#13131A`, bordure `#FFD70040`
- Bouton : gradient arc-en-ciel, 48px

**Section 2 — Galerie des statuts (après permission) :**

```
Statuts WhatsApp             [12]   ← Titre + badge nombre
─────────────────────────────────

┌──────────┐  ┌──────────┐
│          │  │          │  ← Grille 2 colonnes
│  Image 1 │  │  Image 2 │     Taille cellule : (écran−52px)/2
│          │  │          │     soit ~170px sur 390px d'écran
│          │  │          │     Ratio : 1:1 (carré)
└──────────┘  └──────────┘     Border-radius : 12px
┌──────────┐  ┌──────────┐     Gap : 12px
│          │  │          │
│  Image 3 │  │  Image 4 │
│          │  │   📹     │  ← Icône vidéo si c'est une vidéo
└──────────┘  └──────────┘
```

**État vide (aucun statut trouvé) :**
```
        [📭  illustration vide]
  
  Aucun statut trouvé
  Inter SemiBold, 17px, blanc

  Ouvre WhatsApp et consulte
  des statuts pour les voir ici.
  Inter Regular, 14px, #A0A0B0
```

**Section 3 — Image sélectionnée :**

Après tap sur une image → bottom sheet slide-up (hauteur 85% écran) :

```
┌─────────────────────────────────────┐  ─ top : drag handle 40×4px, gris, centré
│           ━━━━━                     │
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │  ← Image sélectionnée
│    │      Image choisie      │      │     width : 100%−40px
│    │                         │      │     height : 240px
│    │   [ Texte overlay ]     │      │     border-radius : 16px
│    └─────────────────────────┘      │     le texte IA s'affiche dessus
│                                     │
│   Texte généré :                    │
│   "Caption drôle ici..."           │  ← Inter SemiBold 17px blanc
│                                     │
│   Style du texte :                  │
│   [Impact] [Bold] [Outline]         │  ← Pills de sélection style texte
│                                     │
│   Couleur :                         │
│   ⚪ 🟡 🔴 🟢 🔵                   │  ← Sélecteur couleur texte (cercles 28px)
│                                     │
│   [   ✨ Générer caption IA   ]     │
│                                     │
│   [💾 Sauvegarder]  [📤 Partager]  │
└─────────────────────────────────────┘
```

---

## 7. Navigation

### Stack de navigation
```
App
└── BottomTabNavigator
    ├── Tab 1 : ContextReaderScreen   (icône : 📝 edit-3)
    ├── Tab 2 : VoiceToMemeScreen     (icône : 🎙️ mic)
    └── Tab 3 : StatusRemixerScreen   (icône : 🖼️ image)
```

### Transitions
- Entre tabs : fade (0.2s)
- Bottom sheet : slide-up (0.35s, spring)
- Cartes résultat : fade + slide-up de 12px (0.3s, ease-out)

---

## 8. Icônes

**Librairie :** `react-native-vector-icons` — set **Feather** ou **MaterialCommunityIcons**

| Élément | Icône Feather | Taille |
|---|---|---|
| Tab Texte | `edit-3` | 24px |
| Tab Voix | `mic` | 24px |
| Tab Status | `image` | 24px |
| Enregistrer | `mic` | 32px |
| Stop | `square` | 32px |
| Sauvegarder | `download` | 20px |
| Partager | `share-2` | 20px |
| Succès | `check-circle` | 20px |
| Erreur | `alert-circle` | 20px |
| Fermer | `x` | 20px |
| Galerie | `grid` | 20px |

---

## 9. Animations globales

| Élément | Animation | Durée | Easing |
|---|---|---|---|
| Apparition carte résultat | fade + translateY(12→0) | 300ms | ease-out |
| Bouton pressé | scale(0.97) | 100ms | ease-in-out |
| Bouton record (pulse) | scale(1→1.08→1) | 1000ms | ease-in-out, infini |
| Waveform barres | height aléatoire | 100ms | linear, infini |
| Shimmer skeleton | translateX(−100%→100%) | 1500ms | ease-in-out, infini |
| Bottom sheet | translateY(100%→0) | 350ms | spring (damping 20) |
| Toast snackbar | translateY(20→0) + opacity | 300ms | ease-out |

---

## 10. Responsive

L'app cible les téléphones Android (priorité) et iOS.

**Breakpoints de référence :**
```
Petit  (< 360px largeur)  : ex. Galaxy A03 — paddings réduits à 16px
Normal (360–414px)         : ex. Pixel 6, iPhone 13 — design de référence
Grand  (> 414px)           : ex. iPhone 14 Pro Max — max-width 480px centré
```

**Règles :**
- Tous les px ci-dessus sont en `dp` (density-independent pixels) React Native
- Sur petit écran : titre header réduit à 18px, bouton principal à 52px
- La galerie reste toujours en 2 colonnes quelle que soit la taille

---

## 11. Accessibilité

- Tous les boutons ont un `accessibilityLabel` descriptif
- Contraste minimum : 4.5:1 (texte sur fond)
- Le blanc `#FFFFFF` sur `#0A0A0F` = ratio 19.6:1 ✅
- Le `#A0A0B0` sur `#0A0A0F` = ratio 6.2:1 ✅
- Taille minimale zone tactile : 44×44px (même si visuellement plus petit)

---

*Design System — MemeAI — ICT202 G1/G2*
