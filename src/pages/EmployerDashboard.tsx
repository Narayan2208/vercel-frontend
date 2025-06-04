import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  ArrowUpRight,
  BarChart3,
  BookmarkPlus,
  BriefcaseIcon,
  Building2,
  CalendarCheck,
  CheckCheck,
  ChevronRight,
  Clock,
  Coins,
  FileText,
  FilterIcon,
  MessageSquareText,
  MoreHorizontal,
  SearchIcon,
  Users,
  PlusCircle,
  Calendar,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/hooks/useJobs";
import { formatDistanceToNow } from "date-fns";

const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs, loading, error } = useJobs(user?.id);

  useEffect(() => {
    // Redirect to job seeker dashboard if user is not an employer
    if (user && user.role !== "employer") {
      navigate("/seeker/dashboard");
    }
  }, [user, navigate]);

  // Mock data
  const applications = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Software Engineer",
      experience: "5+ years",
      location: "New York, NY",
      applied: "2 days agosss",
      status: "New",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Bob Williams",
      position: "Data Scientist",
      experience: "3+ years",
      location: "San Francisco, CA",
      applied: "5 days ago",
      status: "Reviewed",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Charlie Brown",
      position: "Product Manager",
      experience: "7+ years",
      location: "Chicago, IL",
      applied: "1 week ago",
      status: "Interviewing",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Diana Miller",
      position: "UX Designer",
      experience: "4+ years",
      location: "Los Angeles, CA",
      applied: "2 weeks ago",
      status: "Hired",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-12 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Employer Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" />
              <span>Search Candidates</span>
            </Button>
          </div>
        </div>

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-background border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Total Applications
              </span>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">124</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500">+12%</span> from last month
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Active Job Postings
              </span>
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-blue-500">View details</span>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Interviews Scheduled
              </span>
              <CalendarCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">22</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-purple-500">See calendar</span>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                New Hires
              </span>
              <CheckCheck className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500">Welcome new team members</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">
                Welcome back, {user?.name || "Employer"}! 👋
              </h2>
              <p className="text-muted-foreground mb-4">
                Your hiring dashboard is ready. Here's what you can do today:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-border rounded-lg p-3 flex items-start gap-3 bg-background">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Post a new job</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach qualified candidates
                    </p>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-3 flex items-start gap-3 bg-background">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Review applications</h3>
                    <p className="text-sm text-muted-foreground">
                      Respond to candidates promptly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Button className="flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="divide-y divide-border">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    className="p-4 hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={application.avatar}
                          alt={`${application.name}'s avatar`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/48";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-semibold truncate">
                            {application.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              application.status === "New"
                                ? "bg-blue-50 text-blue-600"
                                : application.status === "Reviewed"
                                ? "bg-purple-50 text-purple-600"
                                : application.status === "Interviewing"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {application.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1">
                          {application.position}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <BookmarkPlus className="w-3 h-3 mr-1" />
                            {application.experience}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {application.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {application.applied}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 justify-end">
                      <Button className="flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]">
                        View Application
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <MessageSquareText className="w-4 h-4" />
                        <span>Contact</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Active Job Postings */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold">Active Job Postings</h2>
                <Button
                  className="flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]"
                  onClick={() => navigate("/employer/post-job")}
                >
                  Post New Job
                </Button>
              </div>
              <div className="p-4 space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-sm">{error}</div>
                ) : jobs.length === 0 ? (
                  <div className="text-muted-foreground text-sm text-center py-4">
                    No job postings yet. Click "Post New Job" to create one.
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div
                      key={job._id}
                      className="border border-border rounded-lg p-3 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{job.title}</h3>
                        <div className="flex">
                          <button className="text-muted-foreground hover:text-foreground p-1 rounded-md">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {job.company}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {job.type}
                        </span>
                        <span className="text-xs px-2 py-1 bg-accent/10 text-muted-foreground rounded-full">
                          {job.location}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Posted{" "}
                          {formatDistanceToNow(new Date(job.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.status === "active" ? "Active" : "Closed"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => navigate(`/employer/jobs/${job._id}`)}
                        >
                          <FileText className="w-3 h-3" />
                          <span>View</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-xs"
                        >
                          <Users className="w-3 h-3" />
                          <span>Candidates</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Hiring Activity */}
            <div className="bg-background border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Hiring Activity</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Interviews this week
                  </span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Offers sent
                  </span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    New hires
                  </span>
                  <span className="font-medium">2</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Calendar</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>Reports</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
