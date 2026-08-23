document.addEventListener('DOMContentLoaded', () => {
    
    
    const animatedItems = document.querySelectorAll('.anim-fade-in');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    animatedItems.forEach(item => {
        scrollObserver.observe(item);
    });

    
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

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => statsObserver.observe(counter));
});
