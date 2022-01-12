	const BASE_URL = "https://pixabay.com/api";
const MY_API_KEY = '25188312-8cdfcf53729040d6ed9110eb8';


export default class ImagesApiServise {
	
constructor(){
this.searchQuery = '';
this.page = 1;
}

fetchImages() {

  return fetch(`${BASE_URL}/?key=${MY_API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch =true&per_page=40&page=${this.page}`)
    .then(response => response.json())
	 .then(({hits}) => {

		this.incrementPage();
		return hits;
	 });
}

incrementPage(){
	this.page += 1;
}

resetPage(){
	this.page = 1;
}

get query() {
return this.searchQuery;
}

set query(newQuery){
	this.searchQuery = newQuery;
}
}