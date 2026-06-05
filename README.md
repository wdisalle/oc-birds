# OC Hikes & Birds 🦅

Kid-friendly hike guide for Orange County with live eBird sightings,
Audubon field guide links, and Merlin Bird ID deep links.

---

## 🚀 Deploy to Vercel (Free — ~5 minutes)

### Step 1 — Get a free eBird API key
1. Go to https://ebird.org/api/keygen
2. Sign in or create a free eBird account
3. Copy your API key (looks like: `abc123xyz456`)

### Step 2 — Put the code on GitHub
1. Go to https://github.com and create a free account if needed
2. Click the green **New** button → name it `oc-birds` → click **Create repository**
3. On your new repo page, click **uploading an existing file**
4. Drag the entire contents of this folder into the upload window
5. Click **Commit changes**

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign in with your GitHub account
2. Click **Add New Project** → select your `oc-birds` repo → click **Import**
3. Before clicking Deploy, click **Environment Variables** and add:
   - Name:  `REACT_APP_EBIRD_KEY`
   - Value: (paste your eBird API key here)
4. Click **Deploy** — takes about 90 seconds
5. Vercel gives you a URL like `oc-birds.vercel.app` — that's your app!

### Step 4 — Add to your iPhone home screen
1. Open your Vercel URL in **Safari** on your iPhone
2. Tap the **Share** button (square with arrow at bottom)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** — it now appears as an app icon on your home screen ✅

### Step 5 — Share with others
Just send them your Vercel URL — it works on any phone, tablet, or computer.

---

## 🔑 eBird API Key (without GitHub/Vercel)

If you just want to test locally without deploying:
1. Open `src/App.jsx`
2. Find line: `const EBIRD_KEY = process.env.REACT_APP_EBIRD_KEY || "YOUR_EBIRD_KEY_HERE";`
3. Replace `YOUR_EBIRD_KEY_HERE` with your actual key

Without a key, the app still works — it just won't show the live "Recent Sightings"
panel. All bird cards, photos, Audubon links, and Merlin links work without it.

---

## Trails Included
1. San Joaquin Wildlife Sanctuary (Irvine) — #1 OC birding hotspot
2. Bommer Canyon Preserve (Irvine) — oaks, roadrunners, woodpeckers
3. Crystal Cove State Park (Newport Coast) — canyon + coastal views
4. Peters Canyon Regional Park (Orange/Tustin) — reservoir birding
5. Quail Hill Loop Trail (Irvine) — easy, city views, quail galore
6. Laguna Coast Wilderness – Willow Canyon — sage scrub specialist birds
