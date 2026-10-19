import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  TrendingUp,
  FileText,
  Share2
} from 'lucide-react';
import { researchArticles, researchCategories } from '../data/researchData';
import AnimatedTabs from '../components/AnimatedTabs';
import SpotlightCard from '../components/SpotlightCard';

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles based on category and search query
  const filteredArticles = researchArticles.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // If user is reading an article, show full reader view
  if (selectedArticle) {
    const relatedArticles = researchArticles
      .filter((a) => a.id !== selectedArticle.id)
      .slice(0, 2);

    return (
      <div className="section bg-white">
        <div className="container-narrow">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-sm btn-outline-dark"
            style={{ marginBottom: 24 }}
          >
            <ArrowLeft size={16} />
            <span>Back to Research Hub</span>
          </button>

          {/* Article Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <span className="badge badge-cyan">{selectedArticle.category}</span>
              <span className="badge badge-amber">Sample Demonstration Note</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0f172a', lineHeight: 1.25, marginBottom: 16 }}>
              {selectedArticle.title}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, color: '#64748b', fontSize: '0.8125rem', borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={14} />
                {selectedArticle.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} />
                {selectedArticle.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={14} />
                By {selectedArticle.author}
              </span>
            </div>
          </div>

          {/* Key Levels Card */}
          <div style={{ background: '#0b172a', color: '#f8fafc', padding: 24, borderRadius: 12, marginBottom: 32 }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#00e5ff', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.05em' }}>
              • Core Market Levels & Analytical Thesis
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Support Zone</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', fontFamily: 'monospace' }}>
                  {selectedArticle.keyLevels.support}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Resistance / Target</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00e5ff', fontFamily: 'monospace' }}>
                  {selectedArticle.keyLevels.resistance}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Structural Stance</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {selectedArticle.keyLevels.trend}
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div style={{ background: '#f8fafc', borderLeft: '4px solid #00b4d8', padding: 20, borderRadius: 8, marginBottom: 32 }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 10 }}>
              Key Analytical Takeaways:
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selectedArticle.takeaways.map((takeaway, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.9375rem', color: '#334155' }}>
                  <span style={{ color: '#00b4d8', fontWeight: 800 }}>•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Full Body */}
          <div style={{ color: '#1e293b', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: 40 }}>
            {selectedArticle.fullBody.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} style={{ fontSize: '1.35rem', color: '#0f172a', margin: '28px 0 12px 0' }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} style={{ marginBottom: 16 }}>
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>

          {/* Article Footer & Disclaimers */}
          <div className="compliance-banner" style={{ marginBottom: 40 }}>
            <strong>Analyst Certification & Conflict of Interest: </strong>
            The research ideas expressed in this note reflect the views of the author and the WeGrow analytical desk. The analyst holds no material financial interest in the mentioned instruments, exceeding ₹1,00,000, as of the date of publication. Past performance is no guarantee of future results.
          </div>

          {/* Related Articles */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 32 }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: 16 }}>
              Related Research Reports
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="card-light" style={{ padding: 20 }}>
                  <span className="badge badge-gray" style={{ marginBottom: 8 }}>{rel.category}</span>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: 8 }}>{rel.title}</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <span>Read Note</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Research Index View
  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow cyan">Knowledge & Analytics</span>
            <h1 className="section-title" style={{ color: '#ffffff' }}>
              Research & Insights Desk
            </h1>
            <p className="section-description" style={{ color: '#cbd5e1' }}>
              Institutional commentary, macro economic evaluations, derivatives volatility models, and financial literacy resources.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: 580, margin: '0 auto 24px auto', position: 'relative' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            />
            <input
              type="text"
              placeholder="Search by topic, ticker, or keyword (e.g. Nifty, Options, Gold)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: 46,
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.16)',
                color: '#f8fafc'
              }}
            />
          </div>

          {/* Categories with AnimatedTabs */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AnimatedTabs
              tabs={researchCategories}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>
      </section>

      {/* 2. DEMO LABEL BANNER */}
      <section style={{ background: '#09111c', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: '#94a3b8' }}>
            <AlertCircle size={15} style={{ color: '#00e5ff', flexShrink: 0 }} />
            <span>All articles published in this section represent educational samples demonstrating WeGrow's research structure.</span>
          </div>
        </div>
      </section>

      {/* 3. ARTICLES DIRECTORY */}
      <section className="section bg-light">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', background: '#ffffff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <BookOpen size={48} style={{ color: '#94a3b8', margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: 8 }}>No Research Articles Found</h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: 20 }}>
                No articles matched your query "{searchQuery}". Try selecting "All" or searching for a different topic.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="btn btn-outline-dark"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              {filteredArticles.map((article) => (
                <SpotlightCard key={article.id} className="card-light" style={{ padding: 28, background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-cyan">{article.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{article.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', lineHeight: 1.4, marginBottom: 12, color: '#0f172a' }}>
                    {article.title}
                  </h2>

                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                    {article.summary}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {article.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: '0.6875rem', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                    <span style={{ color: '#64748b' }}>{article.date}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArticle(article);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-sm btn-primary btn-shimmer"
                    >
                      <span>Read Full Report</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
