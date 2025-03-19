function createLookAtPatch ( camera, dragOffset )
{
	const originalLookAt = camera.lookAt.bind ( camera );
	
	const patchedLookAt = function ( ...args )
	{
		if ( args.length === 1 && args [ 0 ] instanceof THREE.Vector3 )
		{
			const target = args [ 0 ];
			originalLookAt ( new THREE.Vector3 (
				target.x + dragOffset.x,
				target.y + dragOffset.y,
				target.z
			));
		}

		else if ( args.length >= 3 )
		{
			originalLookAt (
				args [ 0 ] + dragOffset.x,
				args [ 1 ] + dragOffset.y,
				args [ 2 ]
			);

		}

		else
			originalLookAt ( ...args );
	};

	// Aplica o patch
	camera.lookAt = patchedLookAt;

	// Retorna função para restaurar o original
	return () =>
	{
		camera.lookAt = originalLookAt;
	};
}
