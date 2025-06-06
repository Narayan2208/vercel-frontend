import { API_URL } from "@/apisetting";
import { toast } from "@/hooks/use-toast";

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'jobseeker' | 'employer';
  };
  token: string;
};

// const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://vercel-backend-six-omega.vercel.app/api';
// const API_URL = 'https://vercel-backend-nv3k.onrender.com/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }
  return data;
};
  
export const signIn = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    toast({
      title: "Authentication Error",
      description: error.message || "Failed to sign in",
      variant: "destructive",
    });
    return null;
  }
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: 'jobseeker' | 'employer'
): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, role }),
    });

    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    toast({
      title: "Registration Error",
      description: error.message || "Failed to sign up",
      variant: "destructive",
    });
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const token = getToken();
    if (token) {
      // Call logout endpoint to invalidate token on server
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of server response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): AuthResponse['user'] | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Add token to all API requests
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
