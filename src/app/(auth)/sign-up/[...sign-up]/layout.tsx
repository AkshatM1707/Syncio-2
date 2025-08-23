import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Syncio',
    description: 'SignUp Page',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        children);
}