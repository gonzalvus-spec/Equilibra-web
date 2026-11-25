import { useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Bluetooth,
  Check,
  ChevronRight,
  Clock3,
  Cloud,
  Download,
  ExternalLink,
  History,
  LocateFixed,
  LockKeyhole,
  MapPin,
  Menu,
  ShieldCheck,
  Users,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import { FaAndroid, FaApple } from 'react-icons/fa'
import { downloads, type DownloadLink } from './config/downloads'

const navItems = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Modos', href: '#modos' },
  { label: 'Descargar', href: '#descargar' },
  { label: 'Seguridad', href: '#seguridad' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app" data-equilibra-ui>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header equilibra-fixed" data-equilibra-ui>
        <div className="nav-shell">
          <a className="brand" href="#inicio" aria-label="Equilibra, inicio">
            <span className="brand-mark"><img src="/logo.png" alt="" /></span>
            <span>Equilibra</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="button button-small header-cta" href="#descargar">
            <Download size={17} /> Descargar App
          </a>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}<ChevronRight size={18} />
              </a>
            ))}
            <a className="button" href="#descargar" onClick={() => setMenuOpen(false)}>
              <Download size={18} /> Descargar para Android
            </a>
          </nav>
        )}
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-status-row">
                <div className="live-badge"><i className="connection-dot" /><b>Protección conectada en tiempo real</b></div>
                <span className="live-tech"><i />En vivo · RTDB / SPP</span>
              </div>
              <h1>Una caída no debería pasar <em>desapercibida.</em></h1>
              <p className="hero-lead">
                Equilibra convierte un sensor ESP32 + MPU6050 en una red de cuidado: detecta impactos, comparte la ubicación y avisa a tu familia al instante.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href={downloads.android.apk.url} download>
                  <FaAndroid size={20} aria-hidden="true" /> Descargar para Android
                </a>
                <a className="button button-ios" href={downloads.ios.ipa.url} download>
                  <FaApple size={20} aria-hidden="true" /> Descargar para iOS
                </a>
              </div>
              <div className="hero-proof" aria-label="Tecnologías integradas">
                <span><Bluetooth size={16} /> Bluetooth clásico</span>
                <span><Cloud size={16} /> Firebase</span>
                <span><LocateFixed size={16} /> GPS en vivo</span>
              </div>
            </div>
            <div className="hero-visual">
              <PhonePreview />
              <div className="signal-card signal-card-top toast" data-equilibra-ui>
                <span className="signal-icon"><BellRing size={18} /></span>
                <span><b>Alerta recibida</b><small>Ahora mismo</small></span>
              </div>
              <div className="signal-card signal-card-bottom toast" data-equilibra-ui>
                <span className="signal-icon safe"><MapPin size={18} /></span>
                <span><b>Ubicación disponible</b><small>GPS actualizado</small></span>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#como-funciona" aria-label="Ir a cómo funciona"><ArrowDown size={18} /></a>
        </section>

        <section className="trust-strip" aria-label="Resumen del sistema">
          <div className="container trust-grid">
            <div><strong>24/7</strong><span>Supervisión en segundo plano</span></div>
            <div><strong>&lt; 1 s</strong><span>Sincronización de alertas</span></div>
            <div><strong>2 modos</strong><span>Estación y monitor remoto</span></div>
            <div><strong>100</strong><span>Eventos recientes disponibles</span></div>
          </div>
        </section>

        <section className="section" id="como-funciona">
          <div className="container">
            <SectionHeading
              number="01"
              title="Del impacto a la ayuda, en tres pasos."
              text="Un ecosistema sencillo que une el sensor, el teléfono cercano y las personas que cuidan, sin perder tiempo entre cada señal."
            />
            <div className="steps-flow" aria-label="Flujo del sistema en tres pasos">
              <span className="flow-line" aria-hidden="true"><i /><i /><i /></span>
              <div className="steps-grid">
              <StepCard
                number="01"
                illustration={<SensorIllustration />}
                title="Sensor ESP32"
                subtitle="MPU6050 · Detección local"
                text="Detecta una caída o impacto al instante, activa la alerta física y envía la señal por Bluetooth clásico."
                tags={['Impacto', 'Alarma física', 'SPP / RFCOMM']}
              />
              <StepCard
                number="02"
                illustration={<BridgeIllustration />}
                title="Teléfono Estación"
                subtitle="Puente · GPS + Firebase"
                text="Recibe la señal, obtiene la ubicación GPS y publica estado, latidos e historial de forma segura."
                tags={['Ubicación', 'Segundo plano', 'Tiempo real']}
              />
              <StepCard
                number="03"
                illustration={<AlertIllustration />}
                title="Monitor Remoto"
                subtitle="Familia · Cuidadores"
                text="Notifica de inmediato, muestra la posición en el mapa y permite enviar la orden de apagado OFF."
                tags={['Notificación', 'Mapa', 'Control remoto']}
              />
              </div>
            </div>
          </div>
        </section>

        <section className="section modes-section" id="modos">
          <div className="container modes-grid">
            <div className="modes-copy">
              <SectionHeading
                number="02"
                title="Dos teléfonos. Una sola red de cuidado."
                text="Cada persona usa Equilibra del modo que necesita. Ambos dispositivos permanecen sincronizados con la misma cuenta."
              />
              <div className="mode-list">
                <div className="mode-item active"><span><Bluetooth /></span><div><b>Modo Estación Base</b><p>Cerca del sensor, mantiene el puente Bluetooth, GPS y Firebase.</p></div></div>
                <div className="mode-item"><span><Wifi /></span><div><b>Modo Monitor Remoto</b><p>Desde cualquier lugar, muestra alertas, mapa e historial en vivo.</p></div></div>
              </div>
            </div>
            <div className="monitor-demo">
              <div className="demo-topbar"><span>9:41</span><span className="demo-island" /><span><Wifi size={14} /> 88%</span></div>
              <div className="demo-header"><div><small>MONITOR REMOTO</small><h3>Hola, familia</h3></div><span className="online-dot">En línea</span></div>
              <div className="demo-alarm">
                <div className="orb"><ShieldCheck size={34} /></div>
                <h4>Monitoreando</h4><p>Estación conectada · Todo en orden</p>
              </div>
              <div className="map-card">
                <div className="map-grid" />
                <div className="map-road road-one" /><div className="map-road road-two" />
                <div className="map-pin"><MapPin size={24} fill="currentColor" /></div>
                <span className="map-label">Ubicación en tiempo real</span>
              </div>
              <div className="demo-tabs"><span className="selected"><BellRing />Alarma</span><span><MapPin />Mapa</span><span><History />Historial</span></div>
            </div>
          </div>
        </section>

        <section className="section download-section" id="descargar">
          <div className="container">
            <SectionHeading
              number="03"
              title="Lleva Equilibra contigo."
              text="Instala la aplicación según tu teléfono. Android puede funcionar como Estación Base o Monitor Remoto; iPhone funciona como Monitor Remoto."
            />
            <div className="download-grid">
              <DownloadCard
                platform="Android"
                id="android"
                icon={<FaAndroid aria-hidden="true" />}
                status="Disponible ahora"
                statusType="available"
                version={`Versión ${downloads.version} · Compilación ${downloads.build}`}
                requirement="Android 8.0 o superior"
                description="La experiencia completa: conecta el ESP32 por Bluetooth o supervisa de forma remota desde otro teléfono."
                permissions={['Bluetooth', 'Ubicación', 'Notificaciones']}
                primary={downloads.android.apk}
                secondary={downloads.android.googlePlay}
                instructions="Descarga el APK, permite la instalación desde tu navegador y abre Equilibra. Android te pedirá los permisos necesarios al iniciar."
              />
              <DownloadCard
                platform="iOS"
                id="ios"
                icon={<FaApple aria-hidden="true" />}
                status="Disponible ahora"
                statusType="available"
                version={`Versión ${downloads.version} · iOS`}
                requirement="iPhone con iOS 15 o superior"
                description="Diseñada para el modo Monitor Remoto: recibe alertas, consulta el mapa y revisa el historial en tiempo real."
                permissions={['Notificaciones', 'Datos móviles', 'Segundo plano']}
                primary={downloads.ios.ipa}
                instructions="Descarga el paquete iOS para usar Equilibra como monitor conectado a Firebase. La conexión directa SPP al sensor permanece disponible en Android."
              />
            </div>
            <div className="install-journey" aria-labelledby="install-journey-title">
              <div className="install-journey-heading">
                <span>GUÍA RÁPIDA</span>
                <h3 id="install-journey-title">Del primer toque al cuidado diario.</h3>
                <p>Cuatro pasos claros para dejar Equilibra preparado y acompañando en segundo plano.</p>
              </div>
              <div className="install-steps">
                <article className="install-step">
                  <span className="install-step-number">01</span>
                  <span className="install-step-icon"><Download /></span>
                  <h4>Descarga la app</h4>
                  <p>Elige Android o iOS desde los botones oficiales de esta página.</p>
                </article>
                <article className="install-step">
                  <span className="install-step-number">02</span>
                  <span className="install-step-icon"><LockKeyhole /></span>
                  <h4>Vincula tu cuenta</h4>
                  <p>Inicia sesión en los teléfonos que formarán tu red de cuidado.</p>
                </article>
                <article className="install-step install-step-featured permission-step">
                  <span className="install-step-number">03</span>
                  <span className="install-step-icon"><BellRing /></span>
                  <div className="step-status"><i /> Recomendado</div>
                  <h4>Activa los permisos clave</h4>
                  <p>Permite notificaciones, ubicación y segundo plano para recibir avisos sin abrir la app.</p>
                  <div className="permission-preview" aria-hidden="true">
                    <span><Check /> Notificaciones <i /></span>
                    <span><Check /> Segundo plano <i /></span>
                  </div>
                </article>
                <article className="install-step install-step-featured daily-step">
                  <span className="install-step-number">04</span>
                  <span className="install-step-icon"><ShieldCheck /></span>
                  <div className="step-status live"><i /> Protección activa</div>
                  <h4>Déjala acompañarte</h4>
                  <p>Equilibra mantiene latidos, reconexión y alertas aunque bloquees o guardes el teléfono.</p>
                  <div className="daily-pulse" aria-hidden="true"><i /><span /><b>En vivo · RTDB</b></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section security-section" id="seguridad">
          <div className="container">
            <div className="security-intro">
              <div><span className="section-number">04</span><h2>Protección que continúa cuando guardas el teléfono.</h2></div>
              <p>Equilibra está pensado para momentos reales: sigue escuchando, protege cada cuenta y mantiene a las personas correctas informadas.</p>
            </div>
            <div className="continuity-panel">
              <div className="continuity-art"><BackgroundProtectionIllustration /></div>
              <div className="continuity-copy">
                <span className="continuity-badge"><i /> Servicio activo</span>
                <h3>La protección no se pausa al apagar la pantalla.</h3>
                <p>El teléfono mantiene latidos periódicos, recupera la conexión cuando vuelve la señal y conserva las alertas listas para avisar.</p>
                <div className="continuity-states">
                  <span><i className="heartbeat-dot" /><b>Latido</b><small>Cada ciclo</small></span>
                  <span><i className="reconnect-dot" /><b>Reconexión</b><small>Automática</small></span>
                  <span><i className="alert-dot" /><b>Aviso</b><small>Siempre listo</small></span>
                </div>
              </div>
            </div>
            <div className="feature-grid">
              <Feature icon={<BellRing />} title="Alertas en segundo plano" text="Recibe avisos incluso con la app minimizada o la pantalla bloqueada." />
              <Feature icon={<Clock3 />} title="Historial en tiempo real" text="Consulta detecciones y apagados recientes con fecha y ubicación disponible." />
              <Feature icon={<Users />} title="Terminales vinculados" text="Administra los teléfonos asociados y revoca accesos desde tu cuenta." />
              <Feature icon={<LockKeyhole />} title="Datos aislados por usuario" text="Firebase Authentication separa la información bajo el identificador privado de cada cuenta." />
            </div>
            <div className="security-banner">
              <div className="security-symbol"><ShieldCheck /></div>
              <div><small>SEGURIDAD POR DISEÑO</small><h3>Tu información pertenece a tu red de cuidado.</h3><p>Acceso autenticado, presencia de terminales y sincronización cifrada a través de Firebase.</p></div>
              <div className="security-checks"><span><Check /> Cuenta autenticada</span><span><Check /> Acceso revocable</span><span><Check /> Datos privados</span></div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-grid">
            <div className="final-logo"><img src="/logo.png" alt="Logo de Equilibra" /></div>
            <div><h2>Más cerca, incluso a la distancia.</h2><p>Descarga Equilibra y convierte cada señal en una oportunidad para acompañar a tiempo.</p></div>
            <div className="final-actions"><a className="button button-light" href={downloads.android.apk.url} download><FaAndroid /> Android</a><a className="button button-light" href={downloads.ios.ipa.url} download><FaApple /> iOS <ArrowRight /></a></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><img src="/logo.png" alt="" /></span><span>Equilibra</span></a><p>Sistema de asistencia inteligente para la detección y supervisión de caídas.</p></div>
          <div><b>Producto</b><a href="#como-funciona">Cómo funciona</a><a href="#modos">Modos de uso</a><a href="#seguridad">Seguridad</a></div>
          <div><b>Descargas</b><a href={downloads.android.apk.url} download>Android APK</a><a href={downloads.ios.ipa.url} download>iOS IPA</a></div>
          <div><b>Tecnología</b><span>ESP32 + MPU6050</span><span>Flutter + Firebase</span><span>OpenStreetMap</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Equilibra. Tecnología que acompaña.</span><span>Versión del sistema {downloads.version}</span></div>
      </footer>
    </div>
  )
}

