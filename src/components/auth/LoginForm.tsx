import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      // Error is handled in auth service
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary/30"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-muted-foreground"
          >
            Remember me
          </label>
        </div>

        <a
          href="#"
          className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#ffa500] hover:bg-[#ffa500]">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="text-xs text-center text-muted-foreground mt-6">
        By signing in, you agree to our
        <a href="#" className="text-primary hover:text-primary/90 mx-1">
          Terms of Service
        </a>
        and
        <a href="#" className="text-primary hover:text-primary/90 ml-1">
          Privacy Policy
        </a>
        .
      </div>
    </form>
  );
};

export default LoginForm;
