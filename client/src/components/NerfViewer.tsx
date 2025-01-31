import { useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { PointCloud } from './PointCloud'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { getPointCloudData } from '@/api/pointCloud'
import { ThemeToggle } from './ui/theme-toggle'
import { useTheme } from 'next-themes'

export function NerfViewer() {
  const [pointSize, setPointSize] = useState(1)
  const [pointCloud, setPointCloud] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const loadPointCloud = async () => {
      try {
        const data = await getPointCloudData()
        setPointCloud(data.points)
      } catch (error) {
        console.error('Failed to load point cloud:', error)
      }
    }
    loadPointCloud()
  }, [])

  const handleCreated = useCallback(({ gl, scene }: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) => {
    const bgColor = resolvedTheme === 'dark' ? '#020817' : '#ffffff'
    gl.setClearColor(bgColor, 1)
    scene.background = new THREE.Color(bgColor)

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn('WebGL context lost. Attempting to restore...')
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
      gl.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight)
      gl.setClearColor(bgColor, 1)
      scene.background = new THREE.Color(bgColor)
    }

    gl.domElement.addEventListener('webglcontextlost', handleContextLost)
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost)
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [resolvedTheme])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <div className="flex items-center gap-4">
          <ZoomIn className="w-4 h-4 text-foreground" />
          <Slider
            value={[pointSize]}
            onValueChange={(value) => setPointSize(value[0])}
            min={0.1}
            max={5}
            step={0.1}
            className="w-32"
          />
          <ZoomOut className="w-4 h-4 text-foreground" />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPointSize(1)}
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>

      <Canvas onCreated={handleCreated}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PointCloud points={pointCloud} size={pointSize} />
      </Canvas>
    </div>
  )
}