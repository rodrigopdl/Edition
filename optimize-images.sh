#!/bin/bash

# Script para optimizar imágenes del tema Ghost
# Requiere: imagemagick o cwebp (brew install webp imagemagick)

echo "🖼️  Optimizando imágenes del tema..."

cd "$(dirname "$0")/assets/images"

# Función para convertir a WebP
convert_to_webp() {
    local input=$1
    local output="${input%.*}.webp"
    
    if command -v cwebp &> /dev/null; then
        echo "Convirtiendo $input a WebP..."
        cwebp -q 85 "$input" -o "$output"
        echo "✅ Creado: $output"
    elif command -v magick &> /dev/null; then
        echo "Convirtiendo $input a WebP con ImageMagick..."
        magick "$input" -quality 85 "$output"
        echo "✅ Creado: $output"
    else
        echo "❌ Error: Necesitas instalar webp o imagemagick"
        echo "   Ejecuta: brew install webp imagemagick"
        exit 1
    fi
}

# Convertir imágenes PNG grandes a WebP
echo ""
echo "📦 Convirtiendo PNG a WebP..."
convert_to_webp "hiker.png"
convert_to_webp "hiker-plate.png"
convert_to_webp "plate.png"

# Convertir JPG a WebP
echo ""
echo "📦 Convirtiendo JPG a WebP..."
convert_to_webp "talks-wyeworks.JPG"

echo ""
echo "✨ Optimización completada!"
echo ""
echo "📊 Tamaños antes y después:"
ls -lh *.png *.webp *.JPG 2>/dev/null | awk '{print $9, $5}'

echo ""
echo "⚠️  IMPORTANTE: Después de verificar las imágenes WebP:"
echo "   1. Actualiza las referencias en los archivos .hbs"
echo "   2. Elimina los PNG/JPG originales si ya no los necesitas"
echo "   3. Ejecuta: npx gulp build"

