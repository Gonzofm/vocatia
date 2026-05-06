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
  R: "Tienes afinidad por actividades prácticas, resolución de problemas concretos y trabajo orientado a resultados visibles.",
  I: "Tu perfil destaca por el análisis, investigación, curiosidad intelectual y resolución de problemas complejos.",
  A: "Tu fortaleza está en la creatividad, comunicación, diseño, expresión de ideas y pensamiento original.",
  S: "Tienes orientación hacia ayudar, acompañar, enseñar y generar impacto positivo en otras personas.",
  E: "Tu perfil se relaciona con liderazgo, persuasión, emprendimiento, negociación y toma de decisiones.",
  C: "Destacas por organización, estructura, procesos, planificación y orden en la ejecución."
};

const aiInsights = {
  R: "Vocatia detectó una preferencia por resolver problemas tangibles. Podrías destacar en carreras donde veas resultados concretos.",
  I: "Vocatia detectó una fuerte inclinación al análisis, aprendizaje técnico y resolución de problemas. Podrías destacar en áreas de datos, tecnología o investigación.",
  A: "Vocatia detectó una orientación creativa. Podrías destacar en carreras donde puedas crear, comunicar o transformar ideas.",
  S: "Vocatia detectó una motivación por ayudar y acompañar personas. Podrías destacar en áreas humanas, educativas o de bienestar.",
  E: "Vocatia detectó interés por liderazgo, influencia y logro. Podrías destacar en negocios, gestión, emprendimiento o roles comerciales.",
  C: "Vocatia detectó afinidad por el orden, la estructura y los procesos. Podrías destacar en áreas administrativas, financieras u operativas."
};

const skillsByProfile = {
  R: ["Resolución práctica", "Pensamiento técnico", "Precisión", "Autonomía"],
  I: ["Análisis de datos", "Pensamiento lógico", "Investigación", "Aprendizaje técnico"],
  A: ["Creatividad", "Comunicación visual", "Storytelling", "Innovación"],
  S: ["Comunicación empática", "Escucha activa", "Orientación al servicio", "Trabajo en equipo"],
  E: ["Liderazgo", "Negociación", "Toma de decisiones", "Estrategia"],
  C: ["Organización", "Gestión de procesos", "Atención al detalle", "Planificación"]
};

const answerOptions = [
  { label: "Nada de acuerdo", value: 1 },
  { label: "Poco de acuerdo", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "De acuerdo", value: 4 },
  { label: "Muy de acuerdo", value: 5 }
];
const dynamicMessages = [
  "Analizando patrones de personalidad...",
  "Detectando afinidades profesionales...",
  "Comparando intereses vocacionales...",
  "Evaluando estilo de trabajo...",
  "Procesando compatibilidad laboral...",
  "Identificando fortalezas principales..."
];
function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const question = questions[currentQuestion];
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
const currentMessage =
  dynamicMessages[currentQuestion % dynamicMessages.length];
  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

