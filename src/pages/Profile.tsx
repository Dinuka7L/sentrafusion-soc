
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Mail, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Profile = () => {
  // Auth removed: show static guest profile
  const profile = {
    full_name: "Guest User",
    username: "guest",
    role: "soc_analyst",
    created_at: "2024-01-01T00:00:00Z",
  };
  const user = {
    email: "guest@soc-suite.app"
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
        
        <Card className="bg-cyber-darker border-cyber-gunmetal">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <User className="h-5 w-5 text-cyber-red" />
              <span>User Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <p className="text-white">{profile.full_name}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <p className="text-white">{profile.username}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </label>
                <p className="text-white">{user.email}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Role</span>
                </label>
                <Badge 
                  variant="secondary"
                  className="bg-cyber-gunmetal text-gray-300"
                >
                  SOC Analyst
                </Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member Since</span>
                </label>
                <p className="text-white">
                  {new Date(profile.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
