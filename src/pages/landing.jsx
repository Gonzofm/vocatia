const pricingPlans = [
  {
    name: "Gratis",
    price: "S/ 0",
    description: "Ideal para descubrir tu perfil principal y empezar a explorar.",
    features: [
      "Test vocacional de 36 preguntas",
      "Perfil dominante y complementario",
      "Dashboard basico de resultados",
      "Carreras sugeridas por afinidad"
    ],
    highlighted: false
  },
  {
    name: "Plan Premium Vocatia",
    price: "S/ 49.90",
    description: "Un mes de orientacion vocacional, recursos y acompañamiento.",
    features: [
      "Informe vocacional premium personalizado",
      "Sesion mensual con psicologo asesor",
      "Contenido semanal de orientacion",
      "Recursos descargables",
      "Acompañamiento durante el mes"
    ],
    highlighted: true
  },
  {
    name: "Premium + Asesoria",
    price: "Proximamente",
    description: "Informe completo y revision personalizada por videollamada.",
    features: [
      "Todo lo del informe premium",
      "Sesion de 30 minutos",
      "Revision de dudas con orientador",
      "Recomendaciones finales por WhatsApp"
    ],
    highlighted: false
  }
];

function Landing({ onStart }) {
  return (
    <main className="landing-page conversion-landing">
      <section className="hero-section commercial-hero">
        <div className="hero-content">
          <span className="pill">Test gratis + Plan Premium Vocatia S/49.90</span>

          <h1>Descubre que carrera estudiar en menos de 5 minutos.</h1>

          <p>
            Vocatia combina intereses, personalidad y rutas profesionales para
            darte un dashboard claro y un plan premium de orientacion vocacional.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={onStart}>
              Hacer test gratis
            </button>

            <a href="#precios" className="secondary-btn">
              Ver planes
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>36</strong>
              <span>Preguntas</span>
            </div>
            <div>
              <strong>12+</strong>
              <span>Carreras sugeridas</span>
            </div>
            <div>
              <strong>S/49.90</strong>
              <span>Plan premium</span>
            </div>
          </div>
        </div>

        <div className="commercial-preview">
          <div className="preview-card">
            <div className="preview-top">
              <span>Resultado inmediato</span>
              <strong>86%</strong>
            </div>

            <p className="preview-label">Perfil sugerido</p>
            <h2>Investigador / Analitico</h2>

            <div className="conversion-preview-list">
              <div>
                <strong>Data Science</strong>
                <span>Alta afinidad</span>
              </div>
              <div>
                <strong>Ingenieria de Software</strong>
                <span>Ruta recomendada</span>
              </div>
              <div>
                <strong>Plan Premium Vocatia</strong>
                <span>Informe, sesion y recursos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section conversion-band">
        <span className="section-pill">Hecho para Peru</span>
        <h2>Para escolares, egresados y universitarios indecisos.</h2>
        <p>
          Empieza gratis, mira si el resultado te ayuda y activa el plan premium
          si quieres acompañamiento, recursos y una ruta mas completa.
        </p>

        <div className="problem-grid">
          <div>Miedo a elegir mal</div>
          <div>Presion familiar</div>
          <div>Demasiadas carreras</div>
          <div>Poca informacion laboral</div>
        </div>
      </section>

      <section id="beneficios" className="section">
        <span className="section-pill">Que recibes</span>
        <h2>Un resultado util, no solo una etiqueta.</h2>

        <div className="feature-grid">
          <article>
            <h3>Perfil vocacional</h3>
            <p>Identifica tu estilo dominante, secundario y areas de afinidad.</p>
          </article>

          <article>
            <h3>Carreras compatibles</h3>
            <p>Explora rutas recomendadas por match, area y habilidades.</p>
          </article>

          <article>
            <h3>Dashboard interactivo</h3>
            <p>Filtra carreras, revisa porcentajes y compara opciones.</p>
          </article>

          <article>
            <h3>Informe premium</h3>
            <p>Desbloquea informe, sesion mensual, recursos y acompañamiento.</p>
          </article>
        </div>
      </section>

      <section id="precios" className="section pricing-section">
        <span className="section-pill">Planes</span>
        <h2>Plan Premium Vocatia — S/49.90</h2>
        <p className="pricing-subcopy">
          Incluye informe vocacional premium personalizado, sesion mensual con
          psicologo asesor especializado, contenido semanal, recursos
          descargables, acompañamiento durante el mes y plan de accion para
          tomar una decision con mayor claridad.
        </p>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              className={plan.highlighted ? "pricing-card pricing-featured" : "pricing-card"}
              key={plan.name}
            >
              <span>{plan.name}</span>
              <h3>{plan.price}</h3>
              <p>{plan.description}</p>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <button className="primary-btn" onClick={onStart}>
                {plan.highlighted ? "Probar gratis primero" : "Empezar"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="section">
        <span className="section-pill">Proceso simple</span>
        <h2>Como funciona Vocatia</h2>

        <div className="steps-grid">
          <article>
            <span>01</span>
            <h3>Responde el test</h3>
            <p>36 preguntas compactas, sin registro inicial.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Recibe tu dashboard</h3>
            <p>Perfil, metricas y carreras compatibles al instante.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Desbloquea premium</h3>
            <p>Paga con Culqi y accede al paquete premium de orientacion vocacional.</p>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <span className="section-pill">Preguntas frecuentes</span>
        <h2>Antes de empezar</h2>

        <div className="faq-grid">
          <article>
            <h3>Esto reemplaza a un psicologo?</h3>
            <p>No. Es una herramienta de orientacion inicial para tomar mejores decisiones.</p>
          </article>
          <article>
            <h3>Como se procesa el pago?</h3>
            <p>La estructura usa Culqi Checkout y un backend seguro para crear el cargo.</p>
          </article>
          <article>
            <h3>Que recibo despues del pago?</h3>
            <p>Accedes al dashboard premium con informe, sesion, recursos y contenido semanal.</p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <h2>Empieza gratis y decide con mas claridad.</h2>
        <p>
          Haz el test, revisa tu resultado y desbloquea el informe premium solo
          si quieres una ruta mas completa.
        </p>

        <button className="primary-btn" onClick={onStart}>
          Hacer test gratis
        </button>
      </section>
    </main>
  );
}

export default Landing;
