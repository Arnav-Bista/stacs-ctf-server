import { Category } from "./types";
import forensics from "./forensics";
import engineering from "./engineering";
import llm from "./llm";

// Add more categories as collaborators create them
// Each category file should export a Category object with questions
export const allCategories: Category[] = [
  forensics,
  engineering,
  llm,
];

// Helper to get all questions with their category slug attached
// Useful for flag submission and filtering by category
export const allQuestions = allCategories.flatMap(cat =>
  cat.questions.map(q => ({
    ...q,
    category: String(cat.category).toLowerCase().replace(/\s+/g, '-')
  }))
);

// Get category by slug (e.g., "forensics", "reverse-engineering")
export const getCategoryBySlug = (slug: string) => {
  return allCategories.find(cat =>
    String(cat.category).toLowerCase().replace(/\s+/g, '-') === slug
  );
};

// Get all category metadata for the problems page
export const getCategoryMetadata = () => {
  return allCategories.map(cat => ({
    name: cat.category,
    description: cat.description,
    slug: String(cat.category).toLowerCase().replace(/\s+/g, '-'),
    questionCount: cat.questions.length,
    totalPoints: cat.questions.reduce((sum, q) => sum + q.points, 0),
  }));
};
