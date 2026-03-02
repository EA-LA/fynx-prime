// ═══════════════════════════════════════════════════════════
// SESSION TRACKER — Records login sessions in Firestore
// ═══════════════════════════════════════════════════════════

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db as firebaseDb, isFirebaseConfigured } from "@/lib/firebase";

export interface LoginSession {
  id?: string;
  userId: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  createdAt: string;
  lastActive: string;
  isCurrent: boolean;
}

function getDeviceInfo(): { device: string; browser: string } {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Microsoft Edge";
  else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  let device = "Desktop";
  if (/Mobi|Android/i.test(ua)) device = "Mobile";
  else if (/Tablet|iPad/i.test(ua)) device = "Tablet";

  const os = /Windows/.test(ua) ? "Windows" : /Mac/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : "";

  return { device: `${device} (${os})`, browser };
}

async function fetchIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch {
    return "Unknown";
  }
}

const SESSION_KEY = "fynx_session_id";

export async function recordLoginSession(userId: string): Promise<void> {
  if (!isFirebaseConfigured || !firebaseDb) return;

  const { device, browser } = getDeviceInfo();
  const ip = await fetchIP();

  try {
    const sessionsRef = collection(firebaseDb, "users", userId, "sessions");
    const docRef = await addDoc(sessionsRef, {
      userId,
      device,
      browser,
      ip,
      location: "",
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      isCurrent: true,
    });
    // Store session doc ID locally to identify current session
    localStorage.setItem(SESSION_KEY, docRef.id);
  } catch (err) {
    console.error("[SessionTracker] Failed to record session:", err);
  }
}

export async function getUserSessions(userId: string): Promise<LoginSession[]> {
  if (!isFirebaseConfigured || !firebaseDb) return [];

  try {
    const sessionsRef = collection(firebaseDb, "users", userId, "sessions");
    const q = query(sessionsRef, orderBy("createdAt", "desc"), limit(20));
    const snap = await getDocs(q);
    const currentSessionId = localStorage.getItem(SESSION_KEY);

    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        userId: data.userId,
        device: data.device || "Unknown",
        browser: data.browser || "Unknown",
        ip: data.ip || "Unknown",
        location: data.location || "",
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastActive: data.lastActive?.toDate?.()?.toISOString() || new Date().toISOString(),
        isCurrent: d.id === currentSessionId,
      };
    });
  } catch (err) {
    console.error("[SessionTracker] Failed to fetch sessions:", err);
    return [];
  }
}

export async function revokeSession(userId: string, sessionId: string): Promise<void> {
  if (!isFirebaseConfigured || !firebaseDb) return;
  try {
    await deleteDoc(doc(firebaseDb, "users", userId, "sessions", sessionId));
  } catch (err) {
    console.error("[SessionTracker] Failed to revoke session:", err);
  }
}

export async function revokeAllSessions(userId: string): Promise<void> {
  if (!isFirebaseConfigured || !firebaseDb) return;
  const currentSessionId = localStorage.getItem(SESSION_KEY);
  try {
    const sessionsRef = collection(firebaseDb, "users", userId, "sessions");
    const snap = await getDocs(sessionsRef);
    const deletes = snap.docs
      .filter((d) => d.id !== currentSessionId)
      .map((d) => deleteDoc(d.ref));
    await Promise.all(deletes);
  } catch (err) {
    console.error("[SessionTracker] Failed to revoke all sessions:", err);
  }
}
