import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "@/services/auth";
import * as profileService from "@/services/profile";
import { Profile } from "@/services/profile";

type User = {
  id: string;
  email: string;
  name: string;
  role: "jobseeker" | "employer";
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    role: "jobseeker" | "employer"
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        const profile = await profileService.getProfile();
        if (profile) {
          setUser({
            id: profile.user,
            email: profile.email,
            name: profile.name,
            role: profile.role,
          });
          setProfile(profile);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await authService.signIn(email, password);
    if (response) {
      setUser(response.user);
      const profile = await profileService.getProfile();
      if (profile) {
        setProfile(profile);
      }
      navigate("/dashboard");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: "jobseeker" | "employer"
  ) => {
    const response = await authService.signUp(email, password, name, role);
    if (response) {
      setUser(response.user);
      const profile = await profileService.getProfile();
      if (profile) {
        setProfile(profile);
      }
      navigate("/dashboard");
    }
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
