import axios from 'axios';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import brick from "../img/brick.svg";
import * as render from './render-functions';


export function getImagesByQuery(query) {
    const loader = document.querySelector('.container-form span');
    render.showLoader();

    axios.get('https://pixabay.com/api/', {
        params: {
            key: "49710330-98dfa6cd438c2509062a34f3f",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        }
    })
        .then(response => { 
            if (response.data.hits.length === 0) {
                iziToast.error({
                    title: '',
                    iconUrl: brick,
                    message: 'Sorry, there are no images matching your search query. Please, try again!',
                    position: 'topRight',
                    backgroundColor: '#ef4040',
                    messageColor: 'white',
                    titleColor: 'white',
                    timeout: 4000,
                    maxWidth: 380,
                });
            } else {
                render.createGallery(response.data.hits);
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            iziToast.error({
                title: '',
                iconUrl: brick,
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: 'white',
                titleColor: 'white',
                timeout: 4000,
                maxWidth: 380,
            });
        })
        .finally(() => {
            render.hideLoader();
        })
}