const getDailyKey = (date) => {
  return `stoiric_${date}`;
};

const getCurrentDate = () => {
  const date = new Date("2024-12-30T18:43:29+05:30");
  return date.toISOString().split('T')[0];
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
