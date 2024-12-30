import { Button } from "@/components/ui/button"
import Calendar from "@/components/Calendar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NewDay from "@/components/NewDay"
import ScorePage from "@/components/ScorePage"
import Layout from "@/components/Layout"
import DailyReflection from "@/components/DailyReflection"
import TotalScore from "@/components/TotalScore"
import { getDailyData } from "@/utils/dailyStorage"

function MainContent() {
  const dailyData = getDailyData();
  const hasTasks = dailyData?.tasks && dailyData.tasks.length > 0;

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <Button 
          onClick={() => window.location.href = '/new-day'} 
          className="bg-zinc-700 hover:bg-zinc-600"
        >
          {hasTasks ? "VIEW TODAY'S TASKS" : "START A NEW DAY"}
        </Button>

        <div className="min-w-[300px] max-w-[350px] flex items-center justify-center mb-8">
          <Calendar />
        </div>
      </div>
    </Layout>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/new-day" element={<NewDay />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/reflect" element={<Layout><DailyReflection /></Layout>} />
        <Route path="/total-score" element={<TotalScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;