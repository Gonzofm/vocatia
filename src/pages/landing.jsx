import { useEffect, useState } from "react";

function Landing({ onStart }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logoBox">
          <div className="logoIcon">V</div>
          <span className="logoText">Vocatia</span>
        </div>

        <div className="navLinks">
          <a href="#how">Cómo funciona</a>
          <a href="#benefits">Beneficios</a>
          <a href="#target">Para quién es</a>
        </div>

        <button className="navButton" onClick={onStart}>
          Empezar gratis
        </button>
      </nav>

      <main className="hero">
        <section
          className="heroText"
          style={{ transform: `translateY(${scrollY * -0.025}px)` }}
        >
          <p className="badge">Orientación vocacional + futuro laboral</p>

          <h1>No elijas tu carrera a ciegas.</h1>

          <p className="subtitle">
            Descubre tu perfil vocacional y una ruta profesional clara en menos
            de 5 minutos.
          </p>

          <div className="actions">
            <button className="primaryButton" onClick={onStart}>
              Hacer test gratis
            </button>

            <a className="secondaryButton" href="#how">
              Ver cómo funciona
            </a>
          </div>

          <div className="stats">
            <div>
              <strong>30</strong>
              <span>Preguntas</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Perfiles</span>
            </div>
            <div>
              <strong>5 min</strong>
              <span>Duración</span>
            </div>
          </div>
        </section>

        <section
          className="heroVisual"
          style={{ transform: `translateY(${scrollY * 0.025}px)` }}
        >
          <div className="glow"></div>

          <div className="previewCard">
            <div className="previewHeader">
              <span>Análisis completado</span>
              <strong>86%</strong>
            </div>

            <p className="previewLabel">Perfil sugerido</p>
            <h2>Investigador / Analítico</h2>

            <div className="progressBlock">
              <div className="progressTop">
                <span>Compatibilidad vocacional</span>
                <strong>Alta</strong>
              </div>

              <div className="bar">
                <div className="fill"></div>
              </div>
            </div>

            <div className="miniGrid">
              <div className="miniCard">
                <strong>Data Science</strong>
                <span>Alta afinidad</span>
              </div>

              <div className="miniCard">
                <strong>Software</strong>
                <span>Ruta sugerida</span>
              </div>
            </div>
          </div>

          <div className="floatCard topFloat">Perfil vocacional claro</div>
          <div className="floatCard bottomFloat">Plan profesional personalizado</div>
        </section>
      </main>

      <section className="problemSection">
        <h2>Elegir carrera no debería sentirse como adivinar</h2>
        <p>
          Vocatia convierte tus dudas en información clara para decidir mejor.
        </p>

        <div className="problemGrid">
          <div>No sabes qué estudiar</div>
          <div>Tienes miedo a equivocarte</div>
          <div>No conoces el mercado laboral</div>
          <div>Sientes presión externa</div>
        </div>
      </section>

      <section id="benefits" className="section">
        <p className="sectionBadge">Qué recibes</p>
        <h2>Un dashboard para entender tu futuro</h2>

        <div className="cards">
          <div className="card">
            <h3>Perfil vocacional</h3>
            <p>Identifica tu estilo principal y secundario.</p>
          </div>

          <div className="card">
            <h3>Carreras sugeridas</h3>
            <p>Explora rutas compatibles con tu perfil.</p>
          </div>

          <div className="card">
            <h3>Métricas visuales</h3>
            <p>Revisa compatibilidad, claridad y potencial.</p>
          </div>

          <div className="card">
            <h3>Informe premium</h3>
            <p>Desbloquea ruta, riesgos y plan de acción.</p>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <p className="sectionBadge">Proceso simple</p>
        <h2>Cómo funciona Vocatia</h2>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>Responde el test</h3>
            <p>Exploramos intereses, personalidad y estilo laboral.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Recibe tu resultado</h3>
            <p>Visualiza tu perfil, compatibilidad y carreras sugeridas.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Construye tu ruta</h3>
            <p>Accede a un plan profesional más completo.</p>
          </div>
        </div>
      </section>

      <section id="target" className="ctaSection">
        <h2>Empieza con claridad hoy</h2>
        <p>
          Ideal para escolares, egresados, universitarios indecisos y personas
          que quieren tomar mejores decisiones sobre su futuro.
        </p>

        <button className="primaryButton" onClick={onStart}>
          Hacer test gratis
        </button>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%);
          color: #0f172a;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          max-width: 1180px;
          margin: 0 auto;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(248, 250, 252, 0.82);
          backdrop-filter: blur(16px);
        }

        .logoBox {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logoIcon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 23px;
          box-shadow: 0 12px 28px rgba(22, 163, 74, 0.28);
        }

        .logoText {
          font-size: 28px;
          font-weight: 900;
          color: #14532d;
        }

        .navLinks {
          display: flex;
          gap: 30px;
        }

        .navLinks a {
          color: #0f172a;
          text-decoration: none;
          font-weight: 800;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .navLinks a:hover {
          color: #16a34a;
          transform: translateY(-2px);
        }

        .navButton,
        .primaryButton {
          padding: 15px 28px;
          border-radius: 999px;
          border: none;
          background: #16a34a;
          color: white;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(22, 163, 74, 0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .navButton {
          background: #14532d;
          padding: 14px 26px;
        }

        .navButton:hover,
        .primaryButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 55px rgba(22, 163, 74, 0.34);
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          min-height: 78vh;
          padding: 70px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 70px;
        }

        .heroText {
          animation: fadeUp 0.8s ease both;
          transition: transform 0.2s ease-out;
        }

        .badge {
          display: inline-block;
          padding: 11px 18px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-weight: 900;
          margin-bottom: 24px;
        }

        .hero h1 {
          font-size: 64px;
          line-height: 1;
          letter-spacing: -2.5px;
          margin: 0;
          color: #0f172a;
        }

        .subtitle {
          margin-top: 24px;
          max-width: 560px;
          font-size: 21px;
          line-height: 1.65;
          color: #475569;
        }

        .actions {
          display: flex;
          gap: 16px;
          margin-top: 34px;
          align-items: center;
        }

        .secondaryButton {
          padding: 16px 26px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #0f172a;
          font-weight: 900;
          text-decoration: none;
          transition: transform 0.2s ease, border 0.2s ease;
        }

        .secondaryButton:hover {
          transform: translateY(-3px);
          border-color: #22c55e;
        }

        .stats {
          margin-top: 42px;
          display: flex;
          gap: 16px;
        }

        .stats div {
          min-width: 120px;
          padding: 18px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(203, 213, 225, 0.9);
          display: grid;
          gap: 4px;
          transition: transform 0.2s ease;
        }

        .stats div:hover {
          transform: translateY(-4px);
        }

        .stats strong {
          font-size: 24px;
          color: #14532d;
        }

        .stats span {
          color: #64748b;
          font-weight: 700;
        }

        .heroVisual {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease-out;
          animation: fadeIn 0.9s ease both;
        }

        .glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%);
          filter: blur(60px);
        }

        .previewCard {
          position: relative;
          width: 440px;
          padding: 32px;
          border-radius: 32px;
          background: linear-gradient(145deg, #0f172a, #020617);
          color: white;
          box-shadow: 0 40px 120px rgba(2,6,23,0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          animation: float 4s ease-in-out infinite;
        }

        .previewHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          color: #94a3b8;
          font-weight: 800;
          font-size: 14px;
        }

        .previewHeader span {
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(34,197,94,0.15);
          color: #22c55e;
          font-weight: 900;
          font-size: 12px;
        }

        .previewHeader strong {
          color: #86efac;
          font-size: 20px;
        }

        .previewLabel {
          text-align: center;
          color: #cbd5e1;
          font-weight: 800;
        }

        .previewCard h2 {
          text-align: center;
          font-size: 30px;
          margin-top: 6px;
        }

        .progressBlock {
          margin-top: 30px;
        }

        .progressTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          color: #e2e8f0;
        }

        .bar {
          height: 10px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .fill {
          width: 86%;
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #4ade80);
          box-shadow: 0 0 20px rgba(34,197,94,0.6);
        }

        .miniGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 24px;
        }

        .miniCard {
          background: rgba(255,255,255,0.04);
          padding: 18px;
          border-radius: 18px;
          display: grid;
          gap: 6px;
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          transition: transform 0.2s ease;
        }

        .miniCard:hover {
          transform: translateY(-4px);
        }

        .miniCard span {
          color: #94a3b8;
        }

        .floatCard {
          position: absolute;
          background: white;
          color: #14532d;
          padding: 18px 24px;
          border-radius: 20px;
          font-weight: 900;
          box-shadow: 0 20px 50px rgba(15,23,42,0.16);
          animation: floatSoft 5s ease-in-out infinite;
        }

        .topFloat {
          top: 48px;
          left: 0;
        }

        .bottomFloat {
          right: 0;
          bottom: 48px;
          background: #dcfce7;
        }

        .problemSection,
        .section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 70px 32px;
          text-align: center;
        }

        .problemSection h2,
        .section h2 {
          font-size: 44px;
          line-height: 1.08;
          margin: 10px 0 0;
        }

        .problemSection p {
          color: #64748b;
          font-size: 19px;
        }

        .problemGrid,
        .cards {
          margin-top: 34px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .problemGrid div,
        .card,
        .steps div {
          background: white;
          padding: 28px;
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(15,23,42,0.06);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .problemGrid div:hover,
        .card:hover,
        .steps div:hover {
          transform: translateY(-6px);
          box-shadow: 0 26px 60px rgba(15,23,42,0.1);
        }

        .sectionBadge {
          color: #16a34a;
          font-weight: 900;
        }

        .card {
          text-align: left;
        }

        .card p,
        .steps p {
          color: #64748b;
          line-height: 1.6;
        }

        .steps {
          margin-top: 34px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          text-align: left;
        }

        .steps span {
          color: #16a34a;
          font-weight: 900;
        }

        .ctaSection {
          margin-top: 40px;
          padding: 90px 32px;
          background: #0f172a;
          color: white;
          text-align: center;
        }

        .ctaSection h2 {
          font-size: 44px;
          margin-bottom: 16px;
        }

        .ctaSection p {
          max-width: 650px;
          margin: 0 auto 28px;
          color: #cbd5e1;
          line-height: 1.7;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes floatSoft {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 900px) {
          .navLinks {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            padding-top: 40px;
          }

          .hero h1 {
            font-size: 48px;
          }

          .problemGrid,
          .cards,
          .steps {
            grid-template-columns: 1fr;
          }

          .previewCard {
            width: 100%;
          }

          .stats {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;