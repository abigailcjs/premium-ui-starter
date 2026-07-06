import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { cn } from "@/lib/utils"

/**
 * LiquidMetal — flowing metallic shader surface.
 *
 * Provenance: this is ORIGINAL GLSL written from scratch on @react-three/fiber
 * (MIT). It is NOT derived from paper-design/liquid-logo, whose source ships
 * under the non-permissive PolyForm Shield license and was therefore not copied.
 * It reproduces the "liquid metal" *effect* (domain-warped FBM noise + specular
 * banding) with clean, redistributable code.
 *
 * Heavy: pulls in three.js. Import LAZILY (see fx/lazy.ts).
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Domain warping → flowing liquid motion.
    vec2 q = vec2(fbm(uv * 3.0 + t), fbm(uv * 3.0 - t + 5.2));
    vec2 r = vec2(fbm(uv * 3.0 + q * 1.5 + t * 1.3), fbm(uv * 3.0 + q * 1.5 + 1.7));
    float f = fbm(uv * 3.0 + r * 2.0);

    // Specular banding → metallic sheen.
    float bands = 0.5 + 0.5 * sin((f + length(r)) * 8.0 + t * 2.0);
    float spec = pow(bands, 3.0);

    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 1.0, f + 0.5));
    col = mix(col, uColorC, spec);
    col += spec * 0.25;

    gl_FragColor = vec4(col, 1.0);
  }
`

function MetalPlane({
  colorA,
  colorB,
  colorC,
  speed,
}: {
  colorA: string
  colorB: string
  colorC: string
  speed: number
}) {
  const ref = React.useRef<THREE.ShaderMaterial>(null)
  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorC: { value: new THREE.Color(colorC) },
    }),
    [colorA, colorB, colorC]
  )

  useFrame((_, delta) => {
    if (ref.current) ref.current.uniforms.uTime.value += delta * speed
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export interface LiquidMetalProps {
  className?: string
  colorA?: string
  colorB?: string
  colorC?: string
  /** Flow speed multiplier. Default 1. Reduced-motion freezes the surface. */
  speed?: number
}

export default function LiquidMetal({
  className,
  colorA = "#1a1a2e",
  colorB = "#6d28d9",
  colorC = "#e9d5ff",
  speed = 1,
}: LiquidMetalProps) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        frameloop={prefersReduced ? "demand" : "always"}
      >
        <MetalPlane
          colorA={colorA}
          colorB={colorB}
          colorC={colorC}
          speed={prefersReduced ? 0 : speed}
        />
      </Canvas>
    </div>
  )
}
