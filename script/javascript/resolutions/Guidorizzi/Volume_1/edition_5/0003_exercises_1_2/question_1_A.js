function initThreeJS ( containerId )
{
	// ------------------------------------ INICIALIZAÇÃO DO THREE.JS ------------------------------------

	const container = document.getElementById ( containerId );
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera ( 40, container.clientWidth / container.clientHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer
	({
		antialias: true,
		alpha: true
	});

	renderer.setSize ( container.clientWidth, container.clientHeight );
	renderer.setClearColor ( 0x2a2a2a, 0 );
	container.appendChild ( renderer.domElement );

	// ------------------------------------ SISTEMA DE ILUMINAÇÃO ------------------------------------

	// --- Criação da Luz Ambiente ---
	const ambientLight = new THREE.AmbientLight ( 0x404040 );
	scene.add ( ambientLight );

	// --- Criação da Luz Direcional ---
	const directionalLight = new THREE.DirectionalLight ( 0xffffff, 0.3 );
	directionalLight.position.set ( 0, 10, 5 );
	scene.add ( directionalLight );

	// ------------------------------------ LINHA NUMÉRICA PRINCIPAL ------------------------------------

	// --- Criação do Grupo da Linha Numérica ---
	const numberLine = new THREE.Group();

	// --- Criação da Geometria do Eixo ---
	const axisGeometry = new THREE.BufferGeometry().setFromPoints
	([
		new THREE.Vector3 ( -6, 0, 0 ),
		new THREE.Vector3 ( 6, 0, 0 )
	]);

	// --- Criação do Eixo ---
	const axis = new THREE.Line ( axisGeometry, new THREE.LineBasicMaterial ({ color: 0x00FFFF, linewidth: 20 }));
	numberLine.add ( axis );

	// ---------------------------------------- Rótulo "x"  ----------------------------------------

	// --- Carregamento da Fonte ---
	const loader = new THREE.FontLoader();
	loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
	{
		// --- Criação da Geometria do Texto ---
		const textGeometry = new THREE.TextGeometry ( 'x',
		{
			size: 0.3,
			height: 0.02,
			font: font
		});

		// --- Criação do Material do Texto ---
		const textMaterial = new THREE.MeshStandardMaterial (
		{
			color: 0x00FFFF,
			emissive: 0x00FFFF,
			metalness: 0.7,
			roughness: 0.3
		});

		// --- Criação do Mesh do Texto ---
		const text = new THREE.Mesh ( textGeometry, textMaterial );
		text.position.set ( 6.2, -0.1, 0 );
		numberLine.add ( text );

		// --- Adicionando a seta ---
		const arrowHeadGeometry = new THREE.ConeGeometry ( 0.1, 0.3, 32 );
		const arrowHeadMaterial = new THREE.MeshBasicMaterial ({ color: 0x00FFFF });
		const arrowHead = new THREE.Mesh ( arrowHeadGeometry, arrowHeadMaterial );

		arrowHead.position.set ( 6, 0, 0 );
		arrowHead.rotation.z = -Math.PI / 2;
		numberLine.add ( arrowHead );
	});

	// ------------------------------------ CLASSE PARA CRIAÇÃO DOS MARCADORES E NÚMEROS ------------------------------------

	class NumberSystem
	{
		constructor()
		{
			this.numbers = [];
			this.createMarkers();
		}

		createMarkers()
		{
			// --- Criação da Geometria do Marcador ---
			const markerGeometry = new THREE.CylinderGeometry ( 0.03, 0.03, 0.5, 8 );

			// --- Criação do Material do Marcador ---
			const markerMaterial = new THREE.MeshStandardMaterial
			({ 
				color: 0xFFFFFF,
				metalness: 0.0,
				roughness: 0.8
			});

			// --- Loop para Criação dos Marcadores Inteiros ---
			for ( let x = -5; x <= 5; x++ )
			{
				const marker = new THREE.Mesh ( markerGeometry, markerMaterial );
				marker.position.set ( x, 0, 0 );
				marker.rotation.x = Math.PI / 2;
				numberLine.add ( marker );
				this.createNumber ( x );
			}

			// --- Criação do Marcador Fracionário ---
			const marker = new THREE.Mesh ( markerGeometry, markerMaterial );
			marker.position.set ( 1.5, 0, 0 );
			marker.rotation.x = Math.PI / 2;
			numberLine.add ( marker );

			this.createFractionNumber ( 1.5, 3, 2 );
		}

		// ------------------------------------ CRIAÇÃO DE NÚMEROS EM FORMATO DE FRAÇÃO ------------------------------------

		createFractionNumber ( x, numerator, denominator )
		{
			// --- Carregamento da Fonte ---
			const loader = new THREE.FontLoader();
			loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
			{
				// --- Criação do Material do Texto ---
				const textMaterial = new THREE.MeshBasicMaterial ({ color: 0xFF0000 });

				// --- Criação da Geometria do Numerador ---
				const numeratorGeometry = new THREE.TextGeometry ( numerator.toString(),
				{
					size: 0.15,
					height: 0.02,
					font: font
				});

				// --- Criação do Mesh do Numerador ---
				const numeratorMesh = new THREE.Mesh ( numeratorGeometry, textMaterial );
				numeratorMesh.position.set ( x - 0.08, -0.25, 0 );

				// --- Criação da Geometria do Denominador ---
				const denominatorGeometry = new THREE.TextGeometry ( denominator.toString(),
				{
					size: 0.15,
					height: 0.02,
					font: font
				});

				// --- Criação do Mesh do Denominador ---
				const denominatorMesh = new THREE.Mesh ( denominatorGeometry, textMaterial );
				denominatorMesh.position.set ( x - 0.08, -0.55, 0 );

				// --- Criação da Linha de Fração ---
				const lineGeometry = new THREE.BufferGeometry().setFromPoints
				([
					new THREE.Vector3 ( -0.1, 0.05, 0 ),
					new THREE.Vector3 ( 0.1, 0.05, 0 )
				]);

				const lineMaterial = new THREE.LineBasicMaterial ({ color: 0xffffff });
				const fractionLine = new THREE.Line ( lineGeometry, lineMaterial );
				fractionLine.position.set ( x, -0.4, 0 );

				// --- Adição dos Elementos na Linha Numérica ---
				numberLine.add ( numeratorMesh );
				numberLine.add ( denominatorMesh );
				numberLine.add ( fractionLine );
			});
		}

		// ------------------------------------ CRIAÇÃO DE NÚMEROS INTEIROS ------------------------------------

		createNumber ( x )
		{
			// --- Carregamento da Fonte ---
			const loader = new THREE.FontLoader();
			loader.load ( 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font =>
			{
				// --- Criação da Geometria do Texto ---
				const textGeometry = new THREE.TextGeometry ( x.toString(),
				{
					size: 0.25,
					height: 0.02,
					font: font
				});

				// --- Criação do Material do Texto ---
				const textMaterial = new THREE.MeshStandardMaterial (
				{
					color: 0xffffff,
					emissive: 0xcccccc,
					metalness: 0.7,
					roughness: 0.3
				});

				// --- Criação do Mesh do Texto ---
				const text = new THREE.Mesh ( textGeometry, textMaterial );
				text.position.set ( x - 0.1, -0.4, 0 );
				numberLine.add ( text );
			});
		}
	}

	// ------------------------------------ CLASSE PARA A SOLUÇÃO MATEMÁTICA ------------------------------------

	class MathematicalSolution
	{
		constructor()
		{
			this.group = new THREE.Group();
			this.createSolutionLine();
			this.createCriticalPoint();
			scene.add ( this.group );
		}

		createSolutionLine()
		{
			// --- Criação da Geometria da Linha de Solução ---
			const geometry = new THREE.BufferGeometry();
			const positions = [];
			const colors = [];

			for ( let x = -7; x <= 1.5; x += 0.05 )
			{
				positions.push ( x, Math.sin ( x * 2 ) * 0.05, 0 );
				const red = 1.0;
				const green = 0;
				const blue = 0;
				colors.push ( red, green, blue );
			}

			geometry.setAttribute ( 'position', new THREE.Float32BufferAttribute ( positions, 3 ));
			geometry.setAttribute ( 'color', new THREE.Float32BufferAttribute ( colors, 3 ));

			// --- Criação do Material da Linha de Solução ---
			const material = new THREE.LineBasicMaterial (
			{
				vertexColors: true,
				linewidth: 3,
				transparent: true
			});

			// --- Criação da Linha de Solução ---
			this.solutionLine = new THREE.Line ( geometry, material );
			this.group.add ( this.solutionLine );
		}

		createCriticalPoint()
		{
			// --- Criação da Geometria do Ponto Crítico ---
			const geometry = new THREE.RingGeometry ( 0.15, 0.2, 64 );

			// --- Criação do Material do Ponto Crítico ---
			const material = new THREE.MeshStandardMaterial (
			{
				color: 0x00ff00,
				emissive: 0x00cc00,
				side: THREE.DoubleSide,
				metalness: 0.7
			});

			// --- Criação do Ponto Crítico ---
			this.point = new THREE.Mesh ( geometry, material );
			this.point.position.set ( 1.5, 0, 0 );
			this.group.add ( this.point );
		}

		update ( time )
		{
			// --- Atualização da Linha de Solução ---
			const positions = this.solutionLine.geometry.attributes.position.array;

			for ( let i = 0; i < positions.length; i += 3 )
				positions [ i + 1 ] = Math.sin ( time * 2 + positions [ i ] * 3 ) * 0.1;

			this.solutionLine.geometry.attributes.position.needsUpdate = true;

			// --- Atualização do Ponto Crítico ---
			this.point.rotation.z = time * 0.5;
			this.point.scale.set (
				1 + Math.sin ( time * 3 ) * 0.1,
				1 + Math.cos ( time * 2.5 ) * 0.1,
				1
			);
		}
	}

	// ------------------------------------ ADICIONA OS ELEMENTOS NA CENA ------------------------------------

	// --- Adiciona a Linha Numérica na Cena ---
	scene.add ( numberLine );

	// --- Cria o Sistema Numérico ---
	new NumberSystem();

	// --- Cria a Solução Matemática ---
	const solution = new MathematicalSolution();

	// --- Configuração Inicial da Câmera ---
	camera.position.set ( 0, 20, 5 );
	const initialCameraZ = camera.position.z;
	camera.lookAt ( 0, 0, 0 );

	// ------------------------------------ CONTROLE DE CÂMERA BASEADO NO MOVIMENTO DO MOUSE ------------------------------------

	// --- Variáveis para o Controle do Mouse ---
	let mouseX = 0, mouseY = 0;

	// --- Listener para o Movimento do Mouse ---
	window.addEventListener ( 'mousemove', e =>
	{
		mouseX = ( e.clientX / window.innerWidth - 0.5 ) * 0.5;
		mouseY = ( e.clientY / window.innerHeight - 0.5 ) * 0.2;
	});

	// ------------------------------------ CONTROLE DE ZOOM ------------------------------------

	let cleanupZoom; // Variável para armazenar a função de cleanup

	// --- Criação do Handler de Zoom (Condicional) ---
	if ( containerId === 'animationContainerFullscreen')
		cleanupZoom = createZoomHandler ( camera, container, initialCameraZ );

	// ------------------------------------ RESIZE HANDLER ------------------------------------

	// --- Função para Redimensionamento ---
	const resizeHandler = () =>
	{
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize ( container.clientWidth, container.clientHeight );
	};

	// --- Listener para o Evento de Redimensionamento ---
	window.addEventListener ( 'resize', resizeHandler );
	renderer.setPixelRatio ( window.devicePixelRatio );
	renderer.domElement.style.touchAction = 'none';

	// ------------------------------------ LOOP DE ANIMAÇÃO ------------------------------------

	// --- Criação do Clock ---
	let clock = new THREE.Clock();

	// --- Função de Animação ---
	function animate()
	{
		requestAnimationFrame ( animate );
		const time = clock.getElapsedTime();
		solution.update ( time );
		camera.position.x += ( mouseX * 3 - camera.position.x ) * 0.05;
		camera.position.y += ( 2 + mouseY - camera.position.y ) * 0.05;
		camera.lookAt ( 0, 0, 0 );
		renderer.render ( scene, camera );
	}

	animate();

	// ------------------------------------ CONTROLE DE ARRASTE (DRAG) ------------------------------------

	// --- Criação do Handler de Drag ---
	const dragHandler = createDragHandler ( renderer.domElement );
	const dragOffset = dragHandler.dragOffset;

	// ------------------------------------ MONKEY-PATCH EM camera.lookAt ------------------------------------

	// --- Criação do Patch para o LookAt ---
	const restoreLookAt = createLookAtPatch ( camera, dragOffset );

	// ------------------------------------ FUNÇÃO DE CLEANUP ------------------------------------

	return {
		scene,
		camera,
		renderer,
		animate,
	
		cleanup: () =>
		{ 
			window.removeEventListener ( 'resize', resizeHandler );

			if ( cleanupZoom )
				cleanupZoom();

			dragHandler.cleanup();
			renderer.dispose();
			container.removeChild ( renderer.domElement );
			restoreLookAt();
		}
	};
}

// ------------------------------------ INICIALIZAÇÃO PRINCIPAL ------------------------------------

document.addEventListener ( 'DOMContentLoaded', () =>
{
	// --- Inicialização da Animação Principal ---
	const mainAnimation = initThreeJS ( 'animationContainer' );
	window.mainAnimation = mainAnimation;
});
