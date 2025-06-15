
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, ChatSession } from '@/types';
import { Send, Bot, User, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  session: ChatSession;
  onSendMessage: (content: string) => void;
  onEscalate?: () => void;
  className?: string;
}

const ChatInterface = ({ session, onSendMessage, onEscalate, className }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={cn("bg-cyber-darker border-cyber-gunmetal h-full flex flex-col", className)}>
      <CardHeader className="border-b border-cyber-gunmetal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bot className="h-5 w-5 mr-2 text-cyber-red" />
            {session.title}
          </CardTitle>
          <div className="flex space-x-2">
            {onEscalate && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onEscalate}
                className="border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {session.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === 'user'
                      ? "bg-cyber-red text-white"
                      : "bg-cyber-gunmetal text-gray-100"
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' ? (
                      <Bot className="h-4 w-4 mt-1 text-cyber-red" />
                    ) : (
                      <User className="h-4 w-4 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-400">Sources:</p>
                          {message.citations.map((doc) => (
                            <Badge
                              key={doc.id}
                              variant="outline"
                              className="text-xs border-gray-500 text-gray-300"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              {doc.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t border-cyber-gunmetal p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about threats, IOCs, or get incident guidance..."
              className="bg-cyber-darker border-cyber-gunmetal text-white placeholder-gray-400"
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-cyber-red hover:bg-cyber-red-dark text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
