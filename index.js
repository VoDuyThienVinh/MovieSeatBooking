const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const btnReset = document.querySelector('.btn-reset');
const btnSelectAll = document.querySelector('.btn-select-all');

console.log(btnReset, seats);

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // not ('.row.seat.selected')
    
    // Copy selected seats
    // Map through arr
    // Return a new array indexes

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        }); 
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    console.log(selectedMovieIndex);
    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Button reset event
btnReset.addEventListener('click', () => { 
    seats.forEach(item => {
        if(item.classList.contains('selected')){
            item.classList.remove('selected');
        }
    });
    
    count.innerText = 0;
    total.innerText = 0;

    window.localStorage.clear();
});


// Button select all event
btnSelectAll.addEventListener('click', () => {
    seats.forEach(item => {
        if(!item.classList.contains('occupied')){
            item.classList.add('selected');
        }
    })
    updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();

//(.row > .seat.selected) == (.row .seat.selected)


