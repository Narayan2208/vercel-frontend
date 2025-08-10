import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Layout from "../components/Layout";
import AuthModal from "../components/auth/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { SearchIcon, BriefcaseIcon, Building2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "../components/jobs/JobCard";

const Index: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const featuredJobs = useSelector(
    (state: RootState) => state.jobs.featuredJobs
  );
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const openAuthModal = () => {
    if (user) {
      // If user is already logged in, redirect to dashboard
      if (user.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Indonesia's Trusted Blue Collar Job Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground mb-8"
            >
              Find daily blue collar work that matches your skills or hire trusted workers for your projects
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center space-x-3 max-w-xl mx-auto"
            >
              <Input
                type="search"
                placeholder="Search for jobs"
                className="w-full max-w-lg"
              />
              <Button
                className="bg-[#ffa500] hover:bg-[#ffa500] text-primary-foreground"
                onClick={() => navigate("/jobs")}
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-secondary/10">
                <BriefcaseIcon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">Job Search</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Search for jobs based on your skills, location, and preferences.
            </p>
            <Link
              to="/jobs"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Find Jobs <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Building2Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Employer Directory</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Browse our directory of top employers and learn about their
              company culture and values.
            </p>
            <a
              href="#"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Explore Employers <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-full bg-green-100">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-text"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Career Resources</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Access our library of career resources and get expert advice on
              resume writing, interviewing, and more.
            </p>
            <a
              href="#"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Learn More <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          {!user && !isLoading ? (
            <Button variant="outline" onClick={openAuthModal}>
              Sign In to View
            </Button>
          ) : (
            <Link
              to="/jobs"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All Jobs <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} featured={true} />
          ))}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </Layout>
  );
};

export default Index;
