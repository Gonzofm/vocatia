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
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (!answers[question.id]) {
      alert("Selecciona una respuesta para continuar.");
      return;
    }

    if (currentQuestion === questions.length - 1) {
      setResult(calculateResult(answers));
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  if (result) {
    const main = result.mainProfile;
    const secondary = result.secondaryProfile;
    const compatibility = result.compatibility || 82;
    const clarity = Math.min(100, Math.round(compatibility * 0.88));
    const employability = Math.min(100, Math.round(compatibility * 1.04));
    const decisionRisk = Math.max(12, 100 - clarity);

    const riasecScores = Object.entries(result.scores).filter(([key]) =>
      ["R", "I", "A", "S", "E", "C"].includes(key)
    );

    const maxScore = Math.max(...riasecScores.map(([, value]) => value));

    return (
      <main className="result-page">
        <section className="result-header">
          <div>
            <span className="result-pill">Resultado gratuito</span>
            <h1>Tu Dashboard Vocacional</h1>
            <p>
              Este análisis inicial resume tu perfil, compatibilidad profesional y áreas
              de carrera recomendadas.
            </p>
          </div>

          <button className="premium-main-btn">
            Desbloquear informe completo 🔒
          </button>
        </section>

        <section className="result-grid">
          <article className="profile-panel">
            <p className="small-label">Perfil principal</p>
            <h2>{profileNames[main]}</h2>
            <p>{profileDescriptions[main]}</p>

            <div className="secondary-box">
              <span>Perfil secundario</span>
              <strong>{profileNames[secondary]}</strong>
            </div>
          </article>

          <article className="score-panel">
            <Metric title="Compatibilidad vocacional" value={compatibility} />
            <Metric title="Claridad profesional" value={clarity} />
            <Metric title="Potencial de empleabilidad" value={employability} />
          </article>
        </section>

        <section className="result-section">
          <div className="section-head">
            <div>
              <span className="section-pill">Mapa de intereses</span>
              <h2>Distribución de tu perfil</h2>
            </div>
            <p>Mientras más alto el porcentaje, mayor afinidad con ese estilo vocacional.</p>
          </div>

          <div className="bars">
            {riasecScores.map(([key, value]) => {
              const percent = Math.round((value / maxScore) * 100);

              return (
                <div className="bar-item" key={key}>
                  <div className="bar-info">
                    <span>{profileNames[key]}</span>
                    <strong>{percent}%</strong>
                  </div>
                  <div className="bar-bg">
                    <div style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="two-col">
          <article className="result-card">
            <h2>Carreras recomendadas</h2>
            <p className="muted">
              Estas carreras aparecen como primeras rutas compatibles con tu perfil.
            </p>

            <div className="career-list">
              {result.careers.map((career, index) => (
                <div className="career-item" key={index}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{career}</strong>
                    <p>Alta compatibilidad inicial con tu perfil vocacional.</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="result-card">
            <h2>Lectura inicial</h2>
            <p className="muted">
              Tu resultado combina un perfil <strong>{profileNames[main]}</strong> con rasgos{" "}
              <strong>{profileNames[secondary]}</strong>. Esto sugiere que podrías destacar
              en rutas donde combines tus intereses principales con tu estilo de trabajo.
            </p>

            <div className="insight-box">
              <strong>Insight clave</strong>
              <p>
                El siguiente paso no es elegir una carrera de inmediato, sino comparar tus
                opciones con mercado laboral, habilidades requeridas y estilo de vida esperado.
              </p>
            </div>
          </article>
        </section>

        <section className="premium-zone">
          <div className="premium-copy">
            <span className="section-pill">Premium</span>
            <h2>Tu informe completo está listo</h2>
            <p>
              Desbloquea el análisis avanzado con riesgos, rutas de carrera, empleabilidad,
              sueldos estimados y plan de acción personalizado.
            </p>
          </div>

          <div className="premium-preview-grid">
            <LockedCard title="Riesgo de mala elección" value={`${decisionRisk}%`} />
            <LockedCard title="Carreras con mejor retorno" value="Top 5" />
            <LockedCard title="Proyección de empleabilidad" value={`${employability}%`} />
            <LockedCard title="Ruta profesional de 90 días" value="Lista" />
            <LockedCard title="Habilidades urgentes" value="8 skills" />
            <LockedCard title="Plan de acción personalizado" value="PDF" />
          </div>

          <div className="premium-cta">
            <div>
              <strong>Incluye:</strong>
              <p>
                top de carreras, riesgos, ruta de estudios, habilidades clave, empleabilidad
                y recomendación profesional final.
              </p>
            </div>

            <button className="premium-main-btn">
              Ver mi informe completo 🔒
            </button>
          </div>
        </section>

        <button className="restart-btn" onClick={() => window.location.reload()}>
          Repetir test
        </button>
      </main>
    );
  }

  return (
    <main className="test-page">
      <section className="test-card">
        <div className="question-top">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <strong>{progress}%</strong>
        </div>

        <div className="test-progress">
          <div style={{ width: `${progress}%` }}></div>
        </div>

        <h1>Test Vocacional</h1>
        <h2>{question.text}</h2>

        <div className="answer-list">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChange(question.id, option.value)}
              className={answers[question.id] === option.value ? "selected-answer" : ""}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="test-actions">
          <button onClick={handleBack} className="back-btn">
            Atrás
          </button>

          <button onClick={handleNext} className="next-btn">
            {currentQuestion === questions.length - 1 ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }) {
  return (
    <div className="metric-card">
      <p>{title}</p>
      <h3>{value}%</h3>
      <div className="metric-bar">
        <div style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function LockedCard({ title, value }) {
  return (
    <article className="locked-card">
      <div className="locked-content">
        <p>{title}</p>
        <h3>{value}</h3>
        <small>Disponible en premium</small>
      </div>
      <div className="lock-overlay">🔒</div>
    </article>
  );
}

export default Test;