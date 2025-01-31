import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'

interface PointCloudProps {
  points: number[]
  size: number
}

export function PointCloud({ points, size }: PointCloudProps) {
  const meshRef = useRef<THREE.Points>(null)
  const { resolvedTheme } = useTheme()
  const materialRef = useRef<THREE.PointsMaterial>(null)

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color = new THREE.Color(
        resolvedTheme === 'dark' ? '#10b981' : '#059669'
      )
      materialRef.current.needsUpdate = true
    }
  }, [resolvedTheme])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array(points)
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        ref={materialRef}
        attach="material"
        size={size}
        sizeAttenuation={true}
        color={resolvedTheme === 'dark' ? '#10b981' : '#059669'}
        transparent={true}
        opacity={0.8}
      />
    </points>
  )
}