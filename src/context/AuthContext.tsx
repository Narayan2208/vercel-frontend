import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  signIn,
  signOut,
  signUp,
  getUser,
  isAuthenticated,
  AuthResponse,
} from "@/services/auth";

type UserRole = "jobseeker" | "employer";

type ExtendedUser = AuthResponse["user"] | null;

interface AuthContextType {
  user: ExtendedUser;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ExtendedUser>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing user session
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const userData = getUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await signIn(email, password);
      if (response) {
        setUser(response.user);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    } catch (error) {
      // Error handling is in the signIn function
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    try {
      const response = await signUp(email, password, name, role);
      if (response) {
        setUser(response.user);
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
      }
    } catch (error) {
      // Error handling is in the signUp function
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      // Error handling is in the signOut function
    }
  };

  const value = {
    user,
    isLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
