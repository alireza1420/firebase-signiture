'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin area for managing consent forms',
};

export default function AdminLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('isAdmin');
        setIsAdmin(storedAdmin === 'true');
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!isAdmin && !loading) {
            router.push('/login');
        }
    }, [isAdmin, loading, router]);


    if (!isAdmin && loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <header className="bg-primary text-white p-4">
                <h1 className="text-2xl font-bold">SignLink Admin</h1>
                <p>Manage your consent forms and links here.</p>
            </header>
            <main className="flex-grow p-4">{children}</main>
            <footer className="bg-muted text-gray-600 text-center p-4">
                <p>&copy; {new Date().getFullYear()} SignLink. All rights reserved.</p>
            </footer>
        </div>
    );
}


