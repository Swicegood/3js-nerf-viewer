import { useState } from 'react'
import { NerfViewer } from '@/components/NerfViewer'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export function Home() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="absolute top-20 left-1/2 -translate-x-1/2 bg-background hover:bg-muted shadow-lg transition-colors"
      >
        <Upload className="mr-2 h-4 w-4" />
        Open Nerf Viewer
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>3JS Nerf Viewer</DialogTitle>
            <DialogDescription>
              Interact with your NeRF Point Cloud using pan, zoom, and rotation controls.
            </DialogDescription>
          </DialogHeader>
          <NerfViewer />
        </DialogContent>
      </Dialog>
    </div>
  )
}