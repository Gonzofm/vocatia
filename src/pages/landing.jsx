import { useEffect, useState } from "react";

function Landing({ onStart }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="landing-page">
<nav className="vocatia-navbar">
  <div className="vocatia-navbar-inner">

    <div className="vocatia-logo">
      Vocatia
    </div>

    <div className="vocatia-nav-links">

      {/* PRUEBAS */}
      <div className="vocatia-dropdown">
        <button className="vocatia-nav-item">
          Pruebas
        </button>

        <div className="vocatia-dropdown-menu">

          <button onClick={onStart}>
            Test Vocacional Flash
            <span>Disponible</span>
          </button>

          <button>
            Test Vocacional 360
            <span>Próximamente</span>
          </button>

          <button>
            Test Competencias Laborales
            <span>Próximamente</span>
          </button>

          <button>
            Test Atención
            <span>Próximamente</span>
          </button>

          <button>
            Test Tipo de Memoria
            <span>Próximamente</span>
          </button>

        </div>
      </div>

      {/* SERVICIOS */}
      <div className="vocatia-dropdown">
        <button className="vocatia-nav-item">
          Servicios Laborales
        </button>

        <div className="vocatia-dropdown-menu">

          <button>
            Creador de CV
            <span>Próximamente</span>
          </button>

          <button>
            Análisis IA de Ofertas
            <span>Próximamente</span>
          </button>

          <button>
            Simulador de entrevistas
            <span>Próximamente</span>
          </button>

        </div>
      </div>

      <button className="vocatia-nav-item">
        Asesor IA
      </button>

      <button className="vocatia-nav-item">
        Nosotros
      </button>

    </div>

    <button className="vocatia-cta-btn" onClick={onStart}>
      Prueba Gratis
    </button>

  </div>
</nav>

      <section className="hero-section">
        <div
          className="hero-content"
          style={{ transform: `translateY(${scrollY * -0.02}px)` }}
        >
          <span className="pill">Orientación vocacional + futuro laboral</span>

          <h1>No elijas tu carrera a ciegas.</h1>

          <p>
            Descubre tu perfil vocacional, carreras compatibles y una ruta
            profesional clara en menos de 5 minutos.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={onStart}>
              Hacer test gratis
            </button>

            <a href="#como-funciona" className="secondary-btn">
              Ver cómo funciona
            </a>
          </div>

          <div className="hero-stats">
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
        </div>

        <div
          className="hero-preview"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="glow"></div>

          <div className="preview-card">
            <div className="preview-top">
              <span>Análisis completado</span>
              <strong>86%</strong>
            </div>

            <p className="preview-label">Perfil sugerido</p>
            <h2>Investigador / Analítico</h2>

            <div className="progress-area">
              <div className="progress-head">
                <span>Compatibilidad vocacional</span>
                <strong>Alta</strong>
              </div>

              <div className="progress-bar">
                <div></div>
              </div>
            </div>

            <div className="career-grid">
              <div>
                <strong>Data Science</strong>
                <span>Alta afinidad</span>
              </div>

              <div>
                <strong>Software</strong>
                <span>Ruta sugerida</span>
              </div>
            </div>
          </div>

          <div className="floating-card floating-one">
            Perfil vocacional claro
          </div>

          <div className="floating-card floating-two">
            Plan profesional personalizado
          </div>
        </div>
      </section>

      <section id="problema" className="section problem-section">
        <span className="section-pill">El problema</span>
        <h2>Elegir carrera no debería sentirse como adivinar.</h2>
        <p>
          La mayoría decide con poca información, presión externa o miedo a
          equivocarse. Vocatia convierte esas dudas en datos útiles.
        </p>

        <div className="problem-grid">
          <div>No sabes qué estudiar</div>
          <div>Tienes miedo a equivocarte</div>
          <div>No conoces el mercado laboral</div>
          <div>Sientes presión externa</div>
        </div>
      </section>

      <section id="beneficios" className="section">
        <span className="section-pill">Qué recibes</span>
        <h2>Un dashboard para entender tu futuro profesional.</h2>

        <div className="feature-grid">
          <article>
            <h3>Perfil vocacional</h3>
            <p>Identifica tu estilo principal y secundario de decisión.</p>
          </article>

          <article>
            <h3>Carreras sugeridas</h3>
            <p>Explora carreras compatibles con tus intereses y personalidad.</p>
          </article>

          <article>
            <h3>Métricas visuales</h3>
            <p>Revisa compatibilidad, claridad y potencial de desarrollo.</p>
          </article>

          <article>
            <h3>Informe premium</h3>
            <p>Desbloquea ruta profesional, riesgos y plan de acción.</p>
          </article>
        </div>
      </section>

      <section id="como-funciona" className="section">
        <span className="section-pill">Proceso simple</span>
        <h2>Cómo funciona Vocatia</h2>

        <div className="steps-grid">
          <article>
            <span>01</span>
            <h3>Responde el test</h3>
            <p>Analizamos intereses, personalidad y estilo laboral.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Recibe tu resultado</h3>
            <p>Obtén un dashboard con perfil y carreras recomendadas.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Construye tu ruta</h3>
            <p>Accede a un plan profesional para tomar acción.</p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <h2>Empieza con claridad hoy.</h2>
        <p>
          Ideal para escolares, egresados, universitarios indecisos y personas
          que quieren tomar mejores decisiones sobre su futuro.
        </p>

        <button className="primary-btn" onClick={onStart}>
          Descubrir mi perfil gratis
        </button>
      </section>
      <footer className="vocatia-footer">
  <div className="footer-inner">
    <div className="footer-brand">
      <h2>Vocatia</h2>
      <p>
        Plataforma de orientación vocacional, empleabilidad e inteligencia
        profesional para jóvenes, estudiantes e instituciones.
      </p>
    </div>

    <div className="footer-grid">
      <div>
        <h4>Pruebas</h4>
        <a>Test Vocacional Flash</a>
        <a>Test Vocacional 360</a>
        <a>Test Competencias Laborales</a>
        <a>Test Atención</a>
        <a>Test Tipo de Memoria</a>
      </div>

      <div>
        <h4>Servicios Laborales</h4>
        <a>Creador de CV</a>
        <a>Análisis IA de Ofertas</a>
        <a>Simulador de entrevistas</a>
        <a>Roadmaps profesionales</a>
      </div>

      <div>
        <h4>Instituciones</h4>
        <a>Para colegios</a>
        <a>Para universidades</a>
        <a>Para psicólogos</a>
        <a>Programas vocacionales</a>
      </div>

      <div>
        <h4>Empresa</h4>
        <a>Nosotros</a>
        <a>Contacto</a>
        <a>Privacidad</a>
        <a>Términos</a>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2026 Vocatia. Todos los derechos reservados.</p>

      <div className="footer-socials">
        <span>in</span>
        <span>ig</span>
        <span>yt</span>
        <span>tk</span>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}

export default Landing;