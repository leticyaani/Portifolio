document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animação Inicial da Hero Section
    const heroElements = document.querySelectorAll('#reveal > *');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 150 * i);
    });

    // 2. Intersection Observer para Revelar Elementos no Scroll
    const observerOptions = { threshold: 0.1 };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Gatilho específico para barras de progresso
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.getAttribute('data-width');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Lógica do Modal de Imagem
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("full-image");
    const caption = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".modal-close");

    document.querySelectorAll('.clickable-img').forEach(img => {
        img.onclick = function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
            caption.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // Trava o scroll
        }
    });

    const closeModal = () => {
        if(modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Destrava o scroll
        }
    };

    if(closeBtn) closeBtn.onclick = closeModal;
    
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
});