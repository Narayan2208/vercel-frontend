import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Eye,
  Send,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  BriefcaseIcon,
  Calendar,
  ChevronRight,
  MessageSquareText,
  UserCheck,
  FileText,
  Loader2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary: string;
  experience: string;
  skills: string;
  status: string;
  createdAt: string;
  employer: {
    _id: string;
    name: string;
    company: string;
  };
  stats: {
    views: number;
    uniqueViews: number;
    applications: number;
  };
}

interface Application {
  _id: string;
  applicant: {
    _id: string;
    fullName: string;
    email: string;
    location: string;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate?: string;
      description?: string;
    }>;
  };
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter?: string;
  createdAt: string;
}

interface JobStats {
  views: number;
  applications: number;
  uniqueViews: number;
}

const EmployerJobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Application[]>([]);
  const [stats, setStats] = useState<JobStats | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please log in to view job details");
        }

        // Fetch job details
        const jobResponse = await fetch(
          `https://vercel-backend-nv3k.onrender.com/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!jobResponse.ok) {
          const data = await jobResponse.json();
          throw new Error(data.message || "Failed to fetch job details");
        }

        const jobData = await jobResponse.json();
        setJob(jobData);
        setStats(jobData.stats);

        // Fetch applications
        const applicationsResponse = await fetch(
          `https://vercel-backend-nv3k.onrender.com/api/employer/jobs/${id}/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setCandidates(applicationsData);
        }

        setError(null);
      } catch (err: any) {
        console.error("Error fetching job details:", err);
        setError(err.message || "Failed to fetch job details");
        toast({
          title: "Error",
          description: err.message || "Failed to fetch job details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p className="text-muted-foreground mb-6">
              {error || "Job not found"}
            </p>
            <Button onClick={() => navigate("/employer/dashboard")} className="bg-[#ffa500] hover:bg-[#ffa500]">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <Button variant="outline">Edit Job</Button>
              </div>

              {/* Job Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Eye className="w-4 h-4" />
                    <span>Views</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats?.uniqueViews || 0}
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Send className="w-4 h-4" />
                    <span>Applications</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats?.applications || 0}
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <UserCheck className="w-4 h-4" />
                    <span>Conversion Rate</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats?.uniqueViews
                      ? (
                          (stats.applications / stats.uniqueViews) *
                          100
                        ).toFixed(1)
                      : "0"}
                    %
                  </div>
                </div>
              </div>
            </Card>

            {/* Job Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Job Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Posted {formatDistanceToNow(new Date(job.createdAt))} ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{job.status === "active" ? "Active" : "Closed"}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <p className="text-muted-foreground">{job.requirements}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/5 text-muted-foreground rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Candidates */}
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  Candidates ({candidates.length})
                </h2>
                <Button variant="outline" className="bg-[#ffa500] hover:bg-[#ffa500]" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    className="border border-border rounded-lg p-3"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {candidate.applicant.fullName.charAt(0)}
                          </span>
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {candidate.applicant.fullName}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              candidate.status === "pending"
                                ? "bg-blue-50 text-blue-600"
                                : candidate.status === "reviewed"
                                ? "bg-purple-50 text-purple-600"
                                : candidate.status === "accepted"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {candidate.status.charAt(0).toUpperCase() +
                              candidate.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {candidate.applicant.experience[0]?.position ||
                            "No experience"}{" "}
                          •{" "}
                          {candidate.applicant.location ||
                            "Location not specified"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Applied{" "}
                          {formatDistanceToNow(new Date(candidate.createdAt))}{" "}
                          ago
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerJobDetails;
