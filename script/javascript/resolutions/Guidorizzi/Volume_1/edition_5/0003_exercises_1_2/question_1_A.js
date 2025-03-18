function initThreeJS(containerId) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x2a2a2a, 0);
    container.appendChild(renderer.domElement);

    // Sistema de iluminação
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xff2200, 0.3);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // Linha numérica principal
    const numberLine = new THREE.Group();
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-7, 0, 0),
        new THREE.Vector3(7, 0, 0)
    ]);
    const axis = new THREE.Line(axisGeometry, new THREE.LineBasicMaterial({ color: 0x00FFFF, linewidth: 20 }));
    numberLine.add(axis);

    // Classe para criação dos marcadores e números
    class NumberSystem {
        constructor() {
            this.numbers = [];
            this.createMarkers();
        }
        createMarkers() {
            const markerGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
            const markerMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
                metalness: 0.0,
                roughness: 0.8
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
                    color: 0xffffff,
                    emissive: 0xcccccc,
                    metalness: 0.7,
                    roughness: 0.3
                });
                const text = new THREE.Mesh(textGeometry, textMaterial);
                text.position.set(x - 0.1, -0.4, 0);
                numberLine.add(text);
            });
        }
    }

    // Classe para a solução matemática
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
            for (let x = -7; x <= 1.5; x += 0.05) {
                positions.push(x, Math.sin(x * 2) * 0.05, 0);
                const intensity = 1 - (x + 5) / 6.5;
                const red = 1.0;
                const green = intensity;
                const blue = intensity;
                colors.push(red, green, blue);
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
                color: 0x00ff00,
                emissive: 0x00cc00,
                side: THREE.DoubleSide,
                metalness: 0.7
            });
            this.point = new THREE.Mesh(geometry, material);
            this.point.position.set(1.5, 0, 0);
            this.group.add(this.point);
        }
        update(time) {
            const positions = this.solutionLine.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
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

    // Adiciona os elementos na cena
    scene.add(numberLine);
    new NumberSystem();
    const solution = new MathematicalSolution();
    camera.position.set(0, 20, 5);
	const initialCameraZ = camera.position.z
    camera.lookAt(0, 0, 0);

    // Controle de câmera baseado no movimento do mouse
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
    });

    // Variáveis e função para controle de zoom
    let zoomFactor = 1;
    const ZOOM_SPEED = 0.1;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 5;

    function handleMouseWheel(event) {
        event.preventDefault();
        // Aplica zoom apenas se o modal estiver visível (presume id "retaModal" com classe "show")
        const modal = document.getElementById('retaModal');
        if (modal && !modal.classList.contains('show')) return;
        const delta = Math.sign(event.deltaY);
        zoomFactor += delta * ZOOM_SPEED;
        zoomFactor = Math.min(Math.max(zoomFactor, MIN_ZOOM), MAX_ZOOM);
        // Usa o valor inicial da posição z para calcular o zoom
    camera.position.z = initialCameraZ * zoomFactor;
    }

    // Se o container for o do modal fullscreen, adiciona o event listener para zoom
    if (containerId === 'animationContainerFullscreen') {
        container.addEventListener('wheel', handleMouseWheel, { passive: false });
    }

    // Atualiza o tamanho do renderizador quando a janela é redimensionada
    const resizeHandler = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resizeHandler);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.touchAction = 'none';

    // Loop de animação
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
    animate();

    // Função de cleanup que também remove o listener de zoom, se necessário
    return {
        scene,
        camera,
        renderer,
        animate,
        cleanup: () => {
            window.removeEventListener('resize', resizeHandler);
            if (containerId === 'animationContainerFullscreen') {
                container.removeEventListener('wheel', handleMouseWheel);
            }
            renderer.dispose();
            container.removeChild(renderer.domElement);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia a animação principal
    const mainAnimation = initThreeJS('animationContainer');
    window.mainAnimation = mainAnimation;
});
