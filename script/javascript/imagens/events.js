import { state, Atualizar_Transformacao, Fechar_Zoom } from './functions_vars.js';

// Fechar modal apenas com botão "X" ou ESC
document.addEventListener ( 'keydown', function ( e )
{
	if ( e.key === "Escape" )
		Fechar_Zoom();
});

// Impedir fechamento ao clicar na imagem ou nos botões
document.getElementById ( "img_Zoom" ).addEventListener ( 'click', function ( e )
{
	e.stopPropagation();
});

document.querySelectorAll ( ".modal-controles button" ).forEach ( button =>
{
	button.addEventListener ( "click", function ( e )
	{
		e.stopPropagation();
	});
});

// Detectar clique pressionado para arrastar
document.getElementById ( "img_Zoom" ).addEventListener ( "mousedown", function ( e )
{
	state.isMouseDown = true;
	state.startX = e.clientX - state.currentX;
	state.startY = e.clientY - state.currentY;

	setTimeout(() =>
	{
		if ( state.isMouseDown )
			state.isDragging = true;

	}, 100);
});

document.addEventListener ( "mousemove", function ( e )
{
	if ( state.isDragging )
	{
		state.currentX = e.clientX - state.startX;
		state.currentY = e.clientY - state.startY;
		Atualizar_Transformacao();
	}
});

document.addEventListener ( "mouseup", function ()
{
	state.isMouseDown = false;
	state.isDragging = false;
});

// Touch events ( mobile )

document.getElementById ( "img_Zoom" ).addEventListener ( "touchstart", function ( e )
{
	state.isMouseDown = true;
	const touch = e.touches [ 0 ];
	state.startX = touch.clientX - state.currentX;
	state.startY = touch.clientY - state.currentY;

	setTimeout(() =>
	{
		if ( state.isMouseDown ) state.isDragging = true;
	}, 100);
});

document.addEventListener ( "touchmove", function ( e )
{
	if ( state.isDragging )
	{
		const touch = e.touches [ 0 ];
		state.currentX = touch.clientX - state.startX;
		state.currentY = touch.clientY - state.startY;

		Atualizar_Transformacao();
		e.preventDefault(); // Impede o scroll da página
	}
}, { passive: false });

document.addEventListener ( "touchend", function()
{
	state.isMouseDown = false;
	state.isDragging = false;
});
