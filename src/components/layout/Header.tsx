
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Shield, Settings, LogOut, User } from 'lucide-react';

const SETTINGS_LOGO_KEY = "soc-custom-logo";

const Header = () => {
  const navigate = useNavigate();

  // Auth removed: show static guest info
  const fullName = "Guest User";
  const userRole = "SOC Analyst";
  const avatarInitials = "GU";

  // Load custom logo from localStorage
  let logoUrl: string | null = null;
  if (typeof window !== "undefined") {
    logoUrl = localStorage.getItem(SETTINGS_LOGO_KEY);
  }

  return (
    <header className="globe-bg border-b border-cyber-gunmetal bg-cyber-darker/95 backdrop-blur supports-[backdrop-filter]:bg-cyber-darker/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          {logoUrl ? (
            <img src={logoUrl} alt="Custom Logo" className="h-8 w-8 rounded object-contain bg-cyber-gunmetal border p-1" />
          ) : (
            <Shield className="h-8 w-8 text-cyber-red" />
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">SOC-Suite</span>
            <span className="text-xs text-cyber-red">Threat Intelligence Platform</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/workspaces" className="text-gray-300 hover:text-white transition-colors">
            Workspaces
          </Link>
          <Link to="/incidents" className="text-gray-300 hover:text-white transition-colors">
            Incidents
          </Link>
          <Link to="/knowledge" className="text-gray-300 hover:text-white transition-colors">
            Knowledge
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="text-right text-sm">
            <p className="text-white font-medium">{fullName}</p>
            <p className="text-gray-400 text-xs">
              {userRole}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-cyber-gunmetal text-white">
                    {avatarInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-cyber-darker border-cyber-gunmetal">
              <DropdownMenuItem onClick={() => navigate('/profile')} className="text-gray-300 hover:text-white hover:bg-cyber-gunmetal">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="text-gray-300 hover:text-white hover:bg-cyber-gunmetal">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="text-cyber-red opacity-50 cursor-not-allowed">
                <LogOut className="mr-2 h-4 w-4" />
                Logout Unavailable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
