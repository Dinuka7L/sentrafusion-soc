
import React from "react";
import { Bot } from "lucide-react";

const AIComposingBubble = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg p-3 bg-cyber-gunmetal text-gray-100 animate-fade-in flex">
        <div className="flex items-center space-x-2">
          <Bot className="h-4 w-4 mt-1 text-cyber-red" />
          <span className="text-sm">AI is composing</span>
          <span className="ml-2 flex gap-1 items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-red animate-bounce [animation-delay:.1s]" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-red animate-bounce [animation-delay:.2s]" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-red animate-bounce [animation-delay:.3s]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIComposingBubble;
