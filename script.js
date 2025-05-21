document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML project loaded');
    if (document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }
    // --- START: Navegación ---
    const mainNav = document.getElementById('mainNav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Selecciona secciones con ID

    // Funcionalidad del menú hamburguesa
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
            } else {
                navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace (para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Resaltado de enlace activo al hacer scroll
    function highlightActiveLink() {
        let scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Ajuste para la altura de la barra de navegación fija
            const sectionTop = current.offsetTop - (mainNav ? mainNav.offsetHeight : 0) - 50; // 50px de margen adicional
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Caso especial para la sección superior (header-hero) si se quiere resaltar el logo o "Nosotros"
        if (currentSectionId === '' && scrollY < (sections[0] ? sections[0].offsetTop - (mainNav ? mainNav.offsetHeight : 0) - 50 : 500) ) {
             // Si estás muy arriba, podrías querer que ningún enlace esté activo o uno por defecto
             // Por ejemplo, si tu primera sección enlazable es #nosotros:
             // document.querySelector('.nav-link[href="#nosotros"]').classList.add('active');
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Llama una vez al cargar para el estado inicial

    const instalacionesCarousel = document.getElementById('instalacionesCarousel');
    if (instalacionesCarousel) {
        const itemsContainer = instalacionesCarousel.querySelector('.carousel-items');
        const items = instalacionesCarousel.querySelectorAll('.carousel-item');
        const prevButton = instalacionesCarousel.querySelector('.carousel-button.prev');
        const nextButton = instalacionesCarousel.querySelector('.carousel-button.next');
        const indicatorsContainer = instalacionesCarousel.querySelector('.carousel-indicators');
        let currentIndex = 0;
        const totalItems = items.length;

        // Función para mostrar el slide
        function showSlide(index) {
            // Ocultar todos los items
            items.forEach(item => item.classList.remove('active'));
            // Mostrar el item actual
            items[index].classList.add('active');

            if (indicatorsContainer) {
                // Actualizar indicadores
                Array.from(indicatorsContainer.children).forEach((indicator, idx) => {
                    indicator.classList.toggle('active', idx === index);
                });
            }
            currentIndex = index; // Actualizar el índice actual
        }

        // Crear indicadores si el contenedor existe
        if (indicatorsContainer && totalItems > 0) {
            indicatorsContainer.innerHTML = ''; // Limpiar indicadores existentes
            for (let i = 0; i < totalItems; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                if (i === currentIndex) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => showSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
        }

        // Event listeners para botones prev/next
        if (prevButton && nextButton && totalItems > 0) {
            prevButton.addEventListener('click', () => {
                let newIndex = (currentIndex - 1 + totalItems) % totalItems;
                showSlide(newIndex);
            });

            nextButton.addEventListener('click', () => {
                let newIndex = (currentIndex + 1) % totalItems;
                showSlide(newIndex);
            });
        }
        
        // Mostrar el primer slide inicialmente si hay items
        if (totalItems > 0) {
            showSlide(currentIndex);
        }
    }
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const itemsContainer = testimonialCarousel.querySelector('.testimonial-carousel-items');
        const slides = testimonialCarousel.querySelectorAll('.testimonial-slide'); // Ahora trabajamos con slides
        const prevButton = testimonialCarousel.querySelector('.testimonial-prev');
        const nextButton = testimonialCarousel.querySelector('.testimonial-next');
        const indicatorsContainer = testimonialCarousel.querySelector('.testimonial-indicators');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function showTestimonialSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');

            if (indicatorsContainer) {
                Array.from(indicatorsContainer.children).forEach((indicator, idx) => {
                    indicator.classList.toggle('active', idx === index);
                });
            }
            currentIndex = index;
        }

        if (indicatorsContainer && totalSlides > 0) {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator'); // Reutiliza la clase 'indicator'
                if (i === currentIndex) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => showTestimonialSlide(i));
                indicatorsContainer.appendChild(indicator);
            }
        }

        if (prevButton && nextButton && totalSlides > 0) {
            prevButton.addEventListener('click', () => {
                let newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                showTestimonialSlide(newIndex);
            });

            nextButton.addEventListener('click', () => {
                let newIndex = (currentIndex + 1) % totalSlides;
                showTestimonialSlide(newIndex);
            });
        }

        if (totalSlides > 0) {
            showTestimonialSlide(currentIndex); // Mostrar el primer slide
        }
    }
    // --- START: Legal Sections Toggle ---
    const legalToggleLinks = document.querySelectorAll('.legal-toggle');
    const legalSections = document.querySelectorAll('.legal-section');
    let currentlyVisibleLegalSection = null; // Para rastrear la sección visible

    legalToggleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previene el comportamiento de ancla por defecto
            const targetId = this.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (!targetSection) return;

            // Ocultar cualquier otra sección legal que esté visible
            legalSections.forEach(section => {
                if (section !== targetSection && section.classList.contains('visible')) {
                    section.classList.remove('visible');
                    section.setAttribute('aria-hidden', 'true');
                }
            });

            // Mostrar/ocultar la sección clickeada
            const isNowVisible = targetSection.classList.toggle('visible');
            targetSection.setAttribute('aria-hidden', !isNowVisible);

            if (isNowVisible) {
                currentlyVisibleLegalSection = targetSection;
                // Smooth scroll hasta la sección
                const mainNav = document.getElementById('mainNav');
                const navHeight = mainNav ? mainNav.offsetHeight : 0;
                const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20; // 20px de margen extra

                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            } else {
                currentlyVisibleLegalSection = null;
            }
        });
    });

    // Ocultar sección legal si se hace scroll hacia arriba y ya no está visible
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (!currentlyVisibleLegalSection) return;

        const st = window.pageYOffset || document.documentElement.scrollTop;
        const sectionRect = currentlyVisibleLegalSection.getBoundingClientRect();

        // Si se está haciendo scroll hacia arriba Y la parte inferior de la sección está por encima del viewport
        if (st < lastScrollTop && sectionRect.bottom < 0) {
            // O si la parte superior de la sección está muy por debajo del viewport (scroll rápido hacia abajo más allá de ella)
            // Esto es más complejo de determinar de forma fiable para todos los casos de scroll rápido.
            // Nos enfocaremos en el scroll hacia arriba y que la sección salga por la parte superior.

            currentlyVisibleLegalSection.classList.remove('visible');
            currentlyVisibleLegalSection.setAttribute('aria-hidden', 'true');
            currentlyVisibleLegalSection = null;
        }
        lastScrollTop = st <= 0 ? 0 : st; // Para el manejo del scroll en la parte superior.
    }, false);
    // --- END: Legal Sections Toggle ---

    // --- START: Collapsible H3 Sections ---
    const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
    const activeCollapsibles = new Set(); // Para rastrear los H3 activos cuyo contenido está visible

    collapsibleTriggers.forEach(trigger => {
        const content = trigger.nextElementSibling; // Asume que el .collapsible-content sigue inmediatamente
                                                  // O si usas la estructura de .collapsible-container:
                                                  // const content = trigger.parentElement.querySelector('.collapsible-content');


        if (content && content.classList.contains('collapsible-content')) {
            // Inicialmente ocultar, el CSS ya lo hace, pero JS puede manejar aria
            content.setAttribute('aria-hidden', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-controls', content.id || (content.id = `collapsible-content-${Math.random().toString(36).substr(2, 9)}`));


            trigger.addEventListener('click', function() {
                const isCurrentlyExpanded = this.classList.toggle('expanded');
                content.classList.toggle('visible');
                content.setAttribute('aria-hidden', !isCurrentlyExpanded);
                this.setAttribute('aria-expanded', isCurrentlyExpanded);

                if (isCurrentlyExpanded) {
                    activeCollapsibles.add(trigger.parentElement); // Añadir el .collapsible-container
                } else {
                    activeCollapsibles.delete(trigger.parentElement);
                }
            });
        }
    });

    // Ocultar contenido colapsable si su .collapsible-container sale de la vista al hacer scroll hacia arriba
    let lastScrollTopCollapsible = 0;
    const navHeightForCollapsible = document.getElementById('mainNav') ? document.getElementById('mainNav').offsetHeight : 0;

    window.addEventListener('scroll', function() {
        if (activeCollapsibles.size === 0) return;

        const st = window.pageYOffset || document.documentElement.scrollTop;

        activeCollapsibles.forEach(container => {
            const trigger = container.querySelector('.collapsible-trigger');
            const content = container.querySelector('.collapsible-content');
            if (!trigger || !content || !content.classList.contains('visible')) return;

            const containerRect = container.getBoundingClientRect();

            // Condición para ocultar:
            // 1. Scroll hacia arriba (st < lastScrollTopCollapsible)
            // 2. Y la parte INFERIOR del contenedor está ARRIBA del borde superior del viewport (ha salido completamente por arriba)
            // O la parte SUPERIOR del contenedor está DEBAJO del borde superior de la barra de navegación (ha salido completamente por arriba, considerando la nav)
            const containerBottomOutOfView = containerRect.bottom < 0;
            const containerTopOutOfViewConsideringNav = containerRect.top < navHeightForCollapsible && containerRect.bottom < navHeightForCollapsible;


            // Ocultar si el H3 (trigger) ya no está visible o muy poco visible
            // Este es un enfoque más simple: si el H3 mismo (el trigger) está fuera de la vista
            const triggerRect = trigger.getBoundingClientRect();
            const triggerOutOfView = triggerRect.bottom < navHeightForCollapsible; // El trigger está completamente por encima de la nav


            if (st < lastScrollTopCollapsible && triggerOutOfView) {
                 if (trigger.classList.contains('expanded')) {
                    trigger.classList.remove('expanded');
                    content.classList.remove('visible');
                    content.setAttribute('aria-hidden', 'true');
                    trigger.setAttribute('aria-expanded', 'false');
                    activeCollapsibles.delete(container); // Eliminar de activos
                }
            }
        });

        lastScrollTopCollapsible = st <= 0 ? 0 : st;
    }, false);
    // --- END: Collapsible H3 Sections ---

});
// Smooth scrolling for anchor links (asegúrate que considera la altura de la nav fija)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        // Evita que el smooth scroll se active para enlaces que no son de sección (ej. si tuvieras otros #)
        if (hrefAttribute === "#" || !document.querySelector(hrefAttribute)) return;
        
        const targetElement = document.querySelector(hrefAttribute);
        if (targetElement) {
            e.preventDefault();
            const mainNav = document.getElementById('mainNav');
            const navHeight = mainNav ? mainNav.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
// JavaScript to trigger animations on scroll

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'animate' class to elements in viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-up'); // Select elements with animation classes
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Run on page load to animate elements already in viewport
animateOnScroll();
// --- START: Read More Functionality ---
const TEXT_LENGTH_THRESHOLD = 200; // Reducido para probar más fácilmente
const LINES_TO_SHOW_COLLAPSED = 4; // Coincide con -webkit-line-clamp y max-height

function setupReadMore() {
    const expandableElements = document.querySelectorAll(
        // Sé más específico con las clases si es necesario, o usa un atributo data-expandable
        //'#nosotros .nosotros-parrafo, #nosotros ul li p, #talleres > p, .workshop-item > p'
        '.workshop-item > p'
    );

    expandableElements.forEach((element, index) => {
        if (element.classList.contains('cta-button') || element.classList.contains('cta-button-small')) {
            return;
        }

        // Guardar el texto original si vamos a manipular el contenido directamente (no necesario con line-clamp)
        // const originalFullText = element.innerHTML; // o textContent

        // Verificar si el contenido realmente excede la altura colapsada
        // Esta es una forma de comprobar si el texto está siendo truncado visualmente.
        // scrollHeight será mayor que clientHeight si hay overflow.
        // Para que esto funcione bien, el elemento no debe tener 'expanded' al inicio.
        const isClamped = element.scrollHeight > element.clientHeight || element.textContent.length > TEXT_LENGTH_THRESHOLD;


        if (isClamped || element.textContent.length > TEXT_LENGTH_THRESHOLD) { // Doble verificación
            element.classList.add('collapsed-text');
            
            // Evitar añadir múltiples botones si la función se llama varias veces
            if (element.nextElementSibling && element.nextElementSibling.classList.contains('read-more-btn')) {
                return;
            }

            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Leer Más';
            readMoreBtn.classList.add('read-more-btn');
            const paragraphId = `expandable-text-${index}`;
            element.id = paragraphId; // Asignar ID al párrafo para ARIA si se usa
            readMoreBtn.setAttribute('aria-expanded', 'false');
            readMoreBtn.setAttribute('aria-controls', paragraphId);
            
            element.parentNode.insertBefore(readMoreBtn, element.nextSibling);

            readMoreBtn.addEventListener('click', function() {
                const isNowExpanded = element.classList.toggle('expanded');
                element.classList.toggle('collapsed-text', !isNowExpanded); // Asegura que collapsed-text se quite
                
                this.textContent = isNowExpanded ? 'Leer Menos' : 'Leer Más';
                this.setAttribute('aria-expanded', isNowExpanded);
            });
        }
    });
}

// Llamar a la función después de que el contenido esté cargado y renderizado
// Si el contenido se carga dinámicamente, puede que necesites llamarla de nuevo
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupReadMore);
} else {
    setupReadMore(); // Ya cargado
}
// --- END: Read More Functionality ---
