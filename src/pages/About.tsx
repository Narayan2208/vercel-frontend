import React from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import {
  Users2,
  Target,
  BarChart3,
  HeartHandshake,
  Mail,
  PhoneCall,
  MapPin,
  Clock,
} from "lucide-react";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-primary/5 to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Connecting Talent with Opportunity
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8"
              >
                MySakti is dedicated to revolutionizing the way people find their
                dream careers and how companies discover exceptional talent.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Jobs" },
                { number: "5K+", label: "Companies" },
                { number: "50K+", label: "Job Seekers" },
                { number: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-primary/5"
                >
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose MySakti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Smart Matching",
                  description:
                    "AI-powered job matching that connects you with the most relevant opportunities.",
                },
                {
                  icon: <Users2 className="w-6 h-6" />,
                  title: "Vast Network",
                  description:
                    "Access to thousands of companies and millions of job seekers.",
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Career Growth",
                  description:
                    "Resources and tools to help you advance in your career journey.",
                },
                {
                  icon: <HeartHandshake className="w-6 h-6" />,
                  title: "Personal Touch",
                  description:
                    "Dedicated support team to help you every step of the way.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-background border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions? Our team is here to help you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  info: "support@mysakti.com",
                },
                {
                  icon: <PhoneCall className="w-6 h-6" />,
                  title: "Call Us",
                  info: "+1 (555) 000-0000",
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Working Hours",
                  info: "Mon - Fri, 9AM - 6PM",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-background border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto text-primary">
                    {contact.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground">{contact.info}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of job seekers and employers who trust MySakti
                for their career and recruitment needs.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#28282B] hover:bg-[#28282B]/90">
                  Find Jobs
                </Button>
                <Button variant="outline">Post a Job</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
