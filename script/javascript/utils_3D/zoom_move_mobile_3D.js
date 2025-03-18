
// Zoom
document.getElementById('animationContainer').addEventListener('wheel', function(event) {
	event.preventDefault();
	const delta = Math.sign(event.deltaY);
	window.mainAnimation.camera.position.z += delta * 0.5; // Ajuste a sensibilidade do zoom
}, { passive: false });



// Move

window.addEventListener("load", function() {
	const container = document.getElementById('animationContainer');
	// Seleciona o elemento canvas criado pelo script
	const canvas = container.querySelector('canvas');
	if (canvas) {
	  // Evita que o navegador trate o toque como scroll, por exemplo
	  canvas.style.touchAction = 'none';

	  canvas.addEventListener('touchstart', function(e) {
		const touch = e.touches[0];
		const mouseEvent = new MouseEvent('mousedown', {
		  clientX: touch.clientX,
		  clientY: touch.clientY,
		  bubbles: true,
		  cancelable: true
		});
		canvas.dispatchEvent(mouseEvent);
	  }, false);

	  canvas.addEventListener('touchmove', function(e) {
		const touch = e.touches[0];
		const mouseEvent = new MouseEvent('mousemove', {
		  clientX: touch.clientX,
		  clientY: touch.clientY,
		  bubbles: true,
		  cancelable: true
		});
		canvas.dispatchEvent(mouseEvent);
		e.preventDefault(); // Evita o scroll da página
	  }, false);

	  canvas.addEventListener('touchend', function(e) {
		const mouseEvent = new MouseEvent('mouseup', {
		  bubbles: true,
		  cancelable: true
		});
		canvas.dispatchEvent(mouseEvent);
	  }, false);
	} else {
	  console.warn("Elemento canvas não encontrado.");
	}
  });