function PhonePreview() {
  const [active, setActive] = useState(false)
  return (
    <div className={`phone ${active ? 'alarm-active' : ''}`}>
      <div className="phone-frame">
        <div className="phone-status"><span>9:41</span><span className="phone-notch" /><span><Wifi size={12} /> 92%</span></div>
        <div className="phone-title"><span>Alarma</span><span className="avatar">EQ</span></div>
        <div className="alarm-card" aria-live="polite">
          <button
            className="phone-radar-trigger"
            type="button"
            onClick={() => setActive((value) => !value)}
            aria-label={active ? 'Volver a vigilancia activa' : 'Simular señal de caída'}
          >
            <PhoneRadar />
          </button>
          <span className="phone-live-badge"><i />{active ? 'ALERTA EN VIVO' : 'PROTECCIÓN EN TIEMPO REAL'}</span>
          {active && <span className="phone-impact-toast"><BellRing /> Impacto detectado · ahora</span>}
          <strong className="alarm-title">{active ? '¡Alarma activada!' : 'Monitoreando'}</strong>
          <p>{active ? 'Revisa a la persona.' : 'Estación conectada · Monitoreo activo'}</p>
        </div>
        <button className="alarm-toggle" type="button" onClick={() => setActive((value) => !value)}>
          {active ? <><ShieldCheck /> Desactivar alarma</> : <><Zap /> Simular una alerta</>}
        </button>
        <div className="bridge-card"><span><Wifi /></span><div><b>Teléfono puente</b><small>En línea · ahora</small></div><Check /></div>
        <div className="phone-tabs"><span className="selected"><BellRing />Alarma</span><span><MapPin />Mapa</span><span><History />Historial</span></div>
      </div>
    </div>
  )
}

