"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import { Typewriter } from "@/components/Typewriter";

gsap.registerPlugin(ScrollTrigger);

/* ─── Section content ───────────────────────────────── */
const SECTIONS = [
  {
    title: "DRIFT",
    line1: "Enterprise AI · Built for your industry",
    line2: "Your vault. Your workflows. Your rules.",
  },
  {
    title: "VAULT",
    line1: "Every regulation · Every filing · Every policy",
    line2: "Loaded, cited, and ready in seconds.",
  },
  {
    title: "FLOW",
    line1: "Build once · Run forever",
    line2: "Workflows that automate your entire practice.",
  },
];

/* ─── Types ─────────────────────────────────────────── */
interface ThreeState {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  composer: any | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  locations: number[];
}

export default function HeroSection() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const titleRef       = useRef<HTMLHeadingElement>(null);
  const progressRef    = useRef<HTMLDivElement>(null);
  const menuRef        = useRef<HTMLDivElement>(null);

  const smoothCamera   = useRef({ x: 0, y: 30, z: 100 });
  const [scrollPct, setScrollPct]       = useState(0);
  const [section, setSection]           = useState(0);
  const [prevSection, setPrevSection]   = useState(0);
  const [isReady, setIsReady]           = useState(false);

  const three = useRef<ThreeState>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [],
    animationId: null,
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300,
    locations: [],
  });

  /* ── Three.js init ──────────────────────────────────── */
  useEffect(() => {
    const refs = three.current;

    const init = async () => {
      /* Dynamically import post-processing to avoid SSR issues */
      const { EffectComposer } = await import(
        /* webpackChunkName: "postprocessing" */
        "three/examples/jsm/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        "three/examples/jsm/postprocessing/RenderPass.js"
      );
      const { UnrealBloomPass } = await import(
        "three/examples/jsm/postprocessing/UnrealBloomPass.js"
      );

      if (!canvasRef.current) return;

      /* Scene */
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x080604, 0.00022);

      /* Camera */
      refs.camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 2000
      );
      refs.camera.position.set(0, 30, 300);

      /* Renderer */
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.55;

      /* Post-processing */
      refs.composer = new EffectComposer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.7, 0.35, 0.82
      );
      refs.composer.addPass(bloom);

      buildStarField();
      buildNebula();
      buildMountains();
      buildAtmosphere();
      captureLocations();
      animate();
      setIsReady(true);
    };

    /* ── Stars ────────────────────────────────────────── */
    const buildStarField = () => {
      const refs = three.current;
      const COUNT = 4500;

      for (let layer = 0; layer < 3; layer++) {
        const geo   = new THREE.BufferGeometry();
        const pos   = new Float32Array(COUNT * 3);
        const col   = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);

        for (let j = 0; j < COUNT; j++) {
          const r     = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi   = Math.acos(Math.random() * 2 - 1);
          pos[j * 3]     = r * Math.sin(phi) * Math.cos(theta);
          pos[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos[j * 3 + 2] = r * Math.cos(phi);

          const c = new THREE.Color();
          const roll = Math.random();
          if (roll < 0.65)       c.setHSL(0,    0,    0.82 + Math.random() * 0.18); // warm white
          else if (roll < 0.88)  c.setHSL(0.07, 0.85, 0.88);                        // warm peach
          else                   c.setHSL(0.05, 0.60, 0.92);                        // soft cream
          col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b;
          sizes[j] = Math.random() * 1.8 + 0.4;
        }

        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
        geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.ShaderMaterial({
          uniforms: {
            time:  { value: 0 },
            depth: { value: layer },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 p = position;
              float angle = time * 0.04 * (1.0 - depth * 0.28);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              p.xy = rot * p.xy;
              vec4 mvp = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = size * (280.0 / -mvp.z);
              gl_Position = projectionMatrix * mvp;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const pts = new THREE.Points(geo, mat);
        refs.scene!.add(pts);
        refs.stars.push(pts);
      }
    };

    /* ── Nebula ───────────────────────────────────────── */
    const buildNebula = () => {
      const refs = three.current;
      const geo  = new THREE.PlaneGeometry(8000, 4000, 80, 80);
      const mat  = new THREE.ShaderMaterial({
        uniforms: {
          time:    { value: 0 },
          color1:  { value: new THREE.Color(0xffe0c2) }, // warm peach (dark-mode primary)
          color2:  { value: new THREE.Color(0x393028) }, // dark secondary
          opacity: { value: 0.28 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElev;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 p = position;
            float elev = sin(p.x * 0.01 + time) * cos(p.y * 0.01 + time) * 18.0;
            p.z += elev;
            vElev = elev;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElev;
          void main() {
            float mix_ = sin(vUv.x * 9.0 + time) * cos(vUv.y * 9.0 + time);
            vec3 col = mix(color1, color2, mix_ * 0.5 + 0.5);
            float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            a *= 1.0 + vElev * 0.01;
            gl_FragColor = vec4(col, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = -1050;
      refs.scene!.add(mesh);
      refs.nebula = mesh;
    };

    /* ── Mountains ────────────────────────────────────── */
    const buildMountains = () => {
      const refs = three.current;
      const LAYERS = [
        { z: -50,  h: 60,  color: 0x1a1612, op: 1.0 },
        { z: -100, h: 80,  color: 0x120f0b, op: 0.85 },
        { z: -150, h: 100, color: 0x0c0a08, op: 0.65 },
        { z: -200, h: 120, color: 0x060504, op: 0.45 },
      ];

      LAYERS.forEach((layer, idx) => {
        const pts: THREE.Vector2[] = [];
        const SEGS = 50;
        for (let i = 0; i <= SEGS; i++) {
          const x = (i / SEGS - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.h +
            Math.sin(i * 0.05) * layer.h * 0.5 +
            Math.random() * layer.h * 0.2 - 100;
          pts.push(new THREE.Vector2(x, y));
        }
        pts.push(new THREE.Vector2(5000, -300));
        pts.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(pts);
        const geo   = new THREE.ShapeGeometry(shape);
        const mat   = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.op,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.z = layer.z;
        mesh.position.y = layer.z;
        mesh.userData = { baseZ: layer.z, index: idx };
        refs.scene!.add(mesh);
        refs.mountains.push(mesh);
      });
    };

    /* ── Atmosphere ───────────────────────────────────── */
    const buildAtmosphere = () => {
      const refs = three.current;
      const geo  = new THREE.SphereGeometry(600, 32, 32);
      const mat  = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float i = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            // Warm peach atmosphere
            vec3 atm = vec3(1.0, 0.878, 0.761) * i;
            atm *= sin(time * 1.8) * 0.1 + 0.9;
            gl_FragColor = vec4(atm, i * 0.22);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      refs.scene!.add(new THREE.Mesh(geo, mat));
    };

    const captureLocations = () => {
      const refs = three.current;
      refs.locations = refs.mountains.map(m => m.position.z);
    };

    /* ── Render loop ──────────────────────────────────── */
    const animate = () => {
      const refs  = three.current;
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      refs.stars.forEach(s => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (s.material as any).uniforms.time.value = t;
      });
      if (refs.nebula) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (refs.nebula.material as any).uniforms.time.value = t * 0.5;
      }

      if (refs.camera) {
        const EAS = 0.05;
        smoothCamera.current.x += (refs.targetCameraX - smoothCamera.current.x) * EAS;
        smoothCamera.current.y += (refs.targetCameraY - smoothCamera.current.y) * EAS;
        smoothCamera.current.z += (refs.targetCameraZ - smoothCamera.current.z) * EAS;

        refs.camera.position.x = smoothCamera.current.x + Math.sin(t * 0.1) * 2;
        refs.camera.position.y = smoothCamera.current.y + Math.cos(t * 0.14) * 1;
        refs.camera.position.z = smoothCamera.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(t * 0.1) * 2 * pf;
        m.position.y = 50 + Math.cos(t * 0.14) * pf;
      });

      refs.composer?.render();
    };

    init();

    const onResize = () => {
      const refs = three.current;
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      const refs = three.current;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", onResize);
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); }
      refs.renderer?.dispose();
    };
  }, []);

  /* ── GSAP entrance animation ────────────────────────── */
  useEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -80, opacity: 0, duration: 1, ease: "power3.out" });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".tc");
      tl.from(chars, { y: 180, opacity: 0, duration: 1.4, stagger: 0.055, ease: "power4.out" }, "-=0.5");
    }
    if (progressRef.current) {
      tl.from(progressRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.5");
    }

    return () => { tl.kill(); };
  }, [isReady]);

  /* ── Title transition when section changes ───────────── */
  useEffect(() => {
    if (!isReady || section === prevSection) return;
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".tc");
    gsap.fromTo(chars,
      { y: section > prevSection ? 60 : -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power3.out" }
    );

    setPrevSection(section);
  }, [section, prevSection, isReady]);

  /* ── Scroll handler ─────────────────────────────────── */
  useEffect(() => {
    const CAMERA_POSITIONS = [
      { x: 0, y: 30,  z: 300  },
      { x: 0, y: 40,  z: -50  },
      { x: 0, y: 50,  z: -700 },
    ];

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollY   = window.scrollY;
      const maxScroll = container.offsetHeight - window.innerHeight;
      const progress  = Math.max(0, Math.min(scrollY / maxScroll, 1));

      setScrollPct(progress);

      const totalProg = progress * (SECTIONS.length - 1);
      const idx       = Math.min(Math.floor(totalProg), SECTIONS.length - 1);
      const sectionProg = totalProg % 1;

      setSection(prev => {
        if (prev !== idx) return idx;
        return prev;
      });

      const refs = three.current;
      const cur  = CAMERA_POSITIONS[idx]     ?? CAMERA_POSITIONS[SECTIONS.length - 1];
      const nxt  = CAMERA_POSITIONS[idx + 1] ?? cur;

      refs.targetCameraX = cur.x + (nxt.x - cur.x) * sectionProg;
      refs.targetCameraY = cur.y + (nxt.y - cur.y) * sectionProg;
      refs.targetCameraZ = cur.z + (nxt.z - cur.z) * sectionProg;

      refs.mountains.forEach((m, i) => {
        const speed  = 1 + i * 0.9;
        const targetZ = refs.locations[i] + scrollY * speed * 0.5;
        if (progress > 0.65) {
          m.position.z = 600000;
          if (refs.nebula) refs.nebula.position.z = 600000;
        } else {
          m.position.z = refs.locations[i];
          if (refs.nebula) refs.nebula.position.z = targetZ - 100;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cur = SECTIONS[section] ?? SECTIONS[0];

  return (
    /* Outer container — height creates scroll space */
    <div ref={containerRef} style={{ height: `${SECTIONS.length * 100}vh` }}>

      {/* Sticky viewport — canvas lives here */}
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

        {/* ── Side menu ─────────────────────────────────── */}
        <div ref={menuRef} className="side-menu">
          <div className="menu-icon">
            <span /><span /><span />
          </div>
          <div className="vertical-label">DRIFT AI</div>
        </div>

        {/* ── Main overlay ──────────────────────────────── */}
        <div className="hero-overlay">
          <h1 ref={titleRef} className="hero-title-3d" aria-label={cur.title}>
            {cur.title.split("").map((ch, i) => (
              <span key={`${section}-${i}`} className="tc" style={{ display: "inline-block" }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h1>

          <div className="hero-sub-3d">
            <p className="sl">
              <Typewriter
                key={`${section}-line1`}
                text={cur.line1}
                speed={38}
                initialDelay={section === 0 ? 1100 : 250}
                loop={false}
                showCursor={false}
                className="text-[length:inherit] tracking-[inherit]"
              />
            </p>
            <p className="sl">
              <Typewriter
                key={`${section}-line2`}
                text={cur.line2}
                speed={38}
                initialDelay={section === 0 ? 1400 : 450}
                loop={false}
                showCursor={true}
                cursorChar={<span className="text-primary">|</span>}
                hideCursorOnType={true}
                className="text-[length:inherit] tracking-[inherit]"
              />
            </p>
          </div>

          {/* CTA — only on first section */}
          {section === 0 && (
            <div className="hero-cta-row" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <HoverBorderGradient
                as="a"
                href="#waitlist"
                duration={1.2}
                className="text-sm font-bold tracking-[0.04em] text-foreground px-6 py-2.5"
              >
                Get Early Access
              </HoverBorderGradient>
              <a
                href="#how-it-works"
                style={{
                  padding: "0.85rem 2.2rem",
                  borderRadius: "9999px",
                  border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
                  color: "color-mix(in srgb, var(--foreground) 75%, transparent)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                }}
              >
                See How It Works →
              </a>
            </div>
          )}
        </div>

        {/* ── Scroll progress ───────────────────────────── */}
        <div ref={progressRef} className="scroll-hud">
          <span className="hud-label">SCROLL</span>
          <div className="hud-track">
            <div className="hud-fill" style={{ width: `${scrollPct * 100}%` }} />
          </div>
          <span className="hud-counter">
            {String(section + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Vignette ──────────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }} />
      </div>
    </div>
  );
}
