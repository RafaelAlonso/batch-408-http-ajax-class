// =============================== REVISAO ===================================
// Selecionando um item e alterando o texto ou HTML
const p = document.querySelector("p");
p.innerText = "Hello turma!"
p.innerHTML = "Hello <b>turma</b>!"

// Selecionando vários itens e alterando a cor
const itens = document.querySelectorAll('li');
itens.forEach((item) => { item.style.color = 'blue' });

// Adicionar um eventlistener
// 1. Selecionar o elemento
// 2. selecionar o evento
// 3. o código que vai ser executado
// 4. juntar tudo num eventListener
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.currentTarget.innerText);
  })
})
// ===========================================================================

// ============================= AJAX Requests ===============================

// eventlistener para quando o formulário for enviado
document.getElementById("search-movies").addEventListener('submit', (event) => {
  // previnimos que ele recarregue a página
  event.preventDefault();

  // pegamos o que o usuário escreveu no input
  const user_input = document.getElementById('search').value;

  // executamos a função para encontrar os filmes via API
  findMovies(user_input);
})

// GET request
const findMovies = (movie_title) => {
  // ============== estrutura de uma requisição AJAX GET =================
  // fetch(url_da_api)
  // .then(response => response.json())
  // .then((data) => { código pra fazer com dados recebidos da API })
  // =====================================================================


  // montando a url do OMDB, passando o nome do filme e a chave de API
  const url = `http://www.omdbapi.com/?s=${movie_title}&apikey=adf1f2d7`;

  fetch(url)                                     // fazendo a requisição para a url
  .then(response => response.json() )            // transformando a resposta recebida em json
  .then((data) => {                              // fazendo algo com os dados que recebemos
    // pega a lista dos filmes
    const ul = document.getElementById('movies');

    // limpa o que tem dentro dela
    ul.innerHTML = "";

    // pra cada um dos resultados obtidos
    data.Search.forEach((movie_info) => {
      // cria um novo item de lista, com as infos do filme
      const new_html = `<li>
                          <img src="${movie_info.Poster}">
                          <p>${movie_info.Title}</p>
                        </li>`;

      // insere o item criado no fim da lista
      ul.insertAdjacentHTML('beforeend', new_html)
    })
  });
}

// eventListener para quando o usuário digitar algo no input
document.getElementById('search-algolia').addEventListener('keyup', (event) => {
  // pegamos o que o usuário escreveu no input (obs.: poderiamos usar event.currentTarget.value)
  const user_input = document.getElementById('search-algolia').value;

  // executamos a função para encontrar o melhor endereço via API
  findPlaces(user_input);
})

// POST request
const findPlaces = (place_to_find) => {
  // ============== estrutura de uma requisição AJAX POST ================
  // fetch(url_da_api, parametros_do_post)
  // .then(response => response.json())
  // .then((data) => { código pra fazer com dados recebidos da API })
  // =====================================================================

  // montando a url do Algolia, sem nenhum parâmetro (porque é uma requisição POST)
  const url = "https://places-dsn.algolia.net/1/places/query"

  // montando os parâmetros da requisição (porque é uma requisição POST)
  const params = {
    method: 'POST',
    body: JSON.stringify({query: place_to_find})
  }

  fetch(url, params)                    // fazendo a requisição para a url, passando os params
  .then(response => response.json())    // transformando a string recebida em json
  .then((data) => {                     // fazendo algo com os dados que recebemos
    // pega o h1 no HTML
    const h1 = document.getElementById('best-match');

    // coloca o texto dele como o melhor resultado encontrado pelo Algolia
    h1.innerText = data.hits[0].locale_names.default[0];
  });
}
// ===========================================================================
