"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useGLTF, OrbitControls } from "@react-three/drei"
import { useTheme } from "next-themes"

// Shared geometry for tunnel rings - created once
const ringGeometry = new THREE.TorusGeometry(3, 0.02, 6, 32)

// Instanced tunnel rings for better performance
function TunnelRings({ color, count = 15 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null!)
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null!)

  const ringData = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      z: -2 - i * 2,
      speed: 0.08 + Math.random() * 0.04,
      radius: 3 + Math.random() * 0.5,
      rotation: 0,
    }))
  }, [count])

  React.useEffect(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const scale = new THREE.Vector3()

    ringData.forEach((ring, i) => {
      scale.set(ring.radius / 3, ring.radius / 3, 1)
      matrix.makeScale(scale.x, scale.y, scale.z)
      matrix.setPosition(0, 0, ring.z)
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [ringData])

  React.useEffect(() => {
    return () => {
      materialRef.current?.dispose()
    }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()

    ringData.forEach((ring, i) => {
      ring.z += ring.speed
      if (ring.z > 6) ring.z = -32

      ring.rotation += 0.0015

      position.set(0, 0, ring.z)
      quaternion.setFromEuler(new THREE.Euler(0, 0, ring.rotation))
      scale.set(ring.radius / 3, ring.radius / 3, 1)
      matrix.compose(position, quaternion, scale)
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true

    if (materialRef.current) {
      const avgDist = ringData.reduce((sum, r) => sum + Math.abs(r.z), 0) / count
      materialRef.current.opacity = Math.max(0.15, 0.55 - avgDist / 65)
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[ringGeometry, undefined, count]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.5} />
    </instancedMesh>
  )
}

// Tunnel shader
const tunnelVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const tunnelFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 grid = abs(fract(vec2(vUv.x * 22.0, vUv.y * 6.0 - uTime * 0.8) - 0.5) - 0.5);
    float line = min(grid.x, grid.y);
    line = 1.0 - smoothstep(0.0, 0.045, line);

    float fade = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));

    float alpha = line * fade * 0.45;
    gl_FragColor = vec4(uColor, alpha);
  }
`

function TunnelWalls({ color }: { color: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null!)
  const materialRef = React.useRef<THREE.ShaderMaterial>(null!)

  const colorRef = React.useRef(color)
  colorRef.current = color

  const uniforms = React.useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uColor.value.set(colorRef.current)
    }
  })

  React.useEffect(() => {
    return () => {
      meshRef.current?.geometry?.dispose()
      materialRef.current?.dispose()
    }
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, -18]}>
      <cylinderGeometry args={[4.2, 4.2, 45, 28, 14, true]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={tunnelVertexShader}
        fragmentShader={tunnelFragmentShader}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Speed lines
const speedLineGeometry = new THREE.BoxGeometry(0.015, 0.015, 1.8)

function SpeedLines({ color, count = 55 }: { color: string; count?: number }) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null!)
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null!)

  const linesData = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
      radius: 2.2 + Math.random() * 2.3,
      z: Math.random() * -35,
      length: 0.8 + Math.random() * 2,
      speed: 0.12 + Math.random() * 0.22,
    }))
  }, [count])

  React.useEffect(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()

    linesData.forEach((line, i) => {
      position.set(
        Math.cos(line.angle) * line.radius,
        Math.sin(line.angle) * line.radius,
        line.z
      )
      scale.set(1, 1, line.length)
      matrix.compose(position, quaternion, scale)
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [linesData])

  React.useEffect(() => {
    return () => materialRef.current?.dispose()
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()

    linesData.forEach((line, i) => {
      line.z += line.speed
      if (line.z > 7) line.z = -38

      position.set(
        Math.cos(line.angle) * line.radius,
        Math.sin(line.angle) * line.radius,
        line.z
      )
      scale.set(1, 1, line.length)
      matrix.compose(position, quaternion, scale)
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[speedLineGeometry, undefined, count]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0.65} />
    </instancedMesh>
  )
}

// Car component - loads model from public folder
function Car({ modelPath = "/car.glb", speed = 0.045 }: { modelPath?: string; speed?: number }) {
  const { scene } = useGLTF(modelPath)
  const carRef = React.useRef<THREE.Group>(null!)
  const { camera } = useThree()

  // Clone the scene to avoid sharing issues
  const carScene = React.useMemo(() => scene.clone(), [scene])

  // Initial setup
  React.useEffect(() => {
    if (!carRef.current) return

    // Scale and position the car
    carRef.current.scale.set(0.85, 0.85, 0.85)
    carRef.current.position.set(0, -1.8, 2) // Slightly in front of camera, lower on Y
    carRef.current.rotation.y = Math.PI // Face forward (adjust if your model faces wrong way)
  }, [carScene])

  useFrame((state, delta) => {
    if (!carRef.current) return

    // Move car forward through the tunnel
    carRef.current.position.z -= speed * 60 * delta

    // Reset when too far
    if (carRef.current.position.z < -28) {
      carRef.current.position.z = 8
    }

    // Gentle floating/bobbing
    carRef.current.position.y = -1.8 + Math.sin(state.clock.elapsedTime * 2) * 0.03
    carRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.015
  })

  return <primitive ref={carRef} object={carScene} />
}

// Theme colors
const themeColors: Record<string, string> = {
  ares: "#ff3333",
  tron: "#00d4ff",
  clu: "#ff6600",
  athena: "#ffd700",
  aphrodite: "#ff1493",
  poseidon: "#0066ff",
}

interface TunnelProps {
  className?: string
  ringCount?: number
  enableSpeedLines?: boolean
  carModelPath?: string
  carSpeed?: number
  showControls?: boolean // For development
}

export function Tunnel({
  className = "",
  ringCount = 16,
  enableSpeedLines = true,
  carModelPath = "/car.glb", // Put your car model in public/car.glb (or change path)
  carSpeed = 0.045,
  showControls = false,
}: TunnelProps) {
  const { theme } = useTheme()
  const color = themeColors[theme as keyof typeof themeColors] || themeColors.tron

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 72, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 1.8]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <fog attach="fog" args={["#050505", 4, 38]} />

        <TunnelWalls color={color} />
        <TunnelRings color={color} count={ringCount} />
        {enableSpeedLines && <SpeedLines color={color} count={55} />}

        {/* The moving rental car */}
        <Car modelPath={carModelPath} speed={carSpeed} />

        <ambientLight intensity={0.15} />
        <pointLight position={[0, 8, -10]} intensity={0.6} color="#ffffff" />

        {showControls && <OrbitControls enablePan={false} enableZoom={true} />}
      </Canvas>
    </div>
  )
}