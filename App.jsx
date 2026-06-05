import { useState, useEffect } from "react";

// ─── EBIRD KEY ───────────────────────────────────────────────────────────────
// On Vercel: set REACT_APP_EBIRD_KEY in Environment Variables and redeploy.
// process.env is only available in the Vercel/CRA build — safe fallback for other envs.
/* global process */
const EBIRD_KEY = (() => {
  try { return process.env.REACT_APP_EBIRD_KEY || ""; } catch { return ""; }
})();

// ─── WIKIMEDIA CORS-SAFE IMAGE HELPER ────────────────────────────────────────
// Wikipedia direct thumb URLs are blocked by CORS on deployed sites.
// Special:Redirect/file serves the same image with proper CORS headers.
function wm(filename) {
  return `https://en.wikipedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=320`;
}

// ─── HIKE DATA ───────────────────────────────────────────────────────────────
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
    eBirdHotspot: "L200295",
    eBirdUrl: "https://ebird.org/hotspot/L200295",
    birds: [
      { name: "Great Blue Heron", sciName: "Ardea herodias", note: "Standing nearly 4 ft tall, this prehistoric-looking wader is hard to miss along the pond edges.", audubon: "https://www.audubon.org/field-guide/bird/great-blue-heron", img: wm("Great_Blue_Heron-27527-1.jpg") },
      { name: "Black-necked Stilt", sciName: "Himantopus mexicanus", note: "Unmistakable pied bird on absurdly long pink legs. Noisily defends its nest — kids love the drama.", audubon: "https://www.audubon.org/field-guide/bird/black-necked-stilt", img: wm("Himantopus_mexicanus_-Pillar_Point_Harbor,_California,_USA-8.jpg") },
      { name: "American Avocet", sciName: "Recurvirostra americana", note: "Elegant shorebird with a long upturned bill it sweeps side-to-side. Vivid russet head in breeding plumage.", audubon: "https://www.audubon.org/field-guide/bird/american-avocet", img: wm("AmericanAvocet23.jpg") },
      { name: "Snowy Egret", sciName: "Egretta thula", note: "Bright white with yellow feet it uses to stir up fish. Once hunted to near extinction for its plumes.", audubon: "https://www.audubon.org/field-guide/bird/snowy-egret", img: wm("SnowEgret23.jpg") },
      { name: "Osprey", sciName: "Pandion haliaetus", note: "Fish-hunting raptor that hovers then plunge-dives feet-first into water. A crowd favorite.", audubon: "https://www.audubon.org/field-guide/bird/osprey", img: wm("Pandion_haliaetus_-Cromer,_Norfolk,_England-8.jpg") },
      { name: "Least Bell's Vireo", sciName: "Vireo bellii pusillus", note: "Federally endangered. Arrives each May to nest in willows. Hearing it is easier than seeing it.", audubon: "https://www.audubon.org/field-guide/bird/bells-vireo", img: wm("Bell's_Vireo_(Vireo_bellii).jpg") },
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
    eBirdHotspot: "L1045960",
    eBirdUrl: "https://ebird.org/hotspot/L1045960",
    birds: [
      { name: "California Quail", sciName: "Callipepla californica", note: "CA state bird! Look for coveys trotting along the trail with their comical topknot plumes bobbing.", audubon: "https://www.audubon.org/field-guide/bird/california-quail", img: wm("California_Quail.jpg") },
      { name: "Greater Roadrunner", sciName: "Geococcyx californianus", note: "Yes, like the cartoon! Runs up to 20 mph and eats rattlesnakes. Kids go wild for it.", audubon: "https://www.audubon.org/field-guide/bird/greater-roadrunner", img: wm("GreaterRoadrunner18.jpg") },
      { name: "Acorn Woodpecker", sciName: "Melanerpes formicivorus", note: "Clown-faced woodpecker with a raucous 'waka-waka' call. Drills acorns into storage trees — look for studded oaks.", audubon: "https://www.audubon.org/field-guide/bird/acorn-woodpecker", img: wm("Acorn_Woodpecker.jpg") },
      { name: "White-tailed Kite", sciName: "Elanus leucurus", note: "Ghost-white raptor that hovers like a tiny helicopter over open meadows before dropping on prey.", audubon: "https://www.audubon.org/field-guide/bird/white-tailed-kite", img: wm("White-tailed_Kite_(Elanus_leucurus)_(5739647326).jpg") },
      { name: "Wrentit", sciName: "Chamaea fasciata", note: "Heard far more than seen — its bouncing-ball song is the signature sound of California chaparral.", audubon: "https://www.audubon.org/field-guide/bird/wrentit", img: wm("Chamaea_fasciata_1.jpg") },
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
    eBirdHotspot: "L23504131",
    eBirdUrl: "https://ebird.org/hotspot/L23504131",
    birds: [
      { name: "California Towhee", sciName: "Melozone crissalis", note: "Chunky brown bird that scratches loudly in leaf litter. Very common on canyon trails.", audubon: "https://www.audubon.org/field-guide/bird/california-towhee", img: wm("California_Towhee_(Melozone_crissalis).jpg") },
      { name: "Anna's Hummingbird", sciName: "Calypte anna", note: "Year-round resident. Males flash iridescent magenta-rose heads. Buzzes along the coastal sage scrub.", audubon: "https://www.audubon.org/field-guide/bird/annas-hummingbird", img: wm("Anna's_Hummingbird,_male_(Calypte_anna).jpg") },
      { name: "California Gnatcatcher", sciName: "Polioptila californica", note: "Federally threatened. Tiny dark bird with a mewing call. Moro Canyon is prime protected habitat.", audubon: "https://www.audubon.org/field-guide/bird/california-gnatcatcher", img: wm("California_Gnatcatcher_(Polioptila_californica).jpg") },
      { name: "Peregrine Falcon", sciName: "Falco peregrinus", note: "World's fastest animal at 200+ mph in a dive. Nests on coastal cliffs here.", audubon: "https://www.audubon.org/field-guide/bird/peregrine-falcon", img: wm("Falco_peregrinus_-British_Wildlife_Centre,_Surrey,_England-8a_(1).jpg") },
      { name: "Brown Pelican", sciName: "Pelecanus occidentalis", note: "Squadrons fly in formation along the coast below. Visible from the upper ridge — a favorite for kids to count.", audubon: "https://www.audubon.org/field-guide/bird/brown-pelican", img: wm("Brown_pelican_flying_over_water.jpg") },
      { name: "Nuttall's Woodpecker", sciName: "Dryobates nuttallii", note: "CA-endemic woodpecker found in oak woodlands. Black-and-white ladder back, rattling call in the canyon oaks.", audubon: "https://www.audubon.org/field-guide/bird/nuttalls-woodpecker", img: wm("Nuttall's_Woodpecker.jpg") },
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
      { name: "Cactus Wren", sciName: "Campylorhynchus brunneicapillus", note: "Largest US wren — its loud rattling call sounds like a car failing to start. Year-round resident.", audubon: "https://www.audubon.org/field-guide/bird/cactus-wren", img: wm("Campylorhynchus_brunneicapillus_-_Joshua_Tree_NP_-_2017_(28893891929).jpg") },
      { name: "Red-tailed Hawk", sciName: "Buteo jamaicensis", note: "The classic soaring hawk. Watch for its brick-red tail against the blue sky as it circles the reservoir.", audubon: "https://www.audubon.org/field-guide/bird/red-tailed-hawk", img: wm("Buteo_jamaicensis_-John_Heinz_National_Wildlife_Refuge_at_Tinicum_-_8a.jpg") },
      { name: "Western Bluebird", sciName: "Sialia mexicana", note: "Stunning cobalt blue with a rusty chest. Watch for them perching on fence posts near the meadow areas.", audubon: "https://www.audubon.org/field-guide/bird/western-bluebird", img: wm("Western_Bluebird_(Sialia_mexicana)_male.jpg") },
      { name: "American Coot", sciName: "Fulica americana", note: "Comical black waterbird with a white beak. Common on the reservoir, often seen with fuzzy chicks in spring.", audubon: "https://www.audubon.org/field-guide/bird/american-coot", img: wm("American_Coot_BI.jpg") },
      { name: "Cooper's Hawk", sciName: "Accipiter cooperii", note: "Fast, nimble forest hawk. Often seen darting through the eucalyptus groves near the reservoir.", audubon: "https://www.audubon.org/field-guide/bird/coopers-hawk", img: wm("Accipiter_cooperii_-Calvert_County,_Maryland,_USA_-juvenile-8.jpg") },
    ],
  },
  {
    id: 5,
    name: "Quail Hill Loop Trail",
    location: "Irvine",
    duration: "30–60 min",
    distance: "2.7 mi loop",
    difficulty: "Easy",
    highlight: "Open space preserve in the heart of Irvine. Great 360° views of the city and mountains. Kids love the wide flat path and frequent quail sightings.",
    terrain: "Paved & hard-packed dirt, open hills",
    parking: "Free at Quail Hill Community Park",
    color: "#8f7a2d",
    emoji: "🌾",
    eBirdHotspot: "L1572888",
    eBirdUrl: "https://ebird.org/hotspot/L1572888",
    birds: [
      { name: "California Quail", sciName: "Callipepla californica", note: "The trail is named for these birds. Large coveys are common year-round along the brushy trail edges.", audubon: "https://www.audubon.org/field-guide/bird/california-quail", img: wm("California_Quail.jpg") },
      { name: "Say's Phoebe", sciName: "Sayornis saya", note: "Tawny-bellied flycatcher that perches on fence posts and bobs its tail. Very approachable.", audubon: "https://www.audubon.org/field-guide/bird/says-phoebe", img: wm("Sayornis_saya_-_Say's_Phoebe.jpg") },
      { name: "White-crowned Sparrow", sciName: "Zonotrichia leucophrys", note: "Bold black-and-white striped head. Winters here in large flocks scratching through the brush.", audubon: "https://www.audubon.org/field-guide/bird/white-crowned-sparrow", img: wm("White-crowned_Sparrow_RWD2.jpg") },
      { name: "Northern Harrier", sciName: "Circus hudsonius", note: "Low-flying hawk with a distinctive white rump patch. Quarters over open grassland hunting by sound.", audubon: "https://www.audubon.org/field-guide/bird/northern-harrier", img: wm("Northern_Harrier,_Morro_Bay,_CA_-_Morro_Bay_Estuary_-_17_Oct_2007_-_male.jpg") },
      { name: "Loggerhead Shrike", sciName: "Lanius ludovicianus", note: "A songbird that hunts like a hawk. Nicknamed 'butcherbird' — impales prey on thorns.", audubon: "https://www.audubon.org/field-guide/bird/loggerhead-shrike", img: wm("Loggerhead_Shrike_2.jpg") },
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
    eBirdHotspot: "L1049518",
    eBirdUrl: "https://ebird.org/hotspot/L1049518",
    birds: [
      { name: "Wrentit", sciName: "Chamaea fasciata", note: "The 'voice of the chaparral.' Almost never leaves dense brush — its song is unmissable.", audubon: "https://www.audubon.org/field-guide/bird/wrentit", img: wm("Chamaea_fasciata_1.jpg") },
      { name: "Costa's Hummingbird", sciName: "Calypte costae", note: "Male has a stunning purple gorget that flares like a mustache. Desert species that extends into OC's coastal sage.", audubon: "https://www.audubon.org/field-guide/bird/costas-hummingbird", img: wm("Costa's_Hummingbird,_male_(Calypte_costae).jpg") },
      { name: "Rufous-crowned Sparrow", sciName: "Aimophila ruficeps", note: "Shy, chunky sparrow of rocky slopes and sage scrub. Rusty cap and 'dear dear dear' call.", audubon: "https://www.audubon.org/field-guide/bird/rufous-crowned-sparrow", img: wm("Rufous-crowned_sparrow.jpg") },
      { name: "California Gnatcatcher", sciName: "Polioptila californica", note: "Federally threatened. Laguna Coast Wilderness is one of its last OC strongholds.", audubon: "https://www.audubon.org/field-guide/bird/california-gnatcatcher", img: wm("California_Gnatcatcher_(Polioptila_californica).jpg") },
      { name: "Greater Roadrunner", sciName: "Geococcyx californianus", note: "Spotted regularly trotting along trail edges. Eats lizards, snakes, and even other birds.", audubon: "https://www.audubon.org/field-guide/bird/greater-roadrunner", img: wm("GreaterRoadrunner18.jpg") },
    ],
  },
];

// ─── MERLIN DEEP LINK ────────────────────────────────────────────────────────
function getMerlinUrl(bird) {
  return `https://merlin.allaboutbirds.org/the-only-one/?species=${encodeURIComponent(bird.sciName)}`;
}

// ─── EBIRD FETCH ─────────────────────────────────────────────────────────────
async function fetchRecentSightings(hotspotId) {
  if (!EBIRD_KEY) return null;
  try {
    const res = await fetch(
      `https://api.ebird.org/v2/data/obs/${hotspotId}/recent?back=14&maxResults=30`,
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const difficultyColor = {
  "Easy": "#4a7c59",
  "Easy–Moderate": "#c07a2a",
  "Moderate": "#c0392b",
};

function daysAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  return `${diff}d ago`;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeHike, setActiveHike] = useState(hikes[0]);
  const [activeBird, setActiveBird] = useState(null);
  const [eBirdData, setEBirdData] = useState({});
  const [eBirdLoading, setEBirdLoading] = useState(false);
  const [showEBird, setShowEBird] = useState(false);
  const hasKey = Boolean(EBIRD_KEY);

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
                <span style={{ fontSize: 11, color: "#8a7a6a", fontStyle: "italic" }}>
                  Add REACT_APP_EBIRD_KEY on Vercel to enable live sightings
                </span>
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
              {activeHike.birds.map(bird => (
                <button key={bird.name} onClick={() => setActiveBird(activeBird?.name === bird.name ? null : bird)}
                  style={{ border: `2px solid ${activeBird?.name === bird.name ? activeHike.color : "#e0d8cc"}`, borderRadius: 10, overflow: "hidden", background: activeBird?.name === bird.name ? `${activeHike.color}12` : "#faf8f3", cursor: "pointer", transition: "all 0.15s", padding: 0, textAlign: "left" }}>
                  <div style={{ width: "100%", height: 80, overflow: "hidden", background: "#e8e0d0" }}>
                    <img src={bird.img} alt={bird.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                  </div>
                  <div style={{ padding: "7px 9px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#1a2a1a", lineHeight: 1.2 }}>{bird.name}</div>
                    <div style={{ fontSize: 9, color: "#8a7a6a", fontStyle: "italic", marginTop: 2 }}>{bird.sciName}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* BIRD DETAIL */}
            {activeBird && (
              <div style={{ marginTop: 14, background: `${activeHike.color}0d`, border: `1.5px solid ${activeHike.color}40`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
                <img src={activeBird.img} alt={activeBird.name} style={{ width: 90, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />
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
          Live sightings powered by <a href="https://ebird.org" target="_blank" rel="noopener noreferrer" style={{ color: activeHike.color }}>eBird</a> (Cornell Lab of Ornithology)
        </p>
      </div>

      <style>{`* { box-sizing: border-box; } button:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }`}</style>
    </div>
  );
}
