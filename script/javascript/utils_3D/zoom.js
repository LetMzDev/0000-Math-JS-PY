function createZoomHandler ( camera, container, initialCameraZ )
{
	const ZOOM_SPEED = 0.1;
	const MIN_ZOOM = 0.5;
	const MAX_ZOOM = 5;
	let zoomFactor = 1;

	function handleMouseWheel ( event )
	{
		event.preventDefault();

		const modal = document.getElementById ( 'retaModal' );
		if ( modal && !modal.classList.contains ('show' ))
			return;

		const delta = Math.sign ( event.deltaY );
		zoomFactor += delta * ZOOM_SPEED;
		zoomFactor = Math.min ( Math.max ( zoomFactor, MIN_ZOOM ), MAX_ZOOM );

		camera.position.z = initialCameraZ * zoomFactor;
	}

	container.addEventListener ( 'wheel', handleMouseWheel, { passive: false });

	// Retorna uma função para remover o listener durante o cleanup
	return () =>
	{
		container.removeEventListener ( 'wheel', handleMouseWheel );
	};
}
