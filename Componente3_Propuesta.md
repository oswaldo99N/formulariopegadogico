# COMPONENTE 3: PROPUESTA DE ALMACENAMIENTO Y SEGURIDAD

A partir de los datos identificados en el Componente 1 (calificaciones y métricas del LMS) y los generados por el instrumento tecno-pedagógico del Componente 2, se presenta a continuación la propuesta estructurada para el almacenamiento y la gestión segura de la información.

## 1. Esquema de Organización de los Datos

Para organizar la información de forma que sea fácilmente cruzable entre el formulario y los registros del calificador de Moodle, se propone estructurar los datos en una única tabla principal. Esta tabla centralizará cada "entrega" como un registro único.

A continuación, se detalla la estructura de columnas:

| Nombre de la Columna | Tipo de Formato | Origen del Dato | Descripción / Valores Permitidos |
| :--- | :--- | :--- | :--- |
| `ID_Registro` | Código (Autonumérico) | Sistema (Forms) | Identificador único de la transacción en la base. |
| `Marca_Temporal` | Fecha/Hora | Sistema (Forms) | Fecha y hora exacta en que el estudiante envió el formulario (Timestamp). |
| `Correo_Institucional` | Texto (Email) | Formulario (Ítem 1) | **Clave primaria** para cruzar datos con Moodle. Ej: `usuario@utn.edu.ec`. |
| `Nota_Moodle` | Número (Decimal) | Componente 1 | Calificación obtenida en el calificador de Moodle (0.00 a 10.00). |
| `ID_Tarea` | Texto (Lista) | Formulario (Ítem 2) | Tarea a la que corresponde: Tarea 1, Tarea 2, Tarea 3, Tarea 4. |
| `Tiempo_Dedicado` | Rango (Texto) | Formulario (Ítem 3) | "< 2 hrs", "2-4 hrs", "4-6 hrs", "> 6 hrs". |
| `Percepcion_Tiempo` | Número (Entero) | Formulario (Ítem 4) | Escala Likert del 1 al 5 (1=Desacuerdo, 5=Acuerdo). |
| `Nivel_Motivacion` | Número (Entero) | Formulario (Ítem 5) | Escala Likert del 1 al 5 (1=Desmotivado, 5=Motivado). |
| `Factor_Afectacion` | Texto (Selección) | Formulario (Ítem 6) | Razón principal de afectación (Interés, Software, Tiempo, Claridad, Ninguno). |
| `Recursos_Usados` | Texto Libre (Array) | Formulario (Ítem 7) | Lista separada por comas (Videos, PDF, Foros, Enlaces). |
| `Autoevaluacion_Calidad` | Número (Entero) | Formulario (Ítem 8) | Escala Likert del 1 al 5 (1=Deficiente, 5=Excelente). |
| `Obstaculo_Principal` | Texto Libre | Formulario (Ítem 9) | Respuesta abierta del estudiante (Párrafo corto). |
| `Sugerencia_Mejora` | Texto Libre | Formulario (Ítem 10) | Respuesta abierta del estudiante (Párrafo corto). |
| `Acepta_Terminos` | Booleano (Verdadero/Falso)| Formulario (Consentimiento) | Verificación de aceptación LOPDP. |


## 2. Justificación de la Elección de Almacenamiento

Se propone el uso de **almacenamiento relacional** apoyado en un sistema de hojas de cálculo alojado en la nube (específicamente **Microsoft Excel en OneDrive institucional** o **Google Sheets en Google Workspace for Education**), en lugar de bases de datos no relacionales (como MongoDB).

**Justificación:**
1. **Volumen de datos manejable:** El volumen de información está estrictamente delimitado por la matrícula del curso y el número de tareas (ej. 40 alumnos x 4 tareas = 160 registros por período). Una base no relacional está diseñada para Big Data y esquemas dinámicos, lo cual sería un exceso de infraestructura ("overkill") para este contexto.
2. **Estructura estandarizada:** Los datos generados por el Componente 2 tienen una estructura tabular altamente predecible y estática (todos los alumnos responden exactamente los mismos 10 ítems). El almacenamiento relacional es ideal para datos tabulares.
3. **Facilidad de cruce de datos (Joins):** Al utilizar un esquema relacional con el `Correo_Institucional` como clave foránea, se facilita enormemente realizar cruces (funciones `BUSCARV` / `VLOOKUP` o relaciones directas) con los reportes exportados en formato `.csv` desde el libro de calificaciones de Moodle.
4. **Accesibilidad Pedagógica:** Un formato de hoja de cálculo permite al equipo docente aplicar filtros, tablas dinámicas y análisis estadísticos básicos (correlación de Pearson entre motivación y nota, promedios) sin necesidad de conocimientos en lenguajes de consulta de bases de datos (SQL o NoSQL).


