// Animação Three.js Original
(function() {
	// Configuração inicial
	const container = document.getElementById('animationContainer');
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(35, container.clientWidth/container.clientHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ 
		antialias: true,
		alpha: true
	});

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setClearColor(0x2a2a2a, 0);  // Cor de fundo mais clara
	container.appendChild(renderer.domElement);

	// Sistema de iluminação
	const ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
	const directionalLight = new THREE.DirectionalLight(0xff2200, 0.3);
	directionalLight.position.set(0, 10, 5);
	scene.add(directionalLight);

	// Linha numérica principal
	const numberLine = new THREE.Group();

	// Eixo central
	const axisGeometry = new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(-7, 0, 0),
		new THREE.Vector3(7, 0, 0)
	]);
	const axis = new THREE.Line(
		axisGeometry,
		new THREE.LineBasicMaterial({ 
			color: 0x00FFFF,  // LINHA S
			linewidth: 2 
		})
	);
	numberLine.add(axis);

	// Marcadores e números
	class NumberSystem {
		constructor() {
			this.numbers = [];
			this.createMarkers();
		}

		createMarkers() {
			const markerGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);

			// Ajustando a cor para branco puro e reduzindo metalness e roughness para controle melhor da cor
			const markerMaterial = new THREE.MeshStandardMaterial({
				color: 0xFFFFFF,    // Cor branca
				metalness: 0.0,     // Sem metálico (mais opaco)
				roughness: 0.8      // Superfície mais rugosa, menos reflexiva
			});

			for (let x = -5; x <= 5; x++) {
				const marker = new THREE.Mesh(markerGeometry, markerMaterial);
				marker.position.set(x, 0, 0);
				marker.rotation.x = Math.PI / 2;
				numberLine.add(marker);
				this.createNumber(x);
			}
		}

		createNumber(x) {
			const loader = new THREE.FontLoader();
			loader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', font => {
				const textGeometry = new THREE.TextGeometry(x.toString(), {
					size: 0.25,
					height: 0.02,
					font: font
				});

				const textMaterial = new THREE.MeshStandardMaterial({
					color: 0xffffff,  // Cor branca para os números
					emissive: 0xcccccc,  // Leve brilho nos números
					metalness: 0.7,
					roughness: 0.3
				});

				const text = new THREE.Mesh(textGeometry, textMaterial);
				text.position.set(x - 0.1, -0.4, 0);
				numberLine.add(text);
			});
		}
	}

	// Solução matemática
	class MathematicalSolution {
		constructor() {
			this.group = new THREE.Group();
			this.createSolutionLine();
			this.createCriticalPoint();
			scene.add(this.group);
		}

		createSolutionLine() {
			const geometry = new THREE.BufferGeometry();
			const positions = [];
			const colors = [];

			for (let x = -10; x <= 1.5; x += 0.05) {
				positions.push(x, Math.sin(x * 2) * 0.05, 0);

				// Aumentar a intensidade para um rubro-branco
				const intensity = 1 - (x + 5) / 6.5;

				// Misturando vermelho com branco: Começa vermelho e vai para branco
				const red = 1.0; // Red (vermelho) será sempre forte
				const green = intensity; // Green (verde) vai de 0 a 1, misturando com branco
				const blue = intensity; // Blue (azul) também vai de 0 a 1, misturando com branco

				colors.push(red, green, blue); // Mistura rubro com branco
			}

			geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
			geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

			const material = new THREE.LineBasicMaterial({
				vertexColors: true,
				linewidth: 3,
				transparent: true
			});

			this.solutionLine = new THREE.Line(geometry, material);
			this.group.add(this.solutionLine);
		}

		createCriticalPoint() {
			const geometry = new THREE.RingGeometry(0.15, 0.2, 64);
			const material = new THREE.MeshStandardMaterial({
				color: 0x00ff00,  // Cor verde para o círculo
				emissive: 0x00cc00,  // Um tom de verde mais escuro
				side: THREE.DoubleSide,
				metalness: 0.7
			});

			this.point = new THREE.Mesh(geometry, material);
			this.point.position.set(1.5, 0, 0);
			this.group.add(this.point);
		}

		update(time) {
			const positions = this.solutionLine.geometry.attributes.position.array;
			for(let i = 0; i < positions.length; i += 3) {
				positions[i + 1] = Math.sin(time * 2 + positions[i] * 3) * 0.1;
			}
			this.solutionLine.geometry.attributes.position.needsUpdate = true;

			this.point.rotation.z = time * 0.5;
			this.point.scale.set(
				1 + Math.sin(time * 3) * 0.1,
				1 + Math.cos(time * 2.5) * 0.1,
				1
			);
		}
	}

	// Configuração de cena
	scene.add(numberLine);
	new NumberSystem();
	const solution = new MathematicalSolution();
	camera.position.set(0, 20, 5);
	camera.lookAt(0, 0, 0);

	// Controles de câmera
	let mouseX = 0, mouseY = 0;
	window.addEventListener('mousemove', e => {
		mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
	});

	// Animação
	let clock = new THREE.Clock();
	function animate() {
		requestAnimationFrame(animate);
		const time = clock.getElapsedTime();

		solution.update(time);
		camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
		camera.position.y += (2 + mouseY - camera.position.y) * 0.05;
		camera.lookAt(0, 0, 0);
		renderer.render(scene, camera);
	}

	// Resize handler
	window.addEventListener('resize', () => {
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	});

	animate();
})();
