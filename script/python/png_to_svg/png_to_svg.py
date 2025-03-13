import subprocess

def png_to_svg_inkscape ( input_png, output_svg ):
	# Caminho completo do Inkscape (ajuste conforme necessário)
	inkscape_path = r"C:\Program Files\Inkscape\bin\inkscape.exe"

	subprocess.run([
		inkscape_path,
		input_png,
		"--export-type=svg",  # Exporta em SVG
		"--export-filename=" + output_svg
	], check=True)

	print ( f"Imagem SVG salva em: {output_svg}" )

# Exemplo de uso
png_to_svg_inkscape ( "imagem.png", "imagem.svg" )

# Ou 
# python png_to_svg.py

# Otimizar
# svgo imagem.svg -o output.svg
