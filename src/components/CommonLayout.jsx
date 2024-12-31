import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

const formatToday = () => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const date = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const year = today.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export function DateStreak() {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400 py-2 mb-6 whitespace-nowrap">
      <p>{formatToday()}</p>
      <span className="w-[2px] h-4 bg-zinc-700"></span>
      <p>STREAK -1 DAY</p>
    </div>
  )
}

export function Quote() {
  return (
    <div className="text-center py-3">
      <p className="text-lg font-medium mb-2">You have power over your mind - not outside events.</p>
      <p className="text-lg font-medium mb-2">Realize this, and you will find strength.</p>
      <p className="text-sm text-zinc-400 italic">-Marcus Aurelius</p>
    </div>
  )
}

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-7 mb-4">
      <h1 
        className="text-2xl font-bold cursor-pointer hover:text-amber-400 transition-colors"
        onClick={() => navigate('/')}
      >
        STOIRIC
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button> 
        </SheetTrigger>
        <SheetContent className="bg-zinc-900 border-zinc-800 text-white w-[280px] sm:w-[340px]">
          <SheetTitle className="text-2xl font-bold text-white pb-2">
            MENU
          </SheetTitle>
          <SheetDescription className="text-sm text-zinc-400 border-b border-zinc-800 pb-4">
            Access different sections of Stoiric
          </SheetDescription>
          <div className="flex flex-col gap-2 mt-6">
            <Button 
              variant="ghost" 
              className="w-full text-left text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigate('/')}
            >
              HOME
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-left text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigate('/logs')}
            >
              DAILY LOG
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-left text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              ABOUT US
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
