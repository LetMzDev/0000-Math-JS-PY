from manim import *

class NumberLineInequality ( Scene ):
	def construct ( self ):
		# Configuração da reta numérica
		number_line = NumberLine (
			x_range = [ -4, 2, 1 ],
			length = 10,
			include_numbers = True,
			color = BLUE
		)

		# Nome do eixo X
		axis_label = MathTex ( "x" ).next_to ( number_line, RIGHT, buff = 0.5 ).shift ( UP * 0.3 )

		# Círculo fechado em -4/3
		closed_circle = Dot (
			point = number_line.n2p ( -4/3 ),
			color = YELLOW,
			radius = 0.15
		)

		# Rótulo do ponto crítico (-4/3)
		label = MathTex ( r"-\frac{4}{3}" ).next_to ( closed_circle, DOWN, buff = 0.2 ).shift ( LEFT * 0.2 )

		# Linha verde indicando a solução (x ≤ -4/3)
		solution_line = Line (
			start = number_line.n2p ( -4 ),
			end = number_line.n2p ( -4/3 ),
			color = GREEN,
			stroke_width = 10
		)

		# Adiciona todos os elementos à cena
		self.add ( number_line, axis_label, solution_line, closed_circle, label )
