import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  HeartHandshake, 
  MapPin, 
  Ear, 
  Hand, 
  FileEdit, 
  FileText, 
  Scale, 
  CheckCircle2, 
  Users, 
  Smile,
  Shield,
  Phone,
  ArrowRight
} from 'lucide-react';
import './index.css';

// Audios simulados o transcritos
const SPEAKING_RATES = 0.9; 

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('inicio');
  const [step, setStep] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(null);

  const synthRef = useRef(window.speechSynthesis);

  // Detener audio al cambiar de pantalla
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }, [currentScreen, step]);

  const speak = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CO';
      utterance.rate = SPEAKING_RATES;
      synthRef.current.speak(utterance);
    }
  };

  const navTo = (screen) => {
    setCurrentScreen(screen);
    setStep(0);
    setQuizAnswered(false);
    setQuizCorrect(null);
  };

  // Pantallas de la Ruta de Atención
  const rutaSteps = [
    {
      title: "Paso 1: Nos acercamos a ti",
      msg: "Convocatoria en tu territorio",
      text: "Vamos a tu comunidad para explicarte qué hacemos y cómo podemos apoyarte.",
      icon: <MapPin size={100} color="var(--primary-color)" />,
      audio: "Vamos a tu comunidad para explicarte qué hacemos y cómo podemos apoyarte."
    },
    {
      title: "Paso 2: Te escuchamos",
      msg: "Asesoría sobre tu caso",
      text: "Un abogado y un psicólogo escucharán tu historia. Todo a tu propio ritmo y con mucho cuidado.",
      icon: <Ear size={100} color="var(--primary-color)" />,
      audio: "Un abogado y un psicólogo escucharán tu historia para ver cómo la J E P puede ayudarte. Todo a tu propio ritmo."
    },
    {
      title: "Paso 3: Tú decides",
      msg: "Explicación de alcances",
      text: "Te contamos qué se puede lograr y qué no. Tú decides si quieres participar en el proceso.",
      icon: <Hand size={100} color="var(--primary-color)" />,
      audio: "Te contamos qué se puede lograr de manera realista y qué no. Tú eres quien decide si quieres participar."
    },
    {
      title: "Paso 4: Tu testimonio",
      msg: "Declaración con cuidado",
      text: "Si decides avanzar, tomamos tu relato escrito protegiendo tu bienestar. Tú siempre das el permiso.",
      icon: <FileEdit size={100} color="var(--primary-color)" />,
      audio: "Si decides avanzar, tomamos tu relato escrito con mucho cuidado. Tú darás el permiso."
    },
    {
      title: "Paso 5: Pruebas",
      msg: "Solicitamos los documentos requeridos",
      text: "Reunimos los papeles necesarios que puedan apoyar tu caso de manera sólida.",
      icon: <FileText size={100} color="var(--primary-color)" />,
      audio: "Reunimos los papeles necesarios que apoyen tu caso."
    },
    {
      title: "Paso 6: Permiso oficial",
      msg: "Poder notarial y autenticación",
      text: "Firmas un documento oficial para que nosotros podamos representarte legalmente.",
      icon: <CheckCircle2 size={100} color="var(--primary-color)" />,
      audio: "Firmas un poder para que podamos representarte legalmente ante las autoridades."
    },
    {
      title: "Paso 7: Acreditación",
      msg: "Reconocimiento como víctima",
      text: "Te ayudamos y acompañamos a que la JEP te reconozca oficialmente como víctima del conflicto.",
      icon: <Users size={100} color="var(--primary-color)" />,
      audio: "Te ayudamos a que la Jurisdicción Especial para la Paz te reconozca oficialmente como víctima."
    },
    {
      title: "Paso 8: Te representamos",
      msg: "Participación en audiencias",
      text: "Nuestros abogados hablan por ti en los espacios legales para pedir verdad y justicia.",
      icon: <Scale size={100} color="var(--primary-color)" />,
      audio: "Nuestros abogados hablarán por ti en las audiencias para pedir verdad y justicia."
    }
  ];

  /* ------------------- Renderizadores de Pantalla ------------------- */
  
  const renderInicio = () => (
    <div className="content-area">
      <div className="visual-container">
        <HeartHandshake className="icon-large" />
      </div>
      <h1 className="text-center">¡Hola! Estamos aquí para ti.</h1>
      <p className="message-key">No estás solo/a. FEVCOL te acompaña en este proceso.</p>
      <p className="body-text">Te explicaremos cómo vamos a ayudarte, paso a paso. Puedes escuchar cada pantalla tocando el botón del altavoz. Avanza cuando estés listo/a.</p>
      
      <div className="nav-row">
        <button className="btn-secondary" onClick={() => speak("¡Hola! Bienvenido. En FEVCOL estamos para acompañarte en tu proceso. Toca el botón de Empezar para conocer cómo podemos ayudarte paso a paso.")}>
          <Volume2 size={24} /> Escuchar
        </button>
        <button className="btn-primary" onClick={() => navTo('que-hacemos')}>
          EMPEZAR <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderQueHacemos = () => (
    <div className="content-area slide-up">
      <div className="visual-container">
        <Shield className="icon-large" />
      </div>
      <h1 className="text-center">Nuestro objetivo contigo</h1>
      <p className="message-key">Queremos escucharte y apoyarte legal y emocionalmente.</p>
      <p className="body-text">Te damos asesoría para que conozcas tus derechos y te acompañamos en tu proceso con la justicia. Todo es completamente gratuito y confidencial.</p>
      
      <div className="nav-row">
        <button className="btn-secondary" onClick={() => speak("Queremos escucharte y defender tus derechos. Te daremos apoyo legal y emocional de forma gratuita y siempre protegiendo tu privacidad.")}>
          <Volume2 size={24} /> Escuchar
        </button>
        <button className="btn-primary" onClick={() => navTo('ruta')}>
          ¿Cómo es la ruta? <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderRuta = () => {
    const s = rutaSteps[step];
    return (
      <div className="content-area slide-up" key={step}>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          {rutaSteps.map((_, i) => (
             <div key={i} className={`progress-dot ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`} />
          ))}
        </div>

        <div className="visual-container" style={{height: '140px'}}>
          {s.icon}
        </div>
        
        <h1 className="text-center" style={{fontSize: '1.8rem'}}>{s.title}</h1>
        <p className="message-key">{s.msg}</p>
        <p className="body-text">{s.text}</p>
        
        <div className="nav-row" style={{marginTop: 'auto', flexWrap: 'wrap'}}>
           <button className="btn-secondary w-full mb-2" onClick={() => speak(s.audio)}>
            <Volume2 size={24} /> Escuchar
          </button>
          
          <div style={{display: 'flex', gap: '0.5rem', width: '100%'}}>
            <button 
              className="btn-secondary" 
              style={{flex: 1, marginTop: 0}}
              onClick={() => step > 0 ? setStep(step - 1) : navTo('que-hacemos')}
            >
              Atrás
            </button>
            <button 
               className="btn-primary" 
               style={{flex: 1, marginTop: 0}}
               onClick={() => step < rutaSteps.length - 1 ? setStep(step + 1) : navTo('enfoques')}
            >
              {step < rutaSteps.length - 1 ? 'Siguiente' : 'Continuar'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEnfoques = () => (
    <div className="content-area slide-up">
      <h1 className="text-center" style={{marginBottom: '0.5rem'}}>Nuestros Enfoques</h1>
      <p className="body-text mb-4">La forma en que nos comprometemos a tratarte:</p>
      
      <div className="card-grid">
        <div className="info-card" onClick={() => speak("Derechos Humanos. Respeto total a tu dignidad.")}>
          <Shield size={36} color="var(--primary-color)" />
          <h3>Derechos Humanos</h3>
        </div>
        <div className="info-card" onClick={() => speak("Psicosocial. Cuidamos profundamente de tus emociones.")}>
          <HeartHandshake size={36} color="var(--primary-color)" />
          <h3>Psicosocial</h3>
        </div>
        <div className="info-card" onClick={() => speak("Diferencial. Atención adaptada a si eres niño, adulto mayor o tienes alguna discapacidad.")}>
          <Users size={36} color="var(--primary-color)" />
          <h3>Diferencial y Curso de vida</h3>
        </div>
        <div className="info-card" onClick={() => speak("Acción sin Daño. Asegurarnos de no causarte más dolor al preguntar.")}>
          <Smile size={36} color="var(--primary-color)" />
          <h3>Acción sin daño</h3>
        </div>
      </div>
      
      <div className="nav-row" style={{marginTop: '2rem'}}>
        <button className="btn-primary w-full" onClick={() => navTo('quiz')}>
          ¡Juego rápido! <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const handleAnswer = (correct) => {
      setQuizAnswered(true);
      setQuizCorrect(correct);
      if(correct) {
         speak("¡Exacto! Solo necesitamos tu identificación. Tu palabra es lo más importante y todo el servicio es gratuito.");
      } else {
         speak("La respuesta correcta es llevar tu documento de identidad. Todo nuestro proceso es completamente gratuito, así que no necesitas dinero.");
      }
    };

    return (
      <div className="content-area slide-up">
        <h1 className="text-center">¡Un juego rápido!</h1>
        <p className="message-key">Para ver si todo ha quedado claro hasta ahora.</p>
        
        <div style={{marginTop: '1.5rem', width: '100%'}}>
           <h2 style={{fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '1rem', textAlign: 'center'}}>
             ¿Qué debo llevar a la jornada de atención de FEVCOL?
           </h2>

           <div 
             className={`quiz-option ${quizAnswered && quizCorrect ? 'correct' : ''}`}
             onClick={() => !quizAnswered && handleAnswer(true)}
           >
             <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-color)'}}>A.</div>
             <div>Mi documento de identidad oficial.</div>
           </div>

           <div 
             className={`quiz-option ${quizAnswered && !quizCorrect ? 'incorrect' : ''}`}
             onClick={() => !quizAnswered && handleAnswer(false)}
           >
             <div style={{fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-color)'}}>B.</div>
             <div>Mucho dinero para pagar la asesoría.</div>
           </div>
        </div>

        {quizAnswered && (
          <div className={`feedback-box ${quizCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {quizCorrect ? "¡Exacto! Solo necesitamos tu identificación. Nuestro servicio es gratuito." : "Corrección: Nuestro servicio es gratuito, solo requieres tu documento."}
          </div>
        )}

        <div className="nav-row" style={{marginTop: 'auto', flexWrap: 'wrap'}}>
          {!quizAnswered && (
            <button className="btn-secondary w-full mb-2" onClick={() => speak("Escoge la respuesta correcta. Pregunta: ¿Qué debo llevar a la jornada de atención de FE V COL? Opción A: Mi documento de identidad. Opción B: Mucho dinero.")}>
              <Volume2 size={24} /> Escuchar Pregunta
            </button>
          )}

          <button 
             className="btn-primary w-full" 
             onClick={() => navTo('cierre')}
             disabled={!quizAnswered}
             style={{opacity: quizAnswered ? 1 : 0.5}}
          >
            Continuar <ArrowRight size={24} />
          </button>
        </div>
      </div>
    );
  };

  const renderCierre = () => (
    <div className="content-area slide-up">
      <div className="visual-container">
        <Phone className="icon-large" />
      </div>
      <h1 className="text-center">¿Tienes más dudas?</h1>
      <p className="message-key">Estamos a una llamada de distancia.</p>
      <p className="body-text">Si tienes preguntas sobre el proceso, no dudes en buscarnos. ¡Gracias por confiar en nosotros, eres muy valiente!</p>
      
      <div className="nav-row" style={{flexWrap: 'wrap'}}>
        <button className="btn-secondary w-full" onClick={() => speak("Gracias por tu valentía. Si tienes más preguntas, toca el botón de llamar. Estamos contigo en todo momento.")}>
          <Volume2 size={24} /> Escuchar mensaje final
        </button>
        <button className="btn-primary w-full mt-2" onClick={() => window.alert('Llamando a atención FEVCOL...')}>
          LLAMAR AHORA
        </button>
        <button className="btn-secondary w-full mt-2" style={{border: 'none', background: 'transparent'}} onClick={() => navTo('inicio')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <header>
        <div className="logo-area">
          <HeartHandshake size={32} />
          <span>FEVCOL</span>
        </div>
        <div className="header-actions">
           <button className="icon-btn" onClick={() => navTo('inicio')} title="Ir al inicio" aria-label="Inicio">
             <MapPin size={24} />
           </button>
        </div>
      </header>

      {currentScreen === 'inicio' && renderInicio()}
      {currentScreen === 'que-hacemos' && renderQueHacemos()}
      {currentScreen === 'ruta' && renderRuta()}
      {currentScreen === 'enfoques' && renderEnfoques()}
      {currentScreen === 'quiz' && renderQuiz()}
      {currentScreen === 'cierre' && renderCierre()}
    </div>
  );
}
