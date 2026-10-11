import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Compass, ShieldCheck } from 'lucide-react';
import { QuizAnswers, ScentFamily, IntensityLevel } from '../types';
import { useApp } from '../context/AppContext';

export const FindYourScentPage: React.FC = () => {
  const navigate = useNavigate();
  const { userPreferences, saveQuizPreferences } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [saveToAccountConsent, setSaveToAccountConsent] = useState(true);

  // Initial answers with default prefill if user already took quiz
  const [answers, setAnswers] = useState<QuizAnswers>(() => {
    if (userPreferences.savedQuizAnswers) {
      return userPreferences.savedQuizAnswers;
    }
    return {
      purpose: 'everyday',
      preferredFamilies: ['Warm Woody', 'Crisp Floral'],
      preferredNotes: ['Cedarwood', 'Vanilla', 'Bergamot'],
      dislikedNotes: [],
      occasions: ['Daily Signature', 'Evening & Date Night'],
      intensity: 'moderate',
      budgetGHS: 400,
      familiarity: 'curious',
    };
  });

  const availableFamilies: ScentFamily[] = [
    'Warm Woody',
    'Crisp Floral',
    'Fresh Citrus & Aquatic',
    'Amber & Gourmand',
    'Aromatic Green',
  ];

  const popularNotes = [
    'Bergamot',
    'Cedarwood',
    'Sandalwood',
    'Damask Rose',
    'Vanilla',
    'Amber',
    'Black Fig',
    'Pink Peppercorn',
    'Sea Salt',
    'Patchouli',
    'Neroli',
    'Holy Basil',
    'Vetiver',
    'Tonka Bean',
    'Cardamom',
    'Incense',
  ];

  const occasionOptions = [
    'Daily Signature',
    'Office & Business',
    'Evening & Date Night',
    'Special Celebration',
    'Tropical Heat & Day Out',
    'Casual Weekend',
  ];

  const toggleArrayItem = <T extends string>(list: T[], item: T): T[] => {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submission
      saveQuizPreferences(answers, saveToAccountConsent);
      // Navigate to /scent-results with state
      navigate('/scent-results', { state: { quizAnswers: answers } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Quiz Header & Progress */}
      <div className="space-y-4 text-center">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D68C7C]">
          The Fragrance Discovery Engine
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#241C2B]">
          Find Your Fragrance
        </h1>
        <p className="text-xs sm:text-sm text-[#211D24]/70 max-w-lg mx-auto">
          An eight-step guided consultation to determine your ideal olfactory match with zero guesswork.
        </p>

        {/* Progress Bar */}
        <div className="pt-4 space-y-2 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs text-[#211D24]/60">
            <span>Step {currentStep} of 8</span>
            <span className="font-mono">{Math.round((currentStep / 8) * 100)}% Completed</span>
          </div>
          <div className="h-1.5 w-full bg-[#211D24]/10 overflow-hidden">
            <div
              className="h-full bg-[#241C2B] transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Container */}
      <div className="bg-white border border-[#211D24]/10 p-6 sm:p-10 space-y-8 shadow-sm">
        {/* STEP 1: SHOPPING PURPOSE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">01 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">What is the primary purpose of your fragrance search?</h2>
              <p className="text-xs text-[#211D24]/65">Select the option that best reflects what you are looking for.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'everyday', title: 'Everyday Versatility', desc: 'A comfortable go-to perfume suitable for work, errands, and casual social moments.' },
                { id: 'signature', title: 'A Memorable Signature', desc: 'A distinctive scent that people associate with your presence and style.' },
                { id: 'evening', title: 'Evening & Night Out', desc: 'A sensual, magnetic fragrance formulated for dining, events, and cooler nights.' },
                { id: 'gift', title: 'Thoughtful Gifting', desc: 'A universally appreciated, high-character gift for a loved one in Ghana.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnswers({ ...answers, purpose: opt.id })}
                  className={`p-5 text-left border transition-all ${
                    answers.purpose === opt.id
                      ? 'border-[#241C2B] bg-[#FAF8F5] shadow-xs'
                      : 'border-[#211D24]/15 hover:border-[#211D24]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-[#241C2B]">{opt.title}</span>
                    {answers.purpose === opt.id && <Check className="w-4 h-4 text-[#241C2B]" />}
                  </div>
                  <p className="text-xs text-[#211D24]/70 mt-2 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: PREFERRED SCENT FAMILIES */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">02 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">Which fragrance families do you gravitate toward?</h2>
              <p className="text-xs text-[#211D24]/65">Select one or more families that appeal to you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableFamilies.map((family) => {
                const selected = answers.preferredFamilies.includes(family);
                return (
                  <button
                    key={family}
                    type="button"
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        preferredFamilies: toggleArrayItem(answers.preferredFamilies, family),
                      })
                    }
                    className={`p-5 text-left border transition-all ${
                      selected
                        ? 'border-[#241C2B] bg-[#FAF8F5]'
                        : 'border-[#211D24]/15 hover:border-[#211D24]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg text-[#241C2B]">{family}</span>
                      {selected && <Check className="w-4 h-4 text-[#241C2B]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: PREFERRED NOTES */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">03 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">Which olfactory notes do you enjoy?</h2>
              <p className="text-xs text-[#211D24]/65">Pick notes you love to smell on yourself or in your environment.</p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {popularNotes.map((note) => {
                const selected = answers.preferredNotes.includes(note);
                return (
                  <button
                    key={note}
                    type="button"
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        preferredNotes: toggleArrayItem(answers.preferredNotes, note),
                      })
                    }
                    className={`px-3.5 py-2 text-xs font-medium border transition-colors ${
                      selected
                        ? 'bg-[#241C2B] text-[#F5F2EE] border-[#241C2B]'
                        : 'bg-white text-[#211D24] border-[#211D24]/20 hover:border-[#241C2B]'
                    }`}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: DISLIKED NOTES */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">04 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">Are there any notes you strictly dislike?</h2>
              <p className="text-xs text-[#211D24]/65">
                Our engine treats disliked notes as a strict hard exclusion. Products containing these notes will be filtered out.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {popularNotes.map((note) => {
                const selected = answers.dislikedNotes.includes(note);
                return (
                  <button
                    key={note}
                    type="button"
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        dislikedNotes: toggleArrayItem(answers.dislikedNotes, note),
                      })
                    }
                    className={`px-3.5 py-2 text-xs font-medium border transition-colors ${
                      selected
                        ? 'bg-[#D68C7C] text-white border-[#D68C7C]'
                        : 'bg-white text-[#211D24] border-[#211D24]/20 hover:border-[#241C2B]'
                    }`}
                  >
                    {selected ? `✕ ${note}` : note}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: INTENDED OCCASIONS */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">05 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">When do you plan to wear this fragrance most often?</h2>
              <p className="text-xs text-[#211D24]/65">Select all settings that apply to your lifestyle.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {occasionOptions.map((occ) => {
                const selected = answers.occasions.includes(occ);
                return (
                  <button
                    key={occ}
                    type="button"
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        occasions: toggleArrayItem(answers.occasions, occ),
                      })
                    }
                    className={`p-4 text-left border transition-all ${
                      selected
                        ? 'border-[#241C2B] bg-[#FAF8F5]'
                        : 'border-[#211D24]/15 hover:border-[#211D24]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-[#241C2B]">{occ}</span>
                      {selected && <Check className="w-4 h-4 text-[#241C2B]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: PREFERRED INTENSITY */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">06 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">How intense do you prefer the sillage to be?</h2>
              <p className="text-xs text-[#211D24]/65">How noticeable should your scent trail be in the room?</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'intimate', title: 'Intimate / Skin Scent', desc: 'Discreet and subtle. Only detected by those who lean in close to you.' },
                { id: 'moderate', title: 'Moderate & Balanced', desc: 'Pleasantly noticeable to those standing within conversational distance.' },
                { id: 'strong', title: 'Strong & Radiating', desc: 'A prominent aura that lingers in your presence without overpowering.' },
                { id: 'bold', title: 'Bold & Room-Filling', desc: 'Commanding dry-down with maximum projection and longevity.' },
                { id: 'any', title: 'Open to Any Intensity', desc: 'Flexible depending on the perfume composition.' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setAnswers({ ...answers, intensity: lvl.id as any })}
                  className={`w-full p-4 text-left border transition-all ${
                    answers.intensity === lvl.id
                      ? 'border-[#241C2B] bg-[#FAF8F5]'
                      : 'border-[#211D24]/15 hover:border-[#211D24]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-[#241C2B]">{lvl.title}</span>
                    {answers.intensity === lvl.id && <Check className="w-4 h-4 text-[#241C2B]" />}
                  </div>
                  <p className="text-xs text-[#211D24]/70 mt-1">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: BUDGET */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">07 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">What is your comfortable budget ceiling in Cedis?</h2>
              <p className="text-xs text-[#211D24]/65">
                We respect your budget strictly. Fragrances exceeding this limit are excluded.
              </p>
            </div>

            <div className="space-y-5 pt-4 bg-[#FAF8F5] p-6 border border-[#211D24]/10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#211D24]/60">Maximum Budget</span>
                <span className="font-mono text-2xl font-bold text-[#241C2B] tabular-nums">
                  GH₵ {answers.budgetGHS}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="500"
                step="25"
                value={answers.budgetGHS}
                onChange={(e) => setAnswers({ ...answers, budgetGHS: Number(e.target.value) })}
                className="w-full accent-[#241C2B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#211D24]/50 font-mono">
                <span>GH₵ 150</span>
                <span>GH₵ 300</span>
                <span>GH₵ 500</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: FAMILIARITY & CONSENT */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D68C7C]">08 / 08</span>
              <h2 className="font-serif text-2xl text-[#241C2B]">How familiar are you with fragrance profiles?</h2>
              <p className="text-xs text-[#211D24]/65">Helps us calibrate how we explain notes and accords in your results.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'beginner', title: 'Beginner', desc: 'New to fragrance notes. Prefer clear, intuitive descriptions.' },
                { id: 'curious', title: 'Curious Explorer', desc: 'Know a few favorites, eager to discover complementary notes.' },
                { id: 'aficionado', title: 'Aficionado', desc: 'Appreciate complex pyramids, sillage nuances, and accords.' },
              ].map((fam) => (
                <button
                  key={fam.id}
                  type="button"
                  onClick={() => setAnswers({ ...answers, familiarity: fam.id as any })}
                  className={`p-4 text-left border transition-all ${
                    answers.familiarity === fam.id
                      ? 'border-[#241C2B] bg-[#FAF8F5]'
                      : 'border-[#211D24]/15 hover:border-[#211D24]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-[#241C2B]">{fam.title}</span>
                    {answers.familiarity === fam.id && <Check className="w-4 h-4 text-[#241C2B]" />}
                  </div>
                  <p className="text-xs text-[#211D24]/70 mt-2">{fam.desc}</p>
                </button>
              ))}
            </div>

            {/* Optional Preferences Save with Explicit Consent */}
            <div className="pt-6 border-t border-[#211D24]/10 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveToAccountConsent}
                  onChange={(e) => setSaveToAccountConsent(e.target.checked)}
                  className="mt-1 accent-[#241C2B]"
                />
                <div className="text-xs text-[#211D24]/80">
                  <span className="font-semibold text-[#241C2B] block">Save my fragrance preferences with consent</span>
                  <span>Allows ALORA to remember your notes, budget, and family preferences for future visits. You can clear this anytime.</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-6 border-t border-[#211D24]/10 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#211D24] border border-[#211D24]/20 hover:border-[#241C2B]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F2EE] bg-[#241C2B] hover:bg-[#211D24] transition-colors"
          >
            <span>{currentStep === 8 ? 'Calculate Recommendations' : 'Next Question'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D68C7C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
