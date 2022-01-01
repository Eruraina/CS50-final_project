const API_KEY = 'api_key=5609fe6f3a60e7d838ee9b334f0f26b3';
const BASE_URL = 'https://api.themoviedb.org/3';
const QUERY = '&with_keywords=818|18712|155251|185767|192628|209666|222216|226151|231590|235266|240766|246466|250164|289038|289528';

const SHOWS_API_URL = BASE_URL + '/discover/tv?' + API_KEY + QUERY;
const SEARCH_URL = BASE_URL + '/search/tv?' + API_KEY + QUERY;

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const genres = [
    {
        "id": 10759,
        "name": "Action & Adventure"
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
        "id": 10762,
        "name": "Kids"
    }, {
        "id": 9648,
        "name": "Mystery"
    }, {
        "id": 10763,
        "name": "News"
    }, {
        "id": 10764,
        "name": "Reality"
    }, {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    }, {
        "id": 10766,
        "name": "Soap"
    }, {
        "id": 10767,
        "name": "Talk"
    }, {
        "id": 10768,
        "name": "War & Politics"
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
            getShows(SHOWS_API_URL + '&with_genres=' + encodeURI(selectedGanre.join(',')));
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

getShows(SHOWS_API_URL);

function getShows(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showShows(data.results);
        });
}

function showShows(data) {
    listContainer.innerHTML = '';
    
    data.forEach(show => {
        const { name, poster_path, vote_average } = show;
        let card = `
                <figure class="card">
                    <img src="${IMG_BASE_URL + poster_path}" alt="'${name}' poster">
                    <figcaption class="card__info">
                        <h2 class="card__title">${name}</h2>
                        <p class="card__subtitle">${vote_average}</p>
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
        getShows(SEARCH_URL + '&query=' + searchTerm);
    }
});





