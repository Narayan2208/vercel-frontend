import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Edit2,
  Save,
  Loader2,
  Plus,
  Trash2,
  X,
  ExternalLink,
  Calendar,
  Building2,
  School,
  BookOpen,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface SocialLinks {
  linkedin: string;
  github: string;
  portfolio: string;
}

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    description: string;
  }[];
  socialLinks: SocialLinks;
}

const initialProfileData: ProfileData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  socialLinks: {
    linkedin: "",
    github: "",
    portfolio: "",
  },
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] =
    useState<ProfileData>(initialProfileData);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("https://vercel-backend-six-omega.vercel.app/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      // Ensure socialLinks exists in the response data
      const profileWithSocialLinks = {
        ...initialProfileData,
        ...data,
        socialLinks: data.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: "",
        },
      };
      setProfileData(profileWithSocialLinks);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("https://vercel-backend-six-omega.vercel.app/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const addEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const addCertification = () => {
    setProfileData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          date: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeCertification = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      // Split by commas and handle multiple skills
      const skillsToAdd = newSkill
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...skillsToAdd],
      }));
      setNewSkill(""); // Clear the input
    }
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const ProfileView = () => (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.fullName}`}
                />
                <AvatarFallback>
                  {profileData.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                <p className="text-muted-foreground">{profileData.location}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profileData.phone || "Not provided"}</span>
            </div>
          </div>
          {profileData.bio && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {profileData.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {profileData.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profileData.experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-primary/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{exp.company}</span>
                  </div>
                  {exp.description && (
                    <p className="text-muted-foreground mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {profileData.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profileData.education.map((edu, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-primary/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <School className="h-4 w-4" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span>{edu.field}</span>
                  </div>
                  {edu.description && (
                    <p className="text-muted-foreground mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {profileData.certifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profileData.certifications.map((cert, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-primary/20"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary/20" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(cert.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{cert.issuer}</span>
                  </div>
                  {cert.description && (
                    <p className="text-muted-foreground mt-2">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {(profileData.socialLinks.linkedin ||
        profileData.socialLinks.github ||
        profileData.socialLinks.portfolio) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {profileData.socialLinks.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {profileData.socialLinks.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {profileData.socialLinks.portfolio && (
                <a
                  href={profileData.socialLinks.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Globe className="h-4 w-4" />
                  <span>Portfolio</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const ProfileEdit = () => (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => {
                      e.stopPropagation();
                      setProfileData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileData((prev) => ({
                            ...prev,
                            skills: prev.skills.filter((_, i) => i !== index),
                          }));
                        }}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddSkill();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={newSkill}
                    onChange={(e) => {
                      e.stopPropagation();
                      setNewSkill(e.target.value);
                    }}
                    placeholder="Enter skills (e.g., React, Node.js, TypeScript)"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={!newSkill.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </form>
              </div>

              <div className="space-y-2">
                <Label>Social Links</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profileData.socialLinks.linkedin}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            linkedin: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profileData.socialLinks.github}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            github: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                      id="portfolio"
                      value={profileData.socialLinks.portfolio}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            portfolio: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button onClick={addExperience} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">
                      Experience #{index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateExperience(index, "company", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateExperience(index, "position", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateExperience(index, "startDate", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateExperience(index, "endDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateExperience(index, "description", e.target.value);
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.education.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">
                      Education #{index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "institution", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "degree", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field</Label>
                      <Input
                        type="text"
                        value={edu.field}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "field", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "startDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "endDate", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        type="text"
                        value={edu.description}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateEducation(index, "description", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button onClick={addCertification} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">
                      Certification #{index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCertification(index, "name", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Issuer</Label>
                      <Input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCertification(index, "issuer", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={cert.date}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCertification(index, "date", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        type="text"
                        value={cert.description}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCertification(
                            index,
                            "description",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {isEditing ? <ProfileEdit /> : <ProfileView />}
    </div>
  );
};

export default Profile;
