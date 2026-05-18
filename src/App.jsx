import { useState, useRef } from "react";
import { useProductos } from "./hooks/useProductos";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { Footer } from "./components/Footer";
import "./App.css";

export default function App() {
  const { productos, loading, error } = useProductos();
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const catalogoRef = useRef(null);

  const productosFiltrados = productos.filter((p) => {
    const matchCat = categoriaActiva === "Todas" || p.categoria === categoriaActiva;
    const q = busqueda.toLowerCase();
    const matchBusq =
      !q ||
      p.nombre?.toLowerCase().includes(q) ||
      p.descripcion?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q);
    return matchCat && matchBusq;
  });

  const handleVerCatalogo = () => {
    catalogoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <Header
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />

      <main>
        <Hero onVerCatalogo={handleVerCatalogo} />

        <section className="catalogo" ref={catalogoRef}>
          <div className="catalogo-inner">
            <div className="catalogo-header">
              <div>
                <h2 className="catalogo-title">
                  {categoriaActiva === "Todas" ? "Productos Destacados" : categoriaActiva}
                </h2>
                {!loading && (
                  <p className="catalogo-count">
                    {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""}
                    {busqueda ? ` para "${busqueda}"` : ""}
                  </p>
                )}
              </div>
            </div>

            {loading && (
              <div className="estado-wrap">
                <div className="spinner"></div>
                <p>Cargando catálogo...</p>
              </div>
            )}

            {error && (
              <div className="estado-wrap estado-error">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p>No se pudo cargar el catálogo. Intenta más tarde.</p>
              </div>
            )}

            {!loading && !error && productosFiltrados.length === 0 && (
              <div className="estado-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <p>No se encontraron productos{busqueda ? ` para "${busqueda}"` : ""}.</p>
              </div>
            )}

            {!loading && !error && productosFiltrados.length > 0 && (
              <div className="productos-grid">
                {productosFiltrados.map((p, i) => (
                  <ProductCard key={p.id || i} producto={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="beneficios">
          <div className="beneficios-inner">
            {[
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                titulo: "Crédito fácil",
                desc: "Sin tantos requisitos y aprobación rápida.",
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                titulo: "Pagos semanales",
                desc: "Pagos cómodos que se ajustan a tu presupuesto.",
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="20 6 9 17 4 12"/></svg>,
                titulo: "Garantía",
                desc: "Todos nuestros productos cuentan con garantía.",
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
                titulo: "Envíos",
                desc: "Envíos seguros a todo el país.",
              },
            ].map((b) => (
              <div className="beneficio" key={b.titulo}>
                <div className="beneficio-icon">{b.icon}</div>
                <div>
                  <h3>{b.titulo}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-wa-section">
          <div className="cta-wa-inner">
            <div>
              <h2>¿Necesitas ayuda?</h2>
              <p>Chatea con nosotros por WhatsApp y recibe atención personalizada.</p>
            </div>
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noreferrer"
              className="cta-wa-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chatear por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}