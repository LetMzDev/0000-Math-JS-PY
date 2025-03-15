export const state =
{
	zoom_Level: 1,
	rotation: 0,
	flipped: false,
	dark_Mode: true,
	isDragging: false,
	isMouseDown: false,
	startX: 0,
	startY: 0,
	currentX: 0,
	currentY: 0
};

// Abrir Zoom
export function Abrir_Zoom ( imgContainer )
{
	const modal = document.getElementById ( "modalZoom" );
	const modal_Img = document.getElementById ( "img_Zoom" );
	const modal_Legenda = document.getElementById ( "img_Legenda" );

	const img = imgContainer.querySelector ( 'img' );
	const legenda = img.getAttribute ( 'data-legenda' ) || "Sem legenda";

	// Resetar transformações
	state.zoom_Level = 1;
    state.rotation = 0;
    state.flipped = false;
    state.dark_Mode = true;
    state.currentX = 0;
    state.currentY = 0;

	modal.classList.add ( "show" );
	modal.style.display = "block";
	modal_Img.src = img.src;
	modal_Legenda.textContent = legenda;
	Atualizar_Transformacao();

	// Remover tema claro se existir
	modal.classList.remove ( "light" );
}

// Fechar Zoom
export function Fechar_Zoom()
{
	document.getElementById ( "modalZoom" ).style.display = "none";
}

// Atualiza a transformação da imagem
export function Atualizar_Transformacao()
{
	const img_Zoom = document.getElementById ( "img_Zoom" );
	if ( img_Zoom )
	{
		img_Zoom.style.transformOrigin = 'center center';
		img_Zoom.style.transform = `
			translate(${state.currentX}px, ${state.currentY}px)
			scale(${state.zoom_Level}) 
			rotate(${state.rotation}deg) 
			scaleX(${state.flipped ? -1 : 1})
		`;

		img_Zoom.style.transition = 'transform 0.1s linear';
	}
}

// Zoom In
export function Zoom_In()
{
	state.zoom_Level = Math.min ( state.zoom_Level + 0.2, 3 );
	Atualizar_Transformacao();
}

// Zoom Out
export function Zoom_Out()
{
	state.zoom_Level = Math.max ( state.zoom_Level - 0.2, 0.5 );
	Atualizar_Transformacao();
}

// Alternar Modo Claro/Escuro
export function Toggle_Theme()
{
	const modal = document.getElementById ( "modalZoom" );
	state.dark_Mode = !state.dark_Mode;
	modal.classList.toggle ( "light", !state.dark_Mode );
}
