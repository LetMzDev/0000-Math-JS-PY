// ------------------------------------ CLASSE PARA CRIAÇÃO DOS MARCADORES E NÚMEROS ------------------------------------

/**
 * @param {}
 * @param {ArrayNumber} regua_config		- Conjunto de configurações do cilindro da régua do eixo X
 * @param {number} cor_cilindro				- Cor do cilindro da régua
 * @param {number} num_inicial				- Número inicial na régua - visível
 * @param {number} num_final				- Número final na régua - visível
 * 
 * Todos recebem null se o valor de fraction for false ( pois não há fração )
 * @param {boolean} fraction				- True == Tem valor em fração -- False == Não possui fração
 * @param {number} pos_cilindro_frac		- A posição do cilindro na régua da fração, recebe null se não houver fração
 * @param {number} valor_numerador			- Valor numérico do numerador
 * @param {number} valor_denominador		- Valor numérico do denominador
 * @param {number} cor_fraction				- Cor da fração
 * @param {number} size_fraction_number		- Tamanho da fonte do numerador e denominador
 * 
 * @param {number} pos_numerador_H			- Posição horizontal do numerador
 * @param {number} pos_numerador_V			- Posição vertical do numerador
 * @param {number} pos_denominador_H		- Posição horizontal do denominador
 * @param {number} pos_denominador_V		- Posição vertical do denominador
 * @param {number} largura_linha_fraction	- Largura da linha da fração
 * @param {number} pos_linha_fraction_V		- Posição vertical da linha da fração
 * 
 * Texto numérico
 * @param {number} size_number_text			- Tamanho do texto dos números na régua
 * @param {number} cor_texto_principal		- Cor do texto principal
 * @param {number} cor_texto_principal_2	- Cor do texto principal parte 2
 * @param {number} pos_text_number_H		- Posição horizontal dos números no eixo X
 * @param {number} pos_text_number_V		- Posição vertical dos números no eixo X
 */

class NumberSystem
{
	constructor
	( 
		numberLine, regua_config, cor_cilindro, num_inicial, num_final,
		fraction, pos_cilindro_frac,valor_numerador, valor_denominador, cor_fraction, size_fraction_number,
		pos_numerador_H, pos_numerador_V, pos_denominador_H, pos_denominador_V, largura_linha_fraction, pos_linha_fraction_V,
		size_number_text, cor_texto_principal, cor_texto_principal_2, pos_text_number_H, pos_text_number_V
	)

	{
		this.numbers = []
		this.numberLine = numberLine

		this.regua_config = regua_config
		this.cor_cilindro = cor_cilindro
		this.num_inicial = num_inicial
		this.num_final = num_final

		this.fraction = fraction
		this.pos_cilindro_frac = pos_cilindro_frac
		this.valor_numerador = valor_numerador
		this.valor_denominador = valor_denominador
		this.cor_fraction = cor_fraction
		this.size_fraction_number = size_fraction_number

		this.pos_numerador_H = pos_numerador_H
		this.pos_numerador_V = pos_numerador_V
		this.pos_denominador_H = pos_denominador_H
		this.pos_denominador_V = pos_denominador_V
		this.largura_linha_fraction = largura_linha_fraction
		this.pos_linha_fraction_V = pos_linha_fraction_V

		this.size_number_text = size_number_text
		this.cor_texto_principal = cor_texto_principal
		this.cor_texto_principal_2 = cor_texto_principal_2
		this.pos_text_number_H = pos_text_number_H
		this.pos_text_number_V = pos_text_number_V

		this.createMarkers()
	}

	createMarkers ()
	{
		const markerGeometry = new THREE.CylinderGeometry ( ...this.regua_config )
		const markerMaterial = new THREE.MeshStandardMaterial (
		{ 
			color: this.cor_cilindro,
			metalness: 0.1,
			roughness: 0.8
		})

		for ( let x = this.num_inicial; x <= this.num_final; x++ )
		{
			const marker = new THREE.Mesh ( markerGeometry, markerMaterial )
			marker.position.set ( x, 0, 0 )
			marker.rotation.x = Math.PI / 2
			this.numberLine.add ( marker )
			this.createNumber ( x )
		}

		if ( this.fraction === true )
		{
			const marker = new THREE.Mesh ( markerGeometry, markerMaterial )
			marker.position.set ( this.pos_cilindro_frac, 0, 0 )
			marker.rotation.x = Math.PI / 2
			this.numberLine.add ( marker )
			this.createFractionNumber ( this.pos_cilindro_frac, this.valor_numerador, this.valor_denominador ) // this.pos_cilindro_frac Posição do numeral fração
		}
	}

