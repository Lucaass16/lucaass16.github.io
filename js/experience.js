function createExperienceCard(job) {
    const card = document.createElement('div');
    
    // Define estilos e ícone baseado no tipo
    const isEducation = job.type === 'education';
    const iconSrc = isEducation ? '../media/icon/brain.svg' : '../media/icon/briefcase-business.svg';
    const iconAlt = isEducation ? 'Ícone de graduação' : 'Ícone de maleta';
    const iconBg = isEducation ? 'bg-blue-500' : 'bg-purple-500';
    const iconBorder = isEducation ? 'border-blue-400' : 'border-purple-400';
    const iconShadow = isEducation ? 'shadow-blue-500/50' : 'shadow-purple-500/50';
    const cardBorder = isEducation ? 'border-blue-700/50' : 'border-zinc-700';
    const cardHoverBorder = isEducation ? 'hover:border-blue-500/50' : 'hover:border-purple-500/50';
    const badgeColor = isEducation ? 'text-blue-300 bg-blue-500/20 border-blue-500/30' : 'text-purple-300 bg-purple-500/20 border-purple-500/30';

    // Cria os spans de tecnologia dinamicamente
    const technologiesHTML = job.technologies.map(tech =>
        `<span class="inline-flex rounded-full ${badgeColor} px-3 py-1 border">${tech}</span>`
    ).join('');

    card.innerHTML = `
        <div class="project-card relative flex items-start gap-8 min-h-300">
            <div
                class="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${iconBg} ${iconBorder} shadow-lg ${iconShadow}">
                <img src="${iconSrc}" alt="${iconAlt}">
            </div>

            <div
                class="flex-1 bg-zinc-900 rounded-xl p-8 border ${cardBorder} ${cardHoverBorder} transition-all duration-300 hover:scale-[1.02]">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h3 class="text-2xl font-bold text-white mb-2">${job.title}</h3>
                        <h4 class="${isEducation ? 'text-blue-400' : 'text-purple-400'} text-xl font-bold">${job.company}</h4>
                    </div>
                    ${job.current ? `
                    <span
                        class="inline-flex rounded-full ${badgeColor} px-3 py-1 border">
                        ${isEducation ? 'Em andamento' : 'Atual'}
                    </span>` : ''}
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-gray-300">
                    <div class="flex items-center gap-4">
                        <img src="../media/icon/calendar.svg" alt="Ícone de calendário">
                        <span>${job.period}</span>
                    </div>
                </div>
                <p>
                    ${job.description}
                </p>
                <div class="flex flex-wrap gap-2 mt-4">
                    ${technologiesHTML}
                </div>
            </div>
        </div>
    `;

    return card;
}

async function initJobsCards(){
    try{
        const response = await fetch("data/jobs.json");
        const jobs = await response.json();

        const jobSection = document.getElementById("jobs")

        jobs.forEach(j => {
            const card = createExperienceCard(j);
            jobSection.appendChild(card);
        });
    } catch (error) {
    console.error('Erro ao carregar as experiências:', error);
  }
}