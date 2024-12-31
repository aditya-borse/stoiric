import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Target, Brain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LogBento({ log }) {
  const questions = [
    "Did you achieve your priority of the day?",
    "What worked well?",
    "What went wrong?",
    "What did you learn today?",
  ];

  const getProgressColor = (percentage) => {
    if (percentage >= 67) return "bg-green-500";
    if (percentage >= 33) return "bg-amber-500";
    return "bg-red-500";
  };

  const progressPercentage = (log.completedTasks / log.totalTasks) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Left Column: Tasks and Score */}
      <div className="space-y-4">
        {/* Tasks Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2 space-y-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-zinc-100">Tasks</CardTitle>
                <span className="text-xs text-zinc-400">
                  ({log.completedTasks}/{log.totalTasks})
                </span>
              </div>
              <div className="h-1.5 w-16 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(progressPercentage)} transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            {log.tasks && (
              <div>
                {log.tasks.map((task, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 py-1"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                    )}
                    <span className="text-xs text-zinc-300 truncate">{task.text}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-sm font-medium text-zinc-100">Daily Score</CardTitle>
              </div>
              <span className="text-2xl font-bold text-amber-400">
                {log.finalScore || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Reflections Grid */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {log.reflectionAnswers && questions.map((question, index) => (
          <Card 
            key={index}
            className="bg-zinc-900/50 border-zinc-800"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-zinc-400" />
                <CardTitle className="text-xs font-medium text-zinc-400">{question}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {log.reflectionAnswers[index] || "No answer provided"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}