	createFractionNumber ( x, numerator, denominator )
	{
		// Texto da fração
		const loader = new THREE.FontLoader()
		loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
		{
			const textMaterial = new THREE.MeshBasicMaterial ({ color: this.cor_fraction })

			// Numerador
			const numeratorGeometry = new THREE.TextGeometry ( numerator.toString(),
			{
				size: this.size_fraction_number,
				height: 0.02,
				font: font
			})

			const numeratorMesh = new THREE.Mesh ( numeratorGeometry, textMaterial )
			numeratorMesh.position.set ( x - this.pos_numerador_H, this.pos_numerador_V, 0 )

			// Denominador
			const denominatorGeometry = new THREE.TextGeometry ( denominator.toString(),
			{
				size: this.size_fraction_number,
				height: 0.02,
				font: font
			})

			const denominatorMesh = new THREE.Mesh ( denominatorGeometry, textMaterial )
			denominatorMesh.position.set ( x - this.pos_denominador_H, this.pos_denominador_V, 0 )

			// Linha da fração
			const lineGeometry = new THREE.BufferGeometry().setFromPoints (
			[
				new THREE.Vector3 ( - this.largura_linha_fraction, 0.05, 0 ),
				new THREE.Vector3 ( this.largura_linha_fraction, 0.05, 0 )
			])

			const fractionLine = new THREE.Line ( lineGeometry, new THREE.LineBasicMaterial ({ color: this.cor_fraction }))
			fractionLine.position.set ( x, this.pos_linha_fraction_V, 0 )

			this.numberLine.add ( numeratorMesh )
			this.numberLine.add ( denominatorMesh )
			this.numberLine.add ( fractionLine )
		})
	}

	// Criação dos números no eixo X
	createNumber ( x )
	{
		const loader = new THREE.FontLoader ()
		loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
		{
			const textGeometry = new THREE.TextGeometry ( x.toString(),
			{
				size: this.size_number_text,
				height: 0.02,
				font: font
			})

			const textMaterial = new THREE.MeshStandardMaterial (
			{
				color: this.cor_texto_principal,
				emissive: this.cor_texto_principal_2,
				metalness: 0.7,
				roughness: 0.3
			})

			const text = new THREE.Mesh ( textGeometry, textMaterial )
			text.position.set ( x - this.pos_text_number_H, this.pos_text_number_V, 0 )
			this.numberLine.add ( text )
		})
	}
}

// ------------------------------------ CLASSE PARA A SOLUÇÃO MATEMÁTICA ------------------------------------

/**
 * @param {} scene
 * @param {number} inicio_animation			- Inicio da animação
 * @param {number} fim_animation			- Fim da animação
 * @param {number} variar_animation			- Taxa de variação da animação
 * @param {arrayNumber} cor_animation		- Cor da animação
 * 
 * Ponto Crítico
 * @param {number} ponto_critico			- Circulo crítico, ( 0 - fechado, 0,15 - aberto )
 * @param {number} ponto_critico_espessura	- Tamanho e espessura do ponto critico
 * @param {number} cor_ponto_critico		- Cor do ponto crítico
 * @param {number} posicao_pnt_cri			- Posição do ponto crítico no eixo ( quando é igual a zero )
 */

class MathematicalSolution
{
	constructor
	( 
		scene,
		inicio_animation, fim_animation, variar_animation, cor_animation,
		ponto_critico, ponto_critico_espessura, cor_ponto_critico, posicao_pnt_cri
	)

	{
		this.group = new THREE.Group()
		this.scene = scene

		this.inicio_animation = inicio_animation
		this.fim_animation = fim_animation
		this.variar_animation = variar_animation
		this.cor_animation = cor_animation

		this.ponto_critico = ponto_critico
		this.ponto_critico_espessura = ponto_critico_espessura
		this.cor_ponto_critico = cor_ponto_critico
		this.posicao_pnt_cri = posicao_pnt_cri

		this.createSolutionLine()
		this.createCriticalPoint()
		this.scene.add ( this.group )
	}

