import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { createPanelTexture, PANEL_ASPECT, PALETTE, type PanelKind } from "./panelTextures";

// Feel constants
const POINTER_TILT = 0.35;
const POINTER_FOLLOW = 3.2;
const CORE_SPIN = 0.12;
const SCROLL_LIFT = 1.6;

const shared = { scroll: 0, reduced: false };

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<React.ComponentRef<typeof MeshDistortMaterial>>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);
  const pulse = useRef(0);

  const shellGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.75, 1)), []);

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const speed = shared.reduced ? 0.2 : 1;
    if (mesh.current) {
      mesh.current.rotation.y += dt * CORE_SPIN * speed * (hovered ? 3 : 1);
      mesh.current.rotation.x += dt * CORE_SPIN * 0.4 * speed;
      pulse.current *= Math.exp(-4 * dt);
      const target = (hovered ? 1.08 : 1) + pulse.current * 0.25;
      const s = THREE.MathUtils.damp(mesh.current.scale.x, target, 6, dt);
      mesh.current.scale.setScalar(s);
    }
    if (mat.current) {
      const d = (hovered ? 0.48 : 0.32) + pulse.current * 0.3;
      mat.current.distort = THREE.MathUtils.damp(mat.current.distort, d, 4, dt);
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.08 * speed;
      shell.current.rotation.z += dt * 0.04 * speed;
    }
  });

  return (
    <group>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onClick={() => {
          pulse.current = 1;
        }}
      >
        <icosahedronGeometry args={[1.1, 24]} />
        <MeshDistortMaterial
          ref={mat}
          color="#2a1f4a"
          roughness={0.18}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={1}
          iridescenceIOR={1.4}
          
          distort={0.32}
          speed={shared.reduced ? 0.4 : 1.6}
        />
      </mesh>
      <lineSegments ref={shell} geometry={shellGeo}>
        <lineBasicMaterial color={PALETTE.blue} transparent opacity={0.18} />
      </lineSegments>
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.006, 8, 160]} />
        <meshBasicMaterial color={PALETTE.violet} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.5, 0.3]}>
        <torusGeometry args={[2.6, 0.004, 8, 160]} />
        <meshBasicMaterial color={PALETTE.blue} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);

  useFrame((_, raw) => {
    if (ref.current) ref.current.rotation.y += Math.min(raw, 0.05) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#c9c3ff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Panel({
  kind,
  position,
  rotation,
  width,
  depth,
}: {
  kind: PanelKind;
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  depth: number;
}) {
  const texture = useMemo(() => createPanelTexture(kind), [kind]);
  useEffect(() => () => texture.dispose(), [texture]);
  const height = width / PANEL_ASPECT;
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    if (!group.current) return;
    // Parallax: nearer panels move more with the pointer.
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, position[0] + pointer.x * 0.25 * depth, 3, dt);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + pointer.y * 0.18 * depth, 3, dt);
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <Float speed={shared.reduced ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <RoundedBox args={[width + 0.04, height + 0.04, 0.03]} radius={0.06} smoothness={4}>
          <meshPhysicalMaterial color="#0f0e14" roughness={0.3} metalness={0.4} clearcoat={0.6} />
        </RoundedBox>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer, camera } = useThree();
  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const tilt = shared.reduced ? 0.1 : POINTER_TILT;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * tilt + shared.scroll * 0.8, POINTER_FOLLOW, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * tilt * 0.6, POINTER_FOLLOW, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, shared.scroll * SCROLL_LIFT, 5, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7 + shared.scroll * 1.5, 4, dt);
  });
  return <group ref={group}>{children}</group>;
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    shared.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCompact(window.innerWidth < 768);
    // Listen on the whole hero so the scene reacts even under the text column.
    setEventSource(document.getElementById("hero") ?? document.body);
    const onScroll = () => {
      shared.scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e?.isIntersecting ?? true), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-ready={ready ? "" : undefined}
      aria-hidden="true"
    >
      {eventSource && (
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={18} color={PALETTE.violet} />
        <pointLight position={[4, 1, -2]} intensity={14} color={PALETTE.blue} />
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 5, -2]} scale={[10, 3, 1]} color="#ffffff" />
          <Lightformer intensity={3} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color={PALETTE.violet} />
          <Lightformer intensity={3} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color={PALETTE.blue} />
        </Environment>

        <Rig>
          <group position={compact ? [0, 0, 0] : [2.05, -0.15, 0]} scale={compact ? 0.82 : 0.84}>
            <Core />
            <Particles count={compact ? 260 : 650} />
            <Panel
              kind="revenue"
              position={compact ? [-1.85, 1.05, 0.6] : [-1.0, 1.6, 0.6]}
              rotation={[0.05, 0.3, -0.04]}
              width={compact ? 1.5 : 1.6}
              depth={1.2}
            />
            <Panel
              kind="code"
              position={compact ? [1.85, -0.9, 0.9] : [1.2, -0.45, 1.2]}
              rotation={[-0.04, -0.42, 0.03]}
              width={compact ? 1.5 : 1.6}
              depth={1.5}
            />
            {!compact && (
              <Panel kind="deploy" position={[-0.6, -1.5, 1.4]} rotation={[0.1, 0.28, 0.02]} width={1.35} depth={2} />
            )}
          </group>
        </Rig>
        <ReadySignal onReady={() => setReady(true)} />
      </Canvas>
      )}
    </div>
  );
}
