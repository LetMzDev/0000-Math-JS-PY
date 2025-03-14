// main_step.js
import { Download_Imagem_SVG } from './imagens/download_svg.js';
import { Download_PDF } from './imagens/download_pdf.js';

// Use as funções
window.Download_Imagem_SVG = Download_Imagem_SVG;
window.Download_PDF = Download_PDF;

if ( window.innerWidth <= 768 )
	import ( './imagens/mobile.js' );
