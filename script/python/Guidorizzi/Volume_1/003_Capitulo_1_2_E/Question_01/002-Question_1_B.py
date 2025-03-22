from manim import *

class NumberLineInequality ( Scene ):
	def construct ( self ):
		# Configuração da reta numérica ajustada para incluir -2
		number_line = NumberLine (
			x_range = [ -4, 1, 1 ],  # Intervalo modificado para mostrar -3 a 1
			length = 10,
			include_numbers = True,
			color = BLUE
		)

		# Nome do eixo X
		axis_label = MathTex ( "x" ).next_to ( number_line, RIGHT, buff = 0.5 ).shift ( UP * 0.3 )

		# Círculo aberto em -2
		open_circle = Circle (
			radius = 0.15,
			color = YELLOW,
			stroke_width = 3,
			fill_color = BLACK,
			fill_opacity = 1
		).move_to ( number_line.n2p ( -2 ))  # Posição ajustada para -2

		# Linha de solução (x < -2)
		solution_line = Line (
			start = number_line.n2p ( -4 ),  # Início na extremidade esquerda
			end = number_line.n2p ( -2 ),    # Fim em -2
			color = GREEN,
			stroke_width = 10
		)

		# Adiciona elementos à cena
		self.add ( number_line, axis_label, solution_line, open_circle )
