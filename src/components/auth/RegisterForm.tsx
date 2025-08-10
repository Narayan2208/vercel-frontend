import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, name, role);
    } catch (err) {
      // Error is handled in auth service
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Password must be at least 8 characters long
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">I am a:</label>
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setRole("jobseeker")}
            className={`cursor-pointer border rounded-lg p-3 transition-colors ${
              role === "jobseeker"
                ? "border-primary bg-primary/5"
                : "border-input hover:border-primary/50"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                <div
                  className={`w-4 h-4 rounded-full border ${
                    role === "jobseeker"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {role === "jobseeker" && (
                    <div className="w-2 h-2 m-[3px] rounded-full bg-primary" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Job Seeker</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setRole("employer")}
            className={`cursor-pointer border rounded-lg p-3 transition-colors ${
              role === "employer"
                ? "border-primary bg-primary/5"
                : "border-input hover:border-primary/50"
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3">
                <div
                  className={`w-4 h-4 rounded-full border ${
                    role === "employer"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {role === "employer" && (
                    <div className="w-2 h-2 m-[3px] rounded-full bg-primary" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Employer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-input text-primary focus:ring-primary/30"
        />
        <label
          htmlFor="terms"
          className="ml-2 block text-sm text-muted-foreground"
        >
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#ffa500] hover:bg-[#ffa500]">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
