let zoom_Level = 1;
let rotation = 0;
let flipped = false;
let dark_Mode = true;

// Mover a imagem
let isDragging = false;
let isMouseDown = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

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
	currentX = 0;
	currentY = 0;

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
			translate(${currentX}px, ${currentY}px)
			scale(${zoom_Level}) 
			rotate(${rotation}deg) 
			scaleX(${flipped ? -1 : 1})
		`;

		img_Zoom.style.transition = 'transform 0.1s linear';
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
		link.download = "imagem_zoom.svg";

		document.body.appendChild ( link );
		link.click();
		document.body.removeChild ( link );
	}
}

// Baixar PDF
async function Download_PDF()
{
	const loader = document.createElement ( 'div' );
	loader.style.cssText = `
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 20px;
		background: rgba(0,0,0,0.8);
		color: white;
		border-radius: 5px;
		z-index: 9999;
	`;

	loader.textContent = 'Gerando PDF...';
	document.body.appendChild ( loader );

	try
	{
		const modal_Img = document.getElementById ( 'img_Zoom' );
		const { jsPDF } = window.jspdf;

		const canvas = document.createElement ( 'canvas' );
		const ctx = canvas.getContext ( '2d' );

		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = modal_Img.src;

		await new Promise (( resolve, reject ) =>
		{
			img.onload = resolve;
			img.onerror = reject;
		});

		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		ctx.drawImage ( img, 0, 0 );

		const pdf = new jsPDF (
		{
			orientation: canvas.width > canvas.height ? 'l' : 'p',
			unit: 'mm',
			format: [ canvas.width * 0.264583, canvas.height * 0.264583 ]
		});

		const imgData = canvas.toDataURL ( 'image/jpeg', 1.0 );

		// Parte da proporção (segundo código)
		const widthRatio = pdf.internal.pageSize.getWidth() / canvas.width;
		const heightRatio = pdf.internal.pageSize.getHeight() / canvas.height;
		const ratio = Math.min(widthRatio, heightRatio);

		pdf.addImage (
			imgData,
			'JPEG',
			0,
			0,
			canvas.width * ratio,
			canvas.height * ratio
		);

		pdf.save ( 'diagrama.pdf' );

	}

	catch ( error )
	{
		console.error ( 'Erro ao gerar PDF:', error );
		alert ( 'Erro ao exportar PDF. Verifique o console para detalhes.' );
	}

	finally
	{
		document.body.removeChild(loader);
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

// Detectar clique pressionado para arrastar
document.getElementById ( "img_Zoom" ).addEventListener ( "mousedown", function ( e )
{
	isMouseDown = true;
	startX = e.clientX - currentX;
	startY = e.clientY - currentY;

	setTimeout(() =>
	{
		if ( isMouseDown )
			isDragging = true;

	}, 100);
});

document.addEventListener ( "mousemove", function ( e )
{
	if ( isDragging )
	{
		currentX = e.clientX - startX;
		currentY = e.clientY - startY;
		Atualizar_Transformacao();
	}
});

document.addEventListener ( "mouseup", function ()
{
	isMouseDown = false;
	isDragging = false;
});

// Touch events ( mobile )

document.getElementById ( "img_Zoom" ).addEventListener ( "touchstart", function ( e )
{
	isMouseDown = true;
	const touch = e.touches [ 0 ];
	startX = touch.clientX - currentX;
	startY = touch.clientY - currentY;

	setTimeout(() =>
	{
		if ( isMouseDown ) isDragging = true;
	}, 100);
});

document.addEventListener ( "touchmove", function ( e )
{
	if ( isDragging )
	{
		const touch = e.touches [ 0 ];
		currentX = touch.clientX - startX;
		currentY = touch.clientY - startY;

		Atualizar_Transformacao();
		e.preventDefault(); // Impede o scroll da página
	}
}, { passive: false });

document.addEventListener ( "touchend", function()
{
	isMouseDown = false;
	isDragging = false;
});
