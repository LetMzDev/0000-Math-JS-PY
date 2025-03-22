// Função para obter parâmetros da URL
function getUrlParams()
{
	const params = new URLSearchParams ( window.location.search );
	return {
		Edition_X: params.get ( 'Edition_X' ) || 'X',
		Exercise_W: params.get ( 'Exercise_W' ) || 'W',
		Question_Y: params.get ( 'Question_Y' ) || 'Y',
		Letter_Z: params.get ( 'Letter_Z' ) || 'Z',
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
			James Stewart, Vol.1: ${params.Edition_X}º Edição, ${params.Exercise_W}, Questão ${params.Question_Y} - ${params.Letter_Z}
		`;
	}
});
