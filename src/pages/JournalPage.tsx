import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';

export const JournalPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-[#211D24]/10 pb-8">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          The ALORA Journal
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#241C2B] tracking-tight">
          Fragrance Literacy & Essays
        </h1>
        <p className="text-sm sm:text-base text-[#211D24]/75 max-w-2xl">
          Explorations in perfume compounding, tropical climate longevity, layering traditions, and the democratization of scent.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {JOURNAL_ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="group bg-white border border-[#211D24]/10 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className="aspect-16/9 bg-[#EAE6DF] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-[#211D24]/60 flex items-center gap-2">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <Link to={`/journal/${article.slug}`}>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#241C2B] group-hover:text-[#D68C7C] transition-colors leading-snug">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-xs text-[#211D24]/75 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#211D24]/10 mt-4 flex items-center justify-between text-xs">
              <span className="text-[#211D24]/50">{article.publishedDate}</span>
              <Link
                to={`/journal/${article.slug}`}
                className="font-semibold uppercase tracking-wider text-[#241C2B] group-hover:text-[#D68C7C] flex items-center gap-1"
              >
                <span>Read Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
