import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSiteContent, defaultComplaintBoardData } from './seedData';

const ContentContext = createContext({
  siteContent: defaultSiteContent,
  complaintData: defaultComplaintBoardData,
  refreshContent: async () => {},
  loading: false
});

export function ContentProvider({ children, initialContent = null, initialComplaints = null }) {
  const [siteContent, setSiteContent] = useState(initialContent || defaultSiteContent);
  const [complaintData, setComplaintData] = useState(initialComplaints || defaultComplaintBoardData);
  const [loading, setLoading] = useState(false);

  // Sync with API or local storage in client
  useEffect(() => {
    const loadDynamicContent = async () => {
      try {
        // Try fetching published content from API or localStorage
        if (typeof window !== 'undefined') {
          const storedContent = window.localStorage.getItem('wegro_db_site_content.json');
          if (storedContent) {
            try {
              setSiteContent(JSON.parse(storedContent));
            } catch (e) {
              // fallback
            }
          }

          const storedComplaints = window.localStorage.getItem('wegro_db_complaint_data.json');
          if (storedComplaints) {
            try {
              setComplaintData(JSON.parse(storedComplaints));
            } catch (e) {
              // fallback
            }
          }

          // Also attempt fetch from /api/content if running with Next.js/server
          fetch('/api/content')
            .then((r) => r.ok ? r.json() : null)
            .then((data) => {
              if (data?.siteContent) setSiteContent(data.siteContent);
              if (data?.complaintData) setComplaintData(data.complaintData);
            })
            .catch(() => {});
        }
      } catch (err) {
        // fallback to default
      }
    };

    loadDynamicContent();
  }, []);

  const refreshContent = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data.siteContent) setSiteContent(data.siteContent);
          if (data.complaintData) setComplaintData(data.complaintData);
        }
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ siteContent, complaintData, refreshContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(ContentContext);
  return ctx.siteContent || defaultSiteContent;
}

export function useComplaintData() {
  const ctx = useContext(ContentContext);
  return ctx.complaintData || defaultComplaintBoardData;
}

export function useContentContext() {
  return useContext(ContentContext);
}
