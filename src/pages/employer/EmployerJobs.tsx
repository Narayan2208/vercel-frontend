import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  BarChart2,
  Clock,
  MapPin,
  BriefcaseIcon,
  DollarSign,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface FilterState {
  search: string;
  status: string;
  type: string;
  experience: string;
}

const EmployerJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "",
    type: "",
    experience: "",
  });

  const { jobs, loading, error } = useJobs(user?.id);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.search
        ? job.title.toLowerCase().includes(filters.search.toLowerCase())
        : true) &&
      (filters.status && filters.status !== "all"
        ? job.status === filters.status
        : true) &&
      (filters.type && filters.type !== "all"
        ? job.type === filters.type
        : true) &&
      (filters.experience && filters.experience !== "all"
        ? job.experience === filters.experience
        : true)
    );
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Job Postings</h1>
          <Button
            onClick={() => navigate("/employer/post-job")}
            className="bg-[#ffa500] hover:bg-[#ffa500]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-background border border-border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.type}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.experience}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, experience: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-background border border-border rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    job.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/employer/jobs/${job._id}`)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    navigate(`/employer/jobs/${job._id}/analytics`)
                  }
                >
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EmployerJobs;
