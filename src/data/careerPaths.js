export const careerPaths = [
  // SALUD
  {
    name: "Medicina",
    area: "Salud",
    weights: { R: 15, I: 35, A: 0, S: 30, E: 5, C: 15 },
    description: "Diagnóstico, tratamiento y prevención de enfermedades.",
    skills: ["Biología", "Análisis clínico", "Empatía", "Disciplina"]
  },
  {
    name: "Psicología Clínica",
    area: "Salud mental",
    weights: { R: 0, I: 30, A: 10, S: 45, E: 5, C: 10 },
    description: "Evaluación, acompañamiento y tratamiento psicológico.",
    skills: ["Escucha activa", "Evaluación", "Comunicación", "Ética"]
  },
  {
    name: "Enfermería",
    area: "Salud",
    weights: { R: 20, I: 15, A: 0, S: 45, E: 5, C: 15 },
    description: "Cuidado directo de pacientes y apoyo clínico.",
    skills: ["Cuidado", "Responsabilidad", "Técnica clínica", "Empatía"]
  },
  {
    name: "Nutrición",
    area: "Salud",
    weights: { R: 5, I: 30, A: 5, S: 35, E: 5, C: 20 },
    description: "Planificación alimentaria, salud preventiva y bienestar.",
    skills: ["Biología", "Planificación", "Educación", "Análisis"]
  },
  {
    name: "Odontología",
    area: "Salud",
    weights: { R: 30, I: 25, A: 5, S: 20, E: 5, C: 15 },
    description: "Diagnóstico y tratamiento de la salud bucal.",
    skills: ["Precisión manual", "Anatomía", "Atención al detalle", "Comunicación"]
  },

  // TECNOLOGÍA
  {
    name: "Ingeniería de Software",
    area: "Tecnología",
    weights: { R: 5, I: 45, A: 15, S: 5, E: 5, C: 25 },
    description: "Diseño y desarrollo de aplicaciones, sistemas y plataformas.",
    skills: ["Programación", "Lógica", "Resolución de problemas", "Arquitectura"]
  },
  {
    name: "Data Science",
    area: "Tecnología / Datos",
    weights: { R: 0, I: 50, A: 5, S: 5, E: 10, C: 30 },
    description: "Análisis de datos para generar predicciones y decisiones.",
    skills: ["Estadística", "Python", "Machine Learning", "Pensamiento analítico"]
  },
  {
    name: "Ciberseguridad",
    area: "Tecnología",
    weights: { R: 10, I: 45, A: 0, S: 0, E: 10, C: 35 },
    description: "Protección de sistemas, redes e información digital.",
    skills: ["Redes", "Análisis", "Seguridad", "Atención al detalle"]
  },
  {
    name: "UX/UI Design",
    area: "Diseño / Tecnología",
    weights: { R: 0, I: 20, A: 35, S: 25, E: 5, C: 15 },
    description: "Diseño de experiencias digitales centradas en el usuario.",
    skills: ["Investigación UX", "Diseño visual", "Empatía", "Prototipado"]
  },
  {
    name: "Product Management",
    area: "Tecnología / Negocios",
    weights: { R: 0, I: 25, A: 15, S: 15, E: 35, C: 10 },
    description: "Gestión de productos digitales, estrategia y usuarios.",
    skills: ["Estrategia", "Comunicación", "Datos", "Priorización"]
  },

  // INGENIERÍAS
  {
    name: "Ingeniería Industrial",
    area: "Ingeniería / Gestión",
    weights: { R: 15, I: 30, A: 0, S: 5, E: 25, C: 25 },
    description: "Optimización de procesos, operaciones y productividad.",
    skills: ["Procesos", "Datos", "Gestión", "Mejora continua"]
  },
  {
    name: "Ingeniería Civil",
    area: "Ingeniería",
    weights: { R: 35, I: 30, A: 5, S: 5, E: 10, C: 15 },
    description: "Diseño y construcción de infraestructura.",
    skills: ["Cálculo", "Construcción", "Planificación", "Precisión"]
  },
  {
    name: "Arquitectura",
    area: "Diseño / Construcción",
    weights: { R: 20, I: 15, A: 35, S: 5, E: 10, C: 15 },
    description: "Diseño de espacios funcionales, estéticos y habitables.",
    skills: ["Diseño", "Creatividad", "Planos", "Visión espacial"]
  },
  {
    name: "Ingeniería Mecánica",
    area: "Ingeniería",
    weights: { R: 40, I: 35, A: 0, S: 0, E: 5, C: 20 },
    description: "Diseño, análisis y mantenimiento de sistemas mecánicos.",
    skills: ["Física", "Mecánica", "Diseño técnico", "Resolución práctica"]
  },
  {
    name: "Ingeniería Ambiental",
    area: "Ingeniería / Sostenibilidad",
    weights: { R: 20, I: 35, A: 5, S: 20, E: 5, C: 15 },
    description: "Soluciones técnicas para problemas ambientales.",
    skills: ["Ciencia ambiental", "Análisis", "Sostenibilidad", "Gestión"]
  },

  // NEGOCIOS
  {
    name: "Administración",
    area: "Negocios",
    weights: { R: 0, I: 10, A: 5, S: 15, E: 45, C: 25 },
    description: "Gestión de organizaciones, equipos y recursos.",
    skills: ["Gestión", "Liderazgo", "Planificación", "Comunicación"]
  },
  {
    name: "Marketing",
    area: "Negocios / Creatividad",
    weights: { R: 0, I: 15, A: 30, S: 20, E: 30, C: 5 },
    description: "Estrategias para posicionar marcas, productos y servicios.",
    skills: ["Creatividad", "Estrategia", "Comunicación", "Análisis de mercado"]
  },
  {
    name: "Finanzas",
    area: "Negocios / Finanzas",
    weights: { R: 0, I: 35, A: 0, S: 0, E: 20, C: 45 },
    description: "Gestión de inversiones, presupuestos y decisiones financieras.",
    skills: ["Análisis numérico", "Excel", "Riesgo", "Planificación"]
  },
  {
    name: "Contabilidad",
    area: "Finanzas",
    weights: { R: 0, I: 20, A: 0, S: 0, E: 5, C: 75 },
    description: "Registro, control y análisis de información financiera.",
    skills: ["Orden", "Normativa", "Detalle", "Análisis financiero"]
  },
  {
    name: "Emprendimiento",
    area: "Negocios",
    weights: { R: 5, I: 15, A: 20, S: 15, E: 40, C: 5 },
    description: "Creación y crecimiento de nuevos negocios.",
    skills: ["Ventas", "Estrategia", "Creatividad", "Resiliencia"]
  },

  // HUMANIDADES / SOCIAL
  {
    name: "Derecho",
    area: "Humanidades / Legal",
    weights: { R: 0, I: 30, A: 5, S: 20, E: 30, C: 15 },
    description: "Interpretación legal, argumentación y defensa de derechos.",
    skills: ["Argumentación", "Lectura crítica", "Ética", "Negociación"]
  },
  {
    name: "Educación",
    area: "Educación",
    weights: { R: 0, I: 15, A: 15, S: 55, E: 5, C: 10 },
    description: "Formación, enseñanza y acompañamiento de estudiantes.",
    skills: ["Comunicación", "Didáctica", "Paciencia", "Planificación"]
  },
  {
    name: "Trabajo Social",
    area: "Social",
    weights: { R: 0, I: 15, A: 5, S: 60, E: 10, C: 10 },
    description: "Intervención social, apoyo comunitario y bienestar humano.",
    skills: ["Empatía", "Gestión social", "Comunicación", "Intervención"]
  },
  {
    name: "Recursos Humanos",
    area: "Organizaciones",
    weights: { R: 0, I: 20, A: 10, S: 35, E: 25, C: 10 },
    description: "Gestión del talento, clima laboral y desarrollo organizacional.",
    skills: ["Comunicación", "Evaluación", "Gestión", "Empatía"]
  },
  {
    name: "Relaciones Internacionales",
    area: "Humanidades / Global",
    weights: { R: 0, I: 30, A: 10, S: 25, E: 25, C: 10 },
    description: "Análisis político, cooperación y gestión internacional.",
    skills: ["Análisis", "Idiomas", "Negociación", "Cultura global"]
  },

  // CREATIVIDAD / COMUNICACIÓN
  {
    name: "Comunicación Audiovisual",
    area: "Comunicación",
    weights: { R: 5, I: 10, A: 50, S: 15, E: 15, C: 5 },
    description: "Creación de contenidos audiovisuales, narrativa y medios.",
    skills: ["Storytelling", "Edición", "Creatividad", "Producción"]
  },
  {
    name: "Diseño Gráfico",
    area: "Diseño",
    weights: { R: 0, I: 10, A: 60, S: 10, E: 10, C: 10 },
    description: "Comunicación visual, branding y diseño de piezas gráficas.",
    skills: ["Diseño visual", "Creatividad", "Branding", "Software de diseño"]
  },
  {
    name: "Publicidad",
    area: "Creatividad / Negocios",
    weights: { R: 0, I: 10, A: 45, S: 15, E: 25, C: 5 },
    description: "Creación de campañas para marcas, productos o servicios.",
    skills: ["Creatividad", "Copywriting", "Estrategia", "Comunicación"]
  },
  {
    name: "Periodismo",
    area: "Comunicación",
    weights: { R: 0, I: 30, A: 25, S: 25, E: 10, C: 10 },
    description: "Investigación, redacción y comunicación de información.",
    skills: ["Redacción", "Investigación", "Comunicación", "Criterio"]
  },
  {
    name: "Animación Digital",
    area: "Arte / Tecnología",
    weights: { R: 5, I: 15, A: 55, S: 5, E: 5, C: 15 },
    description: "Creación de animaciones, personajes y piezas digitales.",
    skills: ["Ilustración", "Animación", "Creatividad", "Software digital"]
  }
];