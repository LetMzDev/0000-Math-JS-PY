
export function Configurar_Link_Footer()
{
	document.addEventListener ( "DOMContentLoaded", function ()
	{
		const link = document.querySelector (".footer a" );

		if ( link )
		{
			// Pega a variável CSS corretamente e remove aspas extras
			let linkUrl = getComputedStyle(document.querySelector(".footer")).getPropertyValue("--link-url").trim();

			// Verifica se a URL começa com "http" para garantir que seja válida
			if ( linkUrl.startsWith ( "http" ))
				link.href = linkUrl;
		}
	});
}
