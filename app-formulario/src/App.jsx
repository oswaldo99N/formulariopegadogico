import { useState } from 'react'

const TOTAL_STEPS = 11; // 0 to 10

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    consentimiento: false,
    correo: '',
    tarea: '',
    tiempo: '',
    percepcion: '',
    motivacion: '',
    factor: '',
    recursos: [],
    calidad: '',
    obstaculo: '',
    sugerencia: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'recursos') {
      const updatedRecursos = [...formData.recursos];
      if (checked) {
        updatedRecursos.push(value);
      } else {
        const index = updatedRecursos.indexOf(value);
        if (index > -1) updatedRecursos.splice(index, 1);
      }
      setFormData({ ...formData, [name]: updatedRecursos });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 0: return formData.consentimiento;
      case 1: return formData.correo.length > 5 && isValidEmail(formData.correo);
      case 2: return formData.tarea !== '';
      case 3: return formData.tiempo !== '';
      case 4: return formData.percepcion !== '';
      case 5: return formData.motivacion !== '';
      case 6: return formData.factor !== '';
      case 7: return formData.recursos.length > 0;
      case 8: return formData.calidad !== '';
      case 9: return formData.obstaculo.trim().length > 0;
      case 10: return formData.sugerencia.trim().length > 0;
      default: return true;
    }
  };

  const handleFinish = () => {
    // Simulando el guardado del Componente 3
    console.log("Datos exportados (JSON):", JSON.stringify(formData, null, 2));
    setStep(11); // Success screen
  };

  const renderLikert = (name, minLabel, maxLabel) => (
    <div className="likert-scale">
      {[1, 2, 3, 4, 5].map((val) => (
        <label key={val} className="likert-option">
          <input
            type="radio"
            name={name}
            value={val}
            checked={formData[name] === String(val)}
            onChange={handleChange}
          />
          <span className="likert-label">{val === 1 ? `1 - ${minLabel}` : val === 5 ? `5 - ${maxLabel}` : val}</span>
        </label>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Consentimiento Informado</h2>
              <p>Registro de Seguimiento Tecno-Pedagógico - Curso: Introducción a la Comunicación Institucional y Multimedia (UTN)</p>
            </div>
            <p style={{marginBottom: '20px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6'}}>
              De conformidad con lo establecido en la LOPDP (2021) del Ecuador, los datos recopilados serán tratados de forma estrictamente confidencial.
              Tienen un fin exclusivamente pedagógico y analítico.
            </p>
            <div className="checkbox-group">
              <label className="option-label">
                <input 
                  type="checkbox" 
                  name="consentimiento" 
                  checked={formData.consentimiento} 
                  onChange={handleChange} 
                />
                Acepto los términos de uso y el tratamiento de mis datos.
              </label>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>1. Identidad</h2>
            </div>
            <div className="input-group">
              <label className="input-label">Correo institucional del estudiante</label>
              <input 
                type="email" 
                name="correo" 
                className="input-field" 
                placeholder="usuario@utn.edu.ec"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>2. Tarea Entregada</h2>
            </div>
            <div className="input-group">
              <label className="input-label">Seleccione la tarea multimedia que acaba de entregar:</label>
              <select name="tarea" className="input-field" value={formData.tarea} onChange={handleChange}>
                <option value="">-- Seleccionar --</option>
                <option value="Tarea 1: Diseño de Infografía Institucional">Tarea 1: Diseño de Infografía Institucional</option>
                <option value="Tarea 2: Guion de Podcast Corporativo">Tarea 2: Guion de Podcast Corporativo</option>
                <option value="Tarea 3: Edición de Video Multimedia de Identidad Visual">Tarea 3: Edición de Video Multimedia de Identidad Visual</option>
                <option value="Tarea 4: Prototipado de Interfaz Web Institucional">Tarea 4: Prototipado de Interfaz Web Institucional</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>3. Tiempo Real Invertido</h2>
            </div>
            <div className="input-group">
              <label className="input-label">¿Cuánto tiempo real (en horas) le dedicó al desarrollo de esta tarea?</label>
              <div className="radio-group">
                {['Menos de 2 horas', 'Entre 2 y 4 horas', 'Entre 4 y 6 horas', 'Más de 6 horas'].map(opt => (
                  <label key={opt} className="option-label">
                    <input type="radio" name="tiempo" value={opt} checked={formData.tiempo === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>4. Percepción del Tiempo</h2>
            </div>
            <div className="input-group">
              <label className="input-label">El tiempo asignado en la plataforma virtual fue suficiente y oportuno para su complejidad.</label>
              {renderLikert('percepcion', 'Totalmente en desacuerdo', 'Totalmente de acuerdo')}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>5. Motivación</h2>
            </div>
            <div className="input-group">
              <label className="input-label">Evalúe de forma honesta su nivel de motivación general durante el desarrollo de esta tarea.</label>
              {renderLikert('motivacion', 'Extremadamente desmotivado', 'Extremadamente motivado')}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>6. Factores de Afectación</h2>
            </div>
            <div className="input-group">
              <label className="input-label">¿Cuál factor afectó en mayor medida su motivación técnica o académica esta semana?</label>
              <div className="radio-group">
                {[
                  'El nivel de interés o gusto por el tema multimedia propuesto.',
                  'La dificultad en el uso del software o herramientas tecnológicas.',
                  'La falta de tiempo debido a sobrecarga en otras asignaturas.',
                  'La claridad y precisión de las instrucciones/rúbricas en Moodle.',
                  'No experimenté problemas de motivación esta semana.'
                ].map(opt => (
                  <label key={opt} className="option-label">
                    <input type="radio" name="factor" value={opt} checked={formData.factor === opt} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>7. Recursos Utilizados</h2>
            </div>
            <div className="input-group">
              <label className="input-label">De los siguientes recursos multimedia ofrecidos en Moodle, ¿cuáles utilizó activamente?</label>
              <div className="checkbox-group">
                {[
                  'Video-tutoriales grabados por el docente.',
                  'Lecturas básicas y material complementario en PDF.',
                  'Foros de dudas y respuestas académicas.',
                  'Enlaces externos (Ej. manuales de software, plantillas de diseño).',
                  'Ninguno de los anteriores.'
                ].map(opt => (
                  <label key={opt} className="option-label">
                    <input type="checkbox" name="recursos" value={opt} checked={formData.recursos.includes(opt)} onChange={handleChange} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>8. Autoevaluación de Calidad</h2>
            </div>
            <div className="input-group">
              <label className="input-label">¿Cómo calificaría de forma autocrítica la calidad técnica y comunicativa de la producción que acaba de subir?</label>
              {renderLikert('calidad', 'Deficiente', 'Excelente')}
            </div>
          </div>
        );
      case 9:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>9. Obstáculo Principal</h2>
            </div>
            <div className="input-group">
              <label className="input-label">Describa brevemente cuál fue el principal obstáculo técnico o metodológico que enfrentó.</label>
              <textarea 
                name="obstaculo" 
                className="input-field" 
                rows="4" 
                value={formData.obstaculo}
                onChange={handleChange}
                placeholder="Escriba aquí..."
              ></textarea>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>10. Sugerencias de Mejora</h2>
            </div>
            <div className="input-group">
              <label className="input-label">¿Qué ajuste inmediato sugiere realizar en la plataforma o en el acompañamiento docente?</label>
              <textarea 
                name="sugerencia" 
                className="input-field" 
                rows="4" 
                value={formData.sugerencia}
                onChange={handleChange}
                placeholder="Escriba sus sugerencias..."
              ></textarea>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="step-content success-screen">
            <div className="success-icon">✓</div>
            <div className="step-header">
              <h2>¡Formulario Completado!</h2>
              <p>Sus respuestas han sido registradas y almacenadas de forma segura bajo el protocolo de la LOPDP.</p>
            </div>
            <div style={{marginTop: '30px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', textAlign: 'left'}}>
              <h4 style={{marginBottom: '10px', color: '#10b981'}}>Datos guardados (JSON Simulado Componente 3):</h4>
              <pre style={{fontSize: '12px', color: '#94a3b8', whiteSpace: 'pre-wrap'}}>
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="wizard-container">
      {step < 11 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}></div>
        </div>
      )}
      
      {renderStepContent()}

      {step < 11 && (
        <div className="btn-container">
          {step > 0 ? (
            <button className="btn btn-secondary" onClick={prevStep}>Atrás</button>
          ) : <div></div>}
          
          {step < TOTAL_STEPS ? (
            <button 
              className="btn btn-primary" 
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
            >
              Siguiente
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={handleFinish}
              disabled={!isCurrentStepValid()}
            >
              Finalizar y Enviar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
