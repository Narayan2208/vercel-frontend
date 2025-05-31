import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import * as profileService from "@/services/profile";

const profileSchema = z.object({
  headline: z.string().optional(),
  summary: z.string().optional(),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string().url().optional().or(z.literal("")),
  portfolio_url: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { profile: currentProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      headline: currentProfile?.headline || "",
      summary: currentProfile?.summary || "",
      linkedin_url: currentProfile?.linkedin_url || "",
      github_url: currentProfile?.github_url || "",
      portfolio_url: currentProfile?.portfolio_url || "",
      phone: currentProfile?.phone || "",
      location: currentProfile?.location || "",
      skills: currentProfile?.skills || [],
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      await profileService.updateProfile(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "resume"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const url =
        type === "avatar"
          ? await profileService.uploadAvatar(file)
          : await profileService.uploadResume(file);

      if (url) {
        toast({
          title: `${type === "avatar" ? "Profile picture" : "Resume"} uploaded`,
          description: `Your ${
            type === "avatar" ? "profile picture" : "resume"
          } has been successfully uploaded.`,
        });
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to upload ${
          type === "avatar" ? "profile picture" : "resume"
        }. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Picture
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "avatar")}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Resume</label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileUpload(e, "resume")}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Headline</label>
          <Input {...register("headline")} disabled={isLoading} />
          {errors.headline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.headline.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <Textarea {...register("summary")} disabled={isLoading} />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
          <Input {...register("linkedin_url")} disabled={isLoading} />
          {errors.linkedin_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedin_url.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GitHub URL</label>
          <Input {...register("github_url")} disabled={isLoading} />
          {errors.github_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.github_url.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Portfolio URL
          </label>
          <Input {...register("portfolio_url")} disabled={isLoading} />
          {errors.portfolio_url && (
            <p className="text-red-500 text-sm mt-1">
              {errors.portfolio_url.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input {...register("phone")} disabled={isLoading} />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <Input {...register("location")} disabled={isLoading} />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
