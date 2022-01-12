import Notiflix from 'notiflix';
import axios, { Axios } from "axios";
import SimpleLightbox from "simplelightbox";
// import {fetchImages} from './fetchImages';
import {render, gallery} from "./render";
import ImagesApiServise from "./images-service";
import LoadMoreBtn from './load-more-btn';


import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

//!======================refs=================================

const refs = {
	form: document.querySelector('#search-form'),
	// btnLoadMore:document.querySelector('.load-more'),
}
const imagesApiServise = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({selector: ".load-more", hidden:true});

refs.form.addEventListener('submit', onSubmitBtnClick);
loadMoreBtn.refs.button.addEventListener('click', onBtnLoadMoreClick);

//!======================fns==================================

function onSubmitBtnClick(e) {
	e.preventDefault();
	imagesApiServise.query = e.currentTarget.elements.searchQuery.value;
	imagesApiServise.resetPage();
	gallery.innerHTML = "";

	if(imagesApiServise.query.trim() === ''){
			Notiflix.Notify.warning("Enter correct characters to search!!!")
      return;
	}

	loadMoreBtn.show()
loadMoreBtn.disabled()


imagesApiServise.fetchImages()
.then(images => {

	if(images.length === 0){
	Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
	gallery.innerHTML = "";
}
render(images);

loadMoreBtn.enable();
})
.catch((error) => {
	Notiflix.Notify.failure('Sorry.Something wrong(')
});

e.currentTarget.reset();
}


function onBtnLoadMoreClick(e) {
	e.preventDefault();
	
loadMoreBtn.disabled();

imagesApiServise.fetchImages().then((images) => {
	render(images);
loadMoreBtn.enable();
});
}


// const gallery = new SimpleLightbox('.gallery a', {
// 	captionsData:'alt',
// 	captionType:'alt',
// 		captionDelay:250,
// 	captionPosition:'bottom',
//  });

