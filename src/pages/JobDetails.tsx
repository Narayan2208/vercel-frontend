import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BriefcaseIcon,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { API_URL } from "@/apisetting";

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
  createdAt: string;
  employer: {
    _id: string;
    name: string;
    company: string;
  };
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
    // const API_URL = "https://vercel-backend-nv3k.onrender.com/api";
  // const API_URL = "http://localhost:5000/api";
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/jobs/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch job details");
        }

        const data = await response.json();
        setJob(data);
        setError(null);

        // Track view if user is authenticated
        if (token) {
          try {
            await fetch(
              `${API_URL}/jobs/${id}/view`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (error) {
            console.error("Error tracking view:", error);
          }
        }
      } catch (err: any) {
        console.error("Error fetching job:", err);
        setError(err.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to apply");
      }

      console.log("Attempting to apply for job:", {
        jobId: id,
        coverLetter: coverLetter ? "provided" : "not provided",
      });

      const response = await fetch(
        `${API_URL}/jobs/${id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            coverLetter: coverLetter.trim() || undefined,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Application failed:", {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(data.message || "Failed to apply for job");
      }

      const data = await response.json();
      console.log("Application successful:", data);

      setShowSuccess(true);
      toast({
        title: "Application Submitted!",
        description: "Your job application has been successfully submitted.",
      });
    } catch (error: any) {
      console.error("Error in job application:", {
        error: error.message,
        jobId: id,
      });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 ">
          <div className="max-w-4xl mx-auto text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-[#ffa500] hover:bg-[#ffa500]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Button
          variant="ghost"
          className="mb-6 bg-[#ffa500] hover:bg-[#ffa500] text-white"
          onClick={() => navigate("/jobs")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <div className="bg-background border border-border rounded-xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BriefcaseIcon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Posted{" "}
                    {formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="min-w-[120px] bg-[#ffa500] hover:bg-[#ffa500]"
                  >
                    Apply Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  {showSuccess ? (
                    <div className="py-6 text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <DialogTitle className="text-xl mb-2">
                        Application Submitted!
                      </DialogTitle>
                      <DialogDescription className="mb-6">
                        Your application has been successfully submitted. The
                        employer will review it and get back to you soon.
                      </DialogDescription>
                      <Button onClick={() => navigate("/jobs")} className="bg-[#ffa500] hover:bg-[#ffa500]">
                        Browse More Jobs
                      </Button>
                    </div>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          Submit your application for {job.title} at{" "}
                          {job.company}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-1 block">
                            Cover Letter (Optional)
                          </label>
                          <Textarea
                            placeholder="Tell us why you're a great fit for this role..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="min-h-[200px]"
                          />
                        </div>
                        <Button
                          onClick={handleApply}
                          disabled={isApplying}
                          className="w-full bg-[#ffa500] hover:bg-[#ffa500]"
                        >
                          {isApplying ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 p-4 bg-accent/5 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Salary</div>
                  <div className="text-muted-foreground">{job.salary}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 bg-accent/5 rounded-lg">
                <BriefcaseIcon className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Job Type</div>
                  <div className="text-muted-foreground">{job.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 bg-accent/5 rounded-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Experience</div>
                  <div className="text-muted-foreground">{job.experience}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-background border border-border rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <div className="prose max-w-none">
                {job.requirements.split("\n").map((requirement, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {requirement}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
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
        </div>
      </div>
    </Layout>
  );
};

export default JobDetails;
