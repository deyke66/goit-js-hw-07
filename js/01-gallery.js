import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallerySpace = document.querySelector('.gallery');
console.log(gallerySpace)

gallerySpace.addEventListener('click', onGalleryClick);

const markup = (function () {
    const newMarkup = galleryItems.map(item =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      loading='lazy'
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`)
    return newMarkup
})().join('');

gallerySpace.innerHTML = markup

function onGalleryClick(evt) {
    evt.preventDefault();
    
    if (evt.target.nodeName !== 'IMG') {
        return
    }

    const targetEvent = evt.target.dataset.source

    modalForGallery(targetEvent); 
}

function modalForGallery(params) {
    const instance = basicLightbox.create(`
    <img src="${params}">
    `, {
      onShow: (instance) => { document.addEventListener('keydown', onCloseModalButton) },
      onClose: (instance) => { document.removeEventListener('keydown', onCloseModalButton) }
    })

    instance.show()

  function onCloseModalButton(e) {
  if (e.code === "Escape") {
      instance.close()
    }
}

}
