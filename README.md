# Sashank — Interactive 3D Portfolio

An editorial-grade, interactive 3D developer portfolio built with React, Three.js, Framer Motion, and Tailwind CSS. The design focuses on high-fidelity interactivity, smooth spatial transitions, and a premium dark-themed aesthetic.

Live Demo: [https://github.com/sashank321/Sashank-Portfolio](https://github.com/sashank321/Sashank-Portfolio)

---

## 🚀 Features & Interactions

### 1. Interactive 3D ASCII Portrait
- **Technology**: Three.js WebGL Renderer paired with `AsciiEffect`.
- **Interactivity**: Renders a complex 3D human head model converted in real-time to high-density ASCII characters. The model tracks cursor vertical movement (X-axis tilt) and aligns dynamically in the bottom-right viewport.

### 2. Micro-Animations & Typography
- **Anton & Oswald Fonts**: Hand-picked bold editorial header scales with a custom entry blur-in animation.
- **Variable Font Cursor Proximity**: Headlines that dynamically scale font-weight depending on mouse distance.
- **Hover Image Reveal**: Clean text list elements that seamlessly reveal project thumbnails following the user's cursor.
- **TextScramble decoder**: Auto-scrambling decoded email header triggering seamlessly as you scroll into the connect section.

### 3. Physics-Based Magnetic Dock
- Fully responsive, macOS-inspired floating navigation dock at the bottom of the page.
- Utilizes Framer Motion's `useMotionValue` and `useSpring` to scale brand icons smoothly relative to cursor proximity.

### 4. High-Performance Canvas Effects
- **Starry Backgrounds**: Custom canvas renders 15–20 fixed stars with occasional random shooting star vectors in the dark spaces (Projects, Connect).

### 5. Kinematic Scroll Mechanics
- Implements **Lenis Scroll** to override default browser physics, facilitating jank-free, fluid momentum scrolling.
- Stacked project cards that slide over each other during parallax scrolls.

---

## 🛠️ Tech Stack

- **Core**: React 18 (TypeScript), Vite
- **3D Graphics**: Three.js, `@types/three`
- **Animation**: Framer Motion
- **Smooth Scroll**: Lenis Scroll (`@studio-freight/react-lenis`)
- **Styling**: Tailwind CSS, Vanilla CSS
- **Icons**: React Icons (FontAwesome 6)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sashank321/Sashank-Portfolio.git
   cd Sashank-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
├── public/
│   └── human_head.glb       # 3D Portrait Model
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── magnetic-dock.tsx  # macOS-style Dock
│   │   ├── AsciiHead.tsx          # 3D ASCII canvas renderer
│   │   ├── FooterSection.tsx      # Scramble connect footer
│   │   ├── HeroSection.tsx        # Title & 3D head hero
│   │   ├── ProjectsSection.tsx    # Card-stacking showcase
│   │   ├── ServicesSection.tsx    # Skills list
│   │   ├── StarryBackground.tsx   # Canvas particle system
│   │   └── TextScramble.tsx       # Decoder scroll trigger
│   ├── App.tsx                    # React Root Wrapper (Lenis init)
│   ├── index.css                  # Global layouts & shimmer utility styles
│   └── main.tsx
```

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
