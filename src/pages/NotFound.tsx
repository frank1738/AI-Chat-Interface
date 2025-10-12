import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout title="Page Not Found" showHeader={true}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            Oops! Page not found
          </p>
          <a
            href="/"
            className="text-seo-accent underline hover:text-seo-accent/80"
          >
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
