// Código específico para dispositivos móveis
// Centralizar imagem

const modal_Conteudo = document.getElementById ( 'img_Zoom' );

if ( modal_Conteudo )
{
	modal_Conteudo.style.objectFit = 'contain';
	modal_Conteudo.style.height = '90vh';
	modal_Conteudo.style.width = 'auto';
	modal_Conteudo.style.margin = 'auto';
}

// Ajustes no modal para mobile
const modal_Zoom = document.getElementById ( 'modalZoom' );

if ( modal_Zoom )
{
	modal_Zoom.style.overflow = 'hidden';
	modal_Zoom.style.touchAction = 'pan-y';
}

// Reset de posição ao girar o dispositivo
window.addEventListener ( 'resize', () =>
{
	currentX = 0;
	currentY = 0;

	Atualizar_Transformacao();
});
