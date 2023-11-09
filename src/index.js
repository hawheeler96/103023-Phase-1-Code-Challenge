// Your code here
//global consts, etc.
const API = 'http://localhost:3000/films'
const moviePoster = el('poster')
const movieTitle = el('title')
const movieRuntime = el('runtime')
const movieShowtime = el('showtime')
const ticketNum = el('ticket-num')
const filmSideBar = el('films')
const ticketBtn = el('buy-ticket')
const filmInfo = el('film-info')
let filmArr = []

//challenge 1
fetch(`${API}/1`)
.then(res => res.json())
.then(film => {
    renderFilms(film)
    filmArr = film
})

function el(id){
    return document.getElementById(id)
}

function renderFilms(film) {
    moviePoster.src = film.poster
    movieTitle.textContent = film.title
    movieRuntime.textContent = `${film.runtime} Minutes`
    movieShowtime.textContent = film.showtime
    filmInfo.textContent = film.description
    renderTickets(film)
}

function renderTickets(film) {
    let ticketCapacity = film.capacity
    let ticketsSold = film.tickets_sold
    ticketNum.textContent = ticketCapacity - ticketsSold
}

//challenge 2
fetch(API)
.then(res => res.json())
.then(films => {
    renderSideBar(films)
})

function renderSideBar(films) {
    filmSideBar.innerHTML = '';
    films.forEach(addFilmName)
}

function addFilmName(films) {
    let newFilmName = document.createElement('li')
    newFilmName.classList = 'film item'
    newFilmName.textContent = films.title
    filmSideBar.append(newFilmName)
}

//challenge 3 
ticketBtn.addEventListener('click', renderTicketNum)

function renderTicketNum(e) {
    e.preventDefault();
    updateTicketNum(filmArr)
}

function updateTicketNum(films) {
   const newTicketSold = films.tickets_sold + 1 
   if(films.tickets_sold !== films.capacity) {
    fetch(`${API}/${films.id}`, {
        method: 'PATCH',
        headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({newTicketSold})
       })
       .then(res => res.json())
       .then(() => {
            films.tickets_sold = newTicketSold
            renderTickets(films)
       })
   }
   else {
    alert('Sold Out!')
   }
}