	createSolutionLine()
	{
		const geometry = new THREE.BufferGeometry()
		const positions = []
		const colors = []

		for ( let x = this.inicio_animation; x <= this.fim_animation; x += this.variar_animation )
		{
			positions.push ( x, Math.sin ( x * 2 ) * this.variar_animation, 0 )
			colors.push ( ...this.cor_animation )
		}

		geometry.setAttribute ( 'position', new THREE.Float32BufferAttribute ( positions, 3 ))
		geometry.setAttribute ( 'color', new THREE.Float32BufferAttribute ( colors, 3 ))

		const material = new THREE.LineBasicMaterial (
		{
			vertexColors: true,
			linewidth: 3,
			transparent: true
		})

		this.solutionLine = new THREE.Line ( geometry, material )
		this.group.add ( this.solutionLine )
	}

	createCriticalPoint()
	{
		const geometry = new THREE.RingGeometry  ( this.ponto_critico, this.ponto_critico_espessura, 64 )
		const material = new THREE.MeshStandardMaterial (
		{
			color: 0x00ff00,
			emissive: this.cor_ponto_critico,
			side: THREE.DoubleSide,
			metalness: 0.7
		})

		this.point = new THREE.Mesh ( geometry, material )
		this.point.position.set ( this.posicao_pnt_cri, 0, 0 )
		this.group.add ( this.point )
	}

	update ( time )
	{
		const positions = this.solutionLine.geometry.attributes.position.array

		for ( let i = 0; i < positions.length; i += 3 )
			positions [ i + 1 ] = Math.sin ( time * 2 + positions [ i ] * 3 ) * 0.1

		this.solutionLine.geometry.attributes.position.needsUpdate = true
		this.point.rotation.z = time * 0.5
		this.point.scale.set (
			1 + Math.sin ( time * 3 ) * 0.1,
			1 + Math.cos ( time * 2.5 ) * 0.1,
			1
		)
	}
}

// ---------------------------------------- Rótulo "x"  ----------------------------------------

/**
 * 
 * @param {}
 * @param {number} cor_eixo			- Cor do Eixo X
 * @param {number} posicao_H_eixo	- Posição do eixo X ( textos ) em horizontal
 * @param {number} posicao_V_eixo	- Posição do eixo X ( textos ) em vertical
 * @param {number} posicao_seta_H	- Posição da seta do eixo X ( forma geométrica ) em vertical
 * @param {number} posicao_seta_V	- Posição da seta do eixo X ( forma geométrica ) em vertical
 */

function Rotulo_x ( numberLine, cor_eixo, posicao_H_eixo, posicao_V_eixo, posicao_seta_H, posicao_seta_V )
{
	// --- Carregamento da Fonte ---
	const loader = new THREE.FontLoader()
	loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
	{
		// --- Criação da Geometria do Texto ---
		const textGeometry = new THREE.TextGeometry ( 'x',
		{
			size: 0.3,
			height: 0.02,
			font: font
		})

		// --- Criação do Material do Texto ---
		const textMaterial = new THREE.MeshStandardMaterial (
		{
			color: cor_eixo,
			emissive: cor_eixo,
			metalness: 0.7,
			roughness: 0.3
		})

		// --- Criação do Mesh do Texto ---
		const text = new THREE.Mesh ( textGeometry, textMaterial )
		text.position.set ( posicao_H_eixo, posicao_V_eixo, 0 )
		numberLine.add ( text )

		// --- Adicionando a seta ---
		const arrowHeadGeometry = new THREE.ConeGeometry ( 0.1, 0.3, 32 ) // Formato da seta
		const arrowHeadMaterial = new THREE.MeshBasicMaterial ({ color: cor_eixo })
		const arrowHead = new THREE.Mesh ( arrowHeadGeometry, arrowHeadMaterial )

		arrowHead.position.set ( posicao_seta_H, posicao_seta_V, 0 )
		arrowHead.rotation.z = -Math.PI / 2
		numberLine.add ( arrowHead )
	})
}
