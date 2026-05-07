import { questions } from "../data/questions";
import { careerPaths } from "../data/careerPaths";

const PROFILE_KEYS = ["R", "I", "A", "S", "E", "C"];
const MAX_SCORE_PER_PROFILE = 30;

export function calculateResult(answers) {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0
  };

  Object.entries(answers).forEach(([questionId, value]) => {
    const question = questions.find((q) => q.id === Number(questionId));

    if (question?.category) {
      scores[question.category] += Number(value);
    }
  });

  const sortedProfiles = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const mainProfile = sortedProfiles[0][0];
  const secondaryProfile = sortedProfiles[1][0];
  const thirdProfile = sortedProfiles[2][0];

  const mainScorePercent = Math.round(
    (scores[mainProfile] / MAX_SCORE_PER_PROFILE) * 100
  );

  const compatibility = Math.min(
    96,
    Math.max(55, Math.round(mainScorePercent))
  );

  const userVector = normalizeVector(scores);

  const rankedCareers = careerPaths
    .map((career) => {
      const careerVector = normalizeVector(career.weights);
      const matchScore = calculateSimilarity(userVector, careerVector);

      return {
        ...career,
        matchScore: Math.round(matchScore)
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const topCareers = rankedCareers.slice(0, 5);

  return {
    scores,
    mainProfile,
    secondaryProfile,
    thirdProfile,
    compatibility,
    careers: topCareers.map((career) => career.name),
    detailedCareers: topCareers,
    rankedCareers
  };
}

function normalizeVector(vector) {
  const total = PROFILE_KEYS.reduce((sum, key) => sum + (vector[key] || 0), 0);

  if (total === 0) {
    return PROFILE_KEYS.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
  }

  return PROFILE_KEYS.reduce((acc, key) => {
    acc[key] = (vector[key] || 0) / total;
    return acc;
  }, {});
}

function calculateSimilarity(userVector, careerVector) {
  let distance = 0;

  PROFILE_KEYS.forEach((key) => {
    distance += Math.abs(userVector[key] - careerVector[key]);
  });

  const similarity = 100 - distance * 55;

  return Math.min(98, Math.max(45, similarity));
}