function PremiumPreview({
  decisionRisk,
  employability,
  isUnlocked,
  onUnlock
}) {
  const premiumCards = [
    {
      title: "Informe vocacional premium",
      value: "Completo",
      text: "Resultado completo, carreras recomendadas, fortalezas, areas de mejora y proximos pasos."
    },
    {
      title: "Sesion mensual",
      value: "Incluida",
      text: "Solicitud de sesion con psicologo asesor especializado en orientacion vocacional."
    },
    {
      title: "Contenido semanal",
      value: "6 modulos",
      text: "Material diseñado para autoconocimiento, decision vocacional y comunicacion familiar."
    },
    {
      title: "Recursos descargables",
      value: "4 guias",
      text: "Checklist, plantilla vocacional y preguntas para comparar carreras e instituciones."
    },
    {
      title: "Acompañamiento",
      value: "Mensual",
      text: "Soporte vocacional por WhatsApp o canal privado durante el mes."
    },
    {
      title: "Indicadores clave",
      value: `${decisionRisk}% / ${employability}%`,
      text: "Riesgo de decision y proyeccion vocacional para orientar tus siguientes pasos."
    }
  ];

  return (
    <section
      className={
        isUnlocked
          ? "v2-premium-zone premium-unlocked-zone"
          : "v2-premium-zone"
      }
    >
      <div className="v2-premium-copy">
        <span className="v2-premium-pill">
          {isUnlocked ? "Informe Premium activo" : "Informe Premium"}
        </span>
        <h2>
          {isUnlocked
            ? "Tu Plan Premium Vocatia esta activo"
            : "Activa el Plan Premium Vocatia por S/49.90"}
        </h2>
        <p>
          Accede a informe premium, sesion mensual con psicologo asesor,
          contenido semanal, recursos descargables y acompañamiento vocacional
          durante el mes.
        </p>
      </div>

      <div className="premium-preview-grid">
        {premiumCards.map((card) => (
          <PremiumCard key={card.title} {...card} isUnlocked={isUnlocked} />
        ))}
      </div>

      <div className="premium-timeline">
        <h3>Qué incluye tu mes premium</h3>

        <div className="timeline-steps">
          <div>
            <span>Semana 1</span>
            <p>Informe completo y primeros ejercicios de autoconocimiento.</p>
          </div>

          <div>
            <span>Semana 2</span>
            <p>Contenido para comparar carreras y hablar con tu familia.</p>
          </div>

          <div>
            <span>Mes 2</span>
            <p>Solicitud de sesion mensual y recursos descargables.</p>
          </div>

          <div>
            <span>Mes 3</span>
            <p>Plan de accion vocacional y acompañamiento por canal privado.</p>
          </div>
        </div>
      </div>

      <button
        className="v2-premium-btn"
        disabled={isUnlocked}
        onClick={isUnlocked ? undefined : onUnlock}
      >
        {isUnlocked ? "Plan premium activo" : "Activar plan premium"}
      </button>
    </section>
  );
}

function PremiumCard({ title, value, text, isUnlocked }) {
  return (
    <article className="premium-preview-card">
      <div className={isUnlocked ? "" : "premium-locked-layer"}>
        <p>{title}</p>
        <h3>{value}</h3>
        <span>{text}</span>
      </div>

      {!isUnlocked && <div className="premium-card-lock">Bloqueado</div>}
    </article>
  );
}

export default PremiumPreview;
