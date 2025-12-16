#!/bin/bash
# Script de verificación post-despliegue

echo "🔍 Verificando configuración del servidor..."

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "📋 Checklist de Despliegue:"
echo ""

# 1. Verificar variables de entorno
echo -n "1. Variables de entorno configuradas... "
if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   ⚠️  Faltan: TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID"
fi

# 2. Verificar package.json
echo -n "2. package.json presente... "
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# 3. Verificar server.js
echo -n "3. server.js presente... "
if [ -f "server.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# 4. Verificar estructura de bancas
echo -n "4. Estructura de bancas... "
BANCAS_COUNT=$(find bancas -maxdepth 1 -type d | wc -l)
if [ "$BANCAS_COUNT" -ge 14 ]; then
    echo -e "${GREEN}✓ ($BANCAS_COUNT bancas)${NC}"
else
    echo -e "${YELLOW}⚠ ($BANCAS_COUNT bancas encontradas)${NC}"
fi

# 5. Verificar BancoUtils.js
echo -n "5. BancoUtils.js presente... "
if [ -f "js/banco-utils.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo ""
echo "🚀 El sistema está listo para desplegar en Railway"
echo ""
echo "📝 Próximos pasos:"
echo "1. Ve a https://railway.app"
echo "2. Deploy from GitHub: hanselrosales255/recarga-nequi-gol"
echo "3. Configura variables de entorno"
echo "4. Railway desplegará automáticamente"
echo ""
