document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    const openBtns = [
        document.getElementById('openModalBtn'),
        document.getElementById('openModalBtnSecondary'),
        document.getElementById('openModalBtnTertiary')
    ];

    openBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('fade-in');
                }, 10);
                document.body.style.overflow = 'hidden'; 
            });
        }
    });

    const closeModal = () => {
        modal.classList.remove('fade-in');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
        document.body.style.overflow = 'auto';
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    const tiltCards = document.querySelectorAll('.js-tilt');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;
            
            const angleX = -(mouseY / cardHeight) * 15;
            const angleY = (mouseX / cardWidth) * 15;
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            card.style.boxShadow = `${-angleY * 1.5}px ${angleX * 1.5}px 30px rgba(0,0,0,0.08), 0 10px 20px rgba(0,0,0,0.04)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.02)';
            card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    const animatedItems = document.querySelectorAll('.anim-fade-in');

    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.08
        });

        animatedItems.forEach(item => {
            scrollObserver.observe(item);
        });
    } else {
        animatedItems.forEach(item => item.classList.add('is-visible'));
    }

    const counters = document.querySelectorAll('.stat-num');

    const animateCounters = (counterElement) => {
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const suffix = counterElement.getAttribute('data-suffix');
        let current = 0;
        const duration = 1500; 
        const increment = target / (duration / 16);

        const update = () => {
            current += increment;
            if (current < target) {
                if (target >= 1000) {
                    let formattedNum = (Math.floor(current) / 1000).toFixed(1);
                    if (formattedNum.endsWith('.0')) formattedNum = Math.floor(current / 1000);
                    counterElement.innerText = formattedNum + suffix;
                } else {
                    counterElement.innerText = Math.floor(current) + suffix;
                }
                requestAnimationFrame(update);
            } else {
                if (target === 15000) counterElement.innerText = '15k+';
                else if (target === 3400) counterElement.innerText = '3.4k+';
                else counterElement.innerText = target + suffix;
            }
        };
        requestAnimationFrame(update);
    };

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => statsObserver.observe(counter));
    } else {
        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix');
            counter.innerText = (target >= 1000 ? (target/1000) : target) + suffix;
        });
    }
});
