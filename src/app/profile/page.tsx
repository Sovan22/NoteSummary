'use client';

import { useState } from 'react';
import { 
  Edit, 
  School, 
  Briefcase, 
  Building,
  Settings, 
  Bell, 
  Shield,
  Database, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

export default function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);
  const [userType, setUserType] = useState<'student' | 'job-seeker' | 'entrepreneur'>('student');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    contentProcessed: true,
    newFeatures: false,
    weeklyDigest: true
  });

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (name: string) => {
    setNotifications({
      ...notifications,
      [name]: !notifications[name as keyof typeof notifications],
    });
  };

  const handleUserTypeChange = (type: 'student' | 'job-seeker' | 'entrepreneur') => {
    setUserType(type);
  };

  return (
    <AppLayout title="Profile & Settings">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Profile & Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account, preferences, and settings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Profile info */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                      JS
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">John Smith</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">john.smith@example.com</p>
                  <div className="flex justify-center mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-xs font-medium">
                      Premium Plan
                    </span>
                  </div>
                </div>
                
                <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Account Type</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                        userType === 'student' 
                          ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => handleUserTypeChange('student')}
                    >
                      <School className="w-5 h-5 mb-1 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs">Student</span>
                    </button>
                    <button 
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                        userType === 'job-seeker' 
                          ? 'bg-purple-50 border-purple-300 dark:bg-purple-900/20 dark:border-purple-700' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => handleUserTypeChange('job-seeker')}
                    >
                      <Briefcase className="w-5 h-5 mb-1 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs">Job Seeker</span>
                    </button>
                    <button 
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                        userType === 'entrepreneur' 
                          ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => handleUserTypeChange('entrepreneur')}
                    >
                      <Building className="w-5 h-5 mb-1 text-green-600 dark:text-green-400" />
                      <span className="text-xs">Entrepreneur</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Usage</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Storage</span>
                      <span className="text-gray-800 dark:text-gray-200">3.2 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">AI Credits</span>
                      <span className="text-gray-800 dark:text-gray-200">750 / 1,000</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                <button className="w-full p-4 text-left flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                  <Settings className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Settings</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button className="w-full p-4 text-left flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                  <Shield className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Privacy & Security</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button className="w-full p-4 text-left flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700">
                  <Database className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Data Management</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button className="w-full p-4 text-left flex items-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
            
            {/* Right column - Settings tabs */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {/* Tabs navigation */}
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                      tabValue === 0
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    onClick={() => handleTabChange(0)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                      tabValue === 1
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    onClick={() => handleTabChange(1)}
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </button>
                  
                  <button
                    className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                      tabValue === 2
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    onClick={() => handleTabChange(2)}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </button>
                </div>
                
                {/* Tab content - Profile Information */}
                <div className={tabValue === 0 ? 'block p-6' : 'hidden'}>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        defaultValue="John Smith"
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        defaultValue="john.smith@example.com"
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea 
                        rows={3}
                        defaultValue="Computer Science student interested in AI and machine learning."
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Education/Work
                      </label>
                      <input 
                        type="text" 
                        defaultValue="Stanford University"
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Tab content - Notifications */}
                <div className={tabValue === 1 ? 'block p-6' : 'hidden'}>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Email Alerts</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive important alerts via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.emailAlerts}
                          onChange={() => handleNotificationChange('emailAlerts')}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Content Processed</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when AI finishes processing your content</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.contentProcessed}
                          onChange={() => handleNotificationChange('contentProcessed')}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">New Features</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Stay updated on new app features and improvements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.newFeatures}
                          onChange={() => handleNotificationChange('newFeatures')}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Weekly Digest</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive a weekly summary of your learning activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications.weeklyDigest}
                          onChange={() => handleNotificationChange('weeklyDigest')}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Tab content - Security */}
                <div className={tabValue === 2 ? 'block p-6' : 'hidden'}>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Current Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="Enter current password"
                            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                            New Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="Enter new password"
                            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Confirm New Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="Confirm new password"
                            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <button className="px-4 py-2 mt-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Two-Factor Authentication</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Sessions</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Manage your active sessions and sign out from other devices.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors">
                        Manage Sessions
                      </button>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-3">Danger Zone</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Permanently delete your account and all associated data.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-red-500 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
