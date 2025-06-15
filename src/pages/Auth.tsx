
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'soc_analyst'>('soc_analyst');
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      console.log('User already authenticated, redirecting to dashboard');
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Login attempt for:', email);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const username = formData.get('username') as string;
    const fullName = formData.get('fullName') as string;

    console.log('Sign up attempt for:', email, 'with role:', selectedRole);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, { 
        username, 
        full_name: fullName, 
        role: selectedRole 
      });
      
      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please try logging in instead.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.');
        setActiveTab('login');
      }
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-cyber-darker border-cyber-gunmetal">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-cyber-red" />
            <div>
              <CardTitle className="text-2xl text-white">SOC-Suite</CardTitle>
              <CardDescription className="text-cyber-red text-sm">
                Threat Intelligence Platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-cyber-gunmetal">
              <TabsTrigger value="login" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-cyber-red">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-cyber-red">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="analyst@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-cyber-red hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="John Analyst"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="j.analyst"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">Role</Label>
                  <Select value={selectedRole} onValueChange={(value: 'admin' | 'soc_analyst') => setSelectedRole(value)}>
                    <SelectTrigger className="bg-cyber-gunmetal border-cyber-gunmetal text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                      <SelectItem value="soc_analyst" className="text-gray-300">SOC Analyst</SelectItem>
                      <SelectItem value="admin" className="text-gray-300">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="analyst@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="bg-cyber-gunmetal border-cyber-gunmetal text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-cyber-red hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-cyber-gunmetal/50 rounded-md border border-cyber-gunmetal">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-400">
                <p className="font-medium text-yellow-500 mb-1">Development Mode</p>
                <p>Email verification is disabled for testing. In production, users will need to verify their email addresses.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
