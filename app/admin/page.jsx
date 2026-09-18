"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ImagePlus, LogIn, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { auth, db, hasFirebaseConfig } from "@/lib/firebase";
import { defaultContact, defaultProfile, defaultProjects, defaultSkills } from "@/lib/portfolio-data";
import { deleteMessage, deleteProject, loadContent, loadMessages, markMessageRead, loadProjects, replaceProjects, saveContent } from "@/lib/content-store";

const emptyProject = { id: "", title: "", category: "web", description: "", tech: [], link: "#", github: "", image: "", featured: false };
const inputClass = "w-full rounded-xl border border-slate-700 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300";

async function uploadToCloudinary(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) throw new Error("Add Cloudinary values to .env.local first.");
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", uploadPreset);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body });
  if (!response.ok) throw new Error("Cloudinary upload failed.");
  return (await response.json()).secure_url;
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState(defaultProfile);
  const [contact, setContact] = useState(defaultContact);
  const [skills, setSkills] = useState(defaultSkills);
  const [projects, setProjects] = useState(defaultProjects);
  const [newProject, setNewProject] = useState(emptyProject);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (hasFirebaseConfig) return onAuthStateChanged(auth, setUser);
    setUser(window.sessionStorage.getItem("msi-admin-session") === "true" ? { email: "admin@msi.dev" } : null);
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoadingContent(true);
    Promise.all([loadContent("profile", defaultProfile), loadContent("contact", defaultContact), loadContent("skills", defaultSkills), loadProjects(defaultProjects)])
      .then(([savedProfile, savedContact, savedSkills, savedProjects]) => { setProfile(savedProfile); setContact(savedContact); setSkills(savedSkills); setProjects(savedProjects); })
      .catch((error) => setNotice(formatFirebaseError(error, "load content")))
      .finally(() => setLoadingContent(false));
    loadMessages().then(setMessages).catch((error) => setNotice(formatFirebaseError(error, "load messages")));
  }, [user]);

  async function handleMessageOpen(message) {
    if (message.status === "unread") {
      await markMessageRead(message.id);
      setMessages((current) => current.map((item) => item.id === message.id ? { ...item, status: "read" } : item));
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    try {
      if (hasFirebaseConfig) await signInWithEmailAndPassword(auth, login.email, login.password);
      else if (login.email === "admin@msi.dev" && login.password === "admin123") { window.sessionStorage.setItem("msi-admin-session", "true"); setUser({ email: login.email }); }
      else throw new Error("Invalid demo credentials.");
    } catch (error) {
      if (error.code === "auth/configuration-not-found") {
        setNotice("Firebase Authentication is not enabled for this project. In Firebase Console, open Authentication, click Get started, enable Email/Password, then create your admin user.");
      } else if (error.code === "auth/invalid-credential") {
        setNotice("Email or password is incorrect. Confirm that this user exists in Firebase Authentication.");
      } else {
        setNotice(error.message || "Unable to sign in.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    setBusy(true);
    setNotice("Publishing changes...");
    try {
      await Promise.all([saveContent("profile", profile), saveContent("contact", contact), saveContent("skills", skills), replaceProjects(projects)]);
      setNotice(hasFirebaseConfig ? "Published to Firebase." : "Saved locally. Add Firebase variables for shared publishing.");
    } catch (error) { setNotice(formatFirebaseError(error, "publish changes")); }
    finally { setBusy(false); }
  }

  async function handleMedia(event, target, key) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try { const url = await uploadToCloudinary(file); target === "profile" ? setProfile((value) => ({ ...value, [key]: url })) : setNewProject((value) => ({ ...value, [key]: url })); setNotice("Media uploaded. Save changes to publish it."); }
    catch (error) { setNotice(error.message); }
    finally { setBusy(false); }
  }

  function addProject(event) {
    event.preventDefault();
    if (!newProject.title || !newProject.description) return;
    setProjects((current) => [...current, { ...newProject, id: crypto.randomUUID(), tech: newProject.techInput?.split(",").map((item) => item.trim()).filter(Boolean) || [] }]);
    setNewProject(emptyProject);
  }

  if (!user) return <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 py-24 text-white sm:px-6 sm:py-28"><form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#0d1b2e] p-5 shadow-2xl sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">MSI.dev studio</p><h1 className="mt-3 text-3xl font-bold">Your site, in your hands.</h1><p className="mt-3 text-sm leading-6 text-slate-400">Sign in to edit every visible section and publish media without touching code.</p><div className="mt-8 space-y-4"><input className={inputClass} aria-label="Email" type="email" placeholder="Email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} required /><input className={inputClass} aria-label="Password" type="password" placeholder="Password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} required /></div><button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-[#07111f] hover:bg-cyan-200 disabled:opacity-50"><LogIn size={17} /> {busy ? "Signing in..." : "Sign in"}</button><p className="mt-5 text-xs text-slate-500">Local demo: admin@msi.dev / admin123</p>{notice && <p className="mt-4 break-words text-sm text-amber-300">{notice}</p>}</form></main>;

  if (loadingContent) return <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-4 py-24 text-white"><div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0d1b2e] px-5 py-6 text-center"><p className="font-semibold text-cyan-300">Loading your content</p><p className="mt-2 text-sm text-slate-400">This will stop automatically if Firebase is unreachable.</p></div></main>;

  return <main className="min-h-screen bg-[#07111f] px-4 py-24 text-white sm:px-8 sm:py-28 lg:px-12 xl:px-20"><div className="mx-auto min-w-0 max-w-7xl"><header className="flex flex-col gap-5 border-b border-slate-700 pb-8 lg:flex-row lg:items-end lg:justify-between"><div className="min-w-0"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">MSI.dev studio</p><h1 className="mt-3 break-words text-3xl font-bold sm:text-4xl">Edit your whole site</h1><p className="mt-3 text-slate-400">{hasFirebaseConfig ? "Connected to Firebase" : "Local preview mode"}</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><button type="button" disabled={busy} onClick={handleSave} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-[#07111f] disabled:opacity-50 sm:flex-none"><Save size={17} /> {busy ? "Working..." : "Publish changes"}</button><button type="button" onClick={() => { if (hasFirebaseConfig) signOut(auth); else { window.sessionStorage.removeItem("msi-admin-session"); setUser(null); } }} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-slate-300 sm:flex-none"><LogOut size={17} /> Log out</button></div></header>{notice && <p className="mt-6 break-words rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-cyan-200">{notice}</p>}
      <div className="mt-10 grid gap-8 xl:grid-cols-2">
        <EditorSection title="Hero & about"><div className="grid gap-4 sm:grid-cols-2">{[["heroGreeting", "Hero heading"], ["heroIntro", "Hero introduction"], ["name", "Full name"], ["role", "Role"], ["location", "Location"], ["email", "Email"], ["phone", "Phone"], ["aboutTitle", "About heading"]].map(([key, label]) => <input key={key} className={inputClass} value={profile[key] || ""} placeholder={label} aria-label={label} onChange={(event) => setProfile({ ...profile, [key]: event.target.value })} />)}<textarea className={`${inputClass} sm:col-span-2`} rows={4} value={profile.aboutText || ""} placeholder="About text" aria-label="About text" onChange={(event) => setProfile({ ...profile, aboutText: event.target.value })} /><textarea className={`${inputClass} sm:col-span-2`} rows={3} value={profile.summary || ""} placeholder="Resume profile" aria-label="Resume profile" onChange={(event) => setProfile({ ...profile, summary: event.target.value })} /></div><MediaField label="Hero image" value={profile.heroImage} onChange={(event) => handleMedia(event, "profile", "heroImage")} /><MediaField label="Profile image" value={profile.profileImage} onChange={(event) => handleMedia(event, "profile", "profileImage")} /><MediaField label="PDF CV" accept=".pdf,application/pdf" value={profile.cvUrl} onChange={(event) => handleMedia(event, "profile", "cvUrl")} /></EditorSection>
        <EditorSection title="Contact & social links"><input className={inputClass} value={contact.heading} placeholder="Contact heading" aria-label="Contact heading" onChange={(event) => setContact({ ...contact, heading: event.target.value })} /><textarea className={inputClass} rows={3} value={contact.intro} placeholder="Contact introduction" aria-label="Contact introduction" onChange={(event) => setContact({ ...contact, intro: event.target.value })} /><input className={inputClass} value={contact.upwork} placeholder="Upwork URL" aria-label="Upwork URL" onChange={(event) => setContact({ ...contact, upwork: event.target.value })} />{Object.entries(contact.socials).map(([key, value]) => <input key={key} className={inputClass} value={value} placeholder={`${key} URL`} aria-label={`${key} URL`} onChange={(event) => setContact({ ...contact, socials: { ...contact.socials, [key]: event.target.value } })} />)}<input className={inputClass} value={skills.join(", ")} placeholder="Skills separated by commas" aria-label="Skills" onChange={(event) => setSkills(event.target.value.split(",").map((skill) => skill.trim()).filter(Boolean))} /></EditorSection>
        <EditorSection title="Projects"><div className="space-y-3">{projects.map((project) => <div key={project.id} className="flex items-start justify-between gap-4 border-b border-slate-700 pb-3"><div><p className="font-semibold">{project.title}</p><p className="text-sm text-slate-400">{project.category === "mobile" ? "Android & iOS" : "Web development"}</p></div><button type="button" aria-label={`Delete ${project.title}`} onClick={async () => { const remaining = projects.filter((item) => item.id !== project.id); setProjects(remaining); await deleteProject(project.id); setNotice(`${project.title} deleted.`); }} className="text-slate-400 hover:text-red-300"><Trash2 size={17} /></button></div>)}</div><form onSubmit={addProject} className="mt-6 grid gap-3 sm:grid-cols-2"><input className={inputClass} aria-label="Project title" placeholder="Project title" value={newProject.title} onChange={(event) => setNewProject({ ...newProject, title: event.target.value })} required /><select className={inputClass} aria-label="Project category" value={newProject.category} onChange={(event) => setNewProject({ ...newProject, category: event.target.value })}><option value="web">Web development</option><option value="mobile">Android & iOS</option></select><input className={`${inputClass} sm:col-span-2`} aria-label="Project technologies" placeholder="React, comma separated" value={newProject.techInput || ""} onChange={(event) => setNewProject({ ...newProject, techInput: event.target.value })} /><input className={`${inputClass} sm:col-span-2`} aria-label="Live project URL" placeholder="Live project URL" value={newProject.link} onChange={(event) => setNewProject({ ...newProject, link: event.target.value })} /><input className={`${inputClass} sm:col-span-2`} aria-label="GitHub URL" placeholder="GitHub repository URL (optional)" value={newProject.github} onChange={(event) => setNewProject({ ...newProject, github: event.target.value })} /><textarea className={`${inputClass} sm:col-span-2`} aria-label="Project description" placeholder="Description" value={newProject.description} onChange={(event) => setNewProject({ ...newProject, description: event.target.value })} required /><MediaField label="Project image" value={newProject.image} onChange={(event) => handleMedia(event, "project", "image")} /><button className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300 px-4 py-3 font-semibold text-cyan-300 hover:bg-cyan-300 hover:text-[#07111f]"><Plus size={17} /> Add project</button></form></EditorSection>
        <EditorSection title={`Messages (${messages.filter((message) => message.status === "unread").length} unread)`}>{messages.length === 0 ? <p className="text-sm text-slate-400">No messages yet.</p> : <div className="min-w-0 space-y-3">{messages.map((message) => <article key={message.id} onClick={() => handleMessageOpen(message)} className={`min-w-0 overflow-hidden rounded-xl border p-4 ${message.status === "unread" ? "border-cyan-300/60 bg-cyan-300/5" : "border-slate-700"}`}><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="break-words font-semibold">{message.subject}</p><p className="mt-1 break-all text-sm text-cyan-200">{message.name} · {message.email}</p></div><div className="flex shrink-0 items-center gap-3"><time className="text-xs text-slate-500">{new Date(message.createdAt).toLocaleString()}</time><button type="button" aria-label={`Delete message from ${message.name}`} onClick={async (event) => { event.stopPropagation(); await deleteMessage(message.id); setMessages((current) => current.filter((item) => item.id !== message.id)); setNotice("Message deleted."); }} className="text-slate-400 hover:text-red-300"><Trash2 size={16} /></button></div></div><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{message.message}</p><a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`} onClick={() => handleMessageOpen(message)} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">Reply by email</a></article>)}</div>}</EditorSection>
      </div></div></main>;
}

function EditorSection({ title, children }) { return <section className="min-w-0 rounded-3xl border border-slate-700 bg-[#0d1b2e] p-4 sm:p-6"><h2 className="mb-5 text-xl font-semibold text-cyan-300">{title}</h2><div className="min-w-0 space-y-4">{children}</div></section>; }
function MediaField({ label, value, onChange, accept = "image/*" }) { return <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-slate-600 bg-[#07111f] p-4"><span className="min-w-0"><span className="block text-sm font-medium">{label}</span><span className="mt-1 block truncate text-xs text-slate-500">{value || "No file uploaded"}</span></span><span className="shrink-0 rounded-lg bg-slate-700 p-2 text-cyan-300"><ImagePlus size={18} /><input className="hidden" type="file" accept={accept} onChange={onChange} /></span></label>; }

function formatFirebaseError(error, action) {
  if (error?.code === "permission-denied") {
    return `Firebase denied permission to ${action}. Publish firestore.rules in Firebase Console, then sign out and sign in again.`;
  }
  return error?.message || `Could not ${action}.`;
}
