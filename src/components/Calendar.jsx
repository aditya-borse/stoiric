import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { getCompletedDays } from "@/utils/dailyStorage";
import { useNavigate } from 'react-router-dom';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const navigate = useNavigate();
  const completedDays = getCompletedDays();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(currentMonth);

  const getColorForScore = (score) => {
    const scorePercentage = score || 0;
    if (scorePercentage >= 80) return 'bg-green-900';
    if (scorePercentage >= 60) return 'bg-green-800';
    if (scorePercentage >= 40) return 'bg-green-700';
    if (scorePercentage >= 20) return 'bg-green-600';
    return 'bg-green-500';
  };

  const handleDayClick = (date) => {
    const dateStr = formatDate(date); // Use the same date format as storage
    if (completedDays[dateStr]) {
      navigate(`/logs?date=${dateStr}`);
    }
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // console.log('Completed days:', completedDays);

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex justify-between items-center mb-1">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
        >
          ←
        </Button>
        <span className="text-white uppercase">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
        >
          →
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 p-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs text-gray-400 aspect-square flex items-center justify-center">
            {day}
          </div>
        ))}
        
        {/* empty cells */}
        {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {/* days */}
        {days.map((day) => {
          const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const dateStr = formatDate(currentDate);
          const isToday = formatDate(today) === dateStr; 
          const isCompleted = completedDays[dateStr];
          
          if (isCompleted) {
            {/* console.log('Found completed day:', dateStr, 'with score:', completedDays[dateStr]); */}
          }

          {/* console.log('Checking date:', dateStr, 'isCompleted:', isCompleted, 'isToday:', isToday); */}

          let className = 'aspect-square flex items-center justify-center text-sm rounded-lg ';
          if (isCompleted) {
            className += `${getColorForScore(completedDays[dateStr])} cursor-pointer`;
          } else if (isToday) {
            className += 'bg-amber-500 text-black';
          } else {
            className += 'bg-zinc-700 hover:bg-zinc-600';
          }

          return (
            <div
              key={day}
              className={className}
              onClick={() => handleDayClick(currentDate)}
            >
              {day}
            </div> 
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;