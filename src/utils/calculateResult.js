export function calculateResult(answers) {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,

    O: 0,
    C_big: 0,
    E_big: 0,
    A_big: 0,
    N: 0,

    DINERO: 0,
    FLEX: 0,
    IMPACTO: 0,
    CRECIMIENTO: 0
  };

  const scoringMap = {
    1: { R: 2 },
    2: { I: 2 },
    3: { A: 2 },
    4: { S: 2 },
    5: { E: 2 },
    6: { C: 2 },
    7: { I: 1, R: 1 },
    8: { I: 2 },
    9: { A: 2 },
    10: { S: 2 },
    11: { E: 2 },
    12: { C: 2 },

    13: { C_big: 2 },
    14: { O: 2 },
    15: { A_big: 2 },
    16: { I: 1 },
    17: { A: 1, O: 1 },
    18: { N: 2 },
    19: { C_big: 2 },
    20: { E: 1 },
    21: { E_big: 2 },
    22: { C: 1 },

    23: { DINERO: 2, E: 1 },
    24: { FLEX: 2 },
    25: { FLEX: 1, I: 1 },
    26: { S: 1, IMPACTO: 2 },
    27: { C: 2 },
    28: { E: 2 },
    29: { O: 2 },
    30: { CRECIMIENTO: 2 }
  };

  const careerMap = {
    R: ["Ingeniería Mecánica", "Arquitectura", "Electricidad"],
    I: ["Data Science", "Ingeniería de Software", "Investigación"],
    A: ["Diseño", "Marketing", "Audiovisual"],
    S: ["Psicología", "Educación", "RRHH"],
    E: ["Administración", "Negocios", "Ventas"],
    C: ["Contabilidad", "Finanzas", "Logística"]
  };

  Object.entries(answers).forEach(([qId, value]) => {
    const map = scoringMap[Number(qId)];
    if (!map) return;

    Object.entries(map).forEach(([key, weight]) => {
      scores[key] += value * weight;
    });
  });

  const riasec = ["R", "I", "A", "S", "E", "C"];

  const sorted = riasec
    .map((k) => ({ type: k, score: scores[k] }))
    .sort((a, b) => b.score - a.score);

  const main = sorted[0].type;
  const secondary = sorted[1].type;

  const total = riasec.reduce((sum, k) => sum + scores[k], 0);

const compatibility = Math.min(
  95,
  Math.max(65, Math.round((scores[main] / total) * 100 + 45))
);
  return {
    mainProfile: main,
    secondaryProfile: secondary,
    careers: careerMap[main],
    compatibility,
    scores
  };
}