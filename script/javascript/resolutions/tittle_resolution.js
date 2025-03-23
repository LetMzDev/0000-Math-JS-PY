// Função para obter parâmetros da URL
function getUrlParams()
{
	const params = new URLSearchParams ( window.location.search );
	return {
		Livro_L: params.get ( 'Livro_L' ) || '',
		Volume_V: params.get ( 'Volume_V' ) || '',
		Edition_X: params.get ( 'Edition_X' ) || '',
		Exercise_W: params.get ( 'Exercise_W' ) || '',
		Question_Y: params.get ( 'Question_Y' ) || '',
		Letter_Z: params.get ( 'Letter_Z' ) || '',
	};
}

// Atualizar o conteúdo dinamicamente
window.addEventListener ( 'DOMContentLoaded', () =>
{
	const params = getUrlParams();
	const header = document.querySelector ( '.card-header' );

	if ( header )
	{
		header.innerHTML = `
			<i class="fas fa-calculator"></i> 
			${params.Livro_L}, ${params.Volume_V}: ${params.Edition_X}º Edição, ${params.Exercise_W} ${params.Question_Y} ${params.Letter_Z}
		`;
	}
});
