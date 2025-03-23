import React, { Suspense, lazy, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from "./Loading";
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

// Lazy load the ContactList component
const ContactList = lazy(() => import("./ContactListApp"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <FiArrowLeft className="header-icon" />
            <h1>My Contacts</h1>
            <FiPlus className="header-icon" />
          </div>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <main>
          <Suspense fallback={<Loading />}>
            <ContactList searchTerm={searchTerm} />
          </Suspense>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
