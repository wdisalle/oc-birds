import { useState, useEffect } from "react";

// ─── EBIRD KEY ───────────────────────────────────────────────────────────────
/* global process */
const EBIRD_KEY = (() => {
  try { return process.env.REACT_APP_EBIRD_KEY || ""; } catch { return ""; }
})();

// ─── HIKE + BIRD DATA ────────────────────────────────────────────────────────
// Photos are stored separately in /public/birds.json and loaded at runtime.
// Each bird references its key in that file via `photoKey`.
// To add/fix photos: edit birds.json only — no code changes needed.
const hikes = [
  {
    id: 1,
    name: "San Joaquin Wildlife Sanctuary",
    location: "Irvine",
    duration: "45 min – 2 hrs",
    distance: "1–4 mi (your choice)",
    difficulty: "Easy",
    highlight: "OC's #1 birding hotspot. 325+ species recorded. Sea & Sage Audubon chapter HQ on site. Flat, stroller-friendly paths around managed ponds.",
    terrain: "Paved & dirt, stroller-friendly",
    parking: "Free",
    color: "#2d6a8f",
    emoji: "🦆",
    eBirdHotspot: "L109339",
    eBirdUrl: "https://ebird.org/hotspot/L109339",
    birds: [
      { name: "Great Blue Heron",   sciName: "Ardea herodias",          photoKey: "great-blue-heron",   note: "Standing nearly 4 ft tall, this prehistoric-looking wader is hard to miss along the pond edges.", audubon: "https://www.audubon.org/field-guide/bird/great-blue-heron" },
      { name: "Black-necked Stilt", sciName: "Himantopus mexicanus",    photoKey: "black-necked-stilt", note: "Unmistakable pied bird on absurdly long pink legs. Noisily defends its nest — kids love the drama.", audubon: "https://www.audubon.org/field-guide/bird/black-necked-stilt" },
      { name: "American Avocet",    sciName: "Recurvirostra americana", photoKey: "american-avocet",    note: "Elegant shorebird with a long upturned bill it sweeps side-to-side. Vivid russet head in breeding plumage.", audubon: "https://www.audubon.org/field-guide/bird/american-avocet" },
      { name: "Snowy Egret",        sciName: "Egretta thula",           photoKey: "snowy-egret",        note: "Bright white with yellow feet it uses to stir up fish. Once hunted to near extinction for its plumes.", audubon: "https://www.audubon.org/field-guide/bird/snowy-egret" },
      { name: "Osprey",             sciName: "Pandion haliaetus",       photoKey: "osprey",             note: "Fish-hunting raptor that hovers then plunge-dives feet-first into water. A crowd favorite.", audubon: "https://www.audubon.org/field-guide/bird/osprey" },
      { name: "Least Bell's Vireo", sciName: "Vireo bellii pusillus",   photoKey: "least-bells-vireo", note: "Federally endangered. Arrives each May to nest in willows. Hearing it is easier than seeing it.", audubon: "https://www.audubon.org/field-guide/bird/bells-vireo" },
    ],
  },
  {
    id: 2,
    name: "Bommer Canyon Preserve",
    location: "Irvine",
    duration: "30–90 min",
    distance: "2 mi easy loop or 4.8 mi full",
    difficulty: "Easy–Moderate",
    highlight: "CA's first National Natural Landmark. Ancient oak & sycamore groves, historic cattle camp. Roadrunners and Quail sightings are common.",
    terrain: "Hard-packed dirt, some gentle hills",
    parking: "Free at trailhead",
    color: "#8f6a3a",
    emoji: "🌳",
    eBirdHotspot: "L757113",
    eBirdUrl: "https://ebird.org/hotspot/L757113",
    birds: [
      { name: "California Quail",   sciName: "Callipepla californica",  photoKey: "california-quail",   note: "CA state bird! Look for coveys trotting along the trail with their comical topknot plumes bobbing.", audubon: "https://www.audubon.org/field-guide/bird/california-quail" },
      { name: "Greater Roadrunner", sciName: "Geococcyx californianus", photoKey: "greater-roadrunner", note: "Yes, like the cartoon! Runs up to 20 mph and eats rattlesnakes. Kids absolutely love this one.", audubon: "https://www.audubon.org/field-guide/bird/greater-roadrunner" },
      { name: "Acorn Woodpecker",   sciName: "Melanerpes formicivorus", photoKey: "acorn-woodpecker",   note: "Clown-faced woodpecker with a raucous waka-waka call. Drills acorns into storage trees — look for studded oaks.", audubon: "https://www.audubon.org/field-guide/bird/acorn-woodpecker" },
      { name: "White-tailed Kite",  sciName: "Elanus leucurus",         photoKey: "white-tailed-kite",  note: "Ghost-white raptor that hovers like a tiny helicopter over open meadows before dropping on prey.", audubon: "https://www.audubon.org/field-guide/bird/white-tailed-kite" },
      { name: "Wrentit",            sciName: "Chamaea fasciata",        photoKey: "wrentit",            note: "Heard far more than seen — its bouncing-ball song is the signature sound of California chaparral.", audubon: "https://www.audubon.org/field-guide/bird/wrentit" },
    ],
  },
  {
    id: 3,
    name: "Crystal Cove State Park",
    location: "Newport Coast",
    duration: "45 min – 2 hrs",
    distance: "2.2 mi (Moro Canyon loop) or longer",
    difficulty: "Easy–Moderate",
    highlight: "OC's largest open space with 2,400 acres. Moro Canyon is the best kid-friendly route — creek, oaks, wildlife and ocean views at the top.",
    terrain: "Dirt canyon trail, some incline",
    parking: "$15/vehicle (Reserve America)",
    color: "#4a7c59",
    emoji: "🌊",
    eBirdHotspot: "L210238",
    eBirdUrl: "https://ebird.org/hotspot/L210238",
    birds: [
      { name: "California Towhee",      sciName: "Melozone crissalis",      photoKey: "california-towhee",      note: "Chunky brown bird that scratches loudly in leaf litter. Very common on canyon trails.", audubon: "https://www.audubon.org/field-guide/bird/california-towhee" },
      { name: "Anna's Hummingbird",     sciName: "Calypte anna",            photoKey: "annas-hummingbird",     note: "Year-round resident. Males flash iridescent magenta-rose heads. Buzzes along the coastal sage scrub.", audubon: "https://www.audubon.org/field-guide/bird/annas-hummingbird" },
      { name: "California Gnatcatcher", sciName: "Polioptila californica",  photoKey: "california-gnatcatcher", note: "Federally threatened. Tiny dark bird with a mewing call. Moro Canyon is prime protected habitat.", audubon: "https://www.audubon.org/field-guide/bird/california-gnatcatcher" },
      { name: "Peregrine Falcon",       sciName: "Falco peregrinus",        photoKey: "peregrine-falcon",       note: "World's fastest animal at 200+ mph in a dive. Nests on coastal cliffs here.", audubon: "https://www.audubon.org/field-guide/bird/peregrine-falcon" },
      { name: "Brown Pelican",          sciName: "Pelecanus occidentalis",  photoKey: "brown-pelican",          note: "Squadrons fly in formation along the coast below — visible from the upper ridge.", audubon: "https://www.audubon.org/field-guide/bird/brown-pelican" },
      { name: "Nuttall's Woodpecker",   sciName: "Dryobates nuttallii",     photoKey: "nuttalls-woodpecker",   note: "CA-endemic woodpecker. Black-and-white ladder back, rattling call in the canyon oaks.", audubon: "https://www.audubon.org/field-guide/bird/nuttalls-woodpecker" },
    ],
  },
  {
    id: 4,
    name: "Peters Canyon Regional Park",
    location: "Orange / Tustin",
    duration: "45–90 min",
    distance: "2.5 mi (North Loop)",
    difficulty: "Easy",
    highlight: "54-acre reservoir draws 100+ migratory species. OC Parks hosts free guided birdwatching hikes here seasonally.",
    terrain: "Dirt trail, flat to gentle",
    parking: "$3/vehicle",
    color: "#6a4a8f",
    emoji: "🏞️",
    eBirdHotspot: "L285193",
    eBirdUrl: "https://ebird.org/hotspot/L285193",
    birds: [
      { name: "Cactus Wren",    sciName: "Campylorhynchus brunneicapillus", photoKey: "cactus-wren",    note: "Largest US wren — its loud rattling call sounds like a car failing to start. Year-round resident.", audubon: "https://www.audubon.org/field-guide/bird/cactus-wren" },
      { name: "Red-tailed Hawk",sciName: "Buteo jamaicensis",               photoKey: "red-tailed-hawk",note: "The classic soaring hawk. Watch for its brick-red tail against the blue sky over the reservoir.", audubon: "https://www.audubon.org/field-guide/bird/red-tailed-hawk" },
      { name: "Western Bluebird",sciName: "Sialia mexicana",                photoKey: "western-bluebird",note: "Stunning cobalt blue with a rusty chest. Watch for them perching on fence posts near the meadow.", audubon: "https://www.audubon.org/field-guide/bird/western-bluebird" },
      { name: "American Coot",  sciName: "Fulica americana",                photoKey: "american-coot",  note: "Comical black waterbird with a white beak. Often seen with fuzzy red-headed chicks in spring.", audubon: "https://www.audubon.org/field-guide/bird/american-coot" },
      { name: "Cooper's Hawk",  sciName: "Accipiter cooperii",              photoKey: "coopers-hawk",   note: "Fast, nimble hawk. Often seen darting through the eucalyptus groves near the reservoir.", audubon: "https://www.audubon.org/field-guide/bird/coopers-hawk" },
    ],
  },
  {
    id: 5,
    name: "Quail Hill Loop Trail",
    location: "Irvine",
    duration: "30–60 min",
    distance: "2.7 mi loop",
    difficulty: "Easy",
    highlight: "Open space preserve in the heart of Irvine. Great 360° views of city and mountains. Kids love the wide flat path and frequent quail sightings.",
    terrain: "Paved & hard-packed dirt, open hills",
    parking: "Free at Quail Hill Community Park",
    color: "#8f7a2d",
    emoji: "🌾",
    eBirdHotspot: "L632002",
    eBirdUrl: "https://ebird.org/hotspot/L632002",
    birds: [
      { name: "California Quail",      sciName: "Callipepla californica", photoKey: "california-quail",      note: "The trail is named for these birds. Large coveys are common year-round along the brushy edges.", audubon: "https://www.audubon.org/field-guide/bird/california-quail" },
      { name: "Say's Phoebe",          sciName: "Sayornis saya",          photoKey: "says-phoebe",           note: "Tawny-bellied flycatcher that perches on fence posts and bobs its tail. Very approachable.", audubon: "https://www.audubon.org/field-guide/bird/says-phoebe" },
      { name: "White-crowned Sparrow", sciName: "Zonotrichia leucophrys", photoKey: "white-crowned-sparrow", note: "Bold black-and-white striped head. Winters here in large flocks scratching through the brush.", audubon: "https://www.audubon.org/field-guide/bird/white-crowned-sparrow" },
      { name: "Northern Harrier",      sciName: "Circus hudsonius",       photoKey: "northern-harrier",      note: "Low-flying hawk with a distinctive white rump patch. Quarters over open grassland hunting by sound.", audubon: "https://www.audubon.org/field-guide/bird/northern-harrier" },
      { name: "Loggerhead Shrike",     sciName: "Lanius ludovicianus",    photoKey: "loggerhead-shrike",     note: "A songbird that hunts like a hawk. Nicknamed 'butcherbird' — impales prey on thorns.", audubon: "https://www.audubon.org/field-guide/bird/loggerhead-shrike" },
    ],
  },
  {
    id: 6,
    name: "Laguna Coast Wilderness",
    location: "Laguna Beach / Irvine",
    duration: "45 min – 1.5 hrs",
    distance: "2–3.5 mi",
    difficulty: "Easy–Moderate",
    highlight: "One of the last intact coastal sage scrub ecosystems in SoCal. Free Saturday naturalist-led walks. Butterflies, lizards, and birds everywhere.",
    terrain: "Dirt trail, some rocky sections",
    parking: "Free at Nix Nature Center (weekends)",
    color: "#5a8f3a",
    emoji: "🦋",
    eBirdHotspot: "L3135598",
    eBirdUrl: "https://ebird.org/hotspot/L3135598",
    birds: [
      { name: "Wrentit",                sciName: "Chamaea fasciata",       photoKey: "wrentit",                note: "The voice of the chaparral. Almost never leaves dense brush — its song is unmissable.", audubon: "https://www.audubon.org/field-guide/bird/wrentit" },
      { name: "Costa's Hummingbird",    sciName: "Calypte costae",         photoKey: "costas-hummingbird",    note: "Male has a stunning purple gorget that flares like a mustache. A desert species extending into OC's coastal sage.", audubon: "https://www.audubon.org/field-guide/bird/costas-hummingbird" },
      { name: "Rufous-crowned Sparrow", sciName: "Aimophila ruficeps",     photoKey: "rufous-crowned-sparrow", note: "Shy, chunky sparrow of rocky slopes and sage scrub. Rusty cap and 'dear dear dear' call.", audubon: "https://www.audubon.org/field-guide/bird/rufous-crowned-sparrow" },
      { name: "California Gnatcatcher", sciName: "Polioptila californica", photoKey: "california-gnatcatcher", note: "Federally threatened. Laguna Coast Wilderness is one of its last strongholds in OC.", audubon: "https://www.audubon.org/field-guide/bird/california-gnatcatcher" },
      { name: "Greater Roadrunner",     sciName: "Geococcyx californianus",photoKey: "greater-roadrunner",    note: "Spotted regularly trotting along trail edges. Eats lizards, snakes, and even other birds.", audubon: "https://www.audubon.org/field-guide/bird/greater-roadrunner" },
    ],
  },
  {
  id: 7,
  name: "O'Neill Regional Park",
  location: "Trabuco Canyon / Irvine",
  duration: "30 min – 2 hrs",
  distance: "1–3.5 mi (your choice)",
  difficulty: "Easy",
  highlight: "Closest canyon park to Irvine. Riparian oak woodland along Trabuco Creek — great for birding the creek corridor. Family-friendly trails and shaded picnic areas.",
  terrain: "Dirt trail, flat to gentle",
  parking: "$3/vehicle",
  color: "#3a7a8f",
  emoji: "🌲",
  eBirdHotspot: "L374421",
  eBirdUrl: "https://ebird.org/hotspot/L374421",
  birds: [
    { name: "Yellow Warbler", sciName: "Setophaga petechia", photoKey: "yellow-warbler", note: "Bright lemon-yellow songbird that favors streamside willows. A summer breeder along Trabuco Creek.", audubon: "https://www.audubon.org/field-guide/bird/yellow-warbler" },
    { name: "Black Phoebe", sciName: "Sayornis nigricans", photoKey: "black-phoebe", note: "Sooty black-and-white flycatcher that perches low near water, flicking its tail. Common year-round along the creek.", audubon: "https://www.audubon.org/field-guide/bird/black-phoebe" },
    { name: "Hooded Oriole", sciName: "Icterus cucullatus", photoKey: "hooded-oriole", note: "Vivid orange-and-black oriole drawn to palm trees and riparian groves. Listen for its chattering call overhead.", audubon: "https://www.audubon.org/field-guide/bird/hooded-oriole" },
    { name: "California Towhee", sciName: "Melozone crissalis", photoKey: "california-towhee", note: "Plain brown bird that scratches loudly in leaf litter near the trailheads. One of the most common birds at the park.", audubon: "https://www.audubon.org/field-guide/bird/california-towhee" },
    { name: "Bewick's Wren", sciName: "Thryomanes bewickii", photoKey: "bewickss-wren", note: "Energetic little wren with a bold white eyebrow stripe. Sings a loud, complex song from dense brush.", audubon: "https://www.audubon.org/field-guide/bird/bewicks-wren" },
  ],
},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getMerlinUrl(bird) {
  return `https://merlin.allaboutbirds.org/the-only-one/?species=${encodeURIComponent(bird.sciName)}`;
}

async function fetchRecentSightings(hotspotId) {
  if (!EBIRD_KEY) return null;
  try {
    const res = await fetch(
      `https://api.ebird.org/v2/data/obs/${hotspotId}/recent?back=14&maxResults=30`,
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function daysAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  return `${diff}d ago`;
}

const difficultyColor = { "Easy": "#4a7c59", "Easy–Moderate": "#c07a2a", "Moderate": "#c0392b" };

// ─── PHOTO VARIANT TOGGLE ────────────────────────────────────────────────────
function PhotoVariants({ photos, color }) {
  const [idx, setIdx] = useState(0);
  if (!photos || photos.length === 0) return <div style={{ width: "100%", height: "100%", background: "#e8e0d0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 28 }}>🐦</span></div>;
  const photo = photos[idx];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img src={photo.url} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
      {photos.length > 1 && (
        <div style={{ position: "absolute", bottom: 4, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 4, padding: "0 4px" }}>
          {photos.map((p, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
              style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, border: "none", background: i === idx ? color : "rgba(255,255,255,0.7)", color: i === idx ? "#fff" : "#333", cursor: "pointer", fontWeight: i === idx ? 700 : 400, whiteSpace: "nowrap" }}>
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BIRD DETAIL PHOTO ───────────────────────────────────────────────────────
function DetailPhoto({ photos, color }) {
  const [idx, setIdx] = useState(0);
  if (!photos || photos.length === 0) return <div style={{ width: 90, height: 72, background: "#e8e0d0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 28 }}>🐦</span></div>;
  const photo = photos[idx];
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ width: 90, height: 72, borderRadius: 8, overflow: "hidden", position: "relative" }}>
        <img src={photo.url} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
      </div>
      {photos.length > 1 && (
        <div style={{ display: "flex", gap: 3, marginTop: 5, flexWrap: "wrap", maxWidth: 90 }}>
          {photos.map((p, i) => (
            <button key={i} onClick={() => setIdx(i)}
              style={{ fontSize: 9, padding: "2px 5px", borderRadius: 8, border: `1px solid ${i === idx ? color : "#ccc"}`, background: i === idx ? color : "#fff", color: i === idx ? "#fff" : "#555", cursor: "pointer", fontWeight: i === idx ? 700 : 400, whiteSpace: "nowrap" }}>
              {p.label}
            </button>
          ))}
        </div>
      )}
      {photo.credit && <div style={{ fontSize: 8, color: "#aaa", marginTop: 3, maxWidth: 90, lineHeight: 1.2 }}>{photo.credit}</div>}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeHike, setActiveHike] = useState(hikes[0]);
  const [activeBird, setActiveBird] = useState(null);
  const [eBirdData, setEBirdData] = useState({});
  const [eBirdLoading, setEBirdLoading] = useState(false);
  const [showEBird, setShowEBird] = useState(false);
  const [birdPhotos, setBirdPhotos] = useState({});
  const hasKey = Boolean(EBIRD_KEY);

  // Load birds.json once on mount
  useEffect(() => {
    fetch("/birds.json")
      .then(r => r.json())
      .then(data => {
        const photos = {};
        for (const [key, val] of Object.entries(data)) {
          if (key !== "_readme") photos[key] = val.photos || [];
        }
        setBirdPhotos(photos);
      })
      .catch(() => {}); // graceful failure — app works without photos
  }, []);

  // Load eBird sightings when trail changes
  useEffect(() => {
    setActiveBird(null);
    setShowEBird(false);
    if (!hasKey || eBirdData[activeHike.id] !== undefined) return;
    setEBirdLoading(true);
    fetchRecentSightings(activeHike.eBirdHotspot).then(data => {
      setEBirdData(prev => ({ ...prev, [activeHike.id]: data || [] }));
      setEBirdLoading(false);
    });
  }, [activeHike.id, hasKey]);

  const currentEBird = eBirdData[activeHike.id] || [];

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", minHeight: "100vh", background: "linear-gradient(160deg,#f5f0e8 0%,#e8f0e8 50%,#e8eaf5 100%)", paddingBottom: 48 }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#1a3a2a 0%,#2d5a3d 60%,#1a2a3a 100%)", padding: "28px 20px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#a8c8a8", textTransform: "uppercase", marginBottom: 6 }}>Orange County, California</div>
          <h1 style={{ margin: 0, fontSize: "clamp(20px,5vw,32px)", fontWeight: 400, color: "#f0ede0", lineHeight: 1.2, fontStyle: "italic" }}>
            Kid-Friendly Hikes<br />
            <span style={{ fontStyle: "normal", fontWeight: 700, letterSpacing: 1 }}>&amp; the Birds You'll Find</span>
          </h1>
          <p style={{ margin: "10px 0 0", color: "#8ab88a", fontSize: 12, letterSpacing: 1 }}>
            {hikes.length} trails · 30 min–2 hrs · live eBird data
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 14px" }}>

        {/* TRAIL SELECTOR */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "20px 0 8px" }}>
          {hikes.map(h => (
            <button key={h.id} onClick={() => setActiveHike(h)}
              style={{ flex: "1 1 130px", padding: "12px 14px", border: `2px solid ${activeHike.id === h.id ? h.color : "#d0c8b8"}`, borderRadius: 10, background: activeHike.id === h.id ? h.color : "#faf8f3", color: activeHike.id === h.id ? "#fff" : "#3a3028", cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{h.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{h.name}</div>
              <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{h.location}</div>
            </button>
          ))}
        </div>

        {/* TRAIL CARD */}
        <div style={{ background: "#fff", borderRadius: 14, border: `2px solid ${activeHike.color}30`, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>

          {/* Trail header */}
          <div style={{ background: `${activeHike.color}15`, borderBottom: `1px solid ${activeHike.color}25`, padding: "18px 20px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <h2 style={{ margin: "0 0 5px", fontSize: 18, color: "#1a2a1a", fontWeight: 700 }}>{activeHike.emoji} {activeHike.name}</h2>
                <p style={{ margin: 0, fontSize: 13, color: "#4a5a4a", lineHeight: 1.5 }}>{activeHike.highlight}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: 11 }}>
                {[["⏱", activeHike.duration], ["📍", activeHike.distance], ["🥾", activeHike.terrain], ["🅿️", activeHike.parking]].map(([icon, val]) => (
                  <div key={val} style={{ background: "#fff", border: `1px solid ${activeHike.color}40`, borderRadius: 20, padding: "4px 10px", whiteSpace: "nowrap", color: "#3a3028" }}>{icon} {val}</div>
                ))}
                <div style={{ background: difficultyColor[activeHike.difficulty] || "#888", color: "#fff", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>{activeHike.difficulty}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <a href={activeHike.eBirdUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: activeHike.color, fontWeight: 700, textDecoration: "none", border: `1px solid ${activeHike.color}60`, borderRadius: 20, padding: "4px 12px", background: `${activeHike.color}0d` }}>
                📊 View Full eBird Hotspot →
              </a>
              {hasKey ? (
                <button onClick={() => setShowEBird(v => !v)}
                  style={{ fontSize: 11, color: "#fff", fontWeight: 700, border: "none", borderRadius: 20, padding: "4px 12px", background: activeHike.color, cursor: "pointer" }}>
                  {showEBird ? "Hide" : "🔴 Live"} Recent Sightings {eBirdLoading ? "…" : `(${currentEBird.length})`}
                </button>
              ) : (
                <span style={{ fontSize: 11, color: "#8a7a6a", fontStyle: "italic" }}>Add REACT_APP_EBIRD_KEY on Vercel to enable live sightings</span>
              )}
            </div>
          </div>

          {/* LIVE EBIRD PANEL */}
          {showEBird && hasKey && (
            <div style={{ borderBottom: `1px solid ${activeHike.color}20`, padding: "14px 20px", background: `${activeHike.color}08` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#8a7a6a", marginBottom: 10 }}>Live eBird — Last 14 Days</div>
              {eBirdLoading ? (
                <div style={{ color: "#8a7a6a", fontSize: 13 }}>Loading sightings…</div>
              ) : currentEBird.length === 0 ? (
                <div style={{ color: "#8a7a6a", fontSize: 13 }}>No recent sightings. Try the full hotspot link above.</div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {currentEBird.slice(0, 40).map((obs, i) => (
                    <div key={i} style={{ background: "#fff", border: `1px solid ${activeHike.color}30`, borderRadius: 8, padding: "5px 10px", fontSize: 11 }}>
                      <span style={{ fontWeight: 700, color: "#1a2a1a" }}>{obs.comName}</span>
                      <span style={{ color: "#8a7a6a", marginLeft: 5 }}>{daysAgo(obs.obsDt)}</span>
                      {obs.howMany && <span style={{ color: activeHike.color, marginLeft: 4 }}>×{obs.howMany}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BIRD GRID */}
          <div style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#8a7a6a", marginBottom: 12 }}>
              Featured Birds ({activeHike.birds.length} species)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8 }}>
              {activeHike.birds.map(bird => {
                const photos = birdPhotos[bird.photoKey] || [];
                return (
                  <button key={bird.name} onClick={() => setActiveBird(activeBird?.name === bird.name ? null : bird)}
                    style={{ border: `2px solid ${activeBird?.name === bird.name ? activeHike.color : "#e0d8cc"}`, borderRadius: 10, overflow: "hidden", background: activeBird?.name === bird.name ? `${activeHike.color}12` : "#faf8f3", cursor: "pointer", transition: "all 0.15s", padding: 0, textAlign: "left" }}>
                    <div style={{ width: "100%", height: 80, overflow: "hidden", position: "relative" }}>
                      <PhotoVariants photos={photos} color={activeHike.color} />
                    </div>
                    <div style={{ padding: "7px 9px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: "#1a2a1a", lineHeight: 1.2 }}>{bird.name}</div>
                      <div style={{ fontSize: 9, color: "#8a7a6a", fontStyle: "italic", marginTop: 2 }}>{bird.sciName}</div>
                      {photos.length > 1 && <div style={{ fontSize: 8, color: activeHike.color, marginTop: 2 }}>↕ {photos.length} photos</div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* BIRD DETAIL */}
            {activeBird && (
              <div style={{ marginTop: 14, background: `${activeHike.color}0d`, border: `1.5px solid ${activeHike.color}40`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
                <DetailPhoto photos={birdPhotos[activeBird.photoKey] || []} color={activeHike.color} />
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a2a1a" }}>{activeBird.name}</div>
                  <div style={{ fontSize: 11, fontStyle: "italic", color: "#6a7a6a", marginBottom: 7 }}>{activeBird.sciName}</div>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: "#3a3a3a", lineHeight: 1.6 }}>{activeBird.note}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <a href={activeBird.audubon} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-block", background: activeHike.color, color: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                      🔍 Audubon Guide →
                    </a>
                    <a href={getMerlinUrl(activeBird)} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-block", background: "#1a3a6a", color: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                      🎙️ Merlin ID →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <p style={{ textAlign: "center", fontSize: 11, color: "#8a7a6a", marginTop: 20, lineHeight: 1.7 }}>
          Tap any bird card to expand · Audubon links open full species profiles · Merlin opens Cornell Lab's ID app<br />
          <strong style={{ color: "#4a7c59" }}>Pro tip:</strong> Download <strong>Merlin Bird ID</strong> (free, Cornell Lab) before you go — it identifies birds by sound in real time 🎙️<br />
          Photos via <a href="https://www.inaturalist.org" target="_blank" rel="noopener noreferrer" style={{ color: activeHike.color }}>iNaturalist</a> · Live sightings via <a href="https://ebird.org" target="_blank" rel="noopener noreferrer" style={{ color: activeHike.color }}>eBird</a>
        </p>
      </div>

      <style>{`* { box-sizing: border-box; } button:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }`}</style>
    </div>
  );
}
