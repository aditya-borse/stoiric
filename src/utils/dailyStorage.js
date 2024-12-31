const formatDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const getCurrentDate = () => {
  return formatDate(new Date());
};

const getDailyKey = (date) => {
  return `stoiric_${date}`;
};

export const storeDailyData = (data) => {
  const currentDate = getCurrentDate();
  const key = getDailyKey(currentDate);
  
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDailyData = () => {
  const currentDate = getCurrentDate();
  const key = getDailyKey(currentDate);
  
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const updateDailyData = (updates) => {
  const currentData = getDailyData() || {};
  const updatedData = { ...currentData, ...updates };
  storeDailyData(updatedData);
  return updatedData;
};

export const updateTasks = (tasks) => {
  return updateDailyData({ 
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    tasks: tasks
  });
};

export const updateReflectionAnswers = (answers) => {
  return updateDailyData({ reflectionAnswers: answers });
};

export const updateDailyScore = (scores) => {
  const totalRating = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  return updateDailyData({ 
    scores,
    totalRating,
  });
};

export const updateFinalScore = (finalScore) => {
  return updateDailyData({
    finalScore,
    isDayCompleted: true
  });
};

export const isDayCompleted = () => {
  const dailyData = getDailyData();
  return dailyData?.isDayCompleted || false;
};

export const getAllDailyLogs = () => {
  const logs = [];
  const keyPrefix = 'stoiric_';
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(keyPrefix)) {
      const data = JSON.parse(localStorage.getItem(key));
      const date = key.replace(keyPrefix, '');
      logs.push({ date, ...data });
    }
  }
  
  return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getCompletedDays = () => {
  const logs = {};
  const keyPrefix = 'stoiric_';
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(keyPrefix)) {
      const data = JSON.parse(localStorage.getItem(key));
      if (data.isDayCompleted) {
        const date = key.replace(keyPrefix, '');
        logs[date] = data.finalScore || 0;
        // console.log('Found completed day in storage:', date, data); // Debug log
      }
    }
  }
  
  return logs;
};

export const calculateStreak = () => {
  const completedDays = getCompletedDays();
  const dates = Object.keys(completedDays).sort((a, b) => new Date(b) - new Date(a));
  
  if (dates.length === 0) return 0;

  const today = getCurrentDate();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);

  if (!completedDays[today] && !completedDays[yesterdayStr]) {
    return 0;
  }

  let currentStreak = 0;
  let checkDate = new Date(dates[0]);

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (!completedDays[dateStr]) break;
    
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return currentStreak;
};

export const hasTodayTasks = () => {
  const dailyData = getDailyData();
  return dailyData?.tasks && dailyData.tasks.length > 0;
};
