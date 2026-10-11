import React from 'react';
import { FragranceNotes } from '../types';

interface FragrancePyramidProps {
  notes: FragranceNotes;
}

export const FragrancePyramid: React.FC<FragrancePyramidProps> = ({ notes }) => {
  return (
    <div className="bg-[#FAF8F5] border border-[#211D24]/10 p-6 space-y-6">
      <div className="border-b border-[#211D24]/10 pb-3">
        <h4 className="font-serif text-lg text-[#241C2B]">The Olfactory Pyramid</h4>
        <p className="text-xs text-[#211D24]/60">Verified chronological note evolution on skin</p>
      </div>

      <div className="space-y-5">
        {/* Top Notes */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#241C2B]">Top Notes</span>
            <span className="text-[#211D24]/50 font-mono text-[11px]">0 – 20 mins</span>
          </div>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            The sparkling opening impression experienced immediately after application.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#241C2B] font-medium">
            {notes.top.map((note, idx) => (
              <span key={idx} className="bg-white border border-[#211D24]/10 px-2.5 py-1">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Heart Notes */}
        <div className="space-y-1.5 pt-2 border-t border-[#211D24]/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#241C2B]">Heart Notes</span>
            <span className="text-[#211D24]/50 font-mono text-[11px]">1 – 4 hours</span>
          </div>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            The core identity and emotional character that blossoms as top notes soften.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#241C2B] font-medium">
            {notes.heart.map((note, idx) => (
              <span key={idx} className="bg-white border border-[#211D24]/10 px-2.5 py-1">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Base Notes */}
        <div className="space-y-1.5 pt-2 border-t border-[#211D24]/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#241C2B]">Base Notes</span>
            <span className="text-[#211D24]/50 font-mono text-[11px]">4 – 10+ hours</span>
          </div>
          <p className="text-xs text-[#211D24]/70 leading-relaxed">
            The tenacious foundation that fixes to pulse points and fabric for lasting sillage.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#241C2B] font-medium">
            {notes.base.map((note, idx) => (
              <span key={idx} className="bg-white border border-[#211D24]/10 px-2.5 py-1">
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
