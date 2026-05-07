import { useEffect, useRef, useState } from "react";
import {
  profileNames,
  profileDescriptions,
  aiInsights,
  skillsByProfile
} from "../data/profiles";
import { questions } from "../data/questions";
import { calculateResult } from "../utils/calculateResult";

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

  const pageRef = useRef(null);
  const question = questions[currentQuestion];

  const progress = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  const currentMessage =
    dynamicMessages[currentQuestion % dynamicMessages.length];

  useEffect(() => {
    pageRef.current?.focus();
  }, [currentQuestion]);

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
      setIsAnalyzing(true);

      setTimeout(() => {
        setResult(calculateResult(answers));
        setIsAnalyzing(false);
      }, 2600);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  if (isAnalyzing) {
    return (
      <main className="analyzing-screen">
        <div className="analyzing-box">
          <div className="analyzing-spinner"></div>

          <span className="v2-pill">Vocatia AI</span>

          <h1>Analizando tu perfil...</h1>

          <p>
            Estamos procesando tus patrones de respuesta, personalidad e
            intereses vocacionales.
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

    return (
      <main className="result-v2-page">
        <section className="result-v2-header">
          <div>
            <span className="v2-pill">Resultado gratuito</span>
            <h1>Tu perfil vocacional está listo</h1>
            <p>
              Este dashboard resume tu perfil, carreras compatibles, fortalezas
              e indicadores iniciales para tomar una mejor decisión profesional.
            </p>
          </div>

          <button className="v2-premium-btn">
            Desbloquear informe completo 🔒
          </button>
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
                const percent = Math.round((value / 30) * 100);

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
             {result.detailedCareers.map((career, index) => (
  <div className="v2-career-item premium-career-card" key={career.name}>
    <span>{index + 1}</span>

    <div>
      <div className="career-header">
        <strong>{career.name}</strong>
        <small>{career.matchScore}% match</small>
      </div>

      <p>{career.description}</p>

      <div className="career-tags">
        <em>{career.area}</em>
        {career.skills.slice(0, 3).map((skill) => (
          <em key={skill}>{skill}</em>
        ))}
      </div>
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
              <strong>{profileNames[secondary]}</strong> sugiere que no solo
              debes mirar “qué carrera te gusta”, sino también qué entorno
              laboral, habilidades y ritmo profesional encajan contigo.
            </p>
          </article>
        </section>

        <section className="v2-premium-zone">
          <div className="v2-premium-copy">
            <span className="v2-premium-pill">Premium</span>
            <h2>Tu informe completo está bloqueado</h2>
            <p>
              Desbloquea el análisis avanzado con riesgo de mala elección,
              carreras con mejor retorno, empleabilidad, ruta de 90 días,
              habilidades urgentes y plan de acción.
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
    <main
      ref={pageRef}
      className="test-v2-page"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <section key={currentQuestion} className="test-v2-card fade-question">
        <div className="test-v2-top">
          <span>
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <strong>{progress}%</strong>
        </div>

        <div className="test-v2-progress">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <h1>Test Vocacional</h1>
        <h2>{question.text}</h2>

        <p className="test-v2-message">{currentMessage}</p>

        <div className="test-v2-options">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(question.id, option.value)}
              className={
                answers[question.id] === option.value
                  ? "v2-selected-answer"
                  : ""
              }
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
            {currentQuestion === questions.length - 1
              ? "Ver resultado"
              : "Siguiente"}
          </button>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }) {
  const content = {
    "Afinidad con perfil principal": {
      label: "Perfil dominante detectado",
      description:
        "Tu patrón de respuestas muestra una inclinación sólida hacia este tipo de perfil profesional."
    },

    "Claridad de intereses": {
      label: "Nivel de claridad vocacional",
      description:
        "Tus intereses muestran dirección y coherencia, facilitando una elección profesional más segura."
    },

    "Consistencia vocacional": {
      label: "Coherencia de personalidad laboral",
      description:
        "Tus respuestas mantienen estabilidad entre motivaciones, preferencias y estilo de trabajo."
    },

    "Potencial de exploración laboral": {
      label: "Proyección profesional futura",
      description:
        "Tu perfil tiene compatibilidad con múltiples rutas profesionales y oportunidades de crecimiento."
    }
  };

  const current = content[title];

  return (
    <article className="v2-metric">
      <div className="metric-top">
        <p>{current.label}</p>
        <h3>{value}%</h3>
      </div>

      <div className="v2-metric-bar">
        <div style={{ width: `${value}%` }}></div>
      </div>

      <span className="metric-description">{current.description}</span>
    </article>
  );
}

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