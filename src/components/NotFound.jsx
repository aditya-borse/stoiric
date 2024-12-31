import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import Layout from "./Layout"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-zinc-400">The page you're looking for doesn't exist.</p>
        <Button 
          onClick={() => navigate('/app')}
          className="bg-zinc-700 hover:bg-zinc-600"
        >
          Go Home
        </Button>
      </div>
    </Layout>
  )
}
