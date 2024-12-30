import { useState, useEffect } from "react";
import Layout from "./Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { getDailyData, updateFinalScore } from "@/utils/dailyStorage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export default function TotalScore() {
  const navigate = useNavigate();
  const [score, setScore] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const dailyData = getDailyData();
    if (dailyData) {
      const { totalTasks = 0, completedTasks = 0, totalRating = 0 } = dailyData;
      const taskRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
      const ratingRatio = totalRating / 50;
      const finalScore = (taskRatio * ratingRatio * 100).toFixed(1);
      
      setScore(finalScore);
      updateFinalScore(parseFloat(finalScore));

      if (parseFloat(finalScore) > 0) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-xl mx-auto p-6 text-center">
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-zinc-200 text-2xl font-semibold">Your Total Score</h2>
            <TooltipProvider>
              <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                <TooltipTrigger asChild>
                  <button 
                    className="focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-full p-1"
                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  >
                    <HelpCircle className="w-5 h-5 text-zinc-400 hover:text-zinc-300 transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center" 
                  className="max-w-[200px] p-2 text-left"
                  onClick={() => setIsTooltipOpen(false)}
                >
                  <p className="text-xs text-zinc-200 leading-tight">
                    Score = (Tasks Done/Total Tasks) × (Total Rating/50) × 100
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                    Total Rating = sum of all metrics (max 50)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-6xl font-bold text-amber-400 mb-4">
            {score !== null ? score : '--'}
          </div>
          <p className="text-zinc-400">out of 100</p>
        </div>

        <Button
          onClick={() => navigate('/')}
          className="w-full bg-zinc-800 hover:bg-zinc-700 py-6 text-lg"
        >
          GO TO HOME
        </Button>
      </div>
    </Layout>
  );
}
