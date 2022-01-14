	import axios from "axios";

	const BASE_URL = "https://pixabay.com/api";
const MY_API_KEY = '25188312-8cdfcf53729040d6ed9110eb8';


export default class ImagesApiServise {
	
constructor(){
this.searchQuery = '';
this.page = 1;
this.totalImages;
this.perPage = 40;
// this.params = {
// 	searchQuery: '',
// 	page:1,
// 	perPage: 40,
// 	image_type: 'photo',
// 	orientation: 'horizontal',
// 	safesearch: 'true'
// }
}

	async fetchImages () {
		 const response = await fetch(`${BASE_URL}/?key=${MY_API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`);

		 const images = await response.json();

		this.incrementPage();
		this.totalImages = images.totalHits;

		return images.hits;
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