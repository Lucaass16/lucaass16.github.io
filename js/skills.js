// Função para criar um card de habilidade
function createSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'skill-card bg-zinc-900/80 p-4 rounded-lg backdrop-blur-sm border border-zinc-800 hover:border-purple-500 transition-all duration-300 flex flex-col items-center justify-center gap-2';
  
  card.innerHTML = `
    <i class="${skill.icon} text-2xl text-purple-500"></i>
    <span class="text-sm text-gray-300">${skill.name}</span>
  `;
  
  return card;
}

// Função para inicializar o grid de habilidades
async function initSkillsGrid() {
  try {
    const response = await fetch('data/skills.json');
    const skills = await response.json();
    
    const grid = document.querySelector('.grid');
    
    // Criar e adicionar os cards ao grid
    skills.forEach(skill => {
      const card = createSkillCard(skill);
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao carregar as habilidades:', error);
  }
}

// Inicializar o grid quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initSkillsGrid); 