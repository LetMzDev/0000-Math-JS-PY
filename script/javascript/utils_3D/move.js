function createDragHandler ( domElement )
{
	let isDragging = false;
	let previousDragPosition = { x: 0, y: 0 };
	let dragOffset = { x: 0, y: 0 };

	const onMouseDown = (e) =>
	{
		isDragging = true;
		previousDragPosition.x = e.clientX;
		previousDragPosition.y = e.clientY;
	};

	const onMouseMove = ( e ) =>
	{
		if ( isDragging )
		{
			const deltaX = e.clientX - previousDragPosition.x;
			const deltaY = e.clientY - previousDragPosition.y;

			dragOffset.x += deltaX * 0.01;
			dragOffset.y -= deltaY * 0.01;

			previousDragPosition.x = e.clientX;
			previousDragPosition.y = e.clientY;
		}
	};

	const onMouseUp = () =>
	{
		isDragging = false;
	};

	const onMouseLeave = () =>
	{
		isDragging = false;
	};

	domElement.addEventListener ( 'mousedown', onMouseDown );
	domElement.addEventListener ( 'mousemove', onMouseMove );
	domElement.addEventListener ( 'mouseup', onMouseUp );
	domElement.addEventListener ( 'mouseleave', onMouseLeave );

	return {
		cleanup: () =>
		{
			domElement.removeEventListener ( 'mousedown', onMouseDown );
			domElement.removeEventListener ( 'mousemove', onMouseMove );
			domElement.removeEventListener ( 'mouseup', onMouseUp );
			domElement.removeEventListener ( 'mouseleave', onMouseLeave );
		},

		dragOffset
	};
}
