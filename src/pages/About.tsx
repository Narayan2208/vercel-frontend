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
import Lydia from "../assets/Lydia.jpg";
import mukti from "../assets/mukti.jpg";
import Tanmay from "../assets/Tanmay.jpg";
const About: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero Section */}
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
                MySakti is dedicated to revolutionizing the way people find
                their dream careers and how companies discover exceptional
                talent.
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
                  icon: <Target className="w-6 h-6" color="#FFA500" />,
                  title: "Smart Matching",
                  description:
                    "AI-powered job matching that connects you with the most relevant opportunities.",
                },
                {
                  icon: <Users2 className="w-6 h-6" color="#FFA500"/>,
                  title: "Vast Network",
                  description:
                    "Access to thousands of companies and millions of job seekers.",
                },
                {
                  icon: <BarChart3 className="w-6 h-6" color="#FFA500"/>,
                  title: "Career Growth",
                  description:
                    "Resources and tools to help you advance in your career journey.",
                },
                {
                  icon: <HeartHandshake className="w-6 h-6" color="#FFA500"/>,
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
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Journey So Far
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { year: "2022", milestone: "Idea & Planning" },
                { year: "2023", milestone: "MVP & Government Integration" },
                { year: "2024", milestone: "Beta Testing & Seed Round" },
                { year: "2025", milestone: "Official Launch" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-border bg-primary/5"
                >
                  <div className="text-2xl font-bold text-[#FFA500] mb-2">
                    {item.year}
                  </div>
                  <p className="text-muted-foreground">{item.milestone}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Banner */}
        <div
          className="py-12 text-white"
          style={{
            background: "linear-gradient(to right, #FFA500, #FF8C00)",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">
              Empowering 70+ Million Workers Across Indonesia
            </h2>
            <p className="text-lg opacity-90">
              We're building a future where blue-collar workers get the
              recognition, access, and dignity they deserve.
            </p>
          </div>
        </div>

        {/* Team Section */}
        {/* Leadership Team Section */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Leadership Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "Mukti Atmaja",
                  role: "Co-Founder & Government Liaison",
                  image: mukti,
                  description: `Mukti is an experienced human resources professional who has established strong connections in the mining and resource sectors, as well as with various Indonesian government departments. He leads important initiatives focused on government licensing and compliance. His relationships with Dukcapil and the Ministry of Manpower give My-Sakti a strategic advantage in navigating regulatory requirements.`,
                },
                {
                  name: "Lydia Halim",
                  role: "Co-Founder & Strategy Director",
                  image: Lydia,
                  description: `Lydia is an experienced business leader with extensive expertise in project management and international recruitment at TAC Resources Australia. She guides the strategic direction and operational development of the platform. Her ability to build partnerships has been essential in positioning My-Sakti for success in the competitive Indonesian market.`,
                },
                {
                  name: "Tanmay Ghosh",
                  role: "Shareholder & Global Staffing Advisor",
                  image: Tanmay,
                  description: `Tanmay is the Director of Cognizance, a prominent staffing agency in India. He brings valuable insights into the international workforce and expertise in IT to the development of My-Sakti's app. His proven ability to understand client needs and effectively identify talent offers strategic guidance that is informed by a global perspective and extensive industry experience.`,
                },
              ].map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-primary/5 p-6 rounded-xl shadow-sm"
                >
                  <div className="mb-4">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="rounded-md mx-auto"
                      width={160}
                      height={160}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-muted-foreground font-medium mb-3">
                    {leader.role}
                  </p>
                  <p className="text-sm text-muted-foreground text-left">
                    {leader.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Market Opportunity Section */}
        <div className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Transforming Blue-Collar Employment in Indonesia
              </h2>
              <p className="text-muted-foreground text-lg">
                My-Shakti is revolutionizing Indonesia's informal labor market
                by eliminating costly intermediaries and directly connecting 70+
                million blue-collar workers with employers. Our platform ensures
                secure, transparent hiring by integrating with government
                systems like Dukcapil and the National Police database.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "First-Mover Advantage",
                  description:
                    "Our unique government API integrations for ID verification and police certification create significant barriers for competitors.",
                },
                {
                  title: "Scalable Model",
                  description:
                    "Designed for rapid expansion across Indonesia and Southeast Asia, our mobile-first approach ensures accessibility at scale.",
                },
                {
                  title: "Social Impact",
                  description:
                    "We improve livelihoods of millions by offering fairer, safer, and more transparent employment opportunities in an underserved market.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-background border border-border"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
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
                  icon: <Mail className="w-6 h-6" color="#FFA500"/>,
                  title: "Email Us",
                  info: "support@mysakti.com",
                },
                {
                  icon: <PhoneCall className="w-6 h-6" color="#FFA500"/>,
                  title: "Call Us",
                  info: "+1 (555) 000-0000",
                },
                {
                  icon: <Clock className="w-6 h-6" color="#FFA500"/>,
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
                  <h3 className="text-lg font-semibold mb-2">
                    {contact.title}
                  </h3>
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
                <Button className="bg-[#FFA500] hover:bg-[#FFA500]/90">
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
