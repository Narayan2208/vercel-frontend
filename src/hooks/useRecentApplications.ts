import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_URL } from '@/apisetting';

interface RecentApplication {
    id: string;
    name: string;
    position: string;
    location: string;
    applied: string;
    status: string;
    email: string;
}

export const useRecentApplications = () => {
    const [applications, setApplications] = useState<RecentApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
      // const API_URL = "https://vercel-backend-nv3k.onrender.com/api";
//   const API_URL = "http://localhost:5000/api";
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/employer/recent-applications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recent applications');
                }

                const data = await response.json();
                setApplications(data);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching recent applications:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === 'employer') {
            fetchApplications();
        }
    }, [user]);

    return { applications, loading, error };
};
