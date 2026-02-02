import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
    title: 'Bluestone PIM - Product List',
    description: 'Product Information Management - View and edit product details',
    other: {
        'html-lang': 'en',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <Providers>{children}</Providers>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
