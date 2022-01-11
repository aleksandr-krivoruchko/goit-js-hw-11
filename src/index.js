import Notiflix from 'notiflix';
import axios, { Axios } from "axios";
import {fetchImages} from './fetchImages';
import {render} from "./render";

import './css/styles.css';

const refs = {
	form: document.querySelector('#search-form'),
	gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(e) {
	e.preventDefault();
	const form = e.currentTarget.elements;
	const value = form.searchQuery.value;
fetchImages(value)
.then(response => {
	render(response.hits, refs.gallery);

})
.catch(error => console.log(error));

}

//  function render(images) {
// 	const markup = images.map ((image) => {
// 		return `<div class="photo-card">
//   <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:${image.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:${image.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments:${image.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:${image.downloads}</b>
//     </p>
//   </div>
// </div>`}).join("");
// refs.gallery.innerHTML = markup;
// }





