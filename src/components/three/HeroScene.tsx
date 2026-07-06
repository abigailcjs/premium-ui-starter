import * as React from "react"
import { Canvas } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei"
import { animated, useSpring } from "@react-spring/three"

type Vec3 = [number, number, number]

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/** The hero object — a metallic, distorting torus knot that springs on click. */
function MorphKnot({ reduced }: { reduced: boolean }) {
  const [active, setActive] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)

  // @react-spring/three drives the mesh transform with spring physics.
  const { scale } = useSpring({
    scale: active ? 1.28 : 1,
    config: { tension: 300, friction: 18 },
  })

  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [hovered])

  return (
    <Float
      speed={reduced ? 0 : 2}
      rotationIntensity={reduced ? 0 : 0.9}
      floatIntensity={reduced ? 0 : 1.4}
    >
      <animated.mesh
        scale={scale}
        castShadow
        onClick={(e) => {
          e.stopPropagation()
          setActive((v) => !v)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.32, 200, 32]} />
        <MeshDistortMaterial
          color={hovered ? "#a78bfa" : "#7c3aed"}
          roughness={0.15}
          metalness={0.85}
          distort={active ? 0.45 : 0.28}
          speed={reduced ? 0 : 1.8}
        />
      </animated.mesh>
    </Float>
  )
}

/** Small floating accent shapes that catch the environment light. */
function Accents({ reduced }: { reduced: boolean }) {
  const items: { pos: Vec3; geo: "ico" | "sphere"; color: string; s: number }[] =
    [
      { pos: [-2.7, 1.4, -1], geo: "ico", color: "#c4b5fd", s: 0.34 },
      { pos: [2.8, -1.1, -0.5], geo: "sphere", color: "#8b5cf6", s: 0.28 },
      { pos: [2.3, 1.8, -1.5], geo: "sphere", color: "#ddd6fe", s: 0.2 },
      { pos: [-2.4, -1.5, -0.6], geo: "ico", color: "#a78bfa", s: 0.26 },
    ]

  return (
    <>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={reduced ? 0 : 1.4 + i * 0.3}
          rotationIntensity={reduced ? 0 : 2}
          floatIntensity={reduced ? 0 : 2}
        >
          <mesh position={it.pos} castShadow>
            {it.geo === "ico" ? (
              <icosahedronGeometry args={[it.s, 0]} />
            ) : (
              <sphereGeometry args={[it.s, 32, 32]} />
            )}
            <meshStandardMaterial
              color={it.color}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

/**
 * HeroScene — interactive 3D scene on the premium-ui 3D stack.
 *
 * @react-three/fiber + drei (Float / Environment / ContactShadows / OrbitControls
 * / MeshDistortMaterial) + @react-spring/three (spring-physics click morph).
 * Heavy (three.js) — import LAZILY behind a <Suspense> boundary. Fills its
 * parent; give the parent a sized, positioned container.
 */
export default function HeroScene() {
  const reduced = prefersReducedMotion()

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-6, -3, -4]} intensity={0.6} color="#7c3aed" />

      <MorphKnot reduced={reduced} />
      <Accents reduced={reduced} />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.45}
        scale={14}
        blur={2.6}
        far={4.5}
      />

      {/* Procedural environment (no network HDR) for metallic reflections. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          position={[0, 4, -6]}
          scale={[10, 10, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.3}
          position={[-5, 1, -1]}
          scale={[8, 4, 1]}
          color="#a78bfa"
        />
        <Lightformer
          intensity={1}
          position={[5, -1, -1]}
          scale={[8, 4, 1]}
          color="#7c3aed"
        />
        <Lightformer
          form="ring"
          intensity={1.4}
          position={[0, 2, 2]}
          scale={3}
          color="#ddd6fe"
        />
      </Environment>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  )
}
