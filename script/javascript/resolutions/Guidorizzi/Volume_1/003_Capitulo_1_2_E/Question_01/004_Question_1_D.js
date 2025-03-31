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
		new THREE.Vector3 ( -4, 0, 0 ),
		new THREE.Vector3 ( 6, 0, 0 )
	]);

	// --- Criação do Eixo ---
	const axis = new THREE.Line ( axisGeometry, new THREE.LineBasicMaterial ({ color: 0x00FFFF, linewidth: 20 }));
	numberLine.add ( axis );

	// ⭐ Rotulo_x
	Rotulo_x ( numberLine, 0x00FFFF, 6.2, -0.1, 6, 0 );

	// ⭐ NumberSystem
	new NumberSystem
	(
		numberLine,
		[ 0.03, 0.03, 0.5, 8 ], 0xFFFFFF, -3, 5,
		false, null, null, null, null, null,
		null, null, null, null, null, null,
		0.25, 0xffffff, 0xcccccc, 0.1, -0.4
	);

	scene.add ( numberLine );

	// ⭐ MathematicalSolution
	const solution = new MathematicalSolution
	(
		scene,
		1, 6, 0.05, [ 0, 1.0, 0 ],
		0.15, 0.2, 0x00cc00, 1
	);

	// --- Configuração Inicial da Câmera ---
	camera.position.set ( 0, 20, 5 );
	const initialCameraZ = camera.position.z;
	camera.lookAt ( 0, 0, 0 );

	// ------------------------------------ CONTROLE DE CÂMERA BASEADO NO MOVIMENTO DO MOUSE ------------------------------------

	let mouseX = 0, mouseY = 0;

	// --- Listener para o Movimento do Mouse ---
	window.addEventListener ( 'mousemove', e =>
	{
		mouseX = ( e.clientX / window.innerWidth - 0.5 ) * 0.5;
		mouseY = ( e.clientY / window.innerHeight - 0.5 ) * 0.2;
	});

	// ------------------------------------ CONTROLE DE ZOOM ------------------------------------

	let cleanupZoom; // Variável para armazenar a função de cleanup

	// --- Criação do Handler de Zoom ---
	if ( containerId === 'animationContainerFullscreen')
		cleanupZoom = createZoomHandler ( camera, container, initialCameraZ );

	// ------------------------------------ RESIZE HANDLER ------------------------------------

	const resizeHandler = () =>
	{
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize ( container.clientWidth, container.clientHeight );
	};

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

	const dragHandler = createDragHandler ( renderer.domElement );
	const dragOffset = dragHandler.dragOffset;

	// ------------------------------------ MONKEY-PATCH EM camera.lookAt ------------------------------------

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
	const mainAnimation = initThreeJS ( 'animationContainer' );
	window.mainAnimation = mainAnimation;
});
