
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send, User, GraduationCap } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Assalamu Alaikum! I'm your CSE Career Guide. I'm here to help you find the best career path based on your skills and interests. Let's start our conversation! What aspects of computer science are you most passionate about?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [stage, setStage] = useState(0);
  const [careerSuggestions, setCareerSuggestions] = useState<Array<CareerSuggestion>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Question flow for guiding the conversation
  const questions = [
    "What aspects of computer science are you most passionate about?",
    "What skills have you already developed? (Programming languages, tools, etc.)",
    "Do you prefer working in teams or independently?",
    "Are you interested in research or more practical applications?",
    "What are your long-term career goals?"
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsThinking(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let response = "";
      let nextStage = stage + 1;
      
      // Simple rule-based response system
      if (stage < questions.length) {
        response = questions[stage];
      } else if (stage === questions.length) {
        response = "Thank you for sharing all this information. I'm analyzing your profile to suggest the best career paths for you...";
        // Generate career suggestions after the last question
        setTimeout(generateCareerSuggestions, 1500);
      } else {
        response = "Do you have any questions about the career paths I've suggested?";
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsThinking(false);
      setStage(nextStage);
    }, 1500);
  };

  // Generate career suggestions based on conversation
  const generateCareerSuggestions = () => {
    // Simplified logic - in a real app, this would analyze the conversation
    const suggestions: Array<CareerSuggestion> = [
      {
        title: "Software Engineer",
        description: "Develop software solutions for various industries using your technical skills.",
        skills: ["Programming", "Problem Solving", "Software Design"],
        roadmap: [
          "Master a programming language (Java/Python/C++)",
          "Learn data structures and algorithms",
          "Build personal projects for your portfolio",
          "Contribute to open-source projects",
          "Prepare for technical interviews"
        ]
      },
      {
        title: "Data Scientist",
        description: "Analyze and interpret complex data to help organizations make better decisions.",
        skills: ["Statistics", "Machine Learning", "Data Visualization"],
        roadmap: [
          "Learn Python and its data science libraries",
          "Study statistics and probability",
          "Master machine learning algorithms",
          "Work on data analysis projects",
          "Create a portfolio showcasing your data insights"
        ]
      },
      {
        title: "Web Developer",
        description: "Create and maintain websites and web applications for businesses and organizations.",
        skills: ["HTML/CSS", "JavaScript", "React/Angular/Vue"],
        roadmap: [
          "Master HTML, CSS and JavaScript",
          "Learn a frontend framework like React",
          "Study backend development (Node.js, Express)",
          "Build full-stack web applications",
          "Deploy your projects and create a portfolio"
        ]
      }
    ];
    
    setCareerSuggestions(suggestions);
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "Based on our conversation, I've prepared some career suggestions for you. Each includes key skills and a roadmap to help you achieve your goals."
    }]);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <header className="max-w-4xl mx-auto mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-900 flex items-center justify-center gap-2">
          <GraduationCap className="h-8 w-8" /> 
          CSE Career Guide AI
        </h1>
        <p className="text-center text-indigo-700 mt-1">
          Find your ideal career path in Computer Science & Engineering
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Chat Section */}
        <Card className="mb-4 border-indigo-200 shadow-lg">
          <CardContent className="p-4">
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-2">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === 'user' ? (
                        <>
                          <span className="font-medium mr-2">You</span>
                          <User className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <GraduationCap className="h-4 w-4 mr-2" />
                          <span className="font-medium">Career Guide</span>
                        </>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span className="font-medium">Career Guide</span>
                    </div>
                    <p className="animate-pulse">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Career Suggestions Section */}
        {careerSuggestions.length > 0 && (
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recommended Career Paths
            </h2>
            <div className="space-y-4">
              {careerSuggestions.map((career, index) => (
                <Card key={index} className="border-indigo-200 hover-scale transition-all duration-300">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-indigo-800">{career.title}</h3>
                    <p className="text-gray-600 mt-1">{career.description}</p>
                    
                    <div className="mt-3">
                      <h4 className="font-medium text-indigo-700">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {career.skills.map((skill, idx) => (
                          <span key={idx} className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="mt-4">
                      <AccordionItem value="roadmap">
                        <AccordionTrigger className="text-indigo-700 hover:text-indigo-900">
                          Roadmap to Success
                        </AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal pl-5 space-y-1">
                            {career.roadmap.map((step, idx) => (
                              <li key={idx} className="text-gray-700">{step}</li>
                            ))}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-3">
                Remember, these are just suggestions based on our conversation. Your unique skills and interests may lead you to other exciting opportunities.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Career Roadmap Tips",
                    description: "Focus on building your portfolio with projects that demonstrate your skills. Network with professionals and stay updated with latest industry trends."
                  });
                }}
              >
                Get More Tips
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Type definitions
interface CareerSuggestion {
  title: string;
  description: string;
  skills: string[];
  roadmap: string[];
}

export default Index;
