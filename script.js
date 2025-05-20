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
// const TEXT_LENGTH_THRESHOLD = 100; // Characters

// function setupReadMore() {
//     const expandableParagraphs = document.querySelectorAll(
//         '#nosotros .nosotros-parrafo, #nosotros ul li p, #talleres > p, .workshop-item > p:not(:last-child)' // Target specific paragraphs
//     );

//     expandableParagraphs.forEach(p => {
//         Ensure we're not adding buttons to already very short paragraphs or those intended for buttons
//         if (p.classList.contains('cta-button') || p.classList.contains('cta-button-small')) {
//             return;
//         }

//         const fullText = p.textContent.trim();
//         if (fullText.length > TEXT_LENGTH_THRESHOLD) {
//             p.classList.add('collapsed-text');

//             const readMoreBtn = document.createElement('button');
//             readMoreBtn.textContent = 'Leer Más';
//             readMoreBtn.classList.add('read-more-btn');
//             const paragraphId = `expandable-${index}`; // Necesitarías dar un índice o ID único al párrafo
//             p.id = paragraphId; // Asignar ID al párrafo
//             readMoreBtn.setAttribute('aria-expanded', 'false');
//             readMoreBtn.setAttribute('aria-controls', paragraphId);
            
//             Insert button after the paragraph
//             p.parentNode.insertBefore(readMoreBtn, p.nextSibling);

//             readMoreBtn.addEventListener('click', function() {
//                 const isExpanded = p.classList.toggle('expanded');
//                 this.textContent = isExpanded ? 'Leer Menos' : 'Leer Más';
//                 this.setAttribute('aria-expanded', isExpanded); // Actualizar ARIA attribute
//             });
//         }
//     });
// }

// setupReadMore();
// --- END: Read More Functionality ---

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
