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
import type { Experience } from "@/services/profile";

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  experience?: Experience;
  onClose: () => void;
}

export function ExperienceForm({ experience, onClose }: ExperienceFormProps) {
  const { profile: currentProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experience || {
      title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  });

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      setIsLoading(true);

      const updatedExperiences = [...(currentProfile?.experience || [])];

      if (experience) {
        // Update existing experience
        const index = updatedExperiences.findIndex((exp) => exp === experience);
        if (index !== -1) {
          updatedExperiences[index] = data;
        }
      } else {
        // Add new experience
        updatedExperiences.push(data);
      }

      await profileService.updateProfile({
        experience: updatedExperiences,
      });

      toast({
        title: experience ? "Experience updated" : "Experience added",
        description: experience
          ? "Your experience has been updated successfully."
          : "Your experience has been added successfully.",
      });

      onClose();
    } catch (error) {
      console.error("Error updating experience:", error);
      toast({
        title: "Error",
        description: "Failed to update experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input {...register("title")} disabled={isLoading} />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Company</label>
        <Input {...register("company")} disabled={isLoading} />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <Input {...register("location")} disabled={isLoading} />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <Input type="date" {...register("start_date")} disabled={isLoading} />
        {errors.start_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.start_date.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">End Date</label>
        <Input type="date" {...register("end_date")} disabled={isLoading} />
        {errors.end_date && (
          <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea {...register("description")} disabled={isLoading} />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : experience ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}
