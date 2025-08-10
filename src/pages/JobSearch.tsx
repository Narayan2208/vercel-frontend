import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseIcon,
  Building2,
  MapPin,
  Search,
  Clock,
  ChevronRight,
  FilterIcon,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const JobSearch: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs, loading, error } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [] as string[],
    experience: [] as string[],
    salary: "",
  });

  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "remote", label: "Remote" },
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "lead", label: "Lead" },
    { value: "manager", label: "Manager" },
  ];

  const salaryRanges = [
    { value: "30k-50k", label: "$30k - $50k" },
    { value: "50k-80k", label: "$50k - $80k" },
    { value: "80k-100k", label: "$80k - $100k" },
    { value: "100k-150k", label: "$100k - $150k" },
    { value: "150k+", label: "$150k+" },
  ];

  const toggleFilter = (type: "jobType" | "experience", value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationQuery
      ? job.location.toLowerCase().includes(locationQuery.toLowerCase())
      : true;
    const matchesJobType =
      selectedFilters.jobType.length === 0 ||
      selectedFilters.jobType.includes(job.type);
    const matchesExperience =
      selectedFilters.experience.length === 0 ||
      selectedFilters.experience.includes(job.experience);

    return (
      matchesSearch && matchesLocation && matchesJobType && matchesExperience
    );
  });

  return (
    <Layout>
      <div className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Job</h1>
            <p className="text-muted-foreground mb-8">
              Search thousands of jobs from leading companies and find
              opportunities that match your skills and career goals
            </p>

            {/* Search Bar */}
            <div className="bg-background border border-border rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full bg-[#ffa500] hover:bg-[#ffa500]">Search</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-background border border-border rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Job Type</h2>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.jobType.includes(type.value)}
                          onChange={() => toggleFilter("jobType", type.value)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Experience Level</h2>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <label
                        key={level.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.experience.includes(
                            level.value
                          )}
                          onChange={() =>
                            toggleFilter("experience", level.value)
                          }
                          className="rounded border-border"
                        />
                        <span className="text-sm">{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Salary Range</h2>
                  <div className="space-y-2">
                    {salaryRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="salary"
                          value={range.value}
                          checked={selectedFilters.salary === range.value}
                          onChange={(e) =>
                            setSelectedFilters((prev) => ({
                              ...prev,
                              salary: e.target.value,
                            }))
                          }
                          className="rounded-full border-border"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-9">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-muted-foreground">
                    {filteredJobs.length} jobs found
                  </div>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary-high">
                        Highest Salary
                      </SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-12">{error}</div>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No jobs found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <div
                        key={job._id}
                        className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <BriefcaseIcon className="w-6 h-6 text-primary" color="#FFA500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold mb-1">
                                {job.title}
                              </h3>
                              {job.isApplied && (
                                <span className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Applied
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                {job.type}
                              </span>
                              <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm">
                                {job.experience}
                              </span>
                              <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm">
                                {job.salary}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex flex-wrap gap-2">
                                {job.skills
                                  .split(",")
                                  .slice(0, 3)
                                  .map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-1 bg-accent/5 text-muted-foreground rounded-full text-xs"
                                    >
                                      {skill.trim()}
                                    </span>
                                  ))}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 font-semibold hover:bg-background"
                                  onClick={() => navigate(`/jobs/${job._id}`)}
                                >
                                  View Details
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                                <Button
                                  size="sm"
                                  disabled={job.isApplied}
                                  onClick={() => navigate(`/jobs/${job._id}`)}
                                  className="bg-[#ffa500] hover:bg-[#ffa500]"
                                >
                                  {job.isApplied ? "Applied" : "Apply Now"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobSearch;
