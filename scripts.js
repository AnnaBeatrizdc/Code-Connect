// Carregar a Imagem -------------------------------------------------------------------------------------
const uploadBtn = document.getElementById("upload-btn"); // Seleciona o botão de upload
const inputUpload = document.getElementById("image-upload") // Seleciona o input de upload

uploadBtn.addEventListener("click", () => { // Adiciona um evento de clique no botão de upload
    inputUpload.click(); // Simula um clique no input de upload
})

function lerConteudoDoArquivo(arquivo) { // Função que lê o conteúdo do arquivo
    return new Promise((resolve, reject) => { // Retorna uma nova Promessa
        const leitor = new FileReader(); // Cria um novo FileReader
        leitor.onload = () => { // Quando o arquivo for lido cria um objeto com a URL do arquivo e o nome do arquivo
            resolve({ url: leitor.result, nome: arquivo.name }) // Resolve a promessa com o resultado da leitura
        }

        leitor.onerror = () => { // Se houver um erro na leitura do arquivo, rejeita a promessa
            reject(`Erro na leitura do arquivo ${arquivo.name}`) // Rejeita a promessa com o erro
        }

        leitor.readAsDataURL(arquivo) // Lê o arquivo como uma URL de dados
    })
}

const imagemPrincipal = document.querySelector(".main-imagem"); // Seleciona a imagem principal
const nomeDaImagem = document.querySelector(".container-imagem-nome p"); // Seleciona o nome da imagem

inputUpload.addEventListener("change", async (evento) => { // Adiciona um evento de mudança no input de upload
    const arquivo = evento.target.files[0]; // Pega o primeiro arquivo do input de upload

    if (arquivo) { // Se houver um arquivo
        try {  // Tenta ler o conteúdo do arquivo
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); // Chama a função de ler o conteúdo do arquivo
            // Atualiza a imagem principal e o nome da imagem com o conteúdo do arquivo lido
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) { // Se houver um erro na leitura do arquivo, mostra um alerta de erro
            alert("Erro na leitura do arquivo"); // Mostra um alerta com o erro
        }
    }
})

// Input de tags -------------------------------------------------------------------------------------
const inputTags = document.getElementById("input-tags"); // Seleciona o input de tags
const listaTags = document.getElementById("lista-tags"); // Seleciona a lista de tags

listaTags.addEventListener("click", (evento) => { // Adiciona um evento de clique na lista de tags
    if (evento.target.classList.contains("remove-tag")) { // Se o elemento clicado tiver a classe "remove-tag"
        const tagQueQueremosRemover = evento.target.parentElement;  // Pega o elemento pai do elemento clicado (a tag)
        listaTags.removeChild(tagQueQueremosRemover);   // Remove a tag da lista de tags
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"]; // Array com as tags disponíveis

async function verificaTagsDisponiveis(tagTexto) { // Função que verifica se a tag existe no array de tags disponíveis
    return new Promise((resolve) => {   // Retorna uma nova Promessa
        setTimeout(() => { // Simula uma operação assíncrona (como uma requisição de rede)
            resolve(tagsDisponiveis.includes(tagTexto));    // Verifica se a tag existe no array de tags disponíveis
        }, 1000)    // Espera 1 segundo antes de resolver a promessa
    })
}

inputTags.addEventListener("keypress", async (evento) => { // Adiciona um evento de tecla pressionada no input de tags
    if (evento.key === "Enter") { // Se a tecla pressionada for "Enter"
        evento.preventDefault(); // Previne o comportamento padrão do botão fazendo com que o formulário não seja enviado
        const tagTexto = inputTags.value.trim(); // Pega o valor do input de tags e remove os espaços em branco no início e no fim
        if (tagTexto !== "") { // Se o valor do input não estiver vazio
            try { // Tenta verificar se a tag existe
                const tagExiste = await verificaTagsDisponiveis(tagTexto); // Chama a função de verificar se a tag existe
                if (tagExiste) { //// Se a tag existir
                    const tagNova = document.createElement("li"); // Cria um novo elemento de lista
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`; // Adiciona o texto da tag e o ícone de remover
                    listaTags.appendChild(tagNova); // Adiciona a nova tag na lista de tags
                    inputTags.value = ""; // Limpa o input de tags
                } else { // Se a tag não existir
                    alert("Tag não foi encontrada."); // Mostra um alerta informando que a tag não foi encontrada
                }
            } catch (error) { // Se houver um erro ao verificar a tag
                console.error("Erro ao verificar a existência da tag");     // Mostra um erro no console
                alert("Erro ao verificar a existência da tag. Verifique o console.") // Mostra um alerta informando que houve um erro
            }
        }
    }
})

// Botão de publicar -------------------------------------------------------------------------------------
const botaoPublicar = document.querySelector(".botao-publicar"); // Seleciona o botão de publicar

// Função que simula a publicação do projeto
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => { // Retorna uma nova Promessa
        setTimeout(() => { // Simula uma operação assíncrona (como uma requisição de rede)
            const deuCerto = Math.random() < 0.5; // Simula 50% de chance de sucesso
            if (deuCerto) { // Se a operação for bem-sucedida
                resolve("Projeto publicado com sucesso!");
            }
            else { // Se a operação falhar
                reject("Erro ao publicar o projeto. Tente novamente.");
            }
        }, 2000) // Espera 2 segundos antes de resolver ou rejeitar a promessa
    })
}


botaoPublicar.addEventListener("click", async (evento) => { // Adiciona um evento de clique no botão de publicar
    // Previne o comportamento padrão do botão fazendo com que o formulário não seja enviado
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value; // Pega o valor do input de nome do projeto
    const descricaoDoProjeto = document.getElementById("descricao").value; // Pega o valor do input de descrição do projeto
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent); // Pega o valor das tags do projeto

    try { // Tenta publicar o projeto
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto); // Chama a função de publicar projeto
        alert("Deu certo! "); // Se der certo, mostra um alerta de sucesso
    }
    catch (erro) { // Se der erro, mostra um alerta de erro
        alert("Deu errado! "); // Mostra um alerta de erro
    }
})

//Botão de descartar -------------------------------------------------------------------------------------
const botaoDescartar = document.querySelector(".botao-descartar"); // Seleciona o botão de descartar

botaoDescartar.addEventListener("click", (evento) => {  // Adiciona um evento de clique no botão de descartar
    evento.preventDefault(); // Previne o comportamento padrão do botão fazendo com que o formulário não seja enviado
    const formulario = document.querySelector("form"); // Seleciona o formulário
    formulario.reset(); // Reseta o formulário

    imagemPrincipal.src = "./img/imagem1.png";  // Reseta a imagem principal
    nomeDaImagem.textContent = "image_projeto.png";  // Reseta o nome da imagem 
    
    listaTags.innerHTML = ""; // Remove todas as tags da lista
})

