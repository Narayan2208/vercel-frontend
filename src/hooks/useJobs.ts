import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

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
                    ? `https://vercel-backend-six-omega.vercel.app/api/jobs/employer/${employerId}`
                    : 'https://vercel-backend-six-omega.vercel.app/api/jobs';

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