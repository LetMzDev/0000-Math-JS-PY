from manim import *

class NumberLineInequality ( Scene ):
	def construct ( self ):
		# Solução da inequação: x + 3 <= 6x - 2  =>  5 <= 5x  =>  1 <= x

		blue_color = "#4682B4" # Steel Blue - para eixos

		number_line = NumberLine (
			x_range = [ -1, 4, 1 ],
			length = 10,
			include_numbers = True,
			color = blue_color,
			include_tip = True
		)

		# Nome do eixo X
		axis_label = MathTex ( "x" ).next_to ( number_line, RIGHT, buff = 0.5 ).shift ( UP * 0.3 )

		# Círculo fechado em 1
		closed_circle = Circle (
			radius = 0.15,
			color = YELLOW,
			stroke_width = 3,
			fill_color = YELLOW,
			fill_opacity = 1
		).move_to ( number_line.n2p ( 1 ))

		# Linha de solução (x >= 1)
		solution_line = Line (
			start = number_line.n2p ( 1 ),
			end = number_line.n2p ( 4 ),
			color = GREEN,
			stroke_width = 10
		)

		# Move a ponta da seta um pouco mais para a direita
		number_line.tip.shift ( RIGHT * 0.3 )

		# Define a cor da seta para a mesma cor do eixo
		number_line.tip.set_color ( blue_color )

		# Define o z_index da seta para ficar à frente da linha da solução.
		number_line.tip.set_z_index ( 1 )
		solution_line.set_z_index ( 0 )

		# Adiciona elementos à cena
		self.add ( number_line, axis_label, solution_line, closed_circle )
