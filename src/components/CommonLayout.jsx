import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { calculateStreak } from '@/utils/dailyStorage';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const formatToday = () => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const date = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const year = today.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export function DateStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const currentStreak = calculateStreak();
    setStreak(currentStreak);

    const handleStorageChange = () => {
      const updatedStreak = calculateStreak();
      setStreak(updatedStreak);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getStreakStyle = () => {
    if (streak >= 30) return "bg-amber-400/10 text-amber-400 border-amber-400";
    if (streak >= 14) return "bg-amber-400/5 text-amber-300 border-amber-300";
    if (streak >= 7) return "bg-zinc-800 text-amber-200 border-amber-200";
    return "bg-zinc-900 text-zinc-400 border-zinc-700";
  };

  const getStreakEmoji = () => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⚡";
    if (streak >= 7) return "✨";
    return "";
  };

  return (
    <div className="flex items-center justify-center gap-4 py-2 mb-6">
      <p className="text-xs sm:text-sm text-zinc-400">{formatToday()}</p>
      <div className={`px-3 py-1 rounded-full border ${getStreakStyle()} transition-all duration-300`}>
        <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
          {streak} {streak === 1 ? 'DAY' : 'DAYS'} {getStreakEmoji()}
        </p>
      </div>
    </div>
  );
}

export function Quote() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = new Date().toDateString();
        const savedQuote = localStorage.getItem('dailyQuote');
        const savedDate = localStorage.getItem('quoteDate');

        if (savedQuote && savedDate === today) {
          setQuote(JSON.parse(savedQuote));
        } else {
          const response = await fetch('https://stoic-quotes.com/api/quote');
          const data = await response.json();
          setQuote(data);
          localStorage.setItem('dailyQuote', JSON.stringify(data));
          localStorage.setItem('quoteDate', today);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({
          text: "You have power over your mind - not outside events.",
          author: "Marcus Aurelius"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-3">
        <div className="animate-pulse bg-zinc-800 h-4 w-3/4 mx-auto mb-2 rounded"></div>
        <div className="animate-pulse bg-zinc-800 h-4 w-1/2 mx-auto mb-2 rounded"></div>
      </div>
    );
  }

  return (
    <div className="text-center py-3 px-4 max-w-2xl mx-auto">
      <p className="text-base sm:text-lg font-medium mb-3 leading-relaxed text-amber-50">
        {quote.text}
      </p>
      <p className="text-sm text-zinc-400 italic">-{quote.author}</p>
    </div>
  );
}

export function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-7 mb-4">
      <h1 
        className="text-2xl font-bold cursor-pointer hover:text-amber-400 transition-colors"
        onClick={() => navigate('/app')}
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
          {user && (
            <div className="flex items-center gap-4 py-4 border-b border-zinc-800">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="profile" 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-full w-full bg-zinc-800 flex items-center justify-center">
                    <User className="h-5 w-5 text-zinc-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">{user.displayName || 'User'}</p>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-6">
            <Button 
              variant="ghost" 
              className="w-full text-left text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigate('/app')}
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
              onClick={() => navigate('/about')}
            >
              ABOUT US
            </Button>
            {user && (
              <Button 
                variant="ghost" 
                className="w-full text-left text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-colors"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                LOG OUT
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
