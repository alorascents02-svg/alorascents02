import { Product, QuizAnswers, RecommendationScore } from '../types';

export interface QuizEngineWeights {
  familyWeight: number; // default 0.30
  notesWeight: number;  // default 0.20
  occasionWeight: number; // default 0.15
  budgetWeight: number; // default 0.20
  intensityWeight: number; // default 0.15
}

export const DEFAULT_WEIGHTS: QuizEngineWeights = {
  familyWeight: 0.30,
  notesWeight: 0.20,
  occasionWeight: 0.15,
  budgetWeight: 0.20,
  intensityWeight: 0.15,
};

/**
 * Deterministic recommendation engine for Alora Fragrance House.
 * Completely independent of external AI services.
 * Follows strict constraints:
 * - Only published and verified products
 * - Hard exclusion on disliked notes
 * - Hard budget limit
 * - Weighted scoring formula (Family 30%, Notes 20%, Occasion 15%, Budget 20%, Intensity 15%)
 * - Returns up to top 3 recommendations with transparent explanations
 */
export function calculateFragranceRecommendations(
  products: Product[],
  quiz: QuizAnswers,
  weights: QuizEngineWeights = DEFAULT_WEIGHTS
): RecommendationScore[] {
  // 1. Initial filter: Only published & verified products with active stock or preorder
  const eligibleProducts = products.filter(
    (p) => p.publicationStatus === 'published' && p.verified === true
  );

  const scoredResults: RecommendationScore[] = [];

  for (const product of eligibleProducts) {
    const allProductNotes = [
      ...product.notes.top,
      ...product.notes.heart,
      ...product.notes.base,
    ].map((n) => n.toLowerCase());

    // 2. Hard Exclusion: Disliked notes
    const hasDislikedNote = quiz.dislikedNotes.some((disliked) =>
      allProductNotes.some((pn) => pn.includes(disliked.toLowerCase()))
    );
    if (hasDislikedNote) {
      continue; // Exclude completely as per specification
    }

    // 3. Hard Budget Limit:
    // If user's budget is specified and product price strictly exceeds budget, exclude
    if (quiz.budgetGHS > 0 && product.price > quiz.budgetGHS) {
      continue;
    }

    // 4. Calculate individual components
    const reasoning: string[] = [];
    const matchingNotes: string[] = [];

    // A. Scent Family Score (Weight: 30%)
    let familyScore = 0;
    if (quiz.preferredFamilies.includes(product.fragranceFamily)) {
      familyScore = 1.0;
      reasoning.push(`Belongs to your preferred fragrance family (${product.fragranceFamily}).`);
    } else {
      familyScore = 0.0;
    }

    // B. Notes Score (Weight: 20%)
    let notesScore = 0;
    if (quiz.preferredNotes.length > 0) {
      const matches: string[] = [];
      for (const prefNote of quiz.preferredNotes) {
        const found = allProductNotes.find((pn) => pn.includes(prefNote.toLowerCase()));
        if (found) {
          matches.push(prefNote);
        }
      }
      matchingNotes.push(...matches);
      notesScore = Math.min(1.0, matches.length / Math.min(3, quiz.preferredNotes.length));
      if (matches.length > 0) {
        reasoning.push(`Contains matching verified notes: ${matches.join(', ')}.`);
      }
    } else {
      notesScore = 0.5; // Neutral baseline if no notes chosen
    }

    // C. Occasion Score (Weight: 15%)
    let occasionScore = 0;
    if (quiz.occasions.length > 0) {
      const matchingOccasions = product.bestOccasions.filter((occ) =>
        quiz.occasions.some((qo) => occ.toLowerCase().includes(qo.toLowerCase()) || qo.toLowerCase().includes(occ.toLowerCase()))
      );
      if (matchingOccasions.length > 0) {
        occasionScore = 1.0;
        reasoning.push(`Curated specifically for your selected occasions (${matchingOccasions.join(', ')}).`);
      } else {
        occasionScore = 0.2;
      }
    } else {
      occasionScore = 0.5;
    }

    // D. Budget Score (Weight: 20%)
    // Reward products that fall comfortably within budget
    let budgetScore = 0;
    if (quiz.budgetGHS > 0) {
      const budgetDeltaRatio = (quiz.budgetGHS - product.price) / quiz.budgetGHS;
      if (budgetDeltaRatio >= 0) {
        // Between 0 and budget: best is close to or comfortably below
        budgetScore = 0.8 + 0.2 * (1 - budgetDeltaRatio * 0.5);
        reasoning.push(`Priced at GH₵ ${product.price}, well within your GH₵ ${quiz.budgetGHS} budget.`);
      }
    } else {
      budgetScore = 0.8;
    }

    // E. Intensity Score (Weight: 15%)
    let intensityScore = 0;
    if (quiz.intensity === 'any') {
      intensityScore = 1.0;
    } else if (quiz.intensity === product.intensity) {
      intensityScore = 1.0;
      reasoning.push(`Matches your requested ${product.intensity} projection preference.`);
    } else {
      // Partial credit for adjacent intensity
      intensityScore = 0.4;
    }

    // Calculate final weighted score (0 to 100)
    const totalWeighted =
      (familyScore * weights.familyWeight) +
      (notesScore * weights.notesWeight) +
      (occasionScore * weights.occasionWeight) +
      (budgetScore * weights.budgetWeight) +
      (intensityScore * weights.intensityWeight);

    const matchScore = Math.round(totalWeighted * 100);

    scoredResults.push({
      product,
      matchScore,
      matchBreakdown: {
        family: Math.round(familyScore * 100),
        notes: Math.round(notesScore * 100),
        occasion: Math.round(occasionScore * 100),
        budget: Math.round(budgetScore * 100),
        intensity: Math.round(intensityScore * 100),
      },
      reasoning,
      matchingNotes,
    });
  }

  // Sort descending by score, take top 3 as specified
  scoredResults.sort((a, b) => b.matchScore - a.matchScore);
  return scoredResults.slice(0, 3);
}