const handleNext = () => {
  if (!answers[question.id]) {
    alert("Selecciona una respuesta para continuar.");
    return;
  }

  if (currentQuestion === questions.length - 1) {
    setIsAnalyzing(true);

    setTimeout(() => {
      setResult(calculateResult(answers));
    }, 2600);
  } else {
    setCurrentQuestion(currentQuestion + 1);
  }
};

    if (currentQuestion === questions.length - 1) {
      setResult(calculateResult(answers));
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };
if (isAnalyzing) {
  return (
    <main className="analyzing-screen">
      <div className="analyzing-box">
        <div className="analyzing-spinner"></div>

        <span className="v2-pill">
          Vocatia AI
        </span>

        <h1>Analizando tu perfil...</h1>

        <p>
          Estamos procesando tus patrones de respuesta,
          personalidad e intereses vocacionales.
        </p>

        <div className="analyzing-steps">
          <div>✓ Analizando intereses</div>
          <div>✓ Evaluando personalidad laboral</div>
          <div>✓ Calculando compatibilidad profesional</div>
        </div>
      </div>
    </main>
  );
}
  if (result) {
    const main = result.mainProfile;
    const secondary = result.secondaryProfile;
    const compatibility = result.compatibility || 84;
    const clarity = Math.min(100, Math.round(compatibility * 0.9));
    const employability = Math.min(100, Math.round(compatibility * 1.05));
    const salaryFit = Math.min(100, Math.round(compatibility * 0.82));
    const decisionRisk = Math.max(10, 100 - clarity);

    const riasecScores = Object.entries(result.scores).filter(([key]) =>
      ["R", "I", "A", "S", "E", "C"].includes(key)
    );

    const maxScore = Math.max(...riasecScores.map(([, value]) => value));

    return (
      <main className="result-v2-page">
        <section className="result-v2-header">
          <div>
            <span className="v2-pill">Resultado gratuito</span>
            <h1>Tu perfil vocacional está listo</h1>
            <p>
              Este dashboard resume tu perfil, carreras compatibles, fortalezas e indicadores
              iniciales para tomar una mejor decisión profesional.
            </p>
          </div>

          <button className="v2-premium-btn">Desbloquear informe completo 🔒</button>
        </section>

        <section className="v2-hero-grid">
          <article className="v2-main-profile">
            <span className="v2-small-label">Perfil dominante</span>
            <h2>{profileNames[main]}</h2>
            <p>{profileDescriptions[main]}</p>

            <div className="v2-secondary-profile">
              <span>Perfil complementario</span>
              <strong>{profileNames[secondary]}</strong>
            </div>
          </article>

          <article className="v2-ai-card">
            <span className="v2-ai-tag">Vocatia AI</span>
            <h3>Insight principal</h3>
            <p>{aiInsights[main]}</p>
          </article>
        </section>

        <section className="v2-metrics-grid">
        <Metric title="Afinidad con perfil principal" value={compatibility} />
        <Metric title="Claridad de intereses" value={clarity} />
        <Metric title="Consistencia vocacional" value={employability} />
        <Metric title="Potencial de exploración laboral" value={salaryFit} />
        </section>

        <section className="v2-two-columns">
          <article className="v2-card">
            <div className="v2-section-head">
              <span className="v2-pill">Radar vocacional</span>
              <h2>Distribución de intereses</h2>
            </div>

            <div className="v2-radar">
              {riasecScores.map(([key, value]) => {
                const percent = Math.round((value / maxScore) * 100);
                return (
                  <div className="v2-radar-row" key={key}>
                    <div>
                      <span>{profileNames[key]}</span>
                      <strong>{percent}%</strong>
                    </div>
                    <div className="v2-bar-bg">
                      <div style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="v2-card">
            <div className="v2-section-head">
              <span className="v2-pill">Carreras sugeridas</span>
              <h2>Primeras rutas compatibles</h2>
            </div>

            <div className="v2-careers">
              {result.careers.map((career, index) => (
                <div className="v2-career-item" key={index}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{career}</strong>
                    <p>Alta compatibilidad inicial con tu perfil.</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="v2-two-columns">
          <article className="v2-card">
            <div className="v2-section-head">
              <span className="v2-pill">Habilidades sugeridas</span>
              <h2>Qué deberías fortalecer</h2>
            </div>

            <div className="v2-skills">
              {skillsByProfile[main].map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </article>

          <article className="v2-card">
            <div className="v2-section-head">
              <span className="v2-pill">Lectura estratégica</span>
              <h2>Qué significa tu resultado</h2>
            </div>

            <p className="v2-muted">
              Tu combinación <strong>{profileNames[main]}</strong> +{" "}
              <strong>{profileNames[secondary]}</strong> sugiere que no solo debes mirar
              “qué carrera te gusta”, sino también qué entorno laboral, habilidades y ritmo
              profesional encajan contigo.
            </p>
          </article>
        </section>

        <section className="v2-premium-zone">
          <div className="v2-premium-copy">
            <span className="v2-premium-pill">Premium</span>
            <h2>Tu informe completo está bloqueado</h2>
            <p>
              Desbloquea el análisis avanzado con riesgo de mala elección, carreras con mejor
              retorno, empleabilidad, ruta de 90 días, habilidades urgentes y plan de acción.
            </p>
          </div>

          <div className="v2-locked-grid">
            <LockedCard title="Riesgo de mala elección" value={`${decisionRisk}%`} />
            <LockedCard title="Top carreras con mejor retorno" value="Top 5" />
            <LockedCard title="Ruta profesional de 90 días" value="Lista" />
            <LockedCard title="Habilidades urgentes" value="8 skills" />
            <LockedCard title="Sueldos estimados por carrera" value="S/••••" />
            <LockedCard title="Plan final descargable" value="PDF" />
          </div>

          <button className="v2-premium-btn">Ver mi informe completo 🔒</button>
        </section>

        <button className="v2-restart-btn" onClick={() => window.location.reload()}>
          Repetir test
        </button>
      </main>
    );
  }

  return (
    <main className="test-v2-page">
<section key={currentQuestion} className="test-v2-card fade-question">
        <div className="test-v2-top">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <strong>{progress}%</strong>
        </div>

        <div className="test-v2-progress">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <h1>Test Vocacional</h1>
        <h2>{question.text}</h2>
<p className="test-v2-message">
  {currentMessage}
</p>
        <div className="test-v2-options">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(question.id, option.value)}
              className={answers[question.id] === option.value ? "v2-selected-answer" : ""}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="test-v2-actions">
          <button onClick={handleBack} className="v2-back-btn">
            Atrás
          </button>

          <button onClick={handleNext} className="v2-next-btn">
            {currentQuestion === questions.length - 1 ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      </section>
    </main>
  );
  
function Metric({ title, value }) {
  return (
    <article className="v2-metric">
      <div className="metric-top">
        <p>{title}</p>
        <h3>{value}%</h3>
      </div>

      <div className="v2-metric-bar">
        <div style={{ width: `${value}%` }}></div>
      </div>

      <span className="metric-description">
        Resultado calculado según tus patrones de respuesta.
      </span>
    </article>
  );
}
  return (
    <article className="v2-metric">
      <p>{title}</p>
      <h3>{value}%</h3>
      <div className="v2-metric-bar">
        <div style={{ width: `${value}%` }}></div>
      </div>
    </article>
  );

function LockedCard({ title, value }) {
  return (
    <article className="v2-locked-card">
      <div className="v2-locked-content">
        <p>{title}</p>
        <h3>{value}</h3>
        <small>Disponible en premium</small>
      </div>
      <div className="v2-lock-overlay">🔒</div>
    </article>
  );
}

export default Test;