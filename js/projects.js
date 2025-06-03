// Função para criar um card de projeto
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card bg-zinc-900/80 rounded-lg overflow-hidden backdrop-blur-sm border border-zinc-800 hover:border-purple-500 transition-all duration-300 snap-center';
  card.style.minWidth = '300px';
  card.style.maxWidth = '300px';
  
  card.innerHTML = `
    <div class="relative overflow-hidden">
      <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2 text-purple-500">${project.title}</h3>
      <p class="text-gray-400 text-sm mb-4 line-clamp-3">${project.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.technologies.map(tech => `
          <span class="px-2 py-1 text-xs rounded-full ${tech.color}">${tech.name}</span>
        `).join('')}
      </div>
      <button class="view-project-btn w-full bg-purple-500 text-zinc-900 py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
        Ver Projeto
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  `;
  
  // Adicionar evento de clique para abrir o modal
  const viewButton = card.querySelector('.view-project-btn');
  viewButton.addEventListener('click', () => openProjectModal(project));
  
  return card;
}

// Função para abrir o modal do projeto
function openProjectModal(project) {
  const modal = document.getElementById('projectModal');
  const video = document.getElementById('modalVideo');
  const title = document.getElementById('modalTitle');
  const description = document.getElementById('modalDescription');
  const technologies = document.getElementById('modalTechnologies');
  const link = document.getElementById('modalLink');
  
  // Atualizar o conteúdo do modal
  video.innerHTML = `
    <source src="${project.video}" type="video/webm">
    <source src="${project.video}" type="video/mp4">
  `;
  video.load();
  video.play();
  
  title.textContent = project.title;
  description.textContent = project.description;
  
  technologies.innerHTML = project.technologies.map(tech => `
    <span class="px-3 py-1 text-sm rounded-full ${tech.color}">${tech.name}</span>
  `).join('');
  
  link.href = project.link;
  
  // Mostrar o modal com animação
  modal.classList.remove('hidden');
  modal.classList.add('animate-fadeIn');
  
  // Adicionar evento de clique para fechar o modal
  const closeButton = document.getElementById('closeModal');
  const modalBg = modal.querySelector('.modal-bg');
  
  function closeModal() {
    video.pause();
    modal.classList.add('hidden');
    modal.classList.remove('animate-fadeIn');
  }
  
  closeButton.addEventListener('click', closeModal);
  modalBg.addEventListener('click', closeModal);
}

// Função para criar os indicadores do carrossel
function createCarouselDots(projects) {
  const dotsContainer = document.getElementById('carouselDots');
  projects.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full bg-purple-500 opacity-50 transition-all duration-300 hover:opacity-100 ${index === 0 ? 'opacity-100' : ''}`;
    dot.addEventListener('click', () => {
      const carousel = document.getElementById('projectsCarousel');
      const cards = carousel.querySelectorAll('.project-card');
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      
      // Atualizar o estado ativo dos indicadores
      dotsContainer.querySelectorAll('button').forEach(d => d.classList.remove('opacity-100'));
      dot.classList.add('opacity-100');
    });
    dotsContainer.appendChild(dot);
  });
}

// Função para inicializar o carrossel
async function initProjectsCarousel() {
  try {
    const response = await fetch('data/projects.json');
    const projects = await response.json();
    
    const carousel = document.getElementById('projectsCarousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    // Criar e adicionar os cards ao carrossel
    projects.forEach(project => {
      const card = createProjectCard(project);
      carousel.appendChild(card);
    });
    
    // Criar os indicadores do carrossel
    createCarouselDots(projects);
    
    // Adicionar eventos de clique aos botões de navegação
    prevButton.addEventListener('click', () => {
      carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    nextButton.addEventListener('click', () => {
      carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
    
    // Atualizar os indicadores ao rolar o carrossel
    carousel.addEventListener('scroll', () => {
      const cards = carousel.querySelectorAll('.project-card');
      const dots = document.querySelectorAll('#carouselDots button');
      
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
    console.error('Erro ao carregar os projetos:', error);
  }
}

// Inicializar o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initProjectsCarousel); 