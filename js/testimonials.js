// Função para criar um card de depoimento
function createTestimonialCard(testimonial) {
  const card = document.createElement('div');
  card.className = 'testimonial-card bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm border border-zinc-800 hover:border-purple-500 transition-all duration-300 snap-center';
  card.style.minWidth = '300px';
  card.style.maxWidth = '300px';
  
  card.innerHTML = `
    <div class="relative">
      <div class="absolute -top-2 -left-2 text-6xl text-purple-500/10 font-serif">"</div>
      <div class="relative z-10">
        <p class="text-gray-300 text-sm mb-6">${testimonial.text}</p>
        <div class="flex items-center">
          <img src="${testimonial.avatar}" alt="${testimonial.author}" class="w-12 h-12 rounded-full object-cover border-2 border-purple-500">
          <div class="ml-4">
            <h4 class="font-medium text-purple-500">${testimonial.author}</h4>
            <p class="text-sm text-gray-400">${testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// Função para criar os indicadores do carrossel
function createTestimonialDots(testimonials) {
  const dotsContainer = document.getElementById('testimonialDots');
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full bg-purple-500 opacity-50 transition-all duration-300 hover:opacity-100 ${index === 0 ? 'opacity-100' : ''}`;
    dot.addEventListener('click', () => {
      const carousel = document.getElementById('testimonialsCarousel');
      const cards = carousel.querySelectorAll('.testimonial-card');
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      
      // Atualizar o estado ativo dos indicadores
      dotsContainer.querySelectorAll('button').forEach(d => d.classList.remove('opacity-100'));
      dot.classList.add('opacity-100');
    });
    dotsContainer.appendChild(dot);
  });
}

// Função para inicializar o carrossel
async function initTestimonialsCarousel() {
  try {
    const response = await fetch('data/testimonials.json');
    const testimonials = await response.json();
    
    const carousel = document.getElementById('testimonialsCarousel');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    // Criar e adicionar os cards ao carrossel
    testimonials.forEach(testimonial => {
      const card = createTestimonialCard(testimonial);
      carousel.appendChild(card);
    });
    
    // Criar os indicadores do carrossel
    createTestimonialDots(testimonials);
    
    // Adicionar eventos de clique aos botões de navegação
    prevButton.addEventListener('click', () => {
      carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    nextButton.addEventListener('click', () => {
      carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
    
    // Atualizar os indicadores ao rolar o carrossel
    carousel.addEventListener('scroll', () => {
      const cards = carousel.querySelectorAll('.testimonial-card');
      const dots = document.querySelectorAll('#testimonialDots button');
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.left >= 0 && rect.right <= window.innerWidth;
        
        if (isVisible) {
          dots.forEach(d => d.classList.remove('opacity-100'));
          dots[index].classList.add('opacity-100');
        }
      });
    });
  } catch (error) {
    console.error('Erro ao carregar os depoimentos:', error);
  }
}

// Inicializar o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel); 