import { useState, useEffect } from "react"
import Layout from "./Layout"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { updateDailyScore, getDailyData } from "@/utils/dailyStorage"

const metrics = [
  { label: "Focus" },
  { label: "Creativity" },
  { label: "Energy" },
  { label: "Productivity" },
  { label: "Satisfaction" }
];

const ScoreMetric = ({ label, value, onChange }) => {
  return (
    <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700/50 mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium tracking-wide text-zinc-200">
            {label}
          </span>
          <span className="text-amber-400 text-lg font-medium">
            {value}
          </span>
        </div>

        <Slider
          value={[value]}
          min={0}
          max={10}
          step={1}
          onValueChange={([newValue]) => onChange(newValue)}
          className="cursor-pointer [&>[role=slider]]:bg-amber-400 [&>span]:bg-zinc-900 [&>span>span]:bg-white"
          defaultValue={[0]}
        />
      </CardContent>
    </Card>
  );
};

export default function ScorePage() {
  const navigate = useNavigate();
  const [scores, setScores] = useState(
    Object.fromEntries(metrics.map(m => [m.label, 0]))
  );

  useEffect(() => {
    const dailyData = getDailyData();
    if (dailyData?.scores) {
      setScores(dailyData.scores);
    }
  }, []);

  const handleScoreChange = (metric, value) => {
    const newScores = { ...scores, [metric]: value };
    setScores(newScores);
    updateDailyScore(newScores);
  };

  return (
    <Layout>
      <div className="w-full max-w-xl mx-auto p-6">
        <div className="text-center mb-6">
          <h2 className="text-zinc-200 text-xl font-semibold tracking-wide">Rate Your Day</h2>
        </div>

        {metrics.map(({ label }) => (
          <ScoreMetric
            key={label}
            label={label}
            value={scores[label]}
            onChange={(value) => handleScoreChange(label, value)}
          />
        ))}

        <div className="mt-6">
          <Button 
            onClick={() => navigate('/total-score')}
            className="w-full bg-zinc-700 hover:bg-zinc-600"
          >
            CALCULATE TOTAL SCORE
          </Button>
        </div>
      </div>
    </Layout>
  );
}