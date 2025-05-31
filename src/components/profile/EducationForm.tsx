import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import * as profileService from "@/services/profile";
import type { Education } from "@/services/profile";

const educationSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationFormProps {
  education?: Education;
  onClose: () => void;
}

export function EducationForm({ education, onClose }: EducationFormProps) {
  const { profile: currentProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: education || {
      school: "",
      degree: "",
      field: "",
      start_date: "",
      end_date: "",
    },
  });

  const onSubmit = async (data: EducationFormData) => {
    try {
      setIsLoading(true);

      const updatedEducation = [...(currentProfile?.education || [])];

      if (education) {
        // Update existing education
        const index = updatedEducation.findIndex((edu) => edu === education);
        if (index !== -1) {
          updatedEducation[index] = data;
        }
      } else {
        // Add new education
        updatedEducation.push(data);
      }

      await profileService.updateProfile({
        education: updatedEducation,
      });

      toast({
        title: education ? "Education updated" : "Education added",
        description: education
          ? "Your education has been updated successfully."
          : "Your education has been added successfully.",
      });

      onClose();
    } catch (error) {
      console.error("Error updating education:", error);
      toast({
        title: "Error",
        description: "Failed to update education. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">School</label>
        <Input {...register("school")} disabled={isLoading} />
        {errors.school && (
          <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Degree</label>
        <Input {...register("degree")} disabled={isLoading} />
        {errors.degree && (
          <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Field of Study</label>
        <Input {...register("field")} disabled={isLoading} />
        {errors.field && (
          <p className="text-red-500 text-sm mt-1">{errors.field.message}</p>
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
          {isLoading ? "Saving..." : education ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}
