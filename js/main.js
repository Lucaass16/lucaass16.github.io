$(document).ready(function () {
    function createExperienceCard(job) {
        const card = document.createElement('div');

        // Cria os spans de tecnologia dinamicamente
        const technologiesHTML = job.technologies.map(tech =>
            `<span class="inline-flex rounded-full text-purple-300 bg-purple-500/20 px-3 py-1 border-purple-500/30 border">${tech}</span>`
        ).join('');

        card.innerHTML = `
            <div class="relative flex items-start gap-8 min-h-300">
                <div class="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4
                            ${job.current
                                ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50'
                                : 'bg-zinc-800 border-zinc-700'
                            }">
                    <img src="../media/icon/briefcase-business.svg" class="!h-8 !w-8" alt="Ícone de maleta">
                </div>

                <div
                    class="project-card flex-1 bg-zinc-900 rounded-xl p-8 border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-white mb-2">${job.title}</h3>
                            <h4 class="text-purple-400 text-xl font-bold">${job.company}</h4>
                        </div>
                        ${job.current ? `
                        <span
                            class="inline-flex rounded-full text-purple-300 bg-purple-500/20 px-3 py-1 border-purple-500/30 border">
                            Atual
                        </span>` : ''}
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-gray-300">
                        <div class="flex items-center gap-4">
                            <img src="../media/icon/calendar.svg" class="!h-8 !w-8 inline-block" alt="Ícone de calendário">
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

    // Carrega os componentes estáticos
    $("#home").load("components/home.html", function() {
        console.log("Componente home carregado");
        // Inicializa a animação de digitação manualmente
        initTypewriterAnimation();
    });
    $("#header").load("components/header.html");
    $("#about").load("components/about.html");
    $("#experience").load("components/experience.html", function() {
        console.log("Componente de experiência carregado.");
        initJobsCards();
    })
    $("#parallax").load("components/parallax.html", function() {
        console.log("Componente parallax carregado");
        // Inicializa o efeito parallax
        initParallaxEffect();
        // Ativa as animações de elementos com scroll
        activateScrollAnimations();
    });
    // Carrega a seção de projetos e inicializa tudo após o carregamento
    $("#projects").load("components/projects.html", function() {
        console.log("Componente de projetos carregado");
        
        // Carrega os projetos como cards estáticos
        initializeProjects();
        
        // Configura o fechamento da modal
        $(document).on("click", "#closeModal", function() {
            $("#projectModal").addClass("hidden");
            $("#modalVideo")[0].pause();
        });
        
        // Fecha a modal quando clicar fora dela
        $(document).on("click", ".modal-bg", function() {
            $("#projectModal").addClass("hidden");
            $("#modalVideo")[0].pause();
        });
    });
    $("#contact").load("components/contact.html");
    $("#footer").load("components/footer.html");
    
    // Configurar animações de scroll para todos os elementos
    setupScrollAnimations();
    

    // Carrega as habilidades e, após o componente ser carregado, insere os itens dinamicamente
    $("#skills").load("components/skills.html", function () {
        console.log("Componente de skills carregado");
        initSkillsGrid();
    });

    // Função para criar um card de habilidade
    function createSkillCard(skill) {
        var card = $('<div></div>', {
            "class": "skill-card bg-zinc-900/80 p-4 rounded-lg backdrop-blur-sm border border-zinc-800 hover:border-purple-500 transition-all duration-300 flex flex-col items-center justify-center gap-2 scroll-reveal"
        });
        
        var icon = $('<i></i>', {
            "class": skill.icon + " text-5xl md:text-6xl text-purple-500"
        });
        
        var name = $('<span></span>', {
            "class": "text-xs md:text-sm text-gray-300 text-center",
            text: skill.name
        });
        
        card.append(icon, name);
        return card;
    }

    // Função para inicializar o grid de habilidades
    function initSkillsGrid() {
        console.log("Inicializando skills");
        
        $.getJSON('data/skills.json', function(skills) {
            console.log("Dados JSON carregados:", skills.length + " skills");
            
            // Limpa as categorias antes de adicionar os cards
            $("#languages").empty();
            $("#backend").empty();
            $("#frontend").empty();
            $("#databases").empty();
            $("#data-automation").empty();
            $("#devops").empty();
            
            // Distribui as skills nas categorias
            $.each(skills, function(index, skill) {
                var card = createSkillCard(skill);
                
                // Adiciona o card na categoria correspondente
                switch(skill.category) {
                    case 'languages':
                        $("#languages").append(card);
                        break;
                    case 'backend':
                        $("#backend").append(card);
                        break;
                    case 'frontend':
                        $("#frontend").append(card);
                        break;
                    case 'databases':
                        $("#databases").append(card);
                        break;
                    case 'data-automation':
                        $("#data-automation").append(card);
                        break;
                    case 'devops':
                        $("#devops").append(card);
                        break;
                    default:
                        console.warn("Categoria não encontrada para:", skill.name);
                }
                
                console.log("Skill adicionada:", skill.name, "na categoria", skill.category);
            });
            
            // Ativa as animações de scroll após adicionar as skills
            activateScrollAnimations();
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao carregar as skills:", textStatus, errorThrown);
            $("#languages").html('<div class="text-center text-purple-500 w-full py-8">Erro ao carregar habilidades. Por favor, tente novamente mais tarde.</div>');
        });
    }

    /*
    // REMOVED: Função que inicializa o carrossel de depoimentos
    function initializeTestimonials() {
        console.log("Inicializando depoimentos");
        
        $.getJSON('data/testimonials.json', function(testimonials) {
            console.log("Dados JSON carregados:", testimonials.length + " depoimentos");
            
            // Adicionar os indicadores de navegação
            $('#testimonialDots').empty();
            var visibleDots = Math.max(1, testimonials.length - 1); // Um a menos do que o total
            for (var i = 0; i < visibleDots; i++) {
                var dot = $('<div></div>')
                    .addClass('w-2 h-2 rounded-full bg-zinc-700 hover:bg-purple-500 transition duration-300 cursor-pointer')
                    .attr('data-index', i);
                $('#testimonialDots').append(dot);
            }
            
            // Limpar o carrossel antes de adicionar os novos depoimentos
            $("#testimonialsCarousel").empty();
            
            $.each(testimonials, function(index, testimonial) {
                // Cria o card do depoimento
                var card = $('<div></div>', {
                    "class": "testimonial-card bg-zinc-900/80 rounded-lg p-6 backdrop-blur-sm border border-zinc-800 hover:border-purple-500 transition-all duration-300 snap-center scroll-reveal",
                    "data-index": index
                });
                
                // Conteúdo do depoimento
                var content = $('<div></div>', {
                    "class": "relative"
                });
                
                // Aspas decorativas
                var quotes = $('<div></div>', {
                    "class": "absolute -top-2 -left-2 text-6xl text-purple-500/10 font-serif",
                    "text": "\""
                });
                
                // Container do conteúdo principal
                var mainContent = $('<div></div>', {
                    "class": "relative z-10"
                });
                
                // Texto do depoimento com truncamento para 10 linhas
                var textContainer = $('<div></div>', {
                    "class": "testimonial-text-container"
                });
                
                var text = $('<p></p>', {
                    "class": "testimonial-text truncated text-gray-300 text-sm mb-6",
                    text: testimonial.text
                });
                
                var expandButton = $('<button></button>', {
                    "class": "expand-testimonial hidden text-purple-500 mt-2 text-sm hover:text-purple-400 transition duration-300 focus:outline-none",
                    text: "Ler mais"
                });
                
                textContainer.append(text, expandButton);
                
                // Informações do autor
                var author = $('<div></div>', {
                    "class": "flex items-center"
                });
                
                // Avatar do autor
                var avatar = $('<img>', {
                    src: testimonial.avatar,
                    alt: testimonial.name,
                    "class": "w-12 h-12 rounded-full object-cover border-2 border-purple-500",
                    onerror: "this.src='media/images/default-avatar.jpg'" // Fallback para imagem padrão
                });
                
                // Informações do autor
                var authorInfo = $('<div></div>', {
                    "class": "ml-4"
                });
                
                // Nome do autor
                var authorName = $('<h4></h4>', {
                    "class": "font-medium text-purple-500",
                    text: testimonial.name
                });
                
                // Cargo/Empresa do autor
                var authorTitle = $('<p></p>', {
                    "class": "text-sm text-gray-400",
                    text: testimonial.position
                });
                
                // Montagem do card
                authorInfo.append(authorName, authorTitle);
                author.append(avatar, authorInfo);
                mainContent.append(textContainer, author);
                content.append(quotes, mainContent);
                card.append(content);
                
                // Adicionar o card ao carrossel
                $("#testimonialsCarousel").append(card);
                
                console.log("Depoimento adicionado:", testimonial.name);
            });
            
            // Configurar controles do carrossel
            setupTestimonialControls();
            
            // Calcular a largura total do carrossel
            updateTestimonialCarouselWidth();
            
            // Atualizar quando a janela for redimensionada
            $(window).on('resize', updateTestimonialCarouselWidth);
            
            // Garantir que a primeira bolinha esteja selecionada no carregamento
            setTimeout(function() {
                $('#testimonialDots div').removeClass('bg-purple-500 active-dot').addClass('bg-zinc-700');
                $('#testimonialDots div[data-index="0"]').removeClass('bg-zinc-700').addClass('bg-purple-500 active-dot');
                
                // Ativa as animações de scroll após adicionar os depoimentos
                activateScrollAnimations();
            }, 100);
            
            // Verificar quais depoimentos precisam do botão "Ler mais"
            setTimeout(function() {
                $('.testimonial-text').each(function() {
                    var textElement = $(this);
                    var lineHeight = parseInt(window.getComputedStyle(textElement[0]).lineHeight);
                    var textHeight = textElement.height();
                    var maxHeight = lineHeight * 10;
                    
                    if (textHeight > maxHeight) {
                        textElement.closest('.testimonial-text-container').find('.expand-testimonial').removeClass('hidden');
                    }
                });
            }, 300);
            
            // Evento para expandir/colapsar o texto
            $(document).on('click', '.expand-testimonial', function() {
                var button = $(this);
                var textElement = button.siblings('.testimonial-text');
                
                if (textElement.hasClass('truncated')) {
                    textElement.removeClass('truncated');
                    button.text('Ler menos');
                } else {
                    textElement.addClass('truncated');
                    button.text('Ler mais');
                }
            });
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao carregar os depoimentos:", textStatus, errorThrown);
            $("#testimonialsCarousel").html('<div class="text-center text-purple-500 w-full py-8">Erro ao carregar depoimentos. Por favor, tente novamente mais tarde.</div>');
        });
    }
    
    // Função para atualizar a largura total do carrossel de depoimentos
    function updateTestimonialCarouselWidth() {
        var totalCards = $('.testimonial-card').length;
        var cardWidth = 320; // Largura do card
        var gap = 32; // Espaçamento entre cards
        
        // Certifique-se de que o último card também pode ser visualizado corretamente
        if (totalCards > 0) {
            var lastCardPosition = (totalCards - 1) * (cardWidth + gap);
            
            // Armazene esses valores para uso posterior
            $('#testimonialsCarousel').data('lastCardPosition', lastCardPosition);
            $('#testimonialsCarousel').data('maxScroll', lastCardPosition);
            $('#testimonialsCarousel').data('cardWidth', cardWidth + gap);
            $('#testimonialsCarousel').data('totalCards', totalCards);
            $('#testimonialsCarousel').data('visibleDots', Math.max(1, totalCards - 1));
        }
    }
    
    // Configura os controles do carrossel de depoimentos
    function setupTestimonialControls() {
        console.log("Configurando controles do carrossel de depoimentos");
        
        // Adiciona o observador de interseção para os cards do carrossel
        setupTestimonialIntersectionObserver();
        
        // Atualizar os indicadores ao rolar o carrossel manualmente
        $('#testimonialsCarousel').on('scroll', function() {
            // Debounce para não chamar a função muitas vezes durante o scroll
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                var scrollPos = $('#testimonialsCarousel').scrollLeft();
                var cardWidth = $('#testimonialsCarousel').data('cardWidth') || 352; // Width + gap
                var totalCards = $('#testimonialsCarousel').data('totalCards') || $('.testimonial-card').length;
                var visibleDots = $('#testimonialsCarousel').data('visibleDots') || totalCards - 1;
                
                // Cálculo mais preciso do índice atual
                var currentIndex = Math.round(scrollPos / cardWidth);
                
                // Ajuste para mapear o último card para o último indicador visível
                if (currentIndex >= totalCards - 1) {
                    currentIndex = visibleDots - 1;
                }
                
                // Garantir que o índice esteja dentro dos limites
                currentIndex = Math.max(0, Math.min(currentIndex, visibleDots - 1));
                
                // Atualizar pontos de navegação
                updateTestimonialDots(currentIndex);
            }, 100));
        });
        
        // Navegar ao clicar nos pontos indicadores
        $(document).on('click', '#testimonialDots div', function() {
            var index = $(this).data('index');
            var cardWidth = $('#testimonialsCarousel').data('cardWidth') || 352; // Width + gap
            var totalCards = $('#testimonialsCarousel').data('totalCards') || $('.testimonial-card').length;
            var visibleDots = $('#testimonialsCarousel').data('visibleDots') || totalCards - 1;
            
            // Se for o último indicador, rolar para o último card
            if (index === visibleDots - 1 && totalCards > visibleDots) {
                index = totalCards - 1;
            }
            
            var scrollTo = index * cardWidth;
            
            // Animar a rolagem com efeito de ease
            $('#testimonialsCarousel').animate({
                scrollLeft: scrollTo
            }, 500, 'swing');
            
            // Atualizar os indicadores
            updateTestimonialDots(Math.min(index, visibleDots - 1));
        });
        
        // Adicionar os handlers dos botões de navegação:
        
        // Botão anterior
        $(document).on("click", "#prevTestimonial", function() {
            console.log("Botão anterior clicado (depoimentos)");
            var scrollPos = $("#testimonialsCarousel").scrollLeft();
            var cardWidth = $('#testimonialsCarousel').data('cardWidth') || 352; // Width + gap
            var scrollTo = Math.max(0, scrollPos - cardWidth);
            
            $("#testimonialsCarousel").animate({ scrollLeft: scrollTo }, 500, 'swing');
            
            // Atualizar os indicadores
            var newIndex = Math.floor(scrollTo / cardWidth);
            var visibleDots = $('#testimonialsCarousel').data('visibleDots') || $('.testimonial-card').length - 1;
            
            // Ajustar índice para as bolinhas visíveis
            newIndex = Math.min(newIndex, visibleDots - 1);
            updateTestimonialDots(newIndex);
        });
        
        // Botão próximo
        $(document).on("click", "#nextTestimonial", function() {
            console.log("Botão próximo clicado (depoimentos)");
            var scrollPos = $("#testimonialsCarousel").scrollLeft();
            var cardWidth = $('#testimonialsCarousel').data('cardWidth') || 352; // Width + gap
            var maxScroll = $('#testimonialsCarousel').data('maxScroll');
            var totalCards = $('#testimonialsCarousel').data('totalCards') || $('.testimonial-card').length;
            var visibleDots = $('#testimonialsCarousel').data('visibleDots') || totalCards - 1;
            
            var scrollTo = scrollPos + cardWidth;
            
            // Garantir que não ultrapasse o limite máximo
            if (maxScroll && scrollTo > maxScroll) {
                scrollTo = maxScroll;
                
                // Se estamos rolando para o último card, use o último indicador visível
                updateTestimonialDots(visibleDots - 1);
            } else {
                // Calcular o novo índice com base no scroll atualizado
                var newIndex = Math.round(scrollTo / cardWidth);
                
                // Ajustar para mapear corretamente aos indicadores visíveis
                if (newIndex >= totalCards - 1) {
                    newIndex = visibleDots - 1;
                }
                
                // Garantir que o índice esteja dentro dos limites
                newIndex = Math.max(0, Math.min(newIndex, visibleDots - 1));
                
                updateTestimonialDots(newIndex);
            }
            
            $("#testimonialsCarousel").animate({ scrollLeft: scrollTo }, 500, 'swing');
        });
    }
    
    // Função para configurar o observador de interseção para os cards do carrossel de depoimentos
    function setupTestimonialIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            var options = {
                root: document.getElementById('testimonialsCarousel'),
                rootMargin: '0px',
                threshold: 0.5 // Ajustado para ser mais sensível
            };
            
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var index = $(entry.target).data('index');
                        var visibleDots = $('#testimonialsCarousel').data('visibleDots') || $('.testimonial-card').length - 1;
                        
                        // Ajusta o índice para que o último card mapeie para o penúltimo indicador
                        var totalCards = $('.testimonial-card').length;
                        if (index >= totalCards - 1) {
                            index = visibleDots - 1; // O último card mapeia para o último indicador visível
                        }
                        
                        updateTestimonialDots(index);
                    }
                });
            }, options);
            
            // Observe todos os cards
            $('.testimonial-card').each(function() {
                observer.observe(this);
            });
        }
    }
    
    // Atualiza os indicadores de forma mais visual para o carrossel de depoimentos
    function updateTestimonialDots(activeIndex) {
        if (activeIndex === undefined || activeIndex === null) return;
        
        var visibleDots = $('#testimonialsCarousel').data('visibleDots') || $('.testimonial-card').length - 1;
        
        // Certifique-se de que o índice não ultrapasse o número de bolinhas visíveis
        activeIndex = Math.min(activeIndex, visibleDots - 1);
        
        $('#testimonialDots div').removeClass('bg-purple-500 active-dot').addClass('bg-zinc-700');
        $('#testimonialDots div[data-index="' + activeIndex + '"]').removeClass('bg-zinc-700').addClass('bg-purple-500 active-dot');
    }
    */
    // END REMOVED TESTIMONIALS FUNCTIONS

    // Função que configura animações de scroll para elementos da página
    function setupScrollAnimations() {
        // Adiciona classe para elementos que receberão animação
        $('h2, h3, p, .btn, img, section').addClass('scroll-reveal');
        
        // Configura o observador de interseção para animar elementos durante o scroll
        activateScrollAnimations();
        
        // Adiciona listener para o scroll da página para efeitos adicionais
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
            
            // Efeito parallax para o fundo de seções
            $('.py-16').each(function() {
                var offset = $(this).offset().top;
                var distance = offset - scrollTop;
                
                // Aplica um efeito sutil de parallax
                $(this).css('background-position', '50% ' + (distance * 0.05) + 'px');
            });
        });
    }
    
    // Função para ativar as animações de scroll usando Intersection Observer
    function activateScrollAnimations() {
        if ('IntersectionObserver' in window) {
            var options = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.15 // 15% da visibilidade para acionar
            };
            
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('animated');
                        // Remover da observação após animar
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            
            // Observar todos os elementos com a classe scroll-reveal
            $('.scroll-reveal').each(function() {
                observer.observe(this);
            });
        } else {
            // Fallback para navegadores sem suporte a Intersection Observer
            $('.scroll-reveal').addClass('animated');
        }
    }

    // Função para criar o HTML de um card de projeto
    function createProjectCard(project) {
        // Cria o card do projeto com os atributos para a modal
        var card = $('<div></div>', {
            "class": "group relative bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-purple-500/50 shadow-lg shadow-purple-500/20",
            "data-title": project.title,
            "data-video": project.video || '', // Adiciona video para a modal
            "data-description": project.description,
            "data-link": project.link || "#",
            "data-technologies": JSON.stringify(project.technologies || []),
            "data-index": project.index // Use o index do JSON
        });

        // Adiciona tags de destaque e certificado se existirem
        let tagsHtml = '';
        if (project.certified) {
            tagsHtml += `<div class="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Certificado
                          </div>`;
        }
        if (project.highlight) {
            tagsHtml += `<div class="absolute bg-yellow-500 top-4 left-4 text-white font-bold px-3 py-1 rounded-full text-sm">
                            Destaque
                          </div>`;
        }
        
        // Cria o container da imagem para dar mais destaque
        var imgContainer = $('<div></div>', {
            "class": "relative w-full h-64 overflow-hidden rounded-t-xl"
        });
        
        // Adiciona os gradientes e tags sobre a imagem
        imgContainer.append(`
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
            ${tagsHtml}
        `);

        // Cria a imagem do projeto com classe ajustada
        var img = $('<img>', {
            src: project.image,
            alt: project.title,
            "class": "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        });
        
        // Adiciona a imagem ao container
        imgContainer.prepend(img); // Prepend para a imagem ficar por baixo das tags

        // Cria o container para o conteúdo do card
        var contentContainer = $('<div></div>', {
            "class": "p-5 flex flex-col flex-grow"
        });
        
        // Cria o título do projeto
        var title = $('<h3></h3>', {
            "class": "text-xl font-bold mb-2 text-purple-500",
            text: project.title
        });

        // Cria o subtítulo do projeto (se existir)
        var subtitle = '';
        if (project.subtitle) {
            subtitle = $('<h4></h4>', {
                "class": "font-medium text-purple-400 text-lg mb-3",
                text: project.subtitle
            });
        }
        
        // Cria um resumo curto do projeto
        var shortDesc = $('<p></p>', {
            "class": "text-gray-400 text-sm flex-grow leading-relaxed",
            text: project.description.substring(0, 150) + (project.description.length > 150 ? "..." : "")
        });
        
        // Adiciona botão "Ver mais"
        var viewMore = $('<button></button>', {
            "class": "mt-4 bg-transparent border border-purple-500 text-purple-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500 hover:text-zinc-900 transition-colors duration-300 inline-flex items-center justify-center group",
            text: "Ver detalhes"
        });
        
        viewMore.on('click', function(e) {
            e.stopPropagation();
            openProjectModal(project);
        });

        var badges = $('<div></div>', {
            "class": "flex flex-wrap gap-2 mb-4 mt-4"
        });
        project.technologies.forEach(t => {
            var badge = $('<span></span>', {
                "class": "px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20",
                text: t
            });

            badges.append(badge);
        })
        
        // Adiciona ícone ao botão com animação
        var icon = $('<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg>');
        viewMore.append(icon);
        
        // Adiciona os elementos ao container de conteúdo
        contentContainer.append(title, subtitle, shortDesc, badges, viewMore);
        
        // Junta os elementos e retorna o card
        card.append(imgContainer, contentContainer);
        return card;
    }

    // Função que inicializa a exibição de projetos em grid
    function initializeProjects() {
        console.log("Inicializando projetos");
        
        $.getJSON('data/projects.json', function(projects) {
            console.log("Dados JSON carregados:", projects.length + " projetos");
            
            // Limpa o grid antes de adicionar os novos cards
            $("#projectsGrid").empty();
            
            $.each(projects, function(index, project) {
                // Adiciona o índice ao objeto project para uso posterior
                project.index = index; 
                var card = createProjectCard(project);
                $("#projectsGrid").append(card);
                console.log("Card adicionado:", project.title);
            });
            
            // Ativa as animações de scroll após adicionar os cards
            activateScrollAnimations();
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao carregar os projetos:", textStatus, errorThrown);
            $("#projectsGrid").html('<div class="text-center text-purple-500 w-full py-8">Erro ao carregar projetos. Por favor, tente novamente mais tarde.</div>');
        });

        // Abrir a modal ao clicar em um card de projeto
        $(document).on("click", ".project-card", function() {
            var title = $(this).data("title");
            var videoPath = $(this).data("video");
            var description = $(this).data("description");
            var link = $(this).data("link");
            var technologies = $(this).data("technologies");
            
            console.log("Card clicado:", title);
            
            // Atualiza os elementos da modal
            $("#modalTitle").text(title);
            $("#modalDescription").text(description);
            $("#modalLink").attr("href", link);
            
            // Atualiza a fonte do vídeo e recarrega o elemento
            if (videoPath) {
                var videoType = videoPath.endsWith('.webm') ? 'video/webm' : 'video/mp4';
                $("#modalVideo").html(`<source src="${videoPath}" type="${videoType}">`);
                $("#modalVideo")[0].load();
                $("#modalVideo").removeClass("hidden");
            } else {
                $("#modalVideo").addClass("hidden");
                $("#modalVideo").empty(); // Remove any existing sources
            }

            // Limpa e adiciona as tecnologias
            $("#modalTechnologies").empty();
            if (technologies && technologies.length > 0) {
                $.each(technologies, function(i, tech) {
                    var techBadge = $('<span></span>', {
                        "class": "px-2 py-1 bg-zinc-800 text-purple-500 rounded text-xs mr-2 mb-2",
                        text: tech
                    });
                    $("#modalTechnologies").append(techBadge);
                });
            }
            
            // Exibe a modal com uma animação
            $("#projectModal").removeClass("hidden").addClass("animate-fadeIn");
        });
    }

    // Função para inicializar a animação de digitação
    function initTypewriterAnimation() {
        console.log("Inicializando animação de digitação");
        const typewriterElement = document.getElementById('typewriter');
        
        if (!typewriterElement) {
            console.error("Elemento typewriter não encontrado");
            // Tentar novamente depois de um momento
            setTimeout(initTypewriterAnimation, 200);
            return;
        }
        
        const professions = [
            "Back End Developer",
            "Software Developer",
            "Full Stack Developer",
            "Python Developer",
        ];
        
        let currentProfession = 0;
        
        function updateProfession() {
            // Função para atualizar com efeito de digitação
            function typeText(text, element, i = 0) {
                if (i <= text.length) {
                    element.textContent = text.substring(0, i);
                    setTimeout(() => typeText(text, element, i + 1), 100);
                } else {
                    // Quando terminar de digitar, agenda para apagar após 2s
                    setTimeout(() => eraseText(text, element), 2000);
                }
            }
            
            // Função para apagar o texto letra por letra
            function eraseText(text, element, i = text.length) {
                if (i >= 0) {
                    element.textContent = text.substring(0, i);
                    setTimeout(() => eraseText(text, element, i - 1), 50);
                } else {
                    // Quando terminar de apagar, passa para a próxima profissão
                    currentProfession = (currentProfession + 1) % professions.length;
                    setTimeout(() => typeText(professions[currentProfession], element), 300);
                }
            }
            
            // Inicia a digitação da profissão atual
            typeText(professions[currentProfession], typewriterElement);
        }
        
        // Inicia a animação
        updateProfession();
        console.log("Animação de digitação iniciada");
    }

    // Função para inicializar o efeito parallax
    function initParallaxEffect() {
        console.log("Inicializando efeito parallax com CSS direto");
        
        // Verificação para dispositivos móveis onde background-attachment: fixed não funciona bem
        function isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        }
        
        // Esperar que o container do parallax seja carregado
        function checkParallaxContainer() {
            const parallaxBg = document.querySelector('.parallax-bg');
            if (!parallaxBg) {
                console.log("Container de parallax não encontrado, tentando novamente em 200ms");
                setTimeout(checkParallaxContainer, 200);
                return;
            }
            
            console.log("Container de parallax encontrado, aplicando efeitos");
            
            // Configuração já está sendo feita no componente parallax.html
            // Este código está aqui para garantir compatibilidade com implementações anteriores
            if (isMobile()) {
                console.log("Dispositivo móvel detectado para parallax");
            } else {
                console.log("Desktop detectado para parallax");
            }
        }
        
        // Iniciar verificação
        checkParallaxContainer();
    }
});