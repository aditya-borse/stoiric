import { useState, useEffect } from "react"
import { Navigation, Quote, DateStreak } from "@/components/CommonLayout"
import FeatureAnnouncement from "./FeatureAnnouncement"

const FEATURE_ANNOUNCEMENT_VERSION = "1.0.0"
const FEATURE_ANNOUNCEMENT_KEY = "feature_announcement_shown"

export default function Layout({ children }) {
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(FEATURE_ANNOUNCEMENT_KEY) === FEATURE_ANNOUNCEMENT_VERSION
    if (!hasSeenAnnouncement) {
      setShowAnnouncement(true)
    }
  }, [])

  const handleAnnouncementClose = () => {
    setShowAnnouncement(false)
    localStorage.setItem(FEATURE_ANNOUNCEMENT_KEY, FEATURE_ANNOUNCEMENT_VERSION)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Navigation />
      <div className="w-full px-7 -mt-8">
        <Quote />
        <DateStreak />
      </div>

      <main className="flex-1 flex flex-col items-center px-7">
        <div className="w-full flex justify-center">
          {children}
        </div>
      </main>

      <FeatureAnnouncement 
        open={showAnnouncement} 
        onOpenChange={handleAnnouncementClose}
      />
    </div>
  )
}
