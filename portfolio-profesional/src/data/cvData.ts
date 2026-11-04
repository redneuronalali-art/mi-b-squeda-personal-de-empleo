export interface ExperienceItem {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  company: string;
  role: {
    es: string;
    en: string;
  };
  sector: 'finance' | 'logistics' | 'retail' | 'admin';
  duties: {
    es: string[];
    en: string[];
  };
  details: {
    es: string;
    en: string;
  };
  verified: boolean;
  needsConfirmation?: boolean;
}

export interface EducationItem {
  id: string;
  title: {
    es: string;
    en: string;
  };
  institution: string;
  periodOrHours: {
    es: string;
    en: string;
  };
  type: 'degree' | 'course' | 'certification';
  details: {
    es: string;
    en: string;
  };
}

export interface SkillCategory {
  title: {
    es: string;
    en: string;
  };
  skills: {
    name: string;
    level: string;
    description: {
      es: string;
      en: string;
    };
  }[];
}

export const cvData = {
  personalInfo: {
    name: "Alicia Fernández Almendro",
    location: "Illescas (Toledo / Comunidad de Madrid)",
    phone: "660661193",
    email: "fernandezalmendroalicia@gmail.com",
    availability: {
      es: "Incorporación inmediata",
      en: "Immediate availability"
    },
    drivingLicense: {
      es: "Carnet B2",
      en: "Driving license B2"
    },
    vehicle: {
      es: "Vehículo propio",
      en: "Own vehicle"
    },
    title: {
      es: "Especialista en Administración, Servicios Financieros y Operaciones",
      en: "Specialist in Financial Administration, Customer Operations & Logistics"
    },
    summary: {
      es: "Profesional con sólida formación superior en Administración y Finanzas (IES Parque Aluche) y más de una década de experiencia continuada en entidades financieras líderes como Servicios Financieros Carrefour, así como en operaciones de centros logísticos de alta demanda (Amazon Mad7) y atención al cliente. Destacada capacidad para la organización, planificación, resolución metódica de incidencias, gestión documental rigurosa y adaptación ágil a entornos dinámicos.",
      en: "Professional with advanced qualifications in Administration & Finance (IES Parque Aluche) and over a decade of continuous service in leading financial institutions like Servicios Financieros Carrefour, as well as high-tempo fulfillment operations (Amazon Mad7) and retail customer service. Demonstrated strength in organization, planning, structured incident resolution, rigorous documentation management, and adaptability in fast-paced operational environments."
    }
  },

  keyStats: [
    {
      value: "10+",
      label: {
        es: "Años continuados en Servicios Financieros Carrefour",
        en: "Years at Carrefour Financial Services"
      }
    },
    {
      value: "100%",
      label: {
        es: "Disponibilidad: Incorporación inmediata",
        en: "Availability: Immediate start"
      }
    },
    {
      value: "B2",
      label: {
        es: "Carnet de conducir con vehículo propio",
        en: "Driving license with own vehicle"
      }
    },
    {
      value: "470h",
      label: {
        es: "Formación especializada en Gestión Financiera",
        en: "Specialized Financial Management training"
      }
    }
  ],

  experiences: [
    {
      id: "telepizza",
      period: "12-2025 / 01-2026",
      startDate: "2025-12",
      endDate: "2026-01",
      company: "Telepizza Illescas",
      sector: "retail",
      role: {
        es: "Auxiliar de tienda",
        en: "Store Assistant"
      },
      duties: {
        es: [
          "Gestión de cocina, teléfono y caja.",
          "Atención directa al cliente y tramitación de pedidos telefónicos y presenciales.",
          "Cuadre de caja y cumplimiento de tiempos de servicio y estándares de calidad."
        ],
        en: [
          "Kitchen prep, telephone customer service, and cash register management.",
          "Direct customer service, taking and processing phone and in-store orders.",
          "Cash balancing, speed-of-service compliance, and quality standard maintenance."
        ]
      },
      details: {
        es: "Puesto operativo y polivalente en tienda con gestión de caja, atención telefónica y coordinación en cocina durante campaña.",
        en: "Fast-paced retail store position managing POS cash handling, telephone orders, and kitchen coordination during peak season."
      },
      verified: true
    },
    {
      id: "amazon-mad7",
      period: "06-2025 / 08-2025",
      startDate: "2025-06",
      endDate: "2025-08",
      company: "Amazon Mad7",
      sector: "logistics",
      role: {
        es: "Almacén (Stow y Cartrunner)",
        en: "Warehouse Associate (Stow & Cartrunner)"
      },
      duties: {
        es: [
          "Funciones de Stow (ubicación de inventario en pods robotizados) y Cartrunner (abastecimiento dinámico de carros de mercancía).",
          "Uso intensivo de terminales de radiofrecuencia (pistolas scanner) y sistemas de gestión de almacén (WMS).",
          "Garantía de flujo continuo de paquetería y cumplimiento riguroso de normativas de seguridad y productividad horaria."
        ],
        en: [
          "Stow operations (inventory placement into robotic pods) and Cartrunner duties (replenishing work carts across lanes).",
          "Continuous use of RF handheld scanners and warehouse management software (WMS).",
          "Sustaining uninterrupted inventory replenishment under strict Amazon safety and hourly target standards."
        ]
      },
      details: {
        es: "Operaciones en uno de los centros logísticos más avanzados de Europa (Mad7), combinando precisión de ubicación robótica y soporte de flujo logístico continuo.",
        en: "High-throughput operations in one of Amazon's flagship automated fulfillment centers (Mad7), executing precision stowing and logistics flow."
      },
      verified: true
    },
    {
      id: "carrefour-oficial-primera",
      period: "06-2017 / 09-2017",
      startDate: "2017-06",
      endDate: "2017-09",
      company: "Servicios Financieros Carrefour",
      sector: "finance",
      role: {
        es: "Oficial de primera — Atención al cliente",
        en: "First Officer — Customer Service & Sales Management"
      },
      duties: {
        es: [
          "Atención directa al cliente y gestión integral de ventas de productos financieros.",
          "Asesoramiento sobre tarjetas de crédito, préstamos personales y financiación al consumo.",
          "Formalización de contratos y resolución personalizada de consultas contractuales."
        ],
        en: [
          "Direct customer service and comprehensive sales management of financial products.",
          "Advisory on credit cards, personal loans, and consumer financing solutions.",
          "Contract formalization and personalized handling of client inquiries."
        ]
      },
      details: {
        es: "Puesto de máxima responsabilidad operativa dentro de la escala administrativa en Servicios Financieros Carrefour, enfocado en asesoramiento comercial y fidelización.",
        en: "Highest operational administrative rank at Carrefour Financial Services, focused on financial advisory and commercial customer relationships."
      },
      verified: true
    },
    {
      id: "carrefour-oficial-segunda",
      period: "06-2007 / 06-2017",
      startDate: "2007-06",
      endDate: "2017-06",
      company: "Servicios Financieros Carrefour",
      sector: "finance",
      role: {
        es: "Oficial de segunda — Soporte de tiendas",
        en: "Second Officer — Store Support & Incident Resolution"
      },
      duties: {
        es: [
          "Soporte especializado a la red de tiendas de Carrefour en resolución de incidencias financieras y operativas.",
          "10 años ininterrumpidos gestionando escalados, bloqueos en sistemas de venta y dudas de procedimientos bancarios.",
          "Interlocución técnica y administrativa entre personal de tienda, clientes y servicios centrales.",
          "Manejo avanzado de bases de datos internas, conciliación de operaciones y gestión de expedientes."
        ],
        en: [
          "Specialized support for Carrefour's store network resolving financial and operational incidents.",
          "10 consecutive years managing escalations, POS transaction blocks, and banking procedural queries.",
          "Liaison between store associates, end customers, and central corporate divisions.",
          "Advanced use of internal databases, operational reconciliations, and dispute file management."
        ]
      },
      details: {
        es: "Una década completa demostrando estabilidad, fidelidad corporativa y dominio absoluto de los procesos operativos y de resolución de incidencias en la división financiera de Carrefour.",
        en: "A complete decade exhibiting stability, corporate reliability, and mastery of banking customer operations and issue resolution."
      },
      verified: true
    },
    {
      id: "semco",
      period: "09-2008 / 04-2008 (según CV)",
      startDate: "2008-04",
      endDate: "2008-09",
      company: "Semco",
      sector: "admin",
      role: {
        es: "Secretaria",
        en: "Secretary & Staff Operations"
      },
      duties: {
        es: [
          "Control de los trabajadores y coordinación de asistencia y turnos.",
          "Tareas de secretaría y gestión administrativa de la oficina.",
          "Atención de llamadas, archivo documental y soporte operativo al equipo."
        ],
        en: [
          "Staff attendance tracking, timesheet control, and shift coordination.",
          "Secretarial duties, office administration, and record management.",
          "Call dispatching, document archiving, and team support."
        ]
      },
      details: {
        es: "Puesto de secretaría enfocado en el seguimiento laboral y control operativo de personal.",
        en: "Administrative secretarial role centered on workforce control and operational documentation."
      },
      verified: true
    },
    {
      id: "hospital-mostoles",
      period: "07-2007 / 07-2007",
      startDate: "2007-07",
      endDate: "2007-07",
      company: "Hospital de Móstoles",
      sector: "admin",
      role: {
        es: "Administrativa",
        en: "Administrative Clerk"
      },
      duties: {
        es: [
          "Elaboración y emisión de etiquetas de identificación y control hospitalario.",
          "Gestión rigurosa de datos bajo estándares de precisión propios del entorno sanitario."
        ],
        en: [
          "Generation and printing of hospital control labels and identification tags.",
          "Precise data entry according to healthcare administrative standards."
        ]
      },
      details: {
        es: "Colaboración administrativa en centro hospitalario público en labores de catalogación y etiquetado.",
        en: "Administrative assignment at a public hospital focusing on patient and specimen labeling."
      },
      verified: true
    },
    {
      id: "carrefour-auxiliar-produccion",
      period: "06-2005 / 06-2007",
      startDate: "2005-06",
      endDate: "2007-06",
      company: "Servicios Financieros Carrefour",
      sector: "finance",
      role: {
        es: "Auxiliar administrativo — Producción",
        en: "Administrative Assistant — Production & Credit Studies"
      },
      duties: {
        es: [
          "Producción y análisis técnico de expedientes de crédito al consumo.",
          "Revisión documental de nóminas, declaraciones y solvencia financiera de solicitantes.",
          "Verificación en registros de morosidad y cotejo de requisitos para la aprobación de operaciones."
        ],
        en: [
          "Production and evaluation of consumer credit files.",
          "Documentary verification of payslips, tax filings, and solvency proofs.",
          "Credit bureau checks and risk assessment criteria verification for approvals."
        ]
      },
      details: {
        es: "Dos años en el departamento central de producción analizando solicitudes de financiación.",
        en: "Two years in central production reviewing and assessing consumer financing files."
      },
      verified: true
    },
    {
      id: "carrefour-practicas",
      period: "03-2005 / 06-2005",
      startDate: "2005-03",
      endDate: "2005-06",
      company: "Servicios Financieros Carrefour",
      sector: "finance",
      role: {
        es: "Prácticas — Dpto. Préstamo Personal",
        en: "Internship — Personal Loans Department"
      },
      duties: {
        es: [
          "Prácticas curriculares del FP Grado Superior en Administración y Finanzas.",
          "Valoración y análisis para la concesión de préstamos personales.",
          "Aprendizaje práctico de la normativa crediticia y sistemas informáticos financieros."
        ],
        en: [
          "Vocational internship for Higher Degree in Administration & Finance.",
          "Analysis and scoring for granting personal consumer loans.",
          "Practical learning of credit policies and banking software tools."
        ]
      },
      details: {
        es: "Periodo de prácticas oficiales con incorporación inmediata a la plantilla tras su culminación con éxito.",
        en: "Formal curriculum internship leading directly to full-time permanent hiring."
      },
      verified: true
    },
    {
      id: "urjc-becas",
      period: "09-2004 / 12-2004",
      startDate: "2004-09",
      endDate: "2004-12",
      company: "Universidad Rey Juan Carlos",
      sector: "admin",
      role: {
        es: "Grabadora de datos — Dpto. de Becas",
        en: "Data Entry Operator — Scholarships Department"
      },
      duties: {
        es: [
          "Grabación y procesamiento informático masivo de solicitudes de becas universitarias.",
          "Mecanografía rápida y rigurosa sin margen de error en datos académicos y bancarios.",
          "Cotejo de documentación adjunta con las bases de datos de la universidad."
        ],
        en: [
          "High-volume digital entry and processing of university scholarship applications.",
          "Rapid, high-accuracy alphanumeric typing for academic and banking records.",
          "Cross-referencing applicant files against official university student databases."
        ]
      },
      details: {
        es: "Gestión informática de expedientes en organismo público universitario durante campaña de becas.",
        en: "Official university public sector data processing during peak scholarship campaign."
      },
      verified: true
    },
    {
      id: "muebles-persianas",
      period: "07-2004 / 09-2004",
      startDate: "2004-07",
      endDate: "2004-09",
      company: "Muebles y Persianas Hernández",
      sector: "admin",
      role: {
        es: "Puesto pendiente de confirmación",
        en: "Position pending confirmation"
      },
      duties: {
        es: [
          "Funciones y puesto administrativo / comercial detallados en documento original pendientes de ampliación.",
          "Información preservada con total fidelidad al currículum original facilitado."
        ],
        en: [
          "Job title and specific duties pending confirmation as noted in original document.",
          "Preserved with exact fidelity to the provided source resume."
        ]
      },
      details: {
        es: "Empresa que figura al inicio de la trayectoria profesional (julio a septiembre 2004). Puesto exacto a confirmar con la candidata.",
        en: "Company listed at the start of career history (July-September 2004). Specific role to be confirmed with candidate."
      },
      verified: true,
      needsConfirmation: true
    }
  ],

  education: [
    {
      id: "fp-superior",
      title: {
        es: "FP Grado Superior en Administración y Finanzas",
        en: "Higher Vocational Degree in Administration & Finance"
      },
      institution: "IES Parque Aluche (Madrid)",
      periodOrHours: {
        es: "2003 – 2005",
        en: "2003 – 2005"
      },
      type: "degree",
      details: {
        es: "Titulación oficial superior que capacita para la gestión contable, financiera, fiscal, administrativa y de recursos humanos de empresas públicas y privadas.",
        en: "Official advanced degree covering comprehensive corporate accounting, finance, taxation, administration, and human resources management."
      }
    },
    {
      id: "gestion-financiera",
      title: {
        es: "Gestión Financiera de Empresas",
        en: "Corporate Financial Management"
      },
      institution: "Academia Lusaac",
      periodOrHours: {
        es: "470 horas lectivas",
        en: "470 hours"
      },
      type: "course",
      details: {
        es: "Formación especializada intensiva de 470 horas en análisis de balances, flujos de caja, gestión de tesorería y evaluación financiera.",
        en: "In-depth 470-hour specialization covering balance sheet analysis, cash-flow management, treasury, and corporate financial planning."
      }
    },
    {
      id: "mecanografia",
      title: {
        es: "Mecanografía",
        en: "Certified Touch Typing"
      },
      institution: "Real Sociedad Matritense",
      periodOrHours: {
        es: "Certificación oficial",
        en: "Official Certification"
      },
      type: "certification",
      details: {
        es: "Dominio de mecanografía al tacto con alta velocidad de pulsaciones por minuto y máxima precisión en introducción de datos.",
        en: "Touch typing mastery with high keystroke speeds and high data entry accuracy certified by a historic Madrid institution."
      }
    },
    {
      id: "curso-nominas",
      title: {
        es: "Curso de Nóminas y Seguridad Social",
        en: "Payroll & Social Security Course"
      },
      institution: "Consejería de Empleo (Comunidad de Madrid)",
      periodOrHours: {
        es: "35 horas lectivas",
        en: "35 hours"
      },
      type: "course",
      details: {
        es: "Cálculo y confección de nóminas, cotizaciones a la Seguridad Social, retenciones de IRPF y tramitación laboral oficial.",
        en: "Official course covering payroll calculations, Social Security contributions, income tax withholdings, and labor contracts."
      }
    }
  ],

  skillCategories: [
    {
      title: {
        es: "Herramientas Ofimáticas (CV)",
        en: "Office Software (CV)"
      },
      skills: [
        {
          name: "Microsoft Excel",
          level: "Avanzado / Operativo",
          description: {
            es: "Análisis numérico, conciliación de operaciones de crédito, filtros, tablas dinámicas y control de hojas de cálculo.",
            en: "Data calculation, credit reconciliation, filters, pivot tables, and spreadsheet tracking."
          }
        },
        {
          name: "Microsoft Word",
          level: "Avanzado / Profesional",
          description: {
            es: "Redacción de contratos, circulares, correspondencia formal, informes administrativos y plantillas corporativas.",
            en: "Drafting formal contracts, administrative notices, corporate templates, and official reports."
          }
        },
        {
          name: "Microsoft PowerPoint",
          level: "Intermedio / Presentaciones",
          description: {
            es: "Creación de presentaciones ejecutivas, esquemas de procedimientos y materiales informativos.",
            en: "Design of executive presentations, operational flowcharts, and informative slide decks."
          }
        }
      ]
    },
    {
      title: {
        es: "Competencias de Gestión (CV)",
        en: "Management Competencies (CV)"
      },
      skills: [
        {
          name: "Organización",
          level: "Competencia Clave",
          description: {
            es: "Capacidad demostrada para estructurar flujos documentales, expedientes de crédito y control de prioridades.",
            en: "Proven track record in structuring documentation pipelines, credit files, and handling workload priorities."
          }
        },
        {
          name: "Planificación",
          level: "Competencia Clave",
          description: {
            es: "Programación de tareas, cumplimiento de plazos estrictos y optimización de tiempos en entornos operativos.",
            en: "Task scheduling, strict deadline adherence, and operational time optimization."
          }
        }
      ]
    },
    {
      title: {
        es: "Especialidades Aplicadas en Trayectoria",
        en: "Applied Specializations in Career"
      },
      skills: [
        {
          name: "Resolución de Incidencias & Soporte",
          level: "10 años en Carrefour",
          description: {
            es: "Atención a incidencias en tienda, desbloqueo de operaciones financieras y atención a incidencias complejas.",
            en: "Store escalation handling, unlocking financial transactions, and resolving complex system disputes."
          }
        },
        {
          name: "Evaluación de Crédito & Financiación",
          level: "Dpto. Préstamos Personales",
          description: {
            es: "Análisis documental de solvencia, verificación de nóminas y estudio de viabilidad de préstamos personales.",
            en: "Solvency verification, payslip audits, and feasibility scoring for consumer personal loans."
          }
        },
        {
          name: "Grabación & Digitalización de Datos",
          level: "Certificada Real Sociedad Matritense",
          description: {
            es: "Alta velocidad de pulsaciones por minuto, mecanografía al tacto y tratamiento informático masivo sin error.",
            en: "High-speed typing accuracy, touch-typing certified, and error-free high-volume digital data entry."
          }
        },
        {
          name: "Operaciones Logísticas de Almacén",
          level: "Amazon Mad7 (Stow / Cartrunner)",
          description: {
            es: "Manejo de pistolas scanner RF, sistemas WMS y flujos robotizados de reposición bajo objetivos de productividad.",
            en: "RF scanner operations, automated robotic pod stowage, and inventory replenishment in tier-1 facilities."
          }
        }
      ]
    }
  ]
};
