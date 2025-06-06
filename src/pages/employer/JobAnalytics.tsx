import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Eye,
  Users,
  Clock,
  Check,
  X,
  Clock4,
  BriefcaseIcon,
  CalendarDays,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { API_URL } from "@/apisetting";

interface JobAnalytics {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    experience: string;
    createdAt: string;
    status: string;
  };
  stats: {
    views: number;
    uniqueViews: number;
    applications: number;
    viewsByDate: { date: string; count: number }[];
    applicationsByDate: { date: string; count: number }[];
    applicationsByStatus: { status: string; count: number }[];
    applicationsByExperience: { level: string; count: number }[];
    sourceBreakdown: { source: string; count: number }[];
    timeOfDayData: { hour: number; views: number }[];
    weekdayData: { day: string; applications: number }[];
    conversionRate: number;
    averageResponseTime: number;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const JobAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<JobAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/employer/jobs/${id}/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Analytics fetch failed: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching analytics:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalytics();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card className="p-6 mb-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Error</h2>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Retry
              </button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Job Header */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{data.job.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {data.job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted {formatDistanceToNow(new Date(data.job.createdAt))} ago
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  data.job.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {data.job.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium">{data.job.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p className="font-medium">{data.job.salary}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <GraduationCap className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-medium">{data.job.experience}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Applications
                </p>
                <p className="font-medium">{data.stats.applications}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <h3 className="text-2xl font-bold">{data.stats.views}</h3>
                  </div>
                  <Eye className="w-6 h-6 text-muted-foreground" />
                </div>
                <Progress
                  value={(data.stats.uniqueViews / data.stats.views) * 100}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {data.stats.uniqueViews} unique views
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Applications
                    </p>
                    <h3 className="text-2xl font-bold">
                      {data.stats.applications}
                    </h3>
                  </div>
                  <Users className="w-6 h-6 text-muted-foreground" />
                </div>
                <Progress value={data.stats.conversionRate} />
                <p className="text-sm text-muted-foreground mt-2">
                  {typeof data.stats.conversionRate === "number"
                    ? data.stats.conversionRate.toFixed(1)
                    : "0"}
                  % conversion rate
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. Response Time
                    </p>
                    <h3 className="text-2xl font-bold">
                      {data.stats.averageResponseTime}h
                    </h3>
                  </div>
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
                <Progress value={75} />
                <p className="text-sm text-muted-foreground mt-2">
                  Industry avg: 48h
                </p>
              </Card>
            </div>

            {/* Views Over Time Chart */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Views & Applications Over Time
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.stats.viewsByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Application Status Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Application Status
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.stats.applicationsByStatus}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {data.stats.applicationsByStatus.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Source Breakdown</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.stats.sourceBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Additional tabs content similar to above */}
        </Tabs>
      </div>
    </Layout>
  );
};

export default JobAnalytics;
