import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeOption } from '../types';

export const ThemeSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, setTheme, availableThemes } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentThemeInfo = availableThemes.find((t) => t.id === theme) || availableThemes[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider transition-all border ${
          compact
            ? 'px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-none'
            : 'px-3 py-1.5 bg-white border-[#211D24]/15 hover:border-[#241C2B] text-[#241C2B]'
        }`}
        title="Customize Color Palette"
        aria-label="Customize Color Palette"
        aria-expanded={isOpen}
      >
        <div className="flex items-center -space-x-1">
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: currentThemeInfo.primary }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: currentThemeInfo.accent }}
          />
        </div>
        <span>Palette: {currentThemeInfo.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-[#211D24]/15 shadow-xl z-50 p-2 space-y-1 animate-in fade-in duration-150">
          <div className="px-3 py-2 border-b border-[#211D24]/10">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#211D24]/60 block">
              Curated Color Palettes
            </span>
            <p className="text-[11px] text-[#211D24]/75 mt-0.5">
              Select an aesthetic direction for the ALORA experience.
            </p>
          </div>

          <div className="space-y-1 pt-1">
            {availableThemes.map((item) => {
              const isSelected = item.id === theme;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTheme(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 flex items-start justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-[#FAF8F5] border border-[#241C2B]' : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center -space-x-1">
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.accent }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.bg }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#241C2B] font-serif">{item.name}</span>
                    </div>
                    <span className="text-[10px] text-[#211D24]/60 block leading-tight">
                      {item.subtitle}
                    </span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#241C2B] shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
