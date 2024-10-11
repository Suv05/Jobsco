"use client";

import { useUser } from "@clerk/nextjs";
import run from "@/config/gemini";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spin from "../ui/spin";
import {
  Sparkles,
  Upload,
  Briefcase,
  TrendingUp,
  DollarSign,
  Compass,
  Send,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ReactMarkdown from "react-markdown";

export default function AskAIPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I'm your AI career assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      // Send user's input to Gemini API
      const response = await run(input);

      // Display the AI response in markdown format
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response, // Assuming the `run` function returns markdown text
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    // TODO: Implement file upload logic
    console.log("File uploaded:", event.target.files[0]);
  };

  const SidebarContent = () => (
    <nav className="space-y-2">
      <Button variant="ghost" className="w-full justify-start text-white">
        <Sparkles className="mr-2 h-4 w-4" />
        General Questions
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white">
        <Upload className="mr-2 h-4 w-4" />
        Resume Check
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white">
        <Briefcase className="mr-2 h-4 w-4" />
        Job Market
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white">
        <TrendingUp className="mr-2 h-4 w-4" />
        Career Trends
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white">
        <DollarSign className="mr-2 h-4 w-4" />
        Salary Insights
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white">
        <Compass className="mr-2 h-4 w-4" />
        Career Guidance
      </Button>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[#181C14] text-white mt-5">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-[#232323] p-4">
        <h2 className="text-2xl font-bold mb-4">Ask AI</h2>
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#232323]">
          <h2 className="text-2xl font-bold">Ask AI</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#232323] p-4">
              <h2 className="text-2xl font-bold mb-4">Ask AI</h2>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "ai" && (
                <Avatar className="mr-2 hidden sm:block">
                  <AvatarImage
                    src="data:image/jpeg;base64,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"
                    alt="AI"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[85%] sm:max-w-[70%] ${
                  message.role === "user" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {/* Use ReactMarkdown to parse and display the markdown response */}
                {message.role === "ai" ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="ml-4 list-disc" {...props} />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="ml-2 hidden sm:block">
                  <AvatarImage src={user?.imageUrl} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-gray-800">
          <div className="flex items-center mb-2">
            <Input
              type="file"
              className="hidden"
              id="resume-upload"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
            />
            {/* <label htmlFor="resume-upload" className="cursor-pointer">
              <Button
                variant="outline"
                size="icon"
                className="bg-[#222222]"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </label>
            <span className="ml-2 text-sm text-gray-400">Upload Resume</span> */}
          </div>
          <div className="flex items-center">
            <Textarea
              placeholder="Ask me anything about your career..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 mr-2 bg-gray-700 border-gray-600 text-lg font-sans"
              rows={3}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Spin /> // Show spinner while loading
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
