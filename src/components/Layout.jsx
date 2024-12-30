import { Navigation, Quote, DateStreak } from "@/components/CommonLayout"

export default function Layout({ children }) {
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
    </div>
  )
}
