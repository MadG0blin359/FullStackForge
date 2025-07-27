
const searchInput = document.querySelector('.search_bar input');
const searchButton = document.querySelector('#search');
const filtersContainer = document.querySelector('.filters');
const filterButtons = Array.from(filtersContainer.children); 
const products_container = document.querySelector('.products_container');
const noResults = document.querySelector('.noResults');

for (const item of products) {
    const card = document.createElement('div');
    // Assigning product category as css class
    card.classList.add('card', item.category);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image_container');
    card.appendChild(imgContainer);

    const image = document.createElement('img');
    image.setAttribute('src', item.imageUrl);
    imgContainer.appendChild(image);

    const title = document.createElement('h5');
    title.innerText = item.name.toUpperCase();
    card.appendChild(title);

    const tagContainer = document.createElement('div');
    tagContainer.classList.add('tag_container');
    const tag = document.createElement('span');
    tag.innerText = item.category;
    tagContainer.appendChild(tag);
    card.appendChild(tagContainer);

    const price = document.createElement('h5');
    price.innerText = '$' + item.price;
    card.appendChild(price);
    
    products_container.appendChild(card);
}

const cards = Array.from(products_container.children);

const filterProducts = (category) => {
    for (const product of cards) {
        if (category === 'All') {
            product.classList.remove('hide');
        } else {
            if (!product.classList.contains(category)) {
                product.classList.add('hide');
            } else {
                product.classList.remove('hide');
            }
        }
    }
}

const searchProducts = (query) => {
    let category;
    let found = false;

    // Get current selected category 
    category = document.querySelector('.filter-button-active').value;

    // Search in a specific category
    cards.forEach((element) => {
        if (element.classList.contains(category) || category === 'All') {
            if (element.innerText.includes(query.toUpperCase())) {
                element.classList.remove('hide');
                found = true;
            } else {
                element.classList.add('hide');
            }
        }
    });

    if (!found) {
        noResults.classList.remove('hide');
    }
}

searchButton.addEventListener('click', () => {
    if (searchInput.value != '') {
        noResults.classList.add('hide');
        searchProducts(searchInput.value);
    }
});

filtersContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        noResults.classList.add('hide');
        filterButtons.forEach(element => {
            element.classList.remove('filter-button-active');
        });
        event.target.classList.add('filter-button-active');
        filterProducts(event.target.innerText);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    filterButtons[0].classList.add('filter-button-active');
});