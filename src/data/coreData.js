export const LESSON_STATES = ["confundido", "repasar", "entendido", "dominado"];

export const GLOSSARY = [
  { term: "CVE", def: "Identificador publico de una vulnerabilidad conocida." },
  { term: "RCE", def: "Ejecucion remota de codigo en un sistema objetivo." },
  { term: "LPE", def: "Escalada local de privilegios en un sistema ya comprometido." },
  { term: "MITM", def: "Intercepcion o manipulacion de una comunicacion entre dos extremos." },
  { term: "TTP", def: "Tactics, Techniques and Procedures de un adversario." },
  { term: "IOC", def: "Indicador observable de compromiso." },
  { term: "Kerberoasting", def: "Solicitud de tickets de servicio para crackeo offline." },
  { term: "SSRF", def: "Forzar al servidor a realizar peticiones no previstas." },
  { term: "XSS", def: "Ejecucion de JavaScript inyectado en el navegador de la victima." },
  { term: "SQLi", def: "Inyeccion SQL sobre entradas no validadas." },
  { term: "SUID", def: "Bit especial de Linux que ejecuta con permisos del propietario." },
  { term: "C2", def: "Infraestructura de mando y control de un atacante." },
  { term: "WAF", def: "Firewall de aplicacion web." },
  { term: "IDS", def: "Sistema de deteccion de intrusiones." },
  { term: "IPS", def: "Sistema de prevencion de intrusiones." },
  { term: "IAM", def: "Gestion de identidades y accesos, muy importante en nube." },
];

export const LEVELS = [
  { id: "nivel-0", title: "Nivel 0", focus: "Vocabulario, redes, sistema operativo y leer noticias sin perderte.", modules: ["m1", "m2"] },
  { id: "fundamentos", title: "Fundamentos", focus: "Protocolos, autenticacion, web, hardening, logs y metodo.", modules: ["m3", "m4", "m5"] },
  { id: "junior", title: "Junior", focus: "Labs guiados, analisis, deteccion y priorizacion aplicada.", modules: ["m6", "m7", "m8", "m9"] },
  { id: "intermedio", title: "Intermedio", focus: "Relacionar identidad, cloud, vulnerabilidades y respuesta.", modules: ["m10"] },
];

export const STUDY_GUIDE = [
  { title: "Como estudiar", points: ["Empieza por redes, sistemas, identidad y web.", "No persigas herramientas antes de entender fundamentos.", "Lee una leccion, haz un mini lab y escribe lo que entendiste."] },
  { title: "Que leer primero", points: ["Fundamentos estables: red, sistema operativo, control de acceso y logs.", "Guias oficiales, glosario, laboratorios pequenos y writeups explicados.", "Recursos que te permitan conectar teoria con comportamiento real."] },
  { title: "Que ignorar al inicio", points: ["Hype sin contexto.", "Listas infinitas de herramientas.", "Noticias sin relacion con activos o fundamentos."] },
  { title: "Como no perderte", points: ["Usa la ruta por niveles.", "Traduce noticias a fundamentos: identidad, control de acceso, secretos, segmentacion o deteccion.", "Si no puedes explicarlo sencillo, vuelve un paso atras y repasa."] },
  { title: "Como filtrar noticias", points: ["Mira fuente, fecha, producto afectado y explotacion activa.", "Cruza el aviso con tu inventario y exposicion.", "Pregunta siempre si te afecta de verdad."] },
  { title: "Como pasar de teoria a practica", points: ["Lee la leccion, haz el mini lab y responde preguntas.", "Escribe una nota corta: que entendi, que me confundio y que debo repasar.", "Luego revisa una noticia relacionada y trata de explicarla."] },
  { title: "Rutina recomendada de 20 a 30 minutos", points: ["10-12 min de lectura guiada.", "5-8 min de mini lab o reflexion aplicada.", "3-5 min de flashcards.", "3-5 min de una noticia o advisory relacionado."] },
];

export const ROLE_TRACKS = [
  { id: "blue", title: "Quiero Blue Team", focus: "Logs, deteccion, hardening, hunting e IR.", recommended: ["m1", "m2", "m8", "m9", "m10"] },
  { id: "pentest", title: "Quiero Pentesting", focus: "Redes, web, sistemas y metodologia.", recommended: ["m1", "m2", "m4", "m5", "m9"] },
  { id: "appsec", title: "Quiero AppSec", focus: "Web, autenticacion, control de acceso y SDLC.", recommended: ["m3", "m4", "m5", "m10"] },
  { id: "cloud", title: "Quiero Cloud Security", focus: "Identidad, secretos, permisos y priorizacion.", recommended: ["m3", "m8", "m9", "m10"] },
];
