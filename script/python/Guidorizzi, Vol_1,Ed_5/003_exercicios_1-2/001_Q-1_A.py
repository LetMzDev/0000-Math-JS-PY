from manim import *

class NumberLineInequality ( Scene ):
	def construct ( self ):
		# Configuração da reta numérica
		number_line = NumberLine (
			x_range = [ -1, 3, 1 ],
			length = 10,
			include_numbers = True,
			color = BLUE
		)

		# Nome do eixo X (elevado um pouco acima da reta)
		axis_label = MathTex ( "x" ).next_to ( number_line, RIGHT, buff = 0.5 ).shift ( UP * 0.3 )

		# Círculo aberto com centro preto e borda amarela em 1.5
		open_circle = Circle (
			radius = 0.15,
			color = YELLOW,
			stroke_width = 3,
			fill_color = BLACK,
			fill_opacity = 1
		).move_to ( number_line.n2p ( 1.5 ))

		# Rótulo do ponto crítico (3/2)
		label = MathTex ( r"\frac{3}{2}" ).next_to ( open_circle, DOWN, buff = 0.2 )

		# Linha verde indicando a solução (x < 1.5)
		solution_line = Line (
			start = number_line.n2p ( -1 ),
			end = number_line.n2p ( 1.5 ),
			color = GREEN,
			stroke_width = 10
		)

		# Adiciona todos os elementos à cena
		self.add ( number_line, axis_label, solution_line, open_circle, label )
