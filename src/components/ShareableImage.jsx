import { format } from 'date-fns';

export default function ShareableImage({ score = 85, userName = "John Doe" }) {
  return (
    <div id="shareable-image" className="w-[1080px] h-[1920px] bg-gradient-to-b from-zinc-900 to-zinc-800 flex items-center justify-center p-12">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full opacity-5 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-between py-24">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-amber-400 text-8xl font-bold tracking-tight">STOIRIC</h1>
          <div className="h-1 w-32 bg-amber-400 mt-6 rounded-full opacity-50" />
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center">
          {/* Score */}
          <div className="flex items-center justify-center">
            <div className="text-[180px] font-bold text-white">{score}</div>
          </div>
          
          <p className="text-zinc-400 text-4xl mt-8 tracking-wide">Daily Wisdom Score</p>
          
          {/* User Info */}
          <div className="mt-16 flex flex-col items-center">
            <p className="text-zinc-200 text-7xl font-medium">{userName}</p>
            <p className="text-zinc-400 text-4xl mt-6">{format(new Date(), 'MMMM d, yyyy')}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center max-w-2xl">
          <div className="h-0.5 w-16 bg-zinc-700 mb-8" />
          <p className="text-zinc-300 text-3xl text-center italic leading-relaxed">
            "You are a seeker of wisdom,
            <br />
            turning every challenge into growth."
          </p>
          
          {/* Footer */}
          <div className="mt-16 flex items-center">
            <div className="h-2 w-2 rounded-full bg-amber-400 mx-3 opacity-50" />
            <p className="text-zinc-500 text-xl tracking-widest">JOIN STOIRIC</p>
            <div className="h-2 w-2 rounded-full bg-amber-400 mx-3 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}