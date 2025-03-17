// main_step.js
import
{
	Abrir_Zoom,
	Fechar_Zoom,
	Zoom_In,
	Zoom_Out,
	Toggle_Theme
} from './imagens/functions_vars.js';

import './imagens/events.js';

import { Download_Imagem_SVG } from './imagens/download_svg.js';
import { Download_PDF } from './imagens/download_pdf.js';
import { Configurar_Link_Footer } from './components/footer.js';

// Use as funções
window.Abrir_Zoom = Abrir_Zoom;
window.Fechar_Zoom = Fechar_Zoom;
window.Zoom_In = Zoom_In;
window.Zoom_Out = Zoom_Out;
window.Toggle_Theme = Toggle_Theme;

window.Download_Imagem_SVG = Download_Imagem_SVG;
window.Download_PDF = Download_PDF;

Configurar_Link_Footer();

// Mobile
if ( window.innerWidth <= 768 )
	import ( './imagens/mobile.js' );
