$(document).ready(function () {
    // Carrega os componentes estáticos
    $("#home").load("components/home.html");
    $("#header").load("components/header.html");
    $("#about").load("components/about.html");
    $("#contact").load("components/contact.html");
    $("#footer").load("components/footer.html");

    // Carrega os projetos e, após o componente ser carregado, insere os itens dinamicamente
    $("#projects").load("components/projects.html", function () {
        $.getJSON('data/projects.json', function (projects) {
            $.each(projects, function (index, project) {
                var projectHtml = `
            <div class="project-card bg-zinc-900 p-4 rounded hover:shadow-lg">
              <img src="${project.image}" alt="${project.name}" class="w-full rounded">
              <h3 class="text-xl mt-2 text-yellow-500">${project.name}</h3>
              <p class="text-gray-400">${project.description}</p>
            </div>
          `;
                $('#projectsContainer').append(projectHtml);
            });
        });
    });

    // Carrega as habilidades e, após o componente ser carregado, insere os itens dinamicamente
    $("#skills").load("components/skills.html", function () {
        $.getJSON('data/skills.json', function (skills) {
            $.each(skills, function (index, skill) {
                var skillHtml = `
            <div class="bg-zinc-900 w-28 h-28 rounded-lg flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:border hover:border-yellow-500 border border-transparent">              
                <i class="${skill.icon} text-6xl text-yellow-500"></i>
                <p class="text-lg mt-2 text-yellow-500">${skill.name}</p>
            </div>
          `;
                $('#skillsContainer').append(skillHtml);
            });
        });
    });
});

$(document).ready(function(){
    // Modal: Abre ao clicar no card
    $('.project-card').on('click', function() {
      var videoSrc = $(this).data('video');
      var description = $(this).data('description');
  
      // Atualiza a fonte do vídeo e recarrega o elemento
      $('#modalVideo source').attr('src', videoSrc);
      $('#modalVideo')[0].load();
  
      // Atualiza a descrição
      $('#modalDescription').text(description);
  
      // Exibe a modal
      $('#projectModal').removeClass('hidden');
    });
  
    // Fecha a modal
    $('#closeModal').on('click', function(){
      $('#projectModal').addClass('hidden');
    });
  
    // Controles do carrossel
    $('#next').on('click', function(){
      $('#projectsCarousel').animate({
        scrollLeft: "+=300"
      }, 500);
    });
    
    $('#prev').on('click', function(){
      $('#projectsCarousel').animate({
        scrollLeft: "-=300"
      }, 500);
    });
  });
  
