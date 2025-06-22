
# 🎬 Mobile Movie App

A cross-platform mobile movie app built with React Native, TypeScript, Expo, and powered by TMDB API. Users can browse movies, view detailed information, and bookmark movies of interest. Authentication is implemented using Appwrite.

<div align="center">
  <img src="https://qr.expo.dev/eas-update?slug=exp&projectId=f500b343-af0c-4c85-8202-3e5d79349e54&groupId=c3263bb9-562d-4509-b0fe-8d847109d953&host=u.expo.dev" width="250" />
  <br/>
  <strong>Scan QR Code above to try the app on your device!</strong>
</div>

---

## 🚀 Live Preview

Try the app via Expo Go by scanning the QR Code above or by visiting this link:  
👉 [Expo Preview](https://expo.dev/preview/update?message=Fixed%20screen%20flickering%20when%20pressing%20back%20in%20android%20and%20adjusting%20screen%20size.&updateRuntimeVersion=1.0.0&createdAt=2025-06-11T03%3A11%3A45.419Z&slug=exp&projectId=f500b343-af0c-4c85-8202-3e5d79349e54&group=c3263bb9-562d-4509-b0fe-8d847109d953)

> Make sure you have [Expo Go](https://expo.dev/client) installed on your mobile device.

---

## 🛠️ Technologies Used

- React Native (Expo)
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- TMDB API
- Appwrite (Authentication + Database)
- Expo Router

---

## 🔥 Features

- 🔍 Browse trending
- 📝 View movie details (ratings, genres, release date)
- ⭐ Bookmark favorite movies
- 👤 Authentication using Appwrite
- 📱 Responsive design for both Android & iOS

---

## 📦 Installation

Follow these steps to run the project locally on your machine:

### ✅ Requirements

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app installed on your mobile device (iOS or Android)
- An [Appwrite](https://cloud.appwrite.io/) project set up with:
  - Project ID
  - Database and Collections
  - API Key
- A TMDB API Key (register for free at [themoviedb.org](https://www.themoviedb.org/))

---

### 🔐 Environment Variables

Create a `.env` file in the root directory of the project and add the following variables with your credentials:

```env
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_movies_collection_id
EXPO_PUBLIC_APPWRITE_COLLECTION_SAVE_ID=your_bookmark_collection_id
EXPO_PUBLIC_APPWRITE_COLLECTION_USER_ID=your_user_collection_id
EXPO_PUBLIC_APPWRITE_API_KEY=your_appwrite_api_key
```
---

### ⚙️ Setup

```bash
# Clone the project
git clone https://github.com/Nantasit-2001/mobile_movie.git
cd mobile_movie

# Install dependencies
npm install

# Run the app
npx expo start
# or
npx expo start --tunnel
# (Useful when you're on a different Wi-Fi network or behind a firewall.
# It ensures the QR code works reliably by using a tunnel connection.)
```