## 3. Protocolo de Seguridad Mínimo

Para garantizar la integridad y confidencialidad de la información, se establece el siguiente protocolo de seguridad:

*   **Ubicación de Almacenamiento:** Los archivos se almacenarán **exclusivamente en la nube institucional** de la universidad (ej. carpeta compartida en el OneDrive de la UTN). Queda prohibido el almacenamiento de datos crudos en discos duros locales de computadoras personales, laptops o memorias USB (pendrives).
*   **Gestión de Acceso y Permisos:**
    *   **Docente Titular (Administración/Edición):** Es el único perfil con permisos para modificar el archivo, consolidar los datos de Moodle y exportar los reportes de Forms.
    *   **Equipo de Tutoría / Ayudantes (Solo Lectura):** Acceso restringido a visualizar los tableros de resultados agregados, sin capacidad de alterar los datos crudos ni descargar copias locales de la matriz principal.
*   **Copias de Seguridad (Backups):**
    *   *Frecuencia:* Se configurará un historial de versiones automático provisto por la nube institucional (sincronización en tiempo real). Adicionalmente, el docente generará un "respaldo frío" cifrado con contraseña al finalizar cada parcial académico.
*   **Término del Período Académico:** Al concluir el semestre y entregar las actas de calificaciones definitivas, la matriz de datos será sometida a un proceso de **anonimización**. Se eliminará la columna `Correo_Institucional` para desvincular las respuestas de la identidad del alumno. La base de datos resultante (totalmente anónima) se conservará únicamente con fines estadísticos longitudinales para rediseño curricular futuro.


## 4. Análisis de Cumplimiento de la LOPDP (Ecuador 2021)

La propuesta de recolección y almacenamiento está diseñada para observar estrictamente la **Ley Orgánica de Protección de Datos Personales (LOPDP, 2021)**. A continuación, se detallan los artículos aplicables y su forma de cumplimiento:

*   **Cumplimiento del Art. 8 (Consentimiento):** 
    *   *Análisis:* La ley exige que el tratamiento de datos cuente con el consentimiento libre, específico, informado e inequívoco del titular. 
    *   *Aplicación:* La propuesta cumple mediante la *Sección 1: Consentimiento Informado* del formulario del Componente 2, configurada como el primer ítem obligatorio. Si el estudiante no acepta de forma explícita mediante la casilla de verificación, la transacción de datos no se concreta.
*   **Cumplimiento del Art. 10 (Principios - Finalidad y Pertinencia):** 
    *   *Análisis:* Los datos solo pueden ser tratados para las finalidades explícitas y legítimas que fueron comunicadas al titular.
    *   *Aplicación:* Los datos recopilados (motivación, tiempo) son estrictamente los necesarios (pertinencia) para responder a la pregunta pedagógica. La propuesta garantiza que no se comercializarán ni cederán a terceros, utilizándose exclusivamente para analítica de aprendizaje institucional.
*   **Cumplimiento del Art. 13 (Conservación):**
    *   *Análisis:* Los datos no deben conservarse por más tiempo del necesario para cumplir el propósito de su recolección.
    *   *Aplicación:* El protocolo de seguridad estipula la **anonimización** de los registros una vez finalizado el semestre académico. Al eliminar el correo electrónico, el registro deja de ser un "dato personal" amparado por la ley, permitiendo su uso histórico sin violar este artículo.
*   **Cumplimiento del Art. 37 (Seguridad de los Datos Personales):**
    *   *Análisis:* El responsable del tratamiento debe implementar medidas de seguridad adecuadas para proteger los datos frente a accesos no autorizados, pérdida o alteración.
    *   *Aplicación:* El almacenamiento en una nube institucional (que cuenta con certificaciones de seguridad empresariales), los controles de acceso basados en roles (lectura vs edición) y la prohibición de uso de memorias USB locales, cumplen a cabalidad con la exigencia técnica de protección dictada por la normativa.
