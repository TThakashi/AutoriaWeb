// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo (hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Alterar ícone do botão
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Atualizar link ativo
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Atualizar link ativo durante a rolagem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Verificar cada seção
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Carrossel de JavaScript
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        // Remover classe active de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Adicionar classe active ao slide atual
        slides[currentSlide].classList.add('active');
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Função para próximo slide
    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };
    
    // Função para slide anterior
    window.prevSlide = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };
    
    // Adicionar evento aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Inicializar carrossel
    updateCarousel();
    
    // Auto-play do carrossel (opcional)
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play ao interagir com o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Botão de copiar código
    window.copyCode = function(codeId) {
        const codeElement = document.getElementById(codeId);
        const codeText = codeElement.innerText;
        
        navigator.clipboard.writeText(codeText).then(function() {
            // Feedback visual
            const copyBtn = document.querySelector(`#${codeId}`).parentElement.parentElement.querySelector('.copy-btn');
            const originalIcon = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = '#4ade80';
            
            setTimeout(function() {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.color = '';
            }, 2000);
        }).catch(function(err) {
            console.error('Erro ao copiar código: ', err);
        });
    };
    
    // Demo: Menu responsivo
    window.toggleDemoMenu = function() {
        const demoMenu = document.getElementById('demo-menu');
        demoMenu.style.display = demoMenu.style.display === 'block' ? 'none' : 'block';
    };
    
    // Demo: Alternar tema
    window.toggleTheme = function() {
        const themeDemo = document.querySelector('.theme-demo');
        const currentBg = themeDemo.style.backgroundColor;
        
        if (currentBg === 'rgb(31, 41, 55)') {
            themeDemo.style.backgroundColor = '#f3f4f6';
            themeDemo.style.color = '#1f2937';
        } else {
            themeDemo.style.backgroundColor = '#1f2937';
            themeDemo.style.color = '#f9fafb';
        }
    };
    
    // Demo: Calculadora
    window.calculate = function(operation) {
        const num1 = parseFloat(document.getElementById('num1').value) || 0;
        const num2 = parseFloat(document.getElementById('num2').value) || 0;
        let result;
        
        switch(operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num2 !== 0 ? num1 / num2 : 'Erro: divisão por zero';
                break;
            default:
                result = 0;
        }
        
        document.querySelector('#calc-result span').textContent = result;
    };
    
    // Demo: Mostrar recursos adicionais
    window.showResources = function() {
        const resources = [
            'MDN Web Docs - Referência completa de HTML, CSS e JavaScript',
            'W3Schools - Tutoriais interativos para iniciantes',
            'FreeCodeCamp - Cursos gratuitos de desenvolvimento web',
            'CSS-Tricks - Dicas e truques de CSS',
            'JavaScript.info - Tutorial moderno de JavaScript'
        ];
        
        let message = 'Recursos recomendados para aprender mais:\n\n';
        resources.forEach((resource, index) => {
            message += `${index + 1}. ${resource}\n`;
        });
        
        alert(message);
    };
    
    // Animações ao rolar a página
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.card, .content-wrapper, .comparison-box, .opportunity');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Adicionar classe para animação CSS
    const style = document.createElement('style');
    style.textContent = `
        .card, .content-wrapper, .comparison-box, .opportunity {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .card.animate-in, .content-wrapper.animate-in, 
        .comparison-box.animate-in, .opportunity.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .content-wrapper:nth-child(even).animate-in {
            transition-delay: 0.2s;
        }
        
        .content-wrapper:nth-child(odd).animate-in {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
});