const params = new URLSearchParams(location.search)

const section = params.get("section")
const genre = params.get("genre")
const year = params.get("year")

const title = document.getElementById("catalogTitle")
const grid = document.getElementById("catalogGrid")

// ---------- сделать минимум 10 карточек ----------
function ensureTen(cards){

let arr = Array.from(cards)

if(arr.length === 0) return arr

while(arr.length < 10){
arr = arr.concat(arr)
}

return arr.slice(0,10)

}

// ---------- перевод заголовка ----------
function setTitle(key){

title.setAttribute("data-i18n", key)

if(window.translatePage){
translatePage()
}else{
title.innerText = key
}

}

// ---------- загрузка блока ----------
function loadCards(selector,titleKey){

setTitle(titleKey)

fetch("index.html")
.then(res => res.text())
.then(html => {

const parser = new DOMParser()
const doc = parser.parseFromString(html,"text/html")

let cards = doc.querySelectorAll(selector)

cards = ensureTen(cards)

grid.innerHTML=""

cards.forEach(card=>{
grid.appendChild(card.cloneNode(true))
})

})

}

// ---------- фильтр ----------
function filterMovies(type,value){

fetch("index.html")
.then(res=>res.text())
.then(html=>{

const parser = new DOMParser()
const doc = parser.parseFromString(html,"text/html")

const cards = doc.querySelectorAll("#top .movie-card, #new .movie-card")

let result=[]

cards.forEach(card=>{

const meta = card.querySelector(".movie-card-meta")
if(!meta) return

const spans = meta.querySelectorAll("span")

const movieYear = spans[0]?.innerText
const movieGenre = spans[1]?.innerText?.toLowerCase()

if(type==="year" && movieYear === value){
result.push(card)
}

if(type==="genre" && movieGenre && movieGenre.includes(value.toLowerCase())){
result.push(card)
}

})

// если ничего не найдено — показать обычные фильмы
if(result.length === 0){
result = Array.from(cards)
}

result = ensureTen(result)

grid.innerHTML=""

result.forEach(card=>{
grid.appendChild(card.cloneNode(true))
})

// заголовок
title.innerText = value

})

}

// ---------- секции ----------
if(section==="top"){
loadCards("#top .movie-card","nav.top")
}

if(section==="new"){
loadCards("#new .movie-card","nav.new")
}

if(section==="genres"){
loadCards("#genres .movie-card","nav.genres")
}

if(section==="years"){
loadCards("#years .movie-card","nav.years")
}

// ---------- фильтры ----------
if(genre){
filterMovies("genre",genre)
}

if(year){
filterMovies("year",year)
}