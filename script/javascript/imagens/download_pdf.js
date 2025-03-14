// Baixar PDF

export async function Download_PDF()
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
