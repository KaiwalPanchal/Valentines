# 🎨 Design Documentation & Asset Sourcing Guide

> This is your **go-to document** for gathering every realistic texture, character illustration, sound effect, and design reference needed for a premium-quality website. Drop your chosen files into the corresponding `design_inspiration/` subfolder.

---

## 📂 Folder Structure

```
design_inspiration/
├── page0_landing/          ← Purple gradients, sparkle/star effects
├── page1_scratchcard/      ← Silver foil textures, scratch overlays
├── page2_profile/          ← Paper textures, stamps, polaroid frames
├── page3_evidence/         ← AI-generated evidence board bg + clue illustrations
├── page4_interrogation/    ← Dark spotlight backgrounds, quiz UI refs
├── page5_clues/            ← Detective desk, magnifying glass cursor
├── page6_puzzle/           ← Heart templates, particle effects
├── page7_verdict/          ← Courtroom backgrounds, kinetic typography refs
├── page8_ask/              ← Starry night sky, shooting star refs
├── page9_celebration/      ← Confetti overlays, fireworks
├── characters/             ← Stitch PNGs
├── audio/                  ← All SFX and music files
└── fonts/                  ← Downloaded font files (backup)
```

---

## 1. 🪙 Scratch Card — Realistic Silver Texture

**What you need**: A metallic, silver foil texture PNG to use as the scratch-off overlay.

