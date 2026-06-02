import { questions } from "../data/questions";
import { careerPaths } from "../data/careerPaths";

const PROFILE_KEYS = ["R", "I", "A", "S", "E", "C"];
const MAX_SCORE_PER_PROFILE = 30;
const INITIAL_CAREER_LIMIT = 12;

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
      const profileFit = getProfileFit(career.weights, sortedProfiles);

      return {
        ...career,
        matchScore: Math.round(matchScore),
        profileFit
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const diverseCareers = getDiverseCareers(rankedCareers, INITIAL_CAREER_LIMIT);
  const areaBreakdown = buildAreaBreakdown(rankedCareers);

  return {
    scores,
    mainProfile,
    secondaryProfile,
    thirdProfile,
    compatibility,
    careers: diverseCareers.map((career) => career.name),
    detailedCareers: diverseCareers,
    rankedCareers,
    areaBreakdown
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

function getProfileFit(weights, sortedProfiles) {
  const [mainProfile, secondaryProfile, thirdProfile] = sortedProfiles.map(
    ([key]) => key
  );

  const weightedScore =
    (weights[mainProfile] || 0) * 0.55 +
    (weights[secondaryProfile] || 0) * 0.3 +
    (weights[thirdProfile] || 0) * 0.15;

  return Math.round(Math.min(100, Math.max(35, weightedScore * 1.5)));
}

function getDiverseCareers(rankedCareers, limit) {
  const selected = [];
  const areas = new Map();

  rankedCareers.forEach((career) => {
    const broadArea = getBroadArea(career.area);
    const areaCount = areas.get(broadArea) || 0;

    if (selected.length < limit && areaCount < 2) {
      selected.push({ ...career, broadArea });
      areas.set(broadArea, areaCount + 1);
    }
  });

  rankedCareers.forEach((career) => {
    if (
      selected.length < limit &&
      !selected.some((selectedCareer) => selectedCareer.name === career.name)
    ) {
      selected.push({ ...career, broadArea: getBroadArea(career.area) });
    }
  });

  return selected;
}

function buildAreaBreakdown(rankedCareers) {
  const areaMap = rankedCareers.reduce((acc, career) => {
    const area = getBroadArea(career.area);
    const current = acc.get(area) || {
      area,
      careers: [],
      bestScore: 0,
      averageScore: 0
    };

    current.careers.push(career);
    current.bestScore = Math.max(current.bestScore, career.matchScore);
    current.averageScore = Math.round(
      current.careers.reduce((sum, item) => sum + item.matchScore, 0) /
        current.careers.length
    );

    acc.set(area, current);
    return acc;
  }, new Map());

  return Array.from(areaMap.values())
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((area) => ({
      ...area,
      careers: area.careers.slice(0, 4)
    }));
}

function getBroadArea(area) {
  if (area.includes("Salud")) return "Salud";
  if (area.includes("Tecnolog")) return "Tecnologia";
  if (area.includes("Ingenier")) return "Ingenierias";
  if (area.includes("Negocios") || area.includes("Finanzas")) return "Negocios";
  if (
    area.includes("Humanidades") ||
    area.includes("Social") ||
    area.includes("Educaci")
  ) {
    return "Humanidades y social";
  }
  if (
    area.includes("Comunicaci") ||
    area.includes("Arte") ||
    area.includes("Dis")
  ) {
    return "Creatividad";
  }

  return area.split("/")[0].trim();
}
