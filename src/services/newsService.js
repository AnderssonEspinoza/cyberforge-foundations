export async function fetchNews() {
  try {
    const response = await fetch("/noticias.json");
    if (!response.ok) throw new Error("No se pudo cargar noticias.json");
    return await response.json();
  } catch (error) {
    return [
      {
        id: "fallback-1",
        title: "CISA mantiene KEV como referencia para vulnerabilidades con explotacion activa.",
        source: "CISA",
        date: "2026-03-22T03:26:35.000Z",
        category: "Vulnerabilidad",
        link: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      },
    ];
  }
}
