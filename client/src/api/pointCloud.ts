// Description: Get point cloud data
// Endpoint: GET /api/pointcloud
// Request: {}
// Response: { points: number[] }
export const getPointCloudData = () => {
  // Mock point cloud data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random points in a sphere
      const points: number[] = []
      for (let i = 0; i < 1000; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        const radius = Math.random()
        points.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      }
      resolve({ points })
    }, 500)
  })
}