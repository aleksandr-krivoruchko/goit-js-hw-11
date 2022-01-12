import Notiflix from 'notiflix';
// import axios, { Axios } from "axios";
import SimpleLightbox from "simplelightbox";
import {render, gallery} from "./render";
import ImagesApiServise from "./images-service";
import LoadMoreBtn from './load-more-btn';


import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

//!======================refs=================================

const refs = {
	form: document.querySelector('#search-form'),
}
const imagesApiServise = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden:true});

refs.form.addEventListener('submit', onSubmitBtnClick);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

//!======================fns==================================

function onSubmitBtnClick(e) {
	e.preventDefault();
	imagesApiServise.query = e.currentTarget.elements.searchQuery.value;
	imagesApiServise.resetPage();
	gallery.innerHTML = "";

	if(imagesApiServise.query.trim() === ''){
		loadMoreBtn.hide();
			Notiflix.Notify.warning("Enter correct characters to search!!!")
      return;
	}
	loadMoreBtn.show();
	fetchImages();

e.currentTarget.reset();
}

function fetchImages() {
	loadMoreBtn.disabled()
imagesApiServise.fetchImages()
.then(images => {
		countOfImages();
	if(images.length === 0){
		loadMoreBtn.hide();
	Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
	gallery.innerHTML = "";
}

render(images);

loadMoreBtn.enable();
})
.catch((error) => {
	Notiflix.Notify.failure('Sorry.Something wrong(')
});

}

function countOfImages() {
const currentPage = imagesApiServise.page * imagesApiServise.perPage - imagesApiServise.perPage;
const maxPages = imagesApiServise.totalImages;
if(currentPage === 40){
	Notiflix.Notify.success(`Hooray! We found ${maxPages} images.`);

}

if(currentPage > maxPages){
		loadMoreBtn.hide();
Notiflix.Notify.info(`We're sorry, but you've reached the end of search ${maxPages} results`);
}
}

// const gallery = new SimpleLightbox('.gallery a', {
// 	captionsData:'alt',
// 	captionType:'alt',
// 		captionDelay:250,
// 	captionPosition:'bottom',
//  });

