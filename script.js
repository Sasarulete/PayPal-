// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ================ VARIABLES Y ELEMENTOS DEL DOM ================
    
    // Botones principales
    const payJokeBtn = document.getElementById('payJokeBtn');
    const payHelpBtn = document.getElementById('payHelpBtn');
    
    // Modales
    const jokeModal = document.getElementById('jokeModal');
    const helpModal = document.getElementById('helpModal');
    
    // Botones para cerrar modales
    const closeJokeModal = document.getElementById('closeJokeModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    
    // Pasos del modal de chiste
    const jokeStep1 = document.getElementById('jokeStep1');
    const jokeStep2 = document.getElementById('jokeStep2');
    const jokeStep3 = document.getElementById('jokeStep3');
    
    // Elementos del modal de chiste
    const jokeAmount = document.getElementById('jokeAmount');
    const jokeInput = document.getElementById('jokeInput');
    const jokeError1 = document.getElementById('jokeError1');
    const jokeNext1 = document.getElementById('jokeNext1');
    const jokeExit = document.getElementById('jokeExit');
    
    // Pasos del modal de ayuda
    const helpStep1 = document.getElementById('helpStep1');
    const helpStep2 = document.getElementById('helpStep2');
    const helpStep3 = document.getElementById('helpStep3');
    const helpStep4 = document.getElementById('helpStep4');
    
    // Elementos del modal de ayuda
    const helpAmount = document.getElementById('helpAmount');
    const helpInput1 = document.getElementById('helpInput1');
    const helpInput2 = document.getElementById('helpInput2');
    const helpError1 = document.getElementById('helpError1');
    const helpError2 = document.getElementById('helpError2');
    const helpNext1 = document.getElementById('helpNext1');
    const helpNext2 = document.getElementById('helpNext2');
    const helpExit = document.getElementById('helpExit');
    
    // Enlace externo
    const homosexualizerLink = document.getElementById('homosexualizerLink');
    
    // ================ FUNCIONES DE UTILIDAD ================
    
    // Generar un número aleatorio entre min y max con dos decimales
    function generarMontoAleatorio(min, max) {
        const monto = Math.random() * (max - min) + min;
        return monto.toFixed(2);
    }
    
    // Mostrar un modal
    function mostrarModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    // Ocultar un modal
    function ocultarModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
    
    // Resetear un modal a su estado inicial
    function resetearModal(pasos, pasoInicial) {
        // Ocultar todos los pasos
        pasos.forEach(paso => {
            paso.classList.add('hidden');
        });
        
        // Mostrar solo el paso inicial
        pasoInicial.classList.remove('hidden');
        
        // Limpiar inputs
        if (jokeInput) jokeInput.value = '';
        if (helpInput1) helpInput1.value = '';
        if (helpInput2) helpInput2.value = '';
        
        // Limpiar mensajes de error
        if (jokeError1) jokeError1.textContent = '';
        if (helpError1) helpError1.textContent = '';
        if (helpError2) helpError2.textContent = '';
        
        // Generar nuevos montos aleatorios
        if (jokeAmount) {
            jokeAmount.textContent = generarMontoAleatorio(5, 1500);
        }
        
        if (helpAmount) {
            helpAmount.textContent = generarMontoAleatorio(5, 1500);
        }
    }
    
    // Función para simular el procesamiento de pago
    function procesarPago(pasoActual, siguientePaso, pasoFinal) {
        // Ocultar paso actual
        pasoActual.classList.add('hidden');
        
        // Mostrar paso de procesamiento
        siguientePaso.classList.remove('hidden');
        
        // Después de 5 segundos, mostrar el paso final
        setTimeout(() => {
            siguientePaso.classList.add('hidden');
            pasoFinal.classList.remove('hidden');
        }, 5000);
    }
    
    // ================ INICIALIZACIÓN ================
    
    // Generar montos aleatorios iniciales
    if (jokeAmount) {
        jokeAmount.textContent = generarMontoAleatorio(5, 1500);
    }
    
    if (helpAmount) {
        helpAmount.textContent = generarMontoAleatorio(5, 1500);
    }
    
    // ================ EVENT LISTENERS PARA MODAL DE CHISTE ================
    
    // Abrir modal de chiste
    payJokeBtn.addEventListener('click', function() {
        mostrarModal(jokeModal);
        resetearModal([jokeStep1, jokeStep2, jokeStep3], jokeStep1);
    });
    
    // Cerrar modal de chiste
    closeJokeModal.addEventListener('click', function() {
        ocultarModal(jokeModal);
        resetearModal([jokeStep1, jokeStep2, jokeStep3], jokeStep1);
    });
    
    // Paso 1 del modal de chiste: Validar monto
    jokeNext1.addEventListener('click', function() {
        const monto = jokeInput.value.trim();
        
        // Validación
        if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
            jokeError1.textContent = 'Por favor ingrese un monto válido mayor a 0';
            return;
        }
        
        // Si es válido, procesar pago
        procesarPago(jokeStep1, jokeStep2, jokeStep3);
    });
    
    // Salir del modal de chiste
    jokeExit.addEventListener('click', function() {
        ocultarModal(jokeModal);
        resetearModal([jokeStep1, jokeStep2, jokeStep3], jokeStep1);
    });
    
    // ================ EVENT LISTENERS PARA MODAL DE AYUDA ================
    
    // Abrir modal de ayuda
    payHelpBtn.addEventListener('click', function() {
        mostrarModal(helpModal);
        resetearModal([helpStep1, helpStep2, helpStep3, helpStep4], helpStep1);
    });
    
    // Cerrar modal de ayuda
    closeHelpModal.addEventListener('click', function() {
        ocultarModal(helpModal);
        resetearModal([helpStep1, helpStep2, helpStep3, helpStep4], helpStep1);
    });
    
    // Paso 1 del modal de ayuda: Validar descripción del problema
    helpNext1.addEventListener('click', function() {
        const problema = helpInput1.value.trim();
        
        // Validación
        if (!problema) {
            helpError1.textContent = 'Por favor describa su problema';
            return;
        }
        
        // Si es válido, ir al siguiente paso
        helpStep1.classList.add('hidden');
        helpStep2.classList.remove('hidden');
    });
    
    // Paso 2 del modal de ayuda: Validar monto
    helpNext2.addEventListener('click', function() {
        const monto = helpInput2.value.trim();
        
        // Validación
        if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
            helpError2.textContent = 'Por favor ingrese un monto válido mayor a 0';
            return;
        }
        
        // Si es válido, procesar pago
        procesarPago(helpStep2, helpStep3, helpStep4);
    });
    
    // Salir del modal de ayuda
    helpExit.addEventListener('click', function() {
        ocultarModal(helpModal);
        resetearModal([helpStep1, helpStep2, helpStep3, helpStep4], helpStep1);
    });
    
    // ================ EVENT LISTENERS ADICIONALES ================
    
    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === jokeModal) {
            ocultarModal(jokeModal);
            resetearModal([jokeStep1, jokeStep2, jokeStep3], jokeStep1);
        }
        
        if (event.target === helpModal) {
            ocultarModal(helpModal);
            resetearModal([helpStep1, helpStep2, helpStep3, helpStep4], helpStep1);
        }
    });
    
    // Enlace externo (simulación)
    homosexualizerLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('El homosexualizador está temporalmente fuera de servicio. Vuelva a intentarlo más tarde.');
    });
    
    // Permitir enviar formularios con Enter en los inputs
    jokeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            jokeNext1.click();
        }
    });
    
    helpInput1.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            helpNext1.click();
        }
    });
    
    helpInput2.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            helpNext2.click();
        }
    });
});