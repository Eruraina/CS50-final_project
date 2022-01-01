const API_KEY = 'api_key=5609fe6f3a60e7d838ee9b334f0f26b3';
const BASE_URL = 'https://api.themoviedb.org/3';

// TMDB keyword_ids for keyword=based-on-book and such
const QUERY = '&with_keywords=818|18712|155251|185767|192628|209666|222216|226151|231590|235266|240766|246466|250164|289038|289528';

const MOVIES_API_URL = BASE_URL + '/discover/movie?' + API_KEY + QUERY;
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + QUERY;

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
    {
        "id": 28,
        "name": "Action"
    }, {
        "id": 12,
        "name": "Adventure"
    }, {
        "id": 16,
        "name": "Animation"
    }, {
        "id": 35,
        "name": "Comedy"
    }, {
        "id": 80,
        "name": "Crime"
    }, {
        "id": 99,
        "name": "Documentary"
    }, {
        "id": 18,
        "name": "Drama"
    }, {
        "id": 10751,
        "name": "Family"
    }, {
        "id": 14,
        "name": "Fantasy"
    }, {
        "id": 36,
        "name": "History"
    }, {
        "id": 27,
        "name": "Horror"
    }, {
        "id": 10402,
        "name": "Music"
    }, {
        "id": 9648,
        "name": "Mystery"
    }, {
        "id": 10749,
        "name": "Romance"
    }, {
        "id": 878,
        "name": "Science Fiction"
    }, {
        "id": 10770,
        "name": "TV Movie"
    }, {
        "id": 53,
        "name": "Thriller"
    }, {
        "id": 10752,
        "name": "War"
    }, {
        "id": 37,
        "name": "Western"
    }
]

const listContainer = document.querySelector('.list-container');
const form = document.getElementById('form');
const search = document.getElementById('search');
const filter = document.querySelector('.filters');

var selectedGanre = []

setGenre();

function setGenre() {
    filter.innerHTML = '';
    genres.forEach(genre => {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.id = genre.id;
        tag.innerText = genre.name;
        tag.addEventListener('click', () => {
            if (selectedGanre.length == 0) {
                selectedGanre.push(tag.id);
            } else {
                if (selectedGanre.includes(tag.id)) {
                    selectedGanre.forEach((id, index) => {
                        if (id == tag.id) {
                            selectedGanre.splice(index, 1);
                        }
                    });
                } else {
                    selectedGanre.push(tag.id);
                }
            }
            console.log(selectedGanre);
            getMovies(MOVIES_API_URL + '&with_genres=' + encodeURI(selectedGanre.join(',')));
            markSelectedGenre();
        });

        filter.append(tag);
    });
}

function markSelectedGenre() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('marked');
    })
    if (selectedGanre.length != 0) {
        
        selectedGanre.forEach(id => {
            const markedGenre = document.getElementById(id);
            markedGenre.classList.add('marked');
        });
    }
}

getMovies(MOVIES_API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showMovies(data.results);
        });
}

function showMovies(data) {
    listContainer.innerHTML = '';
    
    data.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        let card = `
                <figure class="card">
                    <img src="${IMG_BASE_URL + poster_path}" alt="'${title}' poster">
                    <figcaption class="card__info">
                        <h2 class="card__title">${title}</h2>
                        <p class="card__subtitle">${vote_average}</p>
                        <button class="card__link">More info</button>
                    </figcaption>
                </figure>

                    
                `;
        listContainer.insertAdjacentHTML("beforeend", card);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm);
    }
});
