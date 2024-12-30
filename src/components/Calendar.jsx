import { useState } from 'react';
import { Button } from "@/components/ui/button";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const days = getDaysInMonth(currentMonth);

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
          const isToday = 
            today.getDate() === day &&
            today.getMonth() === currentMonth.getMonth() &&
            today.getFullYear() === currentMonth.getFullYear();

          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg
                ${isToday ? 'bg-green-500' : 'bg-zinc-700'} 
                hover:bg-zinc-600 cursor-pointer`}
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