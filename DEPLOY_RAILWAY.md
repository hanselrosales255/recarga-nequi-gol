# Guía de Despliegue en Railway

## 📋 Pasos para Desplegar

### 1. Conectar con GitHub
1. Ve a [Railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Elige el repositorio: `hanselrosales255/recarga-nequi-gol`

### 2. Configurar Variables de Entorno

En la pestaña "Variables", agrega:

```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui
NODE_ENV=production
```

#### 🔑 Obtener TELEGRAM_BOT_TOKEN:
1. Abre Telegram y busca `@BotFather`
2. Envía `/newbot`
3. Sigue las instrucciones
4. Copia el token (formato: `123456:ABCdef...`)

#### 📱 Obtener TELEGRAM_CHAT_ID:
1. Envía un mensaje a tu bot
2. Ve a: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`
3. Busca el campo `"id"` dentro de `"chat"`
4. Copia ese número (puede ser negativo si es grupo)

### 3. Deploy Automático

Railway detectará automáticamente:
- ✅ Node.js (package.json)
- ✅ Puerto automático (variable PORT)
- ✅ Comando start: `npm start`
- ✅ Reinstalación de dependencias

El despliegue iniciará automáticamente.

### 4. Verificar Despliegue

1. Railway generará una URL: `https://tu-app.railway.app`
2. Verifica en los logs que todo inició correctamente:
   ```
   🚀 Servidor corriendo en puerto XXXX
   ✅ Bot de Telegram inicializado
   📡 Socket.IO listo
   ```

### 5. Dominio Personalizado (Opcional)

1. En Settings → Domains
2. Click "Generate Domain" (Railway te da uno gratis)
3. O configura tu propio dominio

## ⚡ Características del Despliegue

- ✅ **Sin sleep**: Servicio siempre activo
- ✅ **SSL automático**: HTTPS incluido
- ✅ **Reinicio automático**: Si hay fallos
- ✅ **Escalabilidad**: Maneja alto tráfico
- ✅ **Logs en tiempo real**: Debugging fácil

## 🔄 Actualizaciones

Cada `git push` a la rama `main` redesplegará automáticamente en Railway.

```bash
git add .
git commit -m "Actualización"
git push origin main
```

## 🐛 Troubleshooting

### El bot no responde:
- Verifica las variables `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`
- Revisa los logs en Railway

### Error de conexión:
- Asegúrate de que el bot esté agregado al grupo/chat
- Verifica que el chat_id sea correcto (con `-` si es grupo)

### Puerto incorrecto:
- Railway asigna PORT automáticamente, NO lo cambies

## 📊 Monitoreo

Railway ofrece:
- **Métricas**: CPU, RAM, tráfico
- **Logs**: Tiempo real
- **Alertas**: Notificaciones de errores

## 💰 Costo

- **Trial**: $5 de crédito gratis al inicio
- **Hobby**: $5/mes por servicio activo
- **Pro**: Escalado ilimitado

## 🔗 Enlaces Útiles

- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Docs](https://docs.railway.app)
- [Repositorio GitHub](https://github.com/hanselrosales255/recarga-nequi-gol)
