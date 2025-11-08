import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
import { ClientWrapper } from './ClientWrapper';
import '../styles/globals.css';

export const metadata = {
  title: 'WorkZen HRMS - Modern Human Resource Management System',
  description: 'Streamline your HR operations with WorkZen HRMS. Comprehensive employee management, payroll, attendance tracking, and analytics in one powerful platform.',
  icons: '/favicon.ico',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
