// Unsplash API
let count = 5;
const apiKey = '8Ylaz3r0KtYMVdz0AjDhxWLjngtyOvilAdQawcKk64Y'
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const proxyUrl = 'https://ziyaadcors.herokuapp.com/'
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (elem, attr) => {
    for(const key in attr){
        elem.attr(key,attr[key])
    }
}

const imageLoaded = () =>{
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        $('#loader').hide()

        count = 30
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
    }
}

// Create Elements for links in photos, and Add to DOM
const displayPhotos = () =>{
    imagesLoaded = 0
    totalImages = photosArray.length;
    // run for each object in array
    photosArray.forEach((photo) => {
        // create <a> link to unsplash
        let item = $('<a></a>')
        $('#item').append(item)
        setAttributes(item, {
            href:photo.links.html,
            targets:'_blank'
        })
        // create <img> for photo
        const img = $('<img>')
        $('#img').append(img)
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        img.on('load',imageLoaded());
        // Put <img> inside of <a> then inside image container
        item.append(img)
        $('#image-container').append(item)
    });
}

// Get Photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(proxyUrl + apiUrl);
        photosArray = await response.json()
        displayPhotos();
    } catch (error) {
        console.log('Oooops ! could not get photos ', error)
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
$(window).scroll(() => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && ready ){
        ready = false
        getPhotos();
    }
})

// on Load
getPhotos();