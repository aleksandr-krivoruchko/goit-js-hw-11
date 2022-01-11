const BASE_URL = "https://pixabay.com/api";
const myKey = '25188312-8cdfcf53729040d6ed9110eb8';



export function fetchImages(value) {
	
  return fetch(`${BASE_URL}/?key=${myKey}&q=${value}&image_type=photo&orientation=horizontal&safesearch =true`)
    .then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
