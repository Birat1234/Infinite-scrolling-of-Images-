const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
 
const count = 30;
const apiKey = 'NzSUPYbwn2elsThh_DKaDPleZZIOZD1irzQEdNUrdEc';

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {

    loader.hidden = true;
    console.log('image loaded');
}

//Function for links, urls for each photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        //An achor <a> to Unsplush for description of the photo
        const item = document.createElement('a'); 
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target', '_blank');

        //<img> for the photo
        const img = document.createElement('img'); 
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        //Check when image is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, and then both inside the imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from API

async function getPhotos() {
    try{
       const response = await fetch(apiURL) ; 
       photosArray = await response.json();
       displayPhotos();
    }catch(error){

    }
}
//Check if we are almost in the bottom of the page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
       
        getPhotos();
        console.log('loaded more');
    }     
})

getPhotos(); 