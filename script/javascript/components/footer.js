// footer.js

export function Configurar_Link_Footer()
{
	document.addEventListener("DOMContentLoaded", function ()
	{
		// Cria elementos dinamicamente
		const footerDiv = document.createElement ( 'div' );
		footerDiv.className = 'footer';

		const paragraph = document.createElement ( 'p' );
		paragraph.textContent = 'Criado por ';

		const link = document.createElement ( 'a' );
		link.textContent = 'LetMzDev';
		link.href = '#';
		link.target = '_blank';

		// Monta a estrutura
		paragraph.appendChild ( link );
		footerDiv.appendChild ( paragraph );
		document.body.appendChild ( footerDiv );

		// Configuração do link (mantida da versão original)
		let linkUrl = getComputedStyle ( footerDiv ).getPropertyValue ( "--link-url" ).trim();

		if ( linkUrl.startsWith ( "http" ))
			link.href = linkUrl;
	});
}
