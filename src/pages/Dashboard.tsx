import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { 
  ArrowUpRight, 
  BookmarkPlus, 
  BriefcaseIcon, 
  CalendarCheck, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileText, 
  FilterIcon, 
  MessagesSquare, 
  MoreHorizontal, 
  SearchIcon, 
  Settings,
  PlusCircle,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to employer dashboard if user is an employer
    if (user?.role === 'employer') {
      navigate('/employer/dashboard');
    }
  }, [user, navigate]);

  // Mock data for recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      posted: '2 days ago',
      matched: '92% Match',
      logo: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataWise Solutions',
      location: 'New York, NY',
      salary: '$130,000 - $160,000',
      type: 'Full-time',
      posted: '5 days ago',
      matched: '88% Match',
      logo: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      title: 'Software Engineer',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      salary: '$110,000 - $140,000',
      type: 'Full-time',
      posted: '1 week ago',
      matched: '85% Match',
      logo: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
  ];

  // Mock data for applications
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      status: 'Applied',
      date: '2 days ago',
    },
    {
      id: 2,
      jobTitle: 'Data Scientist',
      company: 'DataWise Solutions',
      status: 'Interviewing',
      date: '5 days ago',
    },
    {
      id: 3,
      jobTitle: 'Software Engineer',
      company: 'InnovateTech',
      status: 'Rejected',
      date: '1 week ago',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-12 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Job Seeker Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" />
              <span>Search Jobs</span>
            </Button>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Welcome back, {user?.name || 'User'}! 👋</h2>
              <p className="text-muted-foreground mb-4">Your job search journey is progressing well. Here's what you can do today:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-border rounded-lg p-3 flex items-start gap-3 bg-background">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <BriefcaseIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Complete your profile</h3>
                    <p className="text-sm text-muted-foreground">Add skills and experience to stand out</p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-3 flex items-start gap-3 bg-background">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Track your applications</h3>
                    <p className="text-sm text-muted-foreground">See the status of jobs you've applied for</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommended Jobs */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recommended Jobs</h2>
                <Button className="flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="divide-y divide-border">
                {recommendedJobs.map(job => (
                  <div key={job.id} className="p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img 
                          src={job.logo} 
                          alt={`${job.company} logo`} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/48';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-semibold truncate">{job.title}</h3>
                          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                            {job.matched}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{job.company}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <BriefcaseIcon className="w-3 h-3 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 justify-end">
                      <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate(`/jobs/${job.id}`)}>
                        <FileText className="w-4 h-4" />
                        <span>View Details</span>
                      </Button>
                      <Button className="flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]">
                        <BookmarkPlus className="w-4 h-4" />
                        <span>Save</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Applications Status */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Applications Status</h2>
              </div>
              <div className="p-4 space-y-4">
                {applications.map(application => (
                  <div key={application.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{application.jobTitle}</h3>
                      <p className="text-xs text-muted-foreground">{application.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{application.status}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Button variant="outline" className="w-full bg-[#ffa500] hover:bg-[#ffa500] text-[#fff]">
                  View All Applications
                </Button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-4">
                <Button variant="secondary" className="w-full flex items-center gap-2">
                  <SearchIcon className="w-4 h-4" />
                  Find a Job
                </Button>
                <Button variant="secondary" className="w-full flex items-center gap-2">
                  <MessagesSquare className="w-4 h-4" />
                  Practice Interview
                </Button>
                <Button variant="secondary" className="w-full flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  Set Job Alert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
