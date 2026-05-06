import { useState } from "react";
import { questions } from "../data/questions";
import { calculateResult } from "../utils/calculateResult";

const profileNames = {
  R: "Realista / Práctico",
  I: "Investigador / Analítico",
  A: "Artístico / Creativo",
  S: "Social / Ayuda",
  E: "Emprendedor / Liderazgo",
  C: "Convencional / Organizativo"
};

const profileDescriptions = {
  R: "Prefieres actividades prácticas, concretas y orientadas a resolver problemas reales.",
  I: "Tienes afinidad por analizar, investigar, resolver problemas y aprender de forma profunda.",
  A: "Destacas por tu creatividad, expresión de ideas, diseño, comunicación o pensamiento original.",
  S: "Te orientas a ayudar, acompañar, enseñar o trabajar con personas.",
  E: "Tienes interés por liderar, convencer, emprender, negociar o dirigir proyectos.",
  C: "Prefieres la organización, estructura, planificación, procesos claros y orden."
};

const answerOptions = [
  { label: "Nada de acuerdo", value: 1 },
  { label: "Poco de acuerdo", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "De acuerdo", value: 4 },
  { label: "Muy de acuerdo", value: 5 }
];

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const question = questions[currentQuestion];

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  const handleChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleNext = () => {
    if (!answers[question.id]) {
      alert("Selecciona una respuesta para continuar.");
      return;
    }

    if (currentQuestion === questions.length - 1) {
      const finalResult = calculateResult(answers);
      setResult(finalResult);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (result) {
    const mainProfile = profileNames[result.mainProfile];
    const secondaryProfile = profileNames[result.secondaryProfile];
    const compatibility = result.compatibility || 80;
    const clarity = Math.min(100, Math.round(compatibility * 0.85));
    const potential = Math.min(100, Math.round(compatibility * 1.05));

    const riasecScores = Object.entries(result.scores).filter(([key]) =>
      ["R", "I", "A", "S", "E", "C"].includes(key)
    );

    const maxScore = Math.max(...riasecScores.map(([, value]) => value));

    return (
      <div style={styles.page}>
        <div style={styles.hero}>
          <div>
            <p style={styles.badge}>Resultado gratuito</p>
            <h1 style={styles.title}>Dashboard Vocacional</h1>
            <p style={styles.subtitle}>
              Este es un análisis inicial de tu perfil vocacional, personalidad
              laboral y posibles rutas profesionales.
            </p>
          </div>

          <button style={styles.premiumButton}>
            Desbloquear informe completo 🔒
          </button>
        </div>

        <div style={styles.mainGrid}>
          <section style={styles.profileCard}>
            <p style={styles.sectionLabel}>Perfil principal</p>
            <h2 style={styles.profileTitle}>{mainProfile}</h2>
            <p style={styles.description}>
              {profileDescriptions[result.mainProfile]}
            </p>

            <div style={styles.secondaryProfile}>
              <p>Perfil secundario</p>
              <strong>{secondaryProfile}</strong>
            </div>
          </section>

          <section style={styles.metricsGrid}>
            <Metric title="Compatibilidad vocacional" value={compatibility} />
            <Metric title="Claridad profesional" value={clarity} />
            <Metric title="Potencial de desarrollo" value={potential} />
          </section>
        </div>

        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Distribución de intereses</h3>

          {riasecScores.map(([key, value]) => {
            const percent = Math.round((value / maxScore) * 100);

            return (
              <div key={key} style={styles.barRow}>
                <div style={styles.barHeader}>
                  <span>{profileNames[key]}</span>
                  <strong>{percent}%</strong>
                </div>

                <div style={styles.barBackground}>
                  <div style={{ ...styles.barFill, width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </section>

        <section style={styles.twoColumns}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Carreras recomendadas</h3>

            <div style={styles.careerList}>
              {result.careers.map((career, index) => (
                <div key={index} style={styles.careerItem}>
                  <span>{index + 1}</span>
                  <p>{career}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Lectura inicial</h3>
            <p style={styles.description}>
              Tu resultado combina un perfil{" "}
              <strong>{mainProfile}</strong> con rasgos{" "}
              <strong>{secondaryProfile}</strong>. Esto sugiere que podrías
              desarrollarte mejor en carreras donde puedas aprovechar tus
              intereses principales, tu estilo de trabajo y tus motivaciones.
            </p>

            <p style={styles.description}>
              Este resultado no reemplaza una evaluación vocacional completa,
              pero sirve como punto de partida para tomar mejores decisiones.
            </p>
          </div>
        </section>

        <section style={styles.premiumSection}>
          <div style={styles.lockHeader}>
            <h3>Informe premium bloqueado</h3>
            <p>
              Desbloquea el análisis completo con riesgos, plan de acción,
              ruta profesional y recomendaciones personalizadas.
            </p>
          </div>

          <div style={styles.lockedGrid}>
            <LockedCard title="Riesgo de mala elección" value="••%" />
            <LockedCard title="Afinidad con carreras mejor pagadas" value="••%" />
            <LockedCard title="Proyección de empleabilidad" value="••%" />
            <LockedCard title="Ruta profesional de 90 días" value="Bloqueado" />
          </div>

          <button style={styles.unlockButton}>
            Ver mi plan profesional completo 🔒
          </button>
        </section>

        <button
          style={styles.restartButton}
          onClick={() => window.location.reload()}
        >
          Repetir test
        </button>
      </div>
    );
  }

  return (
    <div style={styles.testPage}>
      <div style={styles.testCard}>
        <div style={styles.questionTop}>
          <p>
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
          <strong>{progress}%</strong>
        </div>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        <h1 style={styles.testTitle}>Test Vocacional</h1>
        <h2 style={styles.question}>{question.text}</h2>

        <div style={styles.answerGrid}>
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(question.id, option.value)}
              style={{
                ...styles.answerButton,
                ...(answers[question.id] === option.value
                  ? styles.answerSelected
                  : {})
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div style={styles.navButtons}>
          <button onClick={handleBack} style={styles.backButton}>
            Atrás
          </button>

          <button onClick={handleNext} style={styles.nextButton}>
            {currentQuestion === questions.length - 1
              ? "Ver resultado"
              : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div style={styles.metricCard}>
      <p>{title}</p>
      <h2>{value}%</h2>
      <div style={styles.miniBar}>
        <div style={{ ...styles.miniBarFill, width: `${value}%` }} />
      </div>
    </div>
  );
}

function LockedCard({ title, value }) {
  return (
    <div style={styles.lockedCard}>
      <p>{title}</p>
      <h2>{value}</h2>
      <small>Disponible en premium</small>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    padding: "40px"
  },
  hero: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "center"
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#1e293b",
    color: "#93c5fd",
    fontSize: "14px"
  },
  title: {
    fontSize: "42px",
    margin: "10px 0"
  },
  subtitle: {
    maxWidth: "650px",
    color: "#cbd5e1",
    lineHeight: "1.6"
  },
  mainGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr",
    gap: "20px"
  },
  profileCard: {
    background: "rgba(30, 41, 59, 0.9)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "24px",
    padding: "30px"
  },
  sectionLabel: {
    color: "#93c5fd",
    fontSize: "14px"
  },
  profileTitle: {
    fontSize: "34px",
    margin: "8px 0",
    color: "#22c55e"
  },
  description: {
    color: "#cbd5e1",
    lineHeight: "1.7"
  },
  secondaryProfile: {
    marginTop: "25px",
    padding: "18px",
    borderRadius: "18px",
    background: "#0f172a"
  },
  metricsGrid: {
    display: "grid",
    gap: "15px"
  },
  metricCard: {
    background: "rgba(30, 41, 59, 0.9)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "20px",
    padding: "22px"
  },
  miniBar: {
    height: "8px",
    background: "#334155",
    borderRadius: "999px",
    overflow: "hidden"
  },
  miniBarFill: {
    height: "100%",
    background: "#22c55e"
  },
  card: {
    maxWidth: "1200px",
    margin: "20px auto 0",
    background: "rgba(30, 41, 59, 0.9)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "24px",
    padding: "28px"
  },
  cardTitle: {
    fontSize: "24px",
    marginBottom: "20px"
  },
  barRow: {
    marginBottom: "18px"
  },
  barHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  barBackground: {
    height: "12px",
    background: "#334155",
    borderRadius: "999px",
    overflow: "hidden"
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #3b82f6)"
  },
  twoColumns: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  careerList: {
    display: "grid",
    gap: "12px"
  },
  careerItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px",
    background: "#0f172a",
    borderRadius: "14px"
  },
  premiumSection: {
    maxWidth: "1200px",
    margin: "20px auto",
    background: "rgba(15, 23, 42, 0.95)",
    border: "1px solid rgba(250, 204, 21, 0.35)",
    borderRadius: "24px",
    padding: "30px",
    textAlign: "center"
  },
  lockHeader: {
    maxWidth: "700px",
    margin: "0 auto 24px",
    color: "#e5e7eb"
  },
  lockedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px"
  },
  lockedCard: {
    padding: "22px",
    borderRadius: "18px",
    background: "#1e293b",
    filter: "blur(2px)",
    opacity: 0.55
  },
  unlockButton: {
    marginTop: "24px",
    padding: "15px 24px",
    border: "none",
    borderRadius: "14px",
    background: "#facc15",
    color: "#111827",
    fontWeight: "bold",
    cursor: "pointer"
  },
  premiumButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "14px",
    background: "#facc15",
    color: "#111827",
    fontWeight: "bold",
    cursor: "pointer"
  },
  restartButton: {
    display: "block",
    margin: "25px auto 0",
    padding: "13px 22px",
    border: "none",
    borderRadius: "14px",
    background: "#334155",
    color: "white",
    cursor: "pointer"
  },
  testPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "white"
  },
  testCard: {
    width: "100%",
    maxWidth: "720px",
    background: "rgba(30, 41, 59, 0.95)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "28px",
    padding: "34px"
  },
  questionTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#cbd5e1"
  },
  progressBar: {
    height: "10px",
    background: "#334155",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "28px"
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #3b82f6)"
  },
  testTitle: {
    fontSize: "34px"
  },
  question: {
    fontSize: "26px",
    lineHeight: "1.4"
  },
  answerGrid: {
    display: "grid",
    gap: "12px",
    marginTop: "28px"
  },
  answerButton: {
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #475569",
    background: "#0f172a",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "16px"
  },
  answerSelected: {
    background: "#2563eb",
    borderColor: "#60a5fa"
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "28px",
    gap: "14px"
  },
  backButton: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background: "#334155",
    color: "white",
    cursor: "pointer"
  },
  nextButton: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Test;