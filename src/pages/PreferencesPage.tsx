import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Check, ShieldCheck, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PreferencesPage: React.FC = () => {
  const { userPreferences, updatePreferences, clearPreferences } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleConsent = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePreferences({ consentGranted: e.target.checked });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all saved fragrance preferences?')) {
      clearPreferences();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#211D24]/10 pb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
            Profile & Privacy
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
            Saved Scent Preferences
          </h1>
        </div>
        <Link
          to="/account"
          className="text-xs font-semibold uppercase tracking-wider text-[#211D24]/70 hover:text-[#241C2B] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      {userPreferences.consentGranted || userPreferences.savedQuizAnswers ? (
        <div className="bg-white border border-[#211D24]/10 p-8 space-y-8">
          {/* Status banner */}
          <div className="flex items-start justify-between gap-4 p-4 bg-[#FAF8F5] border border-[#211D24]/10">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#241C2B] block">Saved Consent & Data Sovereignty</span>
              <p className="text-xs text-[#211D24]/70">
                Your fragrance preferences are stored in your private browser storage to enhance recommendations. No personal data is shared with third parties.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-semibold uppercase tracking-wider text-red-700 hover:text-red-900 flex items-center gap-1 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Profile</span>
            </button>
          </div>

          {/* Scent Families */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-[#241C2B]">Preferred Fragrance Families</h3>
            <div className="flex flex-wrap gap-2">
              {userPreferences.favoriteFamilies.length > 0 ? (
                userPreferences.favoriteFamilies.map((fam, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#FAF8F5] border border-[#211D24]/15 text-xs text-[#241C2B] font-medium">
                    {fam}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#211D24]/50">None selected yet</span>
              )}
            </div>
          </div>

          {/* Favorite Notes */}
          <div className="space-y-3 pt-4 border-t border-[#211D24]/10">
            <h3 className="font-serif text-xl text-[#241C2B]">Preferred Verified Notes</h3>
            <div className="flex flex-wrap gap-2">
              {userPreferences.favoriteNotes.length > 0 ? (
                userPreferences.favoriteNotes.map((note, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-[#241C2B]/30 text-xs text-[#241C2B] font-medium">
                    {note}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#211D24]/50">None specified</span>
              )}
            </div>
          </div>

          {/* Disliked Notes */}
          <div className="space-y-3 pt-4 border-t border-[#211D24]/10">
            <h3 className="font-serif text-xl text-[#241C2B]">Disliked Notes (Excluded)</h3>
            <div className="flex flex-wrap gap-2">
              {userPreferences.dislikedNotes.length > 0 ? (
                userPreferences.dislikedNotes.map((note, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                    ✕ {note}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#211D24]/50">No exclusions specified</span>
              )}
            </div>
          </div>

          {/* Projection Comfort */}
          <div className="space-y-2 pt-4 border-t border-[#211D24]/10">
            <h3 className="font-serif text-xl text-[#241C2B]">Projection Comfort</h3>
            <p className="text-xs text-[#211D24]/70 capitalize">
              {userPreferences.preferredIntensity} projection
            </p>
          </div>

          {/* Retake CTA */}
          <div className="pt-6 border-t border-[#211D24]/10 flex items-center justify-between">
            <Link
              to="/find-your-scent"
              className="inline-flex items-center gap-1.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Fragrance Quiz</span>
            </Link>

            <Link
              to="/scent-results"
              className="text-xs font-semibold uppercase tracking-wider text-[#241C2B] hover:text-[#D68C7C]"
            >
              View Calculated Matches →
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#211D24]/10 p-10 text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#241C2B]">No Saved Preferences Yet</h2>
          <p className="text-xs text-[#211D24]/70 max-w-sm mx-auto">
            Take our 8-step fragrance quiz to identify and store your preferred fragrance families and verified notes.
          </p>
          <div className="pt-2">
            <Link
              to="/find-your-scent"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F5F2EE] bg-[#241C2B]"
            >
              Start Fragrance Quiz
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
