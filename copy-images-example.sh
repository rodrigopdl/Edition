#!/bin/bash

# Script de ejemplo para copiar las imágenes de charlas
# 
# USO:
# 1. Copia tus imágenes originales al escritorio o una carpeta conocida
# 2. Modifica las rutas de IMAGEN1 e IMAGEN2 abajo
# 3. Ejecuta: bash copy-images-example.sh

# ============================================
# MODIFICA ESTAS RUTAS CON LA UBICACIÓN DE TUS IMÁGENES
# ============================================

IMAGEN1="$HOME/Desktop/lameetup.jpg"        # ← Cambiar por la ruta de tu primera imagen
IMAGEN2="$HOME/Desktop/wyeworks.jpg"        # ← Cambiar por la ruta de tu segunda imagen

# ============================================
# NO MODIFICAR DEBAJO DE ESTA LÍNEA
# ============================================

THEME_DIR="/Users/rodrigopdl/Documents/rpdl/Para masticar/Custom ghost theme/Edition"
IMAGES_DIR="$THEME_DIR/assets/images"

echo "📸 Copiando imágenes de charlas..."
echo ""

# Verificar que existen las imágenes originales
if [ ! -f "$IMAGEN1" ]; then
    echo "❌ Error: No se encuentra la primera imagen en: $IMAGEN1"
    echo "   Por favor, actualiza la variable IMAGEN1 con la ruta correcta"
    exit 1
fi

if [ ! -f "$IMAGEN2" ]; then
    echo "❌ Error: No se encuentra la segunda imagen en: $IMAGEN2"
    echo "   Por favor, actualiza la variable IMAGEN2 con la ruta correcta"
    exit 1
fi

# Copiar imágenes
echo "✅ Copiando primera imagen (La Meetup)..."
cp "$IMAGEN1" "$IMAGES_DIR/talks-lameetup.jpg"

echo "✅ Copiando segunda imagen (WyeWorks)..."
cp "$IMAGEN2" "$IMAGES_DIR/talks-wyeworks.jpg"

echo ""
echo "🎉 ¡Imágenes copiadas exitosamente!"
echo ""
echo "Ahora ejecuta:"
echo "  cd \"$THEME_DIR\""
echo "  npx gulp zip"
echo ""

