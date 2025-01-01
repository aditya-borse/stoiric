import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
// import Layout from "./Layout"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 text-center bg-zinc-900">
      <h1 className="text-4xl font-bold text-zinc-300">404 - Page Not Found</h1>
      <p className="text-zinc-400">The page you're looking for doesn't exist.</p>
      <Button
        onClick={() => navigate('/app')}
        className="bg-zinc-700 hover:bg-zinc-600"
      >
        Go Home
      </Button>
    </div>
  )
}
