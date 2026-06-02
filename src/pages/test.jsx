import PremiumPreview from "../components/PremiumPreview";
import PremiumDashboard from "../components/PremiumDashboard";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

function Test({ premiumUnlocked, premiumLead, onUnlockPremium, onResultReady }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeArea, setActiveArea] = useState("all");
  const [selectedCareerName, setSelectedCareerName] = useState(null);

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

  useLayoutEffect(() => {
    if (!result || isAnalyzing) return;

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const frameId = requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [result, isAnalyzing]);

  const handleChange = (questionId, value) => {
    const nextAnswers = {
      ...answers,
      [questionId]: value
    };

    setAnswers(nextAnswers);

    if (currentQuestion === questions.length - 1) {
      setIsAnalyzing(true);

      setTimeout(() => {
        const nextResult = calculateResult(nextAnswers);

        setActiveArea("all");
        setSelectedCareerName(nextResult.detailedCareers[0]?.name || null);
        setResult(nextResult);
        onResultReady?.(nextResult);
        setIsAnalyzing(false);
      }, 2600);
    } else {
      setTimeout(() => {
        setCurrentQuestion((questionIndex) => questionIndex + 1);
      }, 180);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
    const areaFilters = result.areaBreakdown || [];
    const currentArea = areaFilters.find((area) => area.area === activeArea);
    const visibleCareers =
      activeArea === "all"
        ? result.detailedCareers
        : currentArea?.careers || result.detailedCareers;
    const selectedCareer =
      result.rankedCareers.find((career) => career.name === selectedCareerName) ||
      visibleCareers[0];
    const profileMix = [main, secondary, result.thirdProfile]
      .map((profile) => profileNames[profile])
      .join(" + ");

    const handleAreaChange = (area) => {
      const nextCareers =
        area === "all"
          ? result.detailedCareers
          : areaFilters.find((item) => item.area === area)?.careers || [];

      setActiveArea(area);
      setSelectedCareerName(nextCareers[0]?.name || null);
    };

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

          <button
            className="v2-premium-btn"
            disabled={premiumUnlocked}
            onClick={premiumUnlocked ? undefined : onUnlockPremium}
          >
            {premiumUnlocked ? "Informe premium activo" : "Desbloquear informe completo 🔒"}
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

        <section className="v2-explorer-panel">
          <div className="v2-section-head">
            <span className="v2-pill">Explorador vocacional</span>
            <h2>Compara rutas por área profesional</h2>
            <p>
              Tu combinación {profileMix} abre varias rutas posibles. Filtra por
              área, revisa el match y selecciona una carrera para ver su lectura
              inicial.
            </p>
          </div>

          <div className="v2-area-tabs">
            <button
              className={activeArea === "all" ? "v2-active-tab" : ""}
              onClick={() => handleAreaChange("all")}
            >
              Todas
            </button>

            {areaFilters.map((area) => (
              <button
                className={activeArea === area.area ? "v2-active-tab" : ""}
                key={area.area}
                onClick={() => handleAreaChange(area.area)}
              >
                {area.area}
                <span>{area.averageScore}%</span>
              </button>
            ))}
          </div>

          <div className="v2-explorer-grid">
            <div className="v2-careers v2-career-list">
              {visibleCareers.map((career, index) => (
                <button
                  className={
                    selectedCareer?.name === career.name
                      ? "v2-career-item premium-career-card v2-selected-career"
                      : "v2-career-item premium-career-card"
                  }
                  key={career.name}
                  onClick={() => setSelectedCareerName(career.name)}
                >
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
                </button>
              ))}
            </div>

            {selectedCareer && (
              <article className="v2-career-detail">
                <span className="v2-small-label">Carrera seleccionada</span>
                <h3>{selectedCareer.name}</h3>
                <p>{selectedCareer.description}</p>

                <div className="v2-detail-score">
                  <strong>{selectedCareer.matchScore}%</strong>
                  <span>compatibilidad estimada</span>
                </div>

                <div className="v2-detail-grid">
                  <div>
                    <small>Área</small>
                    <strong>{selectedCareer.area}</strong>
                  </div>
                  <div>
                    <small>Ajuste de perfil</small>
                    <strong>{selectedCareer.profileFit}%</strong>
                  </div>
                </div>

                <div className="v2-skills">
                  {selectedCareer.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            )}
          </div>
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
              <span className="v2-pill">Mapa de áreas</span>
              <h2>Dónde tienes mayor apertura</h2>
            </div>

            <div className="v2-area-breakdown">
              {areaFilters.slice(0, 6).map((area) => (
                <button key={area.area} onClick={() => handleAreaChange(area.area)}>
                  <div>
                    <strong>{area.area}</strong>
                    <span>{area.careers.length} rutas destacadas</span>
                  </div>
                  <small>{area.averageScore}%</small>
                </button>
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

 <PremiumPreview
  decisionRisk={decisionRisk}
  employability={employability}
  isUnlocked={premiumUnlocked}
  onUnlock={onUnlockPremium}
/>  
        {premiumUnlocked && (
          <PremiumDashboard
            result={result}
            decisionRisk={decisionRisk}
            employability={employability}
            clarity={clarity}
            lead={premiumLead}
          />
        )}
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

        <div className="test-v2-actions test-v2-actions-single">
          <button onClick={handleBack} className="v2-back-btn">
            Atrás
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

export function PremiumReport({ result, decisionRisk, employability, clarity }) {
  const topCareers = result.rankedCareers.slice(0, 5);
  const topAreas = result.areaBreakdown.slice(0, 3);

  return (
    <section className="premium-report">
      <div className="v2-section-head">
        <span className="v2-premium-pill">Informe desbloqueado</span>
        <h2>Plan profesional personalizado</h2>
        <p>
          Usa este resumen como una primera ruta de exploracion. Valida tus
          opciones con cursos cortos, conversaciones con profesionales y
          comparacion de mallas curriculares.
        </p>
      </div>

      <div className="premium-report-grid">
        <article>
          <span>Riesgo de decision</span>
          <strong>{decisionRisk}%</strong>
          <p>
            Mientras mas alto sea este numero, mas conviene comparar opciones
            antes de elegir una carrera definitiva.
          </p>
        </article>

        <article>
          <span>Claridad vocacional</span>
          <strong>{clarity}%</strong>
          <p>
            Tu patron de respuestas muestra que tan consistente es tu direccion
            actual.
          </p>
        </article>

        <article>
          <span>Proyeccion laboral</span>
          <strong>{employability}%</strong>
          <p>
            Estimacion inicial de adaptabilidad entre tu perfil, habilidades y
            rutas profesionales.
          </p>
        </article>
      </div>

      <div className="premium-report-columns">
        <article className="premium-report-card">
          <h3>Top 5 carreras para investigar</h3>
          {topCareers.map((career, index) => (
            <div className="premium-report-row" key={career.name}>
              <span>{index + 1}</span>
              <div>
                <strong>{career.name}</strong>
                <p>{career.area} · {career.matchScore}% match</p>
              </div>
            </div>
          ))}
        </article>

        <article className="premium-report-card">
          <h3>Areas con mejor potencial</h3>
          {topAreas.map((area) => (
            <div className="premium-report-row" key={area.area}>
              <span>{area.averageScore}%</span>
              <div>
                <strong>{area.area}</strong>
                <p>{area.careers.map((career) => career.name).join(", ")}</p>
              </div>
            </div>
          ))}
        </article>
      </div>

      <article className="premium-report-card premium-action-plan">
        <h3>Ruta de accion de 90 dias</h3>
        <div>
          <strong>Dias 1-15</strong>
          <p>Elige 3 carreras del ranking y revisa mallas, videos y testimonios.</p>
        </div>
        <div>
          <strong>Dias 16-35</strong>
          <p>Haz un curso introductorio o mini proyecto relacionado con tu primera opcion.</p>
        </div>
        <div>
          <strong>Dias 36-60</strong>
          <p>Conversa con 2 estudiantes o profesionales y compara expectativas reales.</p>
        </div>
        <div>
          <strong>Dias 61-90</strong>
          <p>Define tu shortlist final y prepara un plan de estudios, habilidades y presupuesto.</p>
        </div>
      </article>
    </section>
  );
}

export function LockedCard({ title, value }) {
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
