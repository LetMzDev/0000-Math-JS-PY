// Código específico para dispositivos móveis

if ( window.innerWidth <= 768 )
{
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
	const modalZoom = document.getElementById ( 'modalZoom' );
	if ( modalZoom )
	{
		modalZoom.style.overflow = 'hidden';
		modalZoom.style.touchAction = 'pan-y';
	}

	// Reset de posição ao girar o dispositivo
	window.addEventListener ( 'resize', () =>
	{
		currentX = 0;
		currentY = 0;

		Atualizar_Transformacao();
	});
}
