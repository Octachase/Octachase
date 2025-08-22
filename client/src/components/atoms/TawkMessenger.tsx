'use client'

import { useEffect, useState } from 'react'

const TawkMessenger = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Load Tawk.to script dynamically
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://embed.tawk.to/66292b29a0c6737bd12fd5c7/1hs8d175u'
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      document.head.appendChild(script)

      return () => {
        // Cleanup script when component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [mounted])

  // Don't render anything on server-side
  if (!mounted) {
    return null
  }

  return null // Tawk.to script handles the UI
}

export default TawkMessenger
