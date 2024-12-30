import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, Bot, User, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updateReflectionAnswers, getDailyData } from "@/utils/dailyStorage";

const questions = [
  "Did you achieve your priority of the day?",
  "What worked well?",
  "What went wrong?",
  "What did you learn today?",
  "You did an amazing job today! Goodbye!",
];

export default function DailyReflection() {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      
      const dailyData = getDailyData();
      if (dailyData?.reflectionAnswers) {
        
        const reconstructedMessages = [];
        dailyData.reflectionAnswers.forEach((answer, index) => {
          reconstructedMessages.push(
            { type: "bot", content: questions[index] },
            { type: "user", content: answer }
          );
        });
       
        reconstructedMessages.push(
          { type: "bot", content: questions[questions.length - 1] }
        );
        setMessages(reconstructedMessages);
        setCurrentQuestion(questions.length - 1);
        return;
      }

      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ type: "bot", content: questions[0] }]);
        setIsTyping(false);
      }, 1000);
    }
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newAnswer = input.trim();
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    
    updateReflectionAnswers(newAnswers);

    const newMessages = [
      ...messages,
      { type: "user", content: input }
    ];

    setMessages(newMessages);
    setInput("");
    
    if (currentQuestion < questions.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { type: "bot", content: questions[currentQuestion + 1] }
        ]);
        setIsTyping(false);
      }, 1000);
      setCurrentQuestion(prev => prev + 1);
    } else {
      navigate('/score');
    }
  };

  const isLastMessage = currentQuestion === questions.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-260px)] bg-zinc-900 rounded-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 animate-in fade-in duration-200",
              message.type === "bot" ? "justify-start" : "justify-end"
            )}
          >
            {message.type === "bot" && (
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <Bot className="w-4 h-4 text-zinc-400" />
              </div>
            )}
            <div
              className={cn(
                "rounded-lg p-4 max-w-[80%]",
                message.type === "bot"
                  ? "bg-zinc-800 text-zinc-100"
                  : "bg-zinc-700 text-white"
              )}
            >
              {message.content}
            </div>
            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-zinc-400">
            <Bot className="w-4 h-4" />
            <div className="flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-100">●</span>
              <span className="animate-bounce delay-200">●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800">
        {isLastMessage ? (
          <Button 
            onClick={() => navigate('/score')}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-6 text-lg"
          >
            RATE YOUR DAY
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with STOIRIC"
              className="flex-1 bg-zinc-800 border-zinc-700 focus:ring-zinc-600"
            />
            <Button 
              type="submit" 
              variant="secondary"
              className="bg-zinc-800 hover:bg-zinc-700 text-white"
              disabled={!input.trim() || isTyping}
            >
              {isTyping ? (
                <ArrowUp className="w-4 h-4 animate-bounce" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}