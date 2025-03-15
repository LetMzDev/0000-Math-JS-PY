// Exibe a quantidade de itens concluídos, o total de itens e a taxa percentual de conclusão.

export function Calcular_Percentual()
{
	document.querySelectorAll ( "span[data-num1][data-num2]" ).forEach ( span =>
	{
		let num1 = parseFloat ( span.getAttribute ( "data-num1" ));
		let num2 = parseFloat ( span.getAttribute ( "data-num2" ));

		if ( !isNaN ( num1 ) && !isNaN ( num2 ) && num2 !== 0 )
		{
			let percentual = ( num1 / num2 ) * 100;
			span.innerHTML = `( ${num1} / ${num2} ) ${percentual.toFixed(2)}% <i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>`;
		}

		else
		span.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #93b079; margin-right: 5px;"></i> Erro`;
	});
}

Calcular_Percentual();
