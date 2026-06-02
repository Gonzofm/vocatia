import { premiumContent } from "../data/premiumContent";
import { premiumResources } from "../data/premiumResources";
import SessionRequestForm from "./SessionRequestForm";

function PremiumDashboard({
  result,
  decisionRisk,
  employability,
  clarity,
  lead
}) {
  const topCareers = result.rankedCareers.slice(0, 5);
  const topAreas = result.areaBreakdown.slice(0, 3);

  return (
    <section className="premium-dashboard">
      <div className="premium-dashboard-head">
        <div>
          <span className="v2-premium-pill">Plan Premium activo</span>
          <h2>Tu paquete premium de orientación vocacional</h2>
          <p>
            Accede a tu informe, contenido semanal, recursos descargables,
            solicitud de sesión mensual y acompañamiento vocacional durante el mes.
          </p>
        </div>

        <div className="premium-payment-state">
          <span>Estado del pago</span>
          <strong>Aprobado</strong>
        </div>
      </div>

      <div className="premium-status-grid">
        <article>
          <span>Informe premium</span>
          <strong>Disponible</strong>
        </article>
        <article>
          <span>Contenido semanal</span>
          <strong>{premiumContent.length} modulos</strong>
        </article>
        <article>
          <span>Recursos descargables</span>
          <strong>{premiumResources.length} recursos</strong>
        </article>
        <article>
          <span>Acompañamiento</span>
          <strong>WhatsApp / canal privado</strong>
        </article>
      </div>

      <div className="premium-dashboard-grid">
        <article className="premium-dashboard-card">
          <h3>Informe vocacional premium</h3>
          <div className="premium-metrics-row">
            <div>
              <span>Riesgo de decisión</span>
              <strong>{decisionRisk}%</strong>
            </div>
            <div>
              <span>Claridad vocacional</span>
              <strong>{clarity}%</strong>
            </div>
            <div>
              <span>Proyección</span>
              <strong>{employability}%</strong>
            </div>
          </div>

          <h4>Carreras recomendadas</h4>
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

        <article className="premium-dashboard-card">
          <h3>Perfil de intereses</h3>
          {topAreas.map((area) => (
            <div className="premium-report-row" key={area.area}>
              <span>{area.averageScore}%</span>
              <div>
                <strong>{area.area}</strong>
                <p>{area.careers.map((career) => career.name).join(", ")}</p>
              </div>
            </div>
          ))}

          <h4>Fortalezas personales</h4>
          <p>
            Tu patrón sugiere fortalezas para explorar, aprender con intención,
            comparar alternativas y construir una decisión con evidencias.
          </p>

          <h4>Áreas de mejora</h4>
          <p>
            Profundiza en información académica, conversa con profesionales y
            valida tus opciones con experiencias cortas antes de comprometerte.
          </p>
        </article>
      </div>

      <article className="premium-dashboard-card premium-action-plan">
        <h3>Próximos pasos personalizados</h3>
        <div>
          <strong>1. Investiga tus 3 primeras opciones</strong>
          <p>Compara malla, costos, campo laboral, habilidades y estilo de vida.</p>
        </div>
        <div>
          <strong>2. Valida con experiencia</strong>
          <p>Haz un curso corto, proyecto pequeño o entrevista con alguien del área.</p>
        </div>
        <div>
          <strong>3. Conversa y decide con claridad</strong>
          <p>Usa tu sesión mensual para ordenar dudas y definir tu plan de acción.</p>
        </div>
      </article>

      <section className="premium-dashboard-section">
        <div className="v2-section-head">
          <span className="v2-premium-pill">Sesión mensual</span>
          <h2>Solicita tu sesión con psicólogo asesor</h2>
          <p>
            Esta sesión es de orientación vocacional y toma de decisiones. No es
            diagnóstico clínico ni reemplaza atención psicológica especializada.
          </p>
        </div>

        <SessionRequestForm lead={lead} />
      </section>

      <section className="premium-dashboard-section">
        <div className="v2-section-head">
          <span className="v2-premium-pill">Contenido semanal</span>
          <h2>Módulos disponibles este mes</h2>
        </div>

        <div className="premium-content-grid">
          {premiumContent.map((item) => (
            <article key={item.title}>
              <span>{item.week}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-dashboard-section">
        <div className="v2-section-head">
          <span className="v2-premium-pill">Recursos descargables</span>
          <h2>Herramientas para decidir mejor</h2>
        </div>

        <div className="premium-resource-grid">
          {premiumResources.map((resource) => (
            <article key={resource.title}>
              <span>{resource.type}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button type="button">Ver recurso</button>
            </article>
          ))}
        </div>
      </section>

      <article className="premium-dashboard-card premium-community-card">
        <span className="v2-premium-pill">Acompañamiento</span>
        <h3>Soporte vocacional durante el mes</h3>
        <p>
          El plan incluye acompañamiento por WhatsApp o canal privado para
          resolver dudas sobre tus siguientes pasos, recursos y preparación para
          conversar con tu familia o instituciones educativas.
        </p>
      </article>
    </section>
  );
}

export default PremiumDashboard;
