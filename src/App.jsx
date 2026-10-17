import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiscoBall from "./components/DiscoBall.jsx";

const FECHA_FIESTA = new Date("2026-11-21T20:30:00-03:00");
const ALIAS = "nicck.nnn";
const MAPS_LINK = "https://maps.app.goo.gl/DdS9htwVkJgXot7j7";
const WHATSAPP = "5491122863854";

const RSVP_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hola Nicole, confirmo mi asistencia a tus XV.",
)}`;

const CANCIONES_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "¡Hola Nicole! Te sugiero estas 3 canciones para tus XV:\n1. \n2. \n3. ",
)}`;

function Countdown() {
  const [tiempo, setTiempo] = useState(calcularTiempo());

  function calcularTiempo() {
    const diferencia = Math.max(0, FECHA_FIESTA.getTime() - Date.now());

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

function FotoEditorial({ numero, alt, lado = "derecha", children }) {
  return (
    <section className={`foto-editorial foto-editorial-${lado}`}>
      <div className="foto-editorial-contenido">{children}</div>

      <figure className={`foto-editorial-marco foto-editorial-foto-${numero}`}>
        <img
          src={`/fotos/fotoNicole${numero}.jpg`}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}

function App() {
  const [etapa, setEtapa] = useState("portada");
  const [copiado, setCopiado] = useState(false);
  const audioRef = useRef(null);

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

    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play().catch((error) => {
        console.error("No se pudo reproducir la música:", error);
      });
    }

    setEtapa("animacion");
  }

  return (
    <main className={`etapa-${etapa}`}>
      <audio ref={audioRef} src="/musica.mp3" loop preload="auto" />

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
            <p className="texto-inicio">¡Tocá la bola para comenzar!</p>
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
            <a className="monograma" href="#inicio" aria-label="Inicio">
              <span>✦</span>
            </a>

            <nav aria-label="Navegación principal">
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
                <br />y recuerdos para toda la vida.
              </p>

              <p className="hero-fecha">21 · NOVIEMBRE · 2026</p>

              <a className="boton-fiesta" href="#bienvenida">
                DESCUBRÍ LA INVITACIÓN <span>↓</span>
              </a>
            </div>
          </section>

          <FotoEditorial
            numero={1}
            alt="Nicole en una noche de paseo, con campera negra y falda animal print"
            lado="derecha"
          >
            <p className="etiqueta-seccion">UN MOMENTO ESPECIAL</p>
            <h2>Una noche mágica para celebrar</h2>
            <p>
              Hay momentos que se vuelven inolvidables por las personas que los
              comparten.
            </p>
            <p>
              Llegó el momento de celebrar una etapa muy especial de mi vida, y
              quiero vivirla rodeada de las personas que forman parte de mi
              historia.
            </p>
            <p>
              Tu presencia es muy importante para mí. ¡Me encantaría que seas
              parte de este recuerdo único!
            </p>
          </FotoEditorial>

          <div className="franja-fiesta" aria-hidden="true">
            <div className="franja-fiesta-pista">
              <span>✦ UNA NOCHE MÁGICA ✦</span>
              <span>💿 MIS XV AÑOS 💿</span>
              <span>✦ VENÍ A DISFRUTAR ✦</span>
              <span>♡ UNA FIESTA INOLVIDABLE ♡</span>
              <span>✦ PREPARATE PARA BRILLAR ✦</span>
              <span>🪩 ¡TE ESPERO EN LA PISTA! 🪩</span>

              <span>✦ UNA NOCHE MÁGICA ✦</span>
              <span>💿 MIS XV AÑOS 💿</span>
              <span>✦ VENÍ A DISFRUTAR ✦</span>
              <span>♡ UNA FIESTA INOLVIDABLE ♡</span>
              <span>✦ PREPARATE PARA BRILLAR ✦</span>
              <span>🪩 ¡TE ESPERO EN LA PISTA! 🪩</span>
            </div>
          </div>

          <section className="seccion-fiesta countdown-section">
            <p className="etiqueta-seccion">CADA VEZ FALTA MENOS</p>
            <h2>La cuenta regresiva</h2>
            <p className="texto-suave">Se acerca una noche muy especial.</p>
            <Countdown />
          </section>

          <section className="seccion-fiesta evento-section" id="fiesta">
            <p className="etiqueta-seccion">GUARDÁ LA FECHA</p>
            <h2>La noche que tanto esperé</h2>
            <p className="texto-suave">Quiero compartir esta noche con vos.</p>

            <div className="tarjetas-detalle">
              <article className="detalle-fiesta">
                <span className="detalle-icono">✧</span>
                <p className="detalle-titulo">CUÁNDO</p>
                <h3>Sábado 21 de noviembre de 2026</h3>
                <p>De 20:30 a 05:00 hs.</p>
                <div className="aviso-entrada">
                  <span>✦</span>
                  <p>
                    ¡No llegues tarde! Mi entrada será a las 21:15 hs. Quiero
                    compartir ese momento con todos ustedes, así que te espero
                    con tiempo para que no te lo pierdas.
                  </p>
                </div>
              </article>

              <article className="detalle-fiesta">
                <span className="detalle-icono">⌖</span>
                <p className="detalle-titulo">DÓNDE</p>
                <h3>La Quinta de los Tres Hermanos</h3>
                <p>Balbastro 1448, Parque San Martín, Merlo.</p>
                <a
                  className="enlace-fiesta"
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver ubicación en el mapa 
                </a>
              </article>
            </div>
          </section>

          <FotoEditorial
            numero={2}
            alt="Nicole junto a una baranda frente al agua, iluminada por luces rosas y violetas"
            lado="izquierda"
          >
            <p className="etiqueta-seccion">UNA NOCHE PARA BRILLAR</p>
            <h2>Nos encontramos en la pista</h2>
            <p>
              Una noche llena de música, luces y momentos para compartir.
              ¡Quiero que seas parte!
            </p>
          </FotoEditorial>

          <FotoEditorial
            numero={3}
            alt="Nicole de cuerpo entero junto a un vidrio oscuro con su reflejo"
            lado="derecha"
          >
            <p className="etiqueta-seccion">RECUERDOS QUE QUEDAN</p>
            <h2>Una noche para disfrutar</h2>
            <p>
              Quiero guardar en mi corazón cada abrazo, cada sonrisa y cada
              instante compartido con ustedes.
            </p>
          </FotoEditorial>

          <section className="banda-detalles" id="detalles">
            <article className="dress-code-card">
              <span className="detalle-icono">✧</span>
              <p className="detalle-titulo">DRESS CODE</p>
              <h3>Elegante</h3>
              <p>¡Rosa y plateado quedan reservados!</p>
            </article>

            <article id="regalo" className="regalo-card">
              <span className="detalle-icono">♡</span>
              <p className="detalle-titulo">UN REGALITO</p>
              <h3>Tu presencia es lo más importante.</h3>
              <p>Si deseás hacerme un regalo, te dejo mi alias:</p>

              <div className="alias-caja">
                <span>{ALIAS}</span>
                <button onClick={copiarAlias}>
                  {copiado ? "¡Copiado!" : "Copiar alias"}
                </button>
              </div>

              <p className="regalo-sobre">🎁 Regalo en sobre</p>
              <p>También habrá sobres disponibles en el salón.</p>
            </article>
          </section>

          <FotoEditorial
            numero={4}
            alt="Nicole con vestido blanco, campera negra y botas plateadas frente al agua y un puente iluminado"
            lado="derecha"
          >
            <p className="etiqueta-seccion">MI NOCHE ESPECIAL</p>
            <h2>Brillar a mi manera</h2>
            <p>
              Cada detalle forma parte de una noche que espero compartir con las
              personas que más quiero.
            </p>
          </FotoEditorial>

          <section className="seccion-fiesta canciones-section">
            <p className="etiqueta-seccion">VOS TAMBIÉN SOS PARTE</p>
            <h2>¿Qué escuchamos en la pista?</h2>
            <p className="texto-suave">
              Ayudame a armar la playlist de la noche. Elegí tres canciones que
              no pueden faltar.
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
              Preparé todo para que disfrutes conmigo. No te retires de la
              fiesta antes de que termine.
            </p>
            <span className="destello-regla">✦ ✧ ✦</span>
          </section>

          <FotoEditorial
            numero={5}
            alt="Nicole sentada de costado en un banco verde en una calle iluminada de noche"
            lado="izquierda"
          >
            <p className="etiqueta-seccion">YA QUIERO QUE LLEGUE</p>
            <h2>¿Me acompañás?</h2>
            <p>
              Confirmá tu asistencia y preparate para una noche inolvidable. ¡Me
              va a encantar compartirla con vos!
            </p>

            <a
              className="boton-fiesta"
              href={RSVP_LINK}
              target="_blank"
              rel="noreferrer"
            >
              CONFIRMAR ASISTENCIA ♡
            </a>
          </FotoEditorial>

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