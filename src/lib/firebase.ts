// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// 🔑 Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAmUvCYenlXSjNIBVX-gS7Vsi46xlTejbA",
    authDomain: "cmstore-3cb69.firebaseapp.com",
    projectId: "cmstore-3cb69",
    storageBucket: "cmstore-3cb69.firebasestorage.app",
    messagingSenderId: "436509006807",
    appId: "1:436509006807:web:61af2050c2a4c933d9c992",
    measurementId: "G-QSRENMFQB4",
    databaseURL: "https://cmstore-3cb69-default-rtdb.firebaseio.com",
};

// 🔥 Evita inicializar múltiplas vezes
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ⚡ Auth (suporta múltiplos métodos: Google, Email/Senha, etc.)
const auth = getAuth(app);

// ⚡ Realtime Database
const db = getDatabase(app);

// 📊 Analytics (somente no client e se suportado)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };
