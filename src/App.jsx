
import { useState, useEffect } from "react";
import "./App.css";
import DiscoBall from "./components/DiscoBall.jsx";

const FECHA_FIESTA = new Date("2026-11-21T20:30:00-03:00");

const ALIAS = "nicck.nnn";

const MAPS_LINK = "https://maps.app.goo.gl/DdS9htwVkJgXot7j7";

const WHATSAPP = "5491122863854";

const RSVP_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hola Nicole, confirmo mi asistencia a tus XV."
)}`;

const CANCIONES_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "¡Hola Nicole! Te sugiero estas 3 canciones para tus XV:\n1. \n2. \n3. "
)}`;

function Countdown() {
  const [tiempo, setTiempo] = useState(calcularTiempo());

  function calcularTiempo() {
    const diferencia = Math.max(
      0,
      FECHA_FIESTA.getTime() - Date.now()
    );

    return {
      dias: Math.floor(diferencia / 86400000),
      horas: Math.floor((diferencia / 3600000) % 24),
      minutos: Math.floor((diferencia / 60000) % 60),
      segundos: Math.floor((diferencia / 1000) % 60),
    };
  }

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(temporizador);
  }, []);

  const unidades = [
    ["Días", tiempo.dias],
    ["Horas", tiempo.horas],
    ["Minutos", tiempo.minutos],
    ["Segundos", tiempo.segundos],
  ];

  return (
    <div className="cuenta-regresiva">
      {unidades.map(([nombre, valor]) => (
        <div className="contador" key={nombre}>
          <span className="contador-numero">
            {String(valor).padStart(2, "0")}
          </span>
          <span className="contador-label">{nombre}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [etapa, setEtapa] = useState("portada");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (etapa === "animacion") {
      const temporizador = setTimeout(() => {
        setEtapa("titulo");
      }, 4200);

      return () => clearTimeout(temporizador);
    }

    if (etapa === "titulo") {
      const temporizador = setTimeout(() => {
        setEtapa("invitacion");
      }, 6000);

      return () => clearTimeout(temporizador);
    }
  }, [etapa]);

  async function copiarAlias() {
    try {
      await navigator.clipboard.writeText(ALIAS);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.prompt("Copiá el alias:", ALIAS);
    }
  }

  function comenzarIntro() {
    if (etapa !== "portada") return;
    setEtapa("animacion");
  }

  return (
    <main className={`etapa-${etapa}`}>
      {(etapa === "portada" || etapa === "animacion") && (
        <section className={`pantalla pantalla-${etapa}`}>
          <button
            className="disco-button"
            onClick={comenzarIntro}
            disabled={etapa !== "portada"}
            aria-label="Tocar la bola disco para comenzar"
          >
            <DiscoBall active={etapa === "animacion"} />
          </button>

          {etapa === "portada" && (
            <p className="texto-inicio">
              ¡Tocá la bola para comenzar!
            </p>
          )}

          {etapa === "animacion" && (
            <div className="destello" aria-hidden="true" />
          )}
        </section>
      )}

      {etapa === "titulo" && (
        <section key="intro-nicole" className="pantalla-titulo">
          <div className="estrellas" aria-hidden="true">
            <span className="estrella estrella-1">✦</span>
            <span className="estrella estrella-2">✧</span>
            <span className="estrella estrella-3">✦</span>
            <span className="estrella estrella-4">✧</span>
            <span className="estrella estrella-5">✦</span>
            <span className="estrella estrella-6">✧</span>
            <span className="estrella estrella-7">✦</span>
          </div>

          <p className="subtitulo-intro">MIS XV AÑOS</p>
          <p className="nicole-name">Nicole</p>
          <p className="frase-intro">Una noche para disfrutar</p>
          <p className="fecha-intro">21 · 11 · 2026</p>
        </section>
      )}

      {etapa === "invitacion" && (
        <div className="invitacion">
          <header className="nav-fiesta">
            <a className="monograma" href="#inicio">
              N<span>✦</span>
            </a>

            <nav>
              <a href="#fiesta">La fiesta</a>
              <a href="#detalles">Detalles</a>
              <a href="#regalo">Regalo</a>
            </nav>
          </header>

          <section className="hero-fiesta" id="inicio">
            <div className="hero-imagen" />

            <div className="hero-contenido">
              <p className="etiqueta-seccion">UNA NOCHE MÁGICA</p>
              <h1>Nicole</h1>
              <p className="hero-subtitulo">MIS XV AÑOS</p>

              <div className="separador-decorativo">✦</div>

              <p className="hero-frase">
                Una noche para disfrutar
                <br />
                y recuerdos para toda la vida.
              </p>

              <p className="hero-fecha">21 · NOVIEMBRE · 2026</p>

              <a className="boton-fiesta" href="#fiesta">
                DESCUBRÍ LA INVITACIÓN <span>↓</span>
              </a>
            </div>
          </section>

          <div className="franja-fiesta" aria-hidden="true">
            ✦ UNA NOCHE PARA BRILLAR ✦ UNA NOCHE PARA BRILLAR ✦
          </div>

          <section className="seccion-fiesta countdown-section">
            <p className="etiqueta-seccion">CADA VEZ FALTA MENOS</p>
            <h2>La cuenta regresiva</h2>
            <p className="texto-suave">
              Se acerca una noche muy especial.
            </p>
            <Countdown />
          </section>

          <section className="seccion-fiesta evento-section" id="fiesta">
            <p className="etiqueta-seccion">GUARDÁ LA FECHA</p>
            <h2>Nos encontramos en la pista</h2>
            <p className="texto-suave">
              Quiero compartir esta noche con vos.
            </p>

            <div className="tarjetas-detalle">
              <article className="detalle-fiesta">
                <span className="detalle-icono">✧</span>
                <p className="detalle-titulo">CUÁNDO</p>
                <h3>Sábado 21 de noviembre</h3>
                <p>Horario: 20:30 a 05:00 hs</p>
              </article>

              <article className="detalle-fiesta">
                <span className="detalle-icono">⌖</span>
                <p className="detalle-titulo">DÓNDE</p>
                <h3>La celebración</h3>
                <p>Prepará todo para disfrutar de una gran noche.</p>
                <a
                  className="enlace-fiesta"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver ubicación ↗
                </a>
              </article>
            </div>
          </section>

          <section className="banda-detalles" id="detalles">
            <article>
              <span className="detalle-icono">✧</span>
              <p className="detalle-titulo">DRESS CODE</p>
              <h3>Elegante</h3>
              <p>
                ¡Rosa y plateado quedan reservados!
              </p>
            </article>

            <article id="regalo">
              <span className="detalle-icono">♡</span>
              <p className="detalle-titulo">UN REGALITO</p>
              <h3>Tu presencia es lo más importante</h3>
              <p>Si deseás hacerme un regalo, te dejo mi alias:</p>
              <div className="alias-caja">
                <span>{ALIAS}</span>
                <button onClick={copiarAlias}>
                  {copiado ? "¡Copiado!" : "Copiar alias"}
                </button>
              </div>
            </article>
          </section>

          <section className="seccion-fiesta canciones-section">
            <p className="etiqueta-seccion">VOS TAMBIÉN SOS PARTE</p>
            <h2>¿Qué escuchamos en la pista?</h2>
            <p className="texto-suave">
              Ayudame a armar la playlist de la noche.
              Elegí tres canciones que no pueden faltar.
            </p>

            <a
              className="boton-fiesta"
              href={CANCIONES_LINK}
              target="_blank"
              rel="noreferrer"
            >
              SUGERIR MIS CANCIONES ♫
            </a>
          </section>

          <section className="regla-fiesta">
            <span className="destello-regla">✦ ✧ ✦</span>
            <p className="etiqueta-seccion">UNA NOCHE, MIL RECUERDOS</p>
            <h2>¡A bailar hasta el final!</h2>
            <p>
              Preparé todo para que disfrutes conmigo.
              No te retires de la fiesta antes de que termine.
            </p>
            <span className="destello-regla">✦ ✧ ✦</span>
          </section>

          <section className="seccion-fiesta confirmar-section">
            <p className="etiqueta-seccion">QUIERO CONTAR CON VOS</p>
            <h2>¿Me acompañás?</h2>
            <p className="texto-suave">
              Confirmá tu asistencia y preparate para una noche inolvidable.
            </p>

            <a
              className="boton-fiesta"
              href={RSVP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              CONFIRMAR ASISTENCIA ♡
            </a>
          </section>

          <footer className="footer-fiesta">
            <p className="footer-nombre">Nicole</p>
            <p>MIS XV AÑOS · 21 · 11 · 2026</p>
            <span>Hecho con amor para una noche especial ✦</span>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;
