import { useState, useEffect, useRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Plus, Star, StarOff, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import Layout from "./Layout"
import { useNavigate } from "react-router-dom"
import { updateTasks, getDailyData, isDayCompleted } from "@/utils/dailyStorage"

export default function NewDay() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");
  const [isNewGoalImportant, setIsNewGoalImportant] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [dayCompleted, setDayCompleted] = useState(false);

  const newGoalInputRef = useRef(null);
  const editGoalInputRef = useRef(null);

  useEffect(() => {
    
    const dailyData = getDailyData();
    if (dailyData?.tasks) {
      setGoals(dailyData.tasks);
    }
    setDayCompleted(isDayCompleted());
  }, []);

  useEffect(() => {
    if (showNewGoal && newGoalInputRef.current) {
      newGoalInputRef.current.focus();
    }
  }, [showNewGoal]);

  useEffect(() => {
    if (editingGoalId && editGoalInputRef.current) {
      editGoalInputRef.current.focus();
    }
  }, [editingGoalId]);

  const handleAddGoal = () => {
    if (newGoalText.trim()) {
      const updatedGoals = [...goals, {
        id: Date.now(),
        text: newGoalText,
        important: isNewGoalImportant,
        completed: false
      }];
      setGoals(updatedGoals);
      updateTasks(updatedGoals);
      setNewGoalText("");
      setIsNewGoalImportant(false);
      setShowNewGoal(false);
    }
  };

  const toggleImportant = (goalId) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId ? {...goal, important: !goal.important} : goal
    );
    setGoals(updatedGoals);
    updateTasks(updatedGoals);
  };

  const toggleCompleted = (goalId) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId ? {...goal, completed: !goal.completed} : goal
    );
    setGoals(updatedGoals);
    updateTasks(updatedGoals);
  };

  const startEditGoal = (goal) => {
    setEditingGoalId(goal.id);
    setEditingText(goal.text);
  };

  const handleEditGoal = (goalId) => {
    if (editingText.trim()) {
      const updatedGoals = goals.map(goal =>
        goal.id === goalId ? {...goal, text: editingText} : goal
      );
      setGoals(updatedGoals);
      updateTasks(updatedGoals);
      setEditingGoalId(null);
      setEditingText("");
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-md flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">TODAY'S GOALS</h2>
          {!showNewGoal && !dayCompleted && (
            <Button 
              onClick={() => setShowNewGoal(true)} 
              variant="ghost" 
              className="text-sm text-zinc-400 hover:text-zinc-100 bg-zinc-800 hover:bg-zinc-700"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {showNewGoal && (
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4">
              <Input
                ref={newGoalInputRef}
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newGoalText.trim()) {
                    handleAddGoal();
                  }
                }}
                placeholder="What's your goal for today?"
                className="bg-transparent border-none text-sm mb-3 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
              />
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsNewGoalImportant(!isNewGoalImportant)}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 p-1 rounded-md transition-all"
                >
                  {isNewGoalImportant ? 
                    <Star className="h-4 w-4 text-amber-400" /> : 
                    <StarOff className="h-4 w-4" />
                  }
                  {isNewGoalImportant ? 'Important' : 'Mark as Important'}
                </button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      setShowNewGoal(false);
                      setNewGoalText("");
                      setIsNewGoalImportant(false);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddGoal}
                    size="sm"
                    className="bg-zinc-700 hover:bg-zinc-600"
                    disabled={!newGoalText.trim()}
                  >
                    Add Goal
                  </Button>
                </div>
              </div>
            </div>
          )}

          {goals.length > 0 ? (
            <div className="space-y-2">
              {goals.map(goal => (
                <div 
                  key={goal.id} 
                  className={`group flex items-center gap-3 p-4 rounded-xl transition-all ${
                    goal.completed ? 'bg-zinc-800/20' : 'bg-zinc-800/50 backdrop-blur-sm'
                  }`}
                >
                  <Checkbox 
                    checked={goal.completed}
                    onCheckedChange={() => toggleCompleted(goal.id)}
                    className={`w-5 h-5 ${
                      goal.completed ? 'border-zinc-600' : goal.important ? 'border-amber-400' : 'border-zinc-600'
                    }`}
                    disabled={dayCompleted}
                  />
                  <span className={`flex-1 text-sm transition-all ${
                    goal.completed ? 'text-zinc-500 line-through' : goal.important ? 'text-zinc-100' : 'text-zinc-300'
                  }`}>
                    {editingGoalId === goal.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          ref={editGoalInputRef}
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && editingText.trim()) {
                              handleEditGoal(goal.id);
                            }
                          }}
                          className="bg-transparent border-none text-sm placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setEditingGoalId(null);
                              setEditingText("");
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => handleEditGoal(goal.id)}
                            size="sm"
                            className="bg-zinc-700 hover:bg-zinc-600"
                            disabled={!editingText.trim()}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      goal.text
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleImportant(goal.id)}
                      className={`p-1.5 rounded-md transition-all ${
                        goal.important ? 'text-amber-400' : 'text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-zinc-300'
                      }`}
                      disabled={dayCompleted}
                    >
                      {goal.important ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                    </button>
                    {!editingGoalId && !dayCompleted && (
                      <button 
                        onClick={() => startEditGoal(goal)} 
                        className="p-1.5 rounded-md text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-zinc-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : !showNewGoal && (
            <div className="text-center py-8">
              <p className="text-sm text-zinc-500">No goals added yet</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          {goals.length > 0 && (
            <Button
              onClick={() => navigate('/reflect')}
              className="w-full bg-zinc-800 hover:bg-zinc-700 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={dayCompleted}
            >
              {dayCompleted ? "DAY COMPLETED" : "CALL IT A DAY"}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  )
}
