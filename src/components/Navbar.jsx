function Navbar({ onStart, onHome }) {
  return (
    <nav className="vocatia-navbar">
      <div className="vocatia-navbar-inner">
<button className="vocatia-logo" onClick={onHome}>
  Vocatia
</button>
        <div className="vocatia-nav-links">
          <div className="vocatia-dropdown">
            <button className="vocatia-nav-item">Pruebas</button>

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

          <div className="vocatia-dropdown">
            <button className="vocatia-nav-item">Servicios Laborales</button>

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

          <button className="vocatia-nav-item">Asesor IA</button>
          <button className="vocatia-nav-item">Nosotros</button>
        </div>

        <button className="vocatia-cta-btn" onClick={onStart}>
          Prueba Gratis
        </button>
      </div>
    </nav>
  );
}

export default Navbar;