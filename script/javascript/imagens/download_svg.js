// download_svg.js
export function Download_Imagem_SVG ()
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
