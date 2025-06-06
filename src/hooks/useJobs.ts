import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/apisetting';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    salary: string;
    experience: string;
    skills: string;
    status: string;
    createdAt: string;
    employer: {
        _id: string;
        name: string;
        company: string;
    };
    updatedAt: string;
    isApplied?: boolean;
    applicationStatus?: string | null;
}

export const useJobs = (employerId?: string) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
      // const API_URL = "https://vercel-backend-nv3k.onrender.com/api";
//   const API_URL = "http://localhost:5000/api";
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const headers: HeadersInit = {
                    "Content-Type": "application/json",
                };

                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                const url = employerId
                    ? `${API_URL}/jobs/employer/${employerId}`
                    : `${API_URL}/jobs`;

                const response = await fetch(url, {
                    headers
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to fetch jobs');
                }

                const data = await response.json();
                setJobs(data);
                setError(null);
            } catch (err: any) {
                console.error("Error fetching jobs:", err);
                setError(err.message || 'Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [employerId]);

    return { jobs, loading, error };
}; 