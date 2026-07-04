
import { useState, useEffect } from 'react';
import { ProfileData } from '../types/portfolio';

export const usePortfolioData = () => {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, this would be a fetch call to an API or a public JSON file
                // For now, we can import it directly or fetch from public/data if moved there.
                // But since we want "fetch", let's assume it's in the assets or public folder.
                // I will place it in src/data and import it for simplicity, OR use fetch if moved to public.
                // The user said "fetch all the data from the json", which implies an async operation.

                const response = await fetch('/profile.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching portfolio data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
