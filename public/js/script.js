const previewImages = document.querySelectorAll('.preview-list img');
const fullSizeImage = document.getElementById('full-size-image');

previewImages.forEach((preview) => {
  preview.addEventListener('click', () => {
    const fullImageUrl = preview.getAttribute('data-full');

    console.log(fullImageUrl);
    

    fullSizeImage.src = fullImageUrl;
    fullSizeImage.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log(`DOM fully loaded and parsed !!!!`);
    
});


window.addEventListener('pageshow', (event) => {
    console.log(`Page show event:`, event);
    const li = document.createElement('li');
    li.innerHTML = "Page show event fired at " + new Date().toLocaleTimeString();
    const noteList = document.getElementById('note-board');
    noteList.appendChild(li);
});