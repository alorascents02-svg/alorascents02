import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';

export const JournalArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#241C2B]">Article Not Found</h2>
        <Link to="/journal" className="text-xs uppercase tracking-wider font-semibold underline text-[#241C2B]">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <button
          type="button"
          onClick={() => navigate('/journal')}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          {article.category}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#241C2B] leading-tight">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-[#211D24]/75 leading-relaxed">
          {article.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#211D24]/60 pt-2">
          <span>{article.author}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-16/9 bg-[#EAE6DF] border border-[#211D24]/10 overflow-hidden shadow-sm">
        <img
          src={article.image}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Prose Content */}
      <div className="prose prose-lg max-w-none text-[#211D24]/85 space-y-6 text-sm sm:text-base leading-relaxed">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related CTAs */}
      <div className="pt-10 border-t border-[#211D24]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-serif text-lg text-[#241C2B] block">Ready to explore these scent notes?</span>
          <span className="text-xs text-[#211D24]/60">Explore verified formulations in our boutique.</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
          >
            Explore Shop
          </Link>
          <Link
            to="/find-your-scent"
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#241C2B] border border-[#241C2B]/30"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </article>
  );
};
