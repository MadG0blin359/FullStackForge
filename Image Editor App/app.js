
const fileInput = document.querySelector('.imageUpload'),
filterSlider = document.querySelector('.slider input'),
previewImage = document.querySelector('.preview-image img'),
chooseImageBtn = document.querySelector('.choose-image'),
options = document.querySelectorAll('.options'),
resetFilterBtn = document.querySelector('.reset-filters'),
saveImageBtn = document.querySelector('.save-image');

let filterValue = document.querySelector('.value');
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];  // Get the first selected file
    if (!file) return;  // Check whether a file has been uploaded
    else if (!file.type.startsWith('image/')) { // Verify file type
        alert('Invalid file type selected. Please choose an image.');
        return;
    } else {
        previewImage.src = URL.createObjectURL(file);   // Get a blob URL
        previewImage.addEventListener('load', () => {
            document.querySelector('.container').classList.remove('disable');
            resetFilters();
        });
    }
}

const updateFilterValue = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const activeFilter = document.querySelector('.active').value;
    
    if (activeFilter === 'brightness') {
        brightness = filterSlider.value;
    } else if (activeFilter === 'saturation') {
        saturation = filterSlider.value;
    } else if (activeFilter === 'inversion') {
        inversion = filterSlider.value;
    } else if (activeFilter === 'grayscale') {
        grayscale = filterSlider.value;
    }

    applyFilters();
}

const retrieveFilterValue = (activeFilter) => {
    if (activeFilter === 'brightness') {
        filterSlider.max = "200";
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
    } else if (activeFilter === 'saturation') {
        filterSlider.max = "200";
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
    } else if (activeFilter === 'inversion') {
        filterSlider.max = "100";
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
    } else if (activeFilter === 'grayscale') {
        filterSlider.max = "100";
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
    }
}

const resetFilters = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    applyFilters();
    options[0].children[0].click();
}

const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    // Apply user filters
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); // Translate canvas origin to image center
    if (rotate !== 0) { // Apply rotate in radians
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);    // Apply image flips
    // Start drawing from the negative half width & height from the center/origin to the positive half width & height
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');  // Pass image data URL 
    link.download = 'edited.png';

    document.body.appendChild(link); // Temporarily add to DOM
    link.click();
    document.body.removeChild(link); // Remove from DOM
}

options[0].addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const activeFilter = document.querySelector('.active');
        if (activeFilter != event.target) {
            activeFilter.classList.remove('active');
            event.target.classList.add('active');
            document.querySelector('.filter-name').innerText = event.target.innerText;
            
            retrieveFilterValue(event.target.value);
        }
    }
});

options[1].addEventListener('click', (event) => {
    // Upon clicking on rotate icon, .closest('button') finds its parent button
    const clickedButton = event.target.closest('button');
    
    switch (clickedButton.value) {
        case 'rotate-left':
            rotate -= 90;
            break;
        case 'rotate-right':
            rotate += 90;
            break;
        case 'reflect-vertical':
            flipVertical = flipVertical === 1 ? -1 : 1;
            break;
        case 'reflect-horizontal':
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            break;
    }

    applyFilters();
});

chooseImageBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilterValue);
resetFilterBtn.addEventListener('click', resetFilters);
saveImageBtn.addEventListener('click', saveImage);