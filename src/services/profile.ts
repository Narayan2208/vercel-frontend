import { API_URL } from "@/apisetting";
import { getToken } from "./auth";

// const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://vercel-backend-six-omega.vercel.app/api';
// const API_URL = 'https://vercel-backend-nv3k.onrender.com/api';


export type Experience = {
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
};

export type Education = {
    school: string;
    degree: string;
    field: string;
    start_date: string;
    end_date: string;
};

export type Profile = {
    id: string;
    user: string;
    email: string;
    name: string;
    role: 'jobseeker' | 'employer';
    avatar_url?: string;
    headline?: string;
    summary?: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    resume_url?: string;
    linkedin_url?: string;
    github_url?: string;
    portfolio_url?: string;
    phone?: string;
    location?: string;
};

export const getProfile = async (): Promise<Profile | null> => {
    try {
        const token = getToken();
        if (!token) return null;

        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};

export const updateProfile = async (profileData: Partial<Profile>): Promise<Profile | null> => {
    try {
        const token = getToken();
        if (!token) return null;

        const response = await fetch(`${API_URL}/profile`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        return null;
    }
};

export const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
        const token = getToken();
        if (!token) return null;

        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetch(`${API_URL}/profile/avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload avatar');
        }

        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        return null;
    }
};

export const uploadResume = async (file: File): Promise<string | null> => {
    try {
        const token = getToken();
        if (!token) return null;

        const formData = new FormData();
        formData.append('resume', file);

        const response = await fetch(`${API_URL}/profile/resume`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload resume');
        }

        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Error uploading resume:', error);
        return null;
    }
}; 