function PhoneRadar() {
  return (
      <svg className="phone-radar-svg" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <radialGradient id="phoneRadarCore" cx="38%" cy="32%" r="72%">
            <stop offset="0" stopColor="#E9F8FC" />
            <stop offset="0.5" stopColor="#8CE4FE" />
            <stop offset="1" stopColor="#49BCE4" />
          </radialGradient>
          <linearGradient id="phoneRadarSweep" x1="60" y1="60" x2="112" y2="25">
            <stop stopColor="#8CE4FE" stopOpacity=".55" />
            <stop offset="1" stopColor="#8CE4FE" stopOpacity="0" />
          </linearGradient>
          <filter id="phoneRadarGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g className="phone-radar-rings" fill="none" stroke="#49BCE4">
          <circle cx="60" cy="60" r="24" />
          <circle cx="60" cy="60" r="39" />
          <circle cx="60" cy="60" r="53" />
        </g>
        <path className="phone-radar-sweep" d="M60 60L104 24A53 53 0 0 1 113 60Z" fill="url(#phoneRadarSweep)" />
        <g className="phone-telemetry-track" fill="none" stroke="#134075" strokeWidth="1.5" strokeDasharray="3 5">
          <path d="M16 79C36 105 87 110 108 78" />
          <circle className="phone-particle particle-one" cx="22" cy="86" r="3" fill="#8CE4FE" stroke="none" />
          <circle className="phone-particle particle-two" cx="101" cy="87" r="3" fill="#134075" stroke="none" />
        </g>
        <g className="phone-radar-core" filter="url(#phoneRadarGlow)">
          <circle cx="60" cy="60" r="20" fill="url(#phoneRadarCore)" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M60 47l10 4v8c0 8-4 13-10 16-6-3-10-8-10-16v-8l10-4z" fill="#134075" />
          <path d="M55 59l3 3 7-8" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="phone-motion-signal" transform="translate(94 31)">
          <circle r="9" fill="#FFFFFF" stroke="#8CE4FE" strokeWidth="2" />
          <path d="M-5 1h3l2-5 3 9 2-4h4" fill="none" stroke="#134075" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
  )
}

function SectionHeading({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="section-heading"><span className="section-number">{number}</span><div><h2>{title}</h2><p>{text}</p></div></div>
}

function StepCard({ number, illustration, title, subtitle, text, tags }: { number: string; illustration: ReactNode; title: string; subtitle: string; text: string; tags: string[] }) {
  return <article className="step-card"><div className="step-visual">{illustration}<span className="step-number">{number}</span></div><small>{subtitle}</small><h3>{title}</h3><p>{text}</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>
}

function LinkButton({ link, primary, brand }: { link: DownloadLink; primary?: boolean; brand?: 'android' | 'ios' }) {
  if (!link.url) return <span className={`button ${primary ? '' : 'button-outline'} disabled`} aria-disabled="true">{link.label} · Próximamente</span>
  const icon = brand === 'ios' ? <FaApple size={19} /> : brand === 'android' ? <FaAndroid size={19} /> : primary ? <Download size={19} /> : <ExternalLink size={18} />
  return <a className={`button ${primary ? '' : 'button-outline'}`} href={link.url} download={!link.external} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>{icon}{link.label}</a>
}

function DownloadCard({ platform, id, icon, status, statusType, version, requirement, description, permissions, primary, secondary, instructions }: { platform: string; id: string; icon: ReactNode; status: string; statusType: string; version: string; requirement: string; description: string; permissions: string[]; primary: DownloadLink; secondary?: DownloadLink; instructions: string }) {
  const platformType = platform.toLowerCase()
  return <article className={`download-card download-card-${platformType}`} id={id}><div className="download-card-header"><span className="platform-icon" aria-hidden="true">{icon}</span><span className={`status-badge ${statusType}`}><i aria-hidden="true" />{status}</span></div><h3>{platform}</h3><p className="version">{version}</p><p className="download-description">{description}</p><div className="requirement"><Check aria-hidden="true" /> <span><b>Compatibilidad</b><small>{requirement}</small></span></div><div className="permissions"><small>PERMISOS CLAVE</small><div>{permissions.map((permission) => <span key={permission}>{permission}</span>)}</div></div><div className={`download-actions ${secondary ? '' : 'single'}`}><LinkButton link={primary} primary brand={platform === 'iOS' ? 'ios' : 'android'} />{secondary && <LinkButton link={secondary} />}</div><div className="install-note"><b>{platform === 'Android' ? 'Instalación rápida' : 'Instalación en iPhone'}</b><p>{instructions}</p></div></article>
}

function SensorIllustration() {
  return <svg className="step-svg sensor-svg" viewBox="0 0 260 150" role="img" aria-label="Sensor ESP32 detectando un impacto">
    <defs><linearGradient id="sensorGlow" x1="0" x2="1"><stop stopColor="#8CE4FE"/><stop offset="1" stopColor="#49BCE4"/></linearGradient></defs>
    <g className="impact-rings" fill="none" stroke="#8CE4FE"><circle cx="130" cy="74" r="45"/><circle cx="130" cy="74" r="61"/><circle cx="130" cy="74" r="76"/></g>
    <g className="sensor-axis" stroke="#8aa4b8" strokeWidth="2"><path d="M52 116h46"/><path d="M56 119l-5-3 5-3"/><path d="M94 119l5-3-5-3"/><path d="M73 137V96"/><path d="M70 101l3-6 3 6"/></g>
    <g className="sensor-module"><rect x="92" y="37" width="77" height="77" rx="12" fill="#134075"/><rect x="108" y="52" width="45" height="45" rx="8" fill="url(#sensorGlow)"/><circle cx="130.5" cy="74.5" r="8" fill="#fff"/><path d="M82 48h10m-10 17h10m-10 18h10m-10 18h10m77-53h10m-10 17h10m-10 18h10m-10 18h10" stroke="#134075" strokeWidth="5" strokeLinecap="round"/></g>
    <path className="impact-bolt" d="M185 20l-11 21h11l-8 19 22-27h-12l8-13z" fill="#8CE4FE"/>
    <text x="130" y="130" textAnchor="middle" fill="#526b7f" fontSize="9" fontWeight="700">MOVIMIENTO DETECTADO</text>
  </svg>
}

function BridgeIllustration() {
  return <svg className="step-svg bridge-svg" viewBox="0 0 260 150" role="img" aria-label="Teléfono puente enviando ubicación a la nube">
    <g className="cloud-shape"><path d="M169 38c4-14 25-15 31-2 13-3 23 5 23 15 0 10-8 17-20 17h-42c-10 0-17-6-17-15s9-17 25-15z" fill="#e9f8fc" stroke="#134075" strokeWidth="2"/></g>
    <g className="data-packets" fill="#8CE4FE"><circle cx="145" cy="75" r="4"/><circle cx="158" cy="64" r="4"/><circle cx="170" cy="53" r="4"/></g>
    <g className="bridge-phone"><rect x="80" y="22" width="67" height="112" rx="13" fill="#134075"/><rect x="86" y="31" width="55" height="91" rx="8" fill="#f8fbfc"/><path d="M107 27h14" stroke="#8CE4FE" strokeWidth="3" strokeLinecap="round"/><circle cx="113.5" cy="127" r="3" fill="#8CE4FE"/></g>
    <g className="gps-pulse"><circle cx="113" cy="73" r="26" fill="#8CE4FE" opacity=".18"/><circle cx="113" cy="73" r="18" fill="#8CE4FE" opacity=".3"/><path d="M113 48c-10 0-18 8-18 18 0 14 18 33 18 33s18-19 18-33c0-10-8-18-18-18zm0 25a7 7 0 110-14 7 7 0 010 14z" fill="#134075"/></g>
    <g className="wireless-arcs" fill="none" stroke="#8CE4FE" strokeWidth="3" strokeLinecap="round"><path d="M61 58c-11 9-11 24 0 33"/><path d="M51 48c-19 15-19 40 0 54"/><circle cx="67" cy="75" r="3" fill="#8CE4FE" stroke="none"/></g>
    <text x="184" y="92" textAnchor="middle" fill="#526b7f" fontSize="9" fontWeight="700">DATOS EN VIVO</text>
  </svg>
}

function AlertIllustration() {
  return <svg className="step-svg alert-svg" viewBox="0 0 260 150" role="img" aria-label="Monitor remoto recibiendo una alerta y confirmando OFF">
    <g className="monitor-phone"><rect x="72" y="18" width="75" height="119" rx="14" fill="#134075"/><rect x="78" y="27" width="63" height="98" rx="8" fill="#f8fbfc"/><path d="M99 23h20" stroke="#8CE4FE" strokeWidth="3" strokeLinecap="round"/></g>
    <g className="alert-bell"><circle cx="109" cy="65" r="25" fill="#fbeae8"/><path d="M99 70v-9c0-7 4-12 10-12s10 5 10 12v9l5 6H94l5-6zm6 11h8" fill="none" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M89 50l-6-5m46 5l6-5" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/></g>
    <g className="notification-card"><rect x="132" y="44" width="94" height="43" rx="10" fill="#fff" stroke="#dce8f0"/><circle cx="148" cy="60" r="8" fill="#8CE4FE"/><path d="M162 56h47m-47 9h33" stroke="#60778b" strokeWidth="3" strokeLinecap="round"/></g>
    <g className="off-confirm"><rect x="148" y="101" width="65" height="29" rx="14.5" fill="#e6f5ee"/><circle cx="165" cy="115" r="8" fill="#146b4a"/><path d="M161 115l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><text x="187" y="119" textAnchor="middle" fill="#146b4a" fontSize="10" fontWeight="800">OFF</text></g>
  </svg>
}

function BackgroundProtectionIllustration() {
  return <svg className="continuity-svg" viewBox="0 0 420 250" role="img" aria-label="Teléfono bloqueado manteniendo latidos, reconexión y alertas en segundo plano">
    <defs>
      <linearGradient id="continuityPhone" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#194A7D"/><stop offset="1" stopColor="#0B2C51"/></linearGradient>
      <radialGradient id="continuityGlow"><stop stopColor="#8CE4FE" stopOpacity=".5"/><stop offset="1" stopColor="#8CE4FE" stopOpacity="0"/></radialGradient>
    </defs>
    <circle className="continuity-glow" cx="188" cy="125" r="112" fill="url(#continuityGlow)"/>
    <g className="background-rings" fill="none" stroke="#8CE4FE"><circle cx="188" cy="125" r="69"/><circle cx="188" cy="125" r="95"/><circle cx="188" cy="125" r="119"/></g>
    <g className="locked-phone">
      <rect x="128" y="24" width="120" height="202" rx="26" fill="url(#continuityPhone)" stroke="#8CE4FE" strokeOpacity=".55" strokeWidth="2"/>
      <rect x="137" y="36" width="102" height="176" rx="19" fill="#F8FBFC"/>
      <rect x="169" y="29" width="38" height="7" rx="3.5" fill="#071D34"/>
      <g className="screen-lock"><rect x="170" y="78" width="36" height="31" rx="9" fill="#E9F8FC"/><path d="M179 88v-4a9 9 0 0118 0v4m-21 0h24v18h-24z" fill="none" stroke="#134075" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g>
      <text x="188" y="128" textAnchor="middle" fill="#134075" fontSize="12" fontWeight="800">PANTALLA BLOQUEADA</text>
      <text x="188" y="146" textAnchor="middle" fill="#60778B" fontSize="9">Protección en segundo plano</text>
      <g className="screen-heartbeat" fill="none" stroke="#49BCE4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M151 175h18l6-12 10 25 9-19 7 6h23"/></g>
      <circle className="screen-status-dot" cx="188" cy="198" r="4" fill="#1B7F5A"/>
    </g>
    <g className="reconnect-cloud"><path d="M294 65c3-13 22-15 28-3 12-3 22 5 22 15s-8 16-19 16h-36c-10 0-16-6-16-14s7-15 21-14z" fill="#fff" stroke="#8CE4FE" strokeWidth="2"/><path d="M298 80c7-9 20-10 28-1m-23 5c5-5 13-5 18 0" fill="none" stroke="#134075" strokeWidth="2.5" strokeLinecap="round"/><circle cx="312" cy="89" r="3" fill="#49BCE4"/></g>
    <g className="alert-ready" transform="translate(303 158)"><circle r="29" fill="#fff" stroke="#DCE8F0"/><path d="M-9 5v-9c0-7 4-12 10-12S11-11 11-4v9l6 7h-32l6-7zm5 12h10" fill="none" stroke="#C0392B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle className="alert-ready-dot" cx="20" cy="-20" r="7" fill="#1B7F5A" stroke="#fff" strokeWidth="3"/></g>
    <g className="data-beats" fill="#8CE4FE"><circle cx="266" cy="117" r="4"/><circle cx="282" cy="112" r="3"/><circle cx="297" cy="105" r="2.5"/></g>
    <text x="313" y="211" textAnchor="middle" fill="#526B7F" fontSize="9" fontWeight="700">AVISO SIEMPRE LISTO</text>
  </svg>
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="feature"><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>
}

export default App
