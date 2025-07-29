# 🏋️‍♂️ Fitness Tracker

**Fitness Tracker** est une application mobile construite avec **React Native + Expo**, permettant aux utilisateurs de suivre leurs activités physiques, avec intégration de l’IA pour un accompagnement intelligent et une interface dynamique et moderne.

## 🚀 Fonctionnalités principales

- 🔐 Authentification sécurisée avec **Clerk**
- 📅 Suivi d’activités physiques personnalisées
- 🧠 Intégration **Google GenAI** pour recommandations/intelligence conversationnelle
- 🖼️ Gestion de contenu via **Sanity**
- ⏱️ Minuteur intégré pour les entraînements
- 🎨 Interface responsive stylisée avec **Tailwind (NativeWind)**

## 🛠️ Stack technique

- **React Native** (via Expo)
- **Expo Router** pour la navigation
- **Zustand** pour la gestion d'état
- **Sanity.io** pour le contenu CMS
- **OpenAI & Google GenAI** pour les fonctionnalités IA
- **Clerk** pour l'authentification
- **NativeWind** pour le style

## 📦 Installation

Assurez-vous d’avoir installé [Node.js](https://nodejs.org/) et [Expo CLI](https://docs.expo.dev/get-started/installation/).

```bash
git clone https://github.com/Tighrine/fitness-tracker.git
cd fitness-tracker
npm install
npm start

# Lancer le simulateur:

```bash
npm run android   # ou
npm run ios       # ou
npm run web

# Expo Router and Tailwind CSS

Use [Expo Router](https://docs.expo.dev/router/introduction/) with [Nativewind](https://www.nativewind.dev/v4/overview/) styling.

## 🚀 How to use

```sh
npx create-expo-app -e with-tailwindcss
```

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
