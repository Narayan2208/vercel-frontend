import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { API_URL } from '@/apisetting';

interface FilterParams {
    search?: string;
    status?: string;
    type?: string;
    experience?: string;
}

export const useFilteredJobs = (filters: FilterParams) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    // const API_URL = "http://localhost:5000/api";

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const queryParams = new URLSearchParams(filters as Record<string, string>);

                const response = await fetch(
                    `${API_URL}/employer/filtered-jobs?${queryParams}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();
                setJobs(data);
                setError(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'employer') {
            fetchJobs();
        }
    }, [filters, user]);

    return { jobs, loading, error };
};
