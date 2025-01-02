import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Clock, CalendarCheck } from "lucide-react"

export default function FeatureAnnouncement({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            New Feature: Complete Past Journals
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Never miss a day of reflection again!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-sm text-zinc-300">
          <p>
            You can now complete your journal entries even if you missed the day. 
            Here's what's new:
          </p>
          <ul className="space-y-2 list-disc pl-4">
            <li>Past incomplete journals remain accessible</li>
            <li>Complete yesterday's journal to maintain your streak</li>
            <li>Clear indication of which day you're journaling for</li>
          </ul>
          <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
            <CalendarCheck className="h-5 w-5 shrink-0" />
            <p className="text-xs">
              Your streak won't break if you complete yesterday's journal today!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