| Source | What to Search | Link |
|---|---|---|
| **Vecteezy** | "Scratch Card PNG" or "Scratched Metal PNG" | [vecteezy.com](https://www.vecteezy.com) |
| **Freepik** | "Scratch texture transparent" or "silver scratch card surface" | [freepik.com](https://www.freepik.com) |
| **VectorStock** | "Silver scraped scratchcard textures" | [vectorstock.com](https://www.vectorstock.com) |
| **Pngtree** | "Scratch Card PNG" | [pngtree.com](https://www.pngtree.com) |

> **📌 Tip**: Look for textures with a **transparent background** or a solid silver fill that can be used as a CSS `mask-image` overlay. Search "scratch card foil texture PNG transparent".

**Save to**: `page1_scratchcard/`

---

## 2. 📜 Aged Paper / Parchment Texture

**What you need**: A high-res aged paper or manila folder texture for the Suspect Profile (Page 2) background.

| Source | What to Search | Link |
|---|---|---|
| **Unsplash** | "old paper texture" | [unsplash.com](https://unsplash.com/s/photos/old-paper-texture) |
| **Rawpixel** | "old paper texture" (public domain art) | [rawpixel.com](https://www.rawpixel.com) |
| **Freepik** | "vintage paper texture" or "parchment texture" | [freepik.com](https://www.freepik.com) |
| **The Graphics Fairy** | "Old Paper Textures" (curated vintage) | [thegraphicsfairy.com](https://thegraphicsfairy.com) |
| **MyFreeTextures** | "old paper" | [myfreetextures.com](https://www.myfreetextures.com) |

> **📌 Tip**: Choose a warm tan/cream tone, not pure white. Slight stains and creases add realism. Look for **2000px+** resolution.

**Save to**: `page2_profile/`

---

## 3. 🎨 Evidence Board — AI-Generated Art

**What you'll create**: Use your own AI image generator (Midjourney, DALL-E, etc.) with custom prompts to create artwork for the Evidence Room (Page 3) — both the background scene and the 8 individual clue illustrations.

> **📌 You generate these yourself with custom prompts and drop them into `page3_evidence/`.**

**Assets to generate**:
1. **Board background** — A moody, purple-toned detective evidence room / mystery wall scene
2. **8 clue illustrations** — Stylized, illustrated icons for each evidence item:
   - 💜 Purple Heart
   - ⚖️ Law Book
   - 🛸 Stitch Plushie
   - 💅 Pink/glam reference
   - 🍨 Ice Cream
   - 📖 Poetry Journal
   - 🎵 Music Note
   - 🚗 Car Keys

**Save to**: `page3_evidence/`

---

## 5. 🔴 Rubber Stamps (CONFIDENTIAL / URGENT)

**What you need**: Red rubber stamp PNGs with distressed ink look — "CONFIDENTIAL" and "URGENT" text.

| Source | What to Search | Link |
|---|---|---|
| **TopPNG** | "confidential stamp PNG transparent" | [toppng.com](https://toppng.com) |
| **Vecteezy** | "confidential stamp" or "urgent stamp" | [vecteezy.com](https://www.vecteezy.com) |
| **Pngtree** | "confidential stamp PNG" or "urgent stamp PNG" | [pngtree.com](https://www.pngtree.com) |
| **Freepik** | "rubber stamp confidential" | [freepik.com](https://www.freepik.com) |

> **📌 Tip**: Look for **distressed/grunge** ink edges — a too-perfect stamp looks fake. Rotate slightly (~5-15°) in CSS for realism.

**Save to**: `page2_profile/`

---

## 6. 📸 Polaroid Photo Frame

**What you need**: A realistic polaroid frame PNG (transparent background) where you can place your photo inside programmatically.

| Source | What to Search | Link |
|---|---|---|
| **Custom Scene** | "Free Polaroid PNG" (includes shadow + paper texture) | [customscene.co](https://www.customscene.co) |
| **Textures4Photoshop** | "Polaroid frame PNG transparent" | [textures4photoshop.com](https://www.textures4photoshop.com) |
| **Vecteezy** | "Polaroid Photo Frame PNG" | [vecteezy.com](https://www.vecteezy.com) |
| **Pngtree** | "Polaroid Frame" (4900+ options) | [pngtree.com](https://www.pngtree.com) |

> **📌 Tip**: Get one with a **natural drop shadow** baked in. The photo area should be easily mask-able (centered rectangle). Best option: **Custom Scene** — drag-and-drop ready.

**Save to**: `page2_profile/`

---

## 7. 🛸 Stitch Character PNGs

**What you need**: Transparent PNG illustrations of Stitch in different poses — celebratory, thoughtful, and playful.

| Source | What to Search | Notes |
|---|---|---|
| **Disney Clip Art Galore** | "Stitch" (216 original PNGs) | [disneyclips.com](https://www.disneyclips.com) — requires online attribution |
| **Pngimg.com** | "Stitch" (73+ PNGs) | [pngimg.com](https://pngimg.com/imgs/heroes/stitch/) |
| **CleanPNG** | "Stitch" | [cleanpng.com](https://www.cleanpng.com) |
| **HiClipart** | "Stitch transparent" | [hiclipart.com](https://www.hiclipart.com) — personal use |

**Poses needed**:
- 🎉 **Celebratory** (Page 9 — "She said yes!")
- 🗨️ **With speech bubble potential** (Page 8 — "Ohana means saying yes!")
- 😊 **Happy/cute** (Easter egg interactions)

**Save to**: `characters/`

---

---

## 9. 🌌 Starry Night Sky Background

**What you need**: A dark purple/deep blue starry sky for Pages 7-8 (The Verdict and The Ask).

| Source | What to Search | Link |
|---|---|---|
| **Unsplash** | "purple night sky" or "starry sky dark" | [unsplash.com](https://unsplash.com) |
| **Freepik** | "purple starry sky" or "purple night sky" | [freepik.com](https://www.freepik.com) |
| **Vecteezy** | "Purple Starry Sky" (~3,000 options) | [vecteezy.com](https://www.vecteezy.com) |
| **Pngtree** | "dark purple starry sky" (201+ HD options) | [pngtree.com](https://www.pngtree.com) |

> **📌 Tip**: Choose one with visible stars but not overpowering — text needs to be readable over it. A slight purple/magenta gradient works best thematically.

**Save to**: `page8_ask/`

---

## 10. 🎊 Confetti & Particle Overlays

**What you need**: Transparent PNG confetti bursts and particle effects for the Celebration page (Page 9).

| Source | What to Search | Link |
|---|---|---|
| **Vecteezy** | "Confetti Overlay PNG" or "Party Particles PNG" | [vecteezy.com](https://www.vecteezy.com) |
| **Rawpixel** | "confetti overlay PNG" (gold + colorful) | [rawpixel.com](https://www.rawpixel.com) |
| **Pngtree** | "Confetti Overlay PNG" or "Celebration Particles" | [pngtree.com](https://www.pngtree.com) |

> **📌 Tip**: We'll also use the **canvas-confetti** JS library for dynamic real-time confetti. These PNGs are for static overlays or fallback visuals. Choose **purple, pink, and white** tones to match the theme.

**Save to**: `page9_celebration/`

---

## 11. 🔍 Magnifying Glass Cursor

**What you need**: A small (32×32 or 48×48) SVG or PNG magnifying glass icon for the custom cursor on Page 5.

| Source | What to Search | Link |
|---|---|---|
| **UXWing** | "Magnifying Glass Icon SVG" (no attribution needed) | [uxwing.com](https://uxwing.com) |
| **Flaticon** | "magnifying glass" (SVG format) | [flaticon.com](https://www.flaticon.com) |

> **📌 Tip**: Implementation is via CSS `cursor: url('magnifying-glass.svg') 16 16, auto;`. Keep icons small (32-48px) or browsers will reject them.

**Save to**: `page5_clues/`

---

## 12. 🔊 Sound Effects (SFX)

**Most SFX are generated programmatically** via the Web Audio API (~13 sounds: clicks, chimes, buzzes, pops, whooshes). No files needed for those.

**You only need to source 3 realistic files:**

| SFX | What to Search | Best Source |
|---|---|---|
| **Scratch card** | "scratch card sound effect" | [ZapSplat](https://www.zapsplat.com) or [Freesound](https://freesound.org) (CC0 filter) |
| **Heartbeat** | "heartbeat loop subtle" | [Freesound](https://freesound.org) — search "heartbeat" (CC0 filter) |
| **Gavel** | "gavel strike courtroom" | [ZapSplat](https://www.zapsplat.com) or [Freesound](https://freesound.org) |

> **📌 Tip**: Short clips (0.5-3s), MP3 format. The heartbeat should loop cleanly.

**Save to**: `audio/`

---

## 13. 🎵 Background Music

| Song | Artist | How to Get |
|---|---|---|
| **Pyaar Ke Liye** | Shankar Mahadevan | YouTube → MP3 (personal use only) |
| **Meri Kahani** | Atif Aslam | YouTube → MP3 (personal use only) |

> ⚠️ These are for **personal, private use only** — not for public deployment.

**Save to**: `audio/`

---

## 14. 🔤 Fonts

| Font | Use Case | Source |
|---|---|---|
| **Playfair Display** | Page titles, "VERDICT", headings | [Google Fonts](https://fonts.google.com/specimen/Playfair+Display) |
| **Special Elite** | Typewriter text (Case File, evidence logs) | [Google Fonts](https://fonts.google.com/specimen/Special+Elite) |
| **Courier Prime** | Monospace code/file look | [Google Fonts](https://fonts.google.com/specimen/Courier+Prime) |
| **Dancing Script** | Handwritten notes ("Primary Suspect") | [Google Fonts](https://fonts.google.com/specimen/Dancing+Script) |
| **Inter** or **Lato** | Body text, quiz options | [Google Fonts](https://fonts.google.com/specimen/Inter) |

> **📌 Tip**: Load via `<link>` tag from Google Fonts CDN. Download backups to `fonts/` folder.

---

## 15. 📐 Design Reference / Inspo Images

These aren't assets to use directly — they're **visual references** to guide the overall aesthetic. Save screenshots or links.

| Page | Search on Dribbble/Pinterest/Behance | Keywords |
|---|---|---|
| **Page 2** (Case File) | "detective case file UI" "police dossier design" | Noir, vintage, paper |
| **Page 3** (Evidence Board) | "detective evidence wall art" "mystery game UI" | Moody, illustrated, purple |
| **Page 4** (Interrogation) | "dark quiz UI game" "spotlight room game design" | Noir, dramatic, contrast |
| **Page 5** (Hidden Object) | "hidden object game UI" "detective desk overhead" | Top-down, cluttered, warm |
| **Page 6** (Heart Puzzle) | "heart jigsaw puzzle game" "photo puzzle web" | Dreamy, soft, glowing |
| **Page 7** (Verdict) | "kinetic typography web" "award ceremony screen" | Elegant, golden, serif |
| **Page 8** (The Ask) | "wedding invitation website" "starfield parallax" | Romantic, minimal, night |
| **Page 9** (Celebration) | "congratulations game screen" "confetti explosion UI" | Joyful, vibrant, explosive |

---

## ✅ Asset Collection Checklist

### Textures & Backgrounds
- [ ] Silver scratch card foil texture (PNG, transparent or solid)
- [ ] Aged paper/parchment texture (JPG/PNG, 2000px+)
- [ ] Starry purple night sky (JPG, high-res)
- [ ] Purple gradient (can be CSS, but having a reference helps)

### AI-Generated (created during development)
- [ ] Evidence board background (moody detective scene)
- [ ] 8 evidence clue illustrations

### UI Elements
- [ ] Polaroid photo frame (PNG, transparent)
- [ ] CONFIDENTIAL rubber stamp (PNG, transparent, red, distressed)
- [ ] URGENT rubber stamp (PNG, transparent, red, distressed)
- [ ] Magnifying glass cursor (SVG, 32×32)
- [ ] Confetti overlays (PNG, purple/pink/white tones)
- [ ] Speech bubble graphic (PNG or SVG)

### Character Art
- [ ] Stitch — celebratory pose (PNG, transparent)
- [ ] Stitch — cute/speech bubble pose (PNG, transparent)

### Audio
- [ ] Scratch card SFX (realistic, file)
- [ ] Heartbeat SFX (subtle loop, file)
- [ ] Gavel SFX (realistic, file)
- [ ] "Pyaar Ke Liye" — Shankar Mahadevan (MP3)
- [ ] "Meri Kahani" — Atif Aslam (MP3, optional)
- ✅ ~13 other SFX generated programmatically (no files needed)

### Photos (You Provide)
- [ ] Your photo (for suspect profile)
- [ ] Background scene image (for hidden clues, Page 5)
- [ ] 6-8 couple photos (for heart puzzle pieces)

### Fonts
- [ ] Playfair Display
- [ ] Special Elite (typewriter)
- [ ] Dancing Script (handwritten)
- [ ] Inter or Lato (body)
