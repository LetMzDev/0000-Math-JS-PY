document.getElementById ( "toggleAll" ).addEventListener ( "click", function()
{
	const accordions = document.querySelectorAll ( ".accordion-collapse" );
	const isExpanded = this.textContent.includes ( "Recolher" );

	accordions.forEach ( acc =>
	{
		if ( isExpanded )
			acc.classList.remove ( "show" );

		else
			acc.classList.add ( "show" );

	});

	this.textContent = isExpanded ? "Expandir Todos" : "Recolher Todos";
});
