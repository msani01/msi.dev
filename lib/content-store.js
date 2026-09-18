import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import { storageKeys } from "@/lib/portfolio-data";

const FIREBASE_TIMEOUT = 12000;

function withTimeout(promise, label) {
  let timeoutId;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(`${label} timed out. Create Firestore Database in Firebase Console, then check Firestore rules and API restrictions.`)), FIREBASE_TIMEOUT);
    }),
  ]).finally(() => clearTimeout(timeoutId));
}

export async function loadContent(key, fallback) {
  if (hasFirebaseConfig) {
    const snapshot = await withTimeout(getDoc(doc(db, "siteContent", key)), `Loading ${key}`);
    return snapshot.exists() ? snapshot.data().value : fallback;
  }
  if (typeof window === "undefined") return fallback;
  const saved = window.localStorage.getItem(storageKeys[key] || key);
  return saved ? JSON.parse(saved) : fallback;
}

export async function saveContent(key, value) {
  if (hasFirebaseConfig) {
    await withTimeout(setDoc(doc(db, "siteContent", key), { value, updatedAt: new Date().toISOString() }), `Saving ${key}`);
    return;
  }
  window.localStorage.setItem(storageKeys[key] || key, JSON.stringify(value));
}

export async function loadProjects(fallback) {
  if (!hasFirebaseConfig) return loadContent("projects", fallback);
  const snapshot = await withTimeout(getDocs(collection(db, "projects")), "Loading projects");
  return snapshot.docs.length ? snapshot.docs.map((project) => ({ id: project.id, ...project.data() })) : fallback;
}

export async function saveProject(project) {
  if (hasFirebaseConfig) {
    const id = project.id || crypto.randomUUID();
    await withTimeout(setDoc(doc(db, "projects", id), { ...project, id }), "Saving project");
    return { ...project, id };
  }
  const saved = JSON.parse(window.localStorage.getItem(storageKeys.projects) || "[]");
  const next = [...saved.filter((item) => item.id !== project.id), project];
  window.localStorage.setItem(storageKeys.projects, JSON.stringify(next));
  return project;
}

export async function replaceProjects(projects) {
  if (hasFirebaseConfig) {
    const existing = await withTimeout(getDocs(collection(db, "projects")), "Loading projects");
    const batch = writeBatch(db);
    existing.docs.forEach((project) => batch.delete(project.ref));
    projects.forEach((project) => {
      const id = project.id || crypto.randomUUID();
      batch.set(doc(db, "projects", id), { ...project, id });
    });
    await withTimeout(batch.commit(), "Publishing projects");
    return;
  }
  window.localStorage.setItem(storageKeys.projects, JSON.stringify(projects));
}

export async function deleteProject(projectId) {
  if (hasFirebaseConfig) {
    await withTimeout(deleteDoc(doc(db, "projects", projectId)), "Deleting project");
    return;
  }
  const saved = JSON.parse(window.localStorage.getItem(storageKeys.projects) || "[]");
  window.localStorage.setItem(storageKeys.projects, JSON.stringify(saved.filter((project) => project.id !== projectId)));
}

export async function saveMessage(message) {
  const record = { ...message, status: "unread", createdAt: new Date().toISOString() };
  if (hasFirebaseConfig) {
    const saved = await withTimeout(addDoc(collection(db, "messages"), record), "Sending message");
    return { id: saved.id, ...record };
  }
  const messages = JSON.parse(window.localStorage.getItem("msi-portfolio-messages") || "[]");
  const saved = { id: crypto.randomUUID(), ...record };
  window.localStorage.setItem("msi-portfolio-messages", JSON.stringify([saved, ...messages]));
  return saved;
}

export async function loadMessages() {
  if (hasFirebaseConfig) {
    const snapshot = await withTimeout(getDocs(collection(db, "messages")), "Loading messages");
    return snapshot.docs.map((message) => ({ id: message.id, ...message.data() })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return JSON.parse(window.localStorage.getItem("msi-portfolio-messages") || "[]");
}

export async function markMessageRead(messageId) {
  if (hasFirebaseConfig) {
    await withTimeout(updateDoc(doc(db, "messages", messageId), { status: "read" }), "Updating message");
    return;
  }
  const messages = JSON.parse(window.localStorage.getItem("msi-portfolio-messages") || "[]");
  window.localStorage.setItem("msi-portfolio-messages", JSON.stringify(messages.map((message) => message.id === messageId ? { ...message, status: "read" } : message)));
}

export async function deleteMessage(messageId) {
  if (hasFirebaseConfig) {
    await withTimeout(deleteDoc(doc(db, "messages", messageId)), "Deleting message");
    return;
  }
  const messages = JSON.parse(window.localStorage.getItem("msi-portfolio-messages") || "[]");
  window.localStorage.setItem("msi-portfolio-messages", JSON.stringify(messages.filter((message) => message.id !== messageId)));
}