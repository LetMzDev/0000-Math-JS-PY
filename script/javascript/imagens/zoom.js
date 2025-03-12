let zoom_Level = 1;
let rotation = 0;
let flipped = false;
let dark_Mode = true;

// Abrir Zoom
function Abrir_Zoom ( imgContainer )
{
	const modal = document.getElementById ( "modalZoom" );
	const modal_Img = document.getElementById ( "img_Zoom" );
	const modal_Legenda = document.getElementById ( "img_Legenda" );

	const img = imgContainer.querySelector ( 'img' );
	const legenda = img.getAttribute ( 'data-legenda' ) || "Sem legenda";

	// Resetar transformações
	zoom_Level = 1;
	rotation = 0;
	flipped = false;
	dark_Mode = true;

	modal.classList.add ( "show" );
	modal.style.display = "block";
	modal_Img.src = img.src;
	modal_Legenda.textContent = legenda;
	Atualizar_Transformacao();

	// Remover tema claro se existir
	modal.classList.remove ( "light" );
}

// Fechar Zoom
function Fechar_Zoom()
{
	document.getElementById ( "modalZoom" ).style.display = "none";
}

// Atualiza a transformação da imagem
function Atualizar_Transformacao()
{
	const img_Zoom = document.getElementById ( "img_Zoom" );
	if ( img_Zoom )
	{
		img_Zoom.style.transformOrigin = 'center center';
		img_Zoom.style.transform = `
			scale(${zoom_Level}) 
			rotate(${rotation}deg) 
			scaleX(${flipped ? -1 : 1})
		`;
		img_Zoom.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
	}
}

// Zoom In
function Zoom_In()
{
	zoom_Level = Math.min ( zoom_Level + 0.2, 3 );
	Atualizar_Transformacao();
}

// Zoom Out
function Zoom_Out()
{
	zoom_Level = Math.max ( zoom_Level - 0.2, 0.5 );
	Atualizar_Transformacao();
}

// Alternar Modo Claro/Escuro
function Toggle_Theme()
{
	const modal = document.getElementById ( "modalZoom" );
	dark_Mode = !dark_Mode;
	modal.classList.toggle ( "light", !dark_Mode );
}

// Baixar Imagem
function Download_Imagem()
{
	const modal_Img = document.getElementById ( "img_Zoom" );

	if ( modal_Img && modal_Img.src )
	{
		const link = document.createElement ( "a" );
		link.href = modal_Img.src;
		link.download = "imagem_zoom.png";

		document.body.appendChild ( link );
		link.click();
		document.body.removeChild ( link );
	}
}

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
