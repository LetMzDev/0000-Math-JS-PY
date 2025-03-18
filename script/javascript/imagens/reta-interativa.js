let fullscreenAnimation = null;

document.getElementById('retaModal').addEventListener('shown.bs.modal', function() {
    // Esperar o modal terminar a transição
    setTimeout(() => {
        // Destruir instância anterior se existir
        if(fullscreenAnimation) {
            fullscreenAnimation.cleanup();
        }
        
        // Inicializar nova instância
        fullscreenAnimation = initThreeJS('animationContainerFullscreen');
        
        // Forçar redimensionamento inicial
        window.dispatchEvent(new Event('resize'));
    }, 50);
});

document.getElementById('retaModal').addEventListener('hidden.bs.modal', function() {
    if(fullscreenAnimation) {
        fullscreenAnimation.cleanup();
        fullscreenAnimation = null;
    }
});

function abrirModalReta() {
    const modal = new bootstrap.Modal(document.getElementById('retaModal'));
    modal.show();
}