
const defaultFromCurrency = 'USD';
const defaultToCurrency = 'AUD';
const dropdown = document.querySelectorAll(".dropdown select");
const amountInput = document.querySelector('.amount input');
const message = document.querySelector('.msg p');
const button = document.querySelector('.submit');

const fetchData = async () => {
    try {
        if (amountInput.value === '') {
            amountInput.value = 100;
        } else if (amountInput.value < 1) {
            amountInput.value /= -1;
        }
        amountInput.style.borderColor = '';

        const fromCurrency = dropdown[0].value.toLowerCase();
        const toCurrency = dropdown[1].value.toLowerCase();

        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const finalAmount = amountInput.value * data[fromCurrency][toCurrency];

        message.innerText = `${amountInput.value} ${fromCurrency.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;

    } catch (error) {
        console.error("Error fetching currency data:", error);
    } 
}

const updateFlag = (element) => {
    const countryCode = countryList[element.value];
    const flagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = element.parentElement.querySelector('img');
    flag.setAttribute('src', flagURL);
}

for (const select of dropdown) {
    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    });
    for (const currencyCode in countryList) {
        let opt = document.createElement('option');
        opt.innerText = currencyCode;
        opt.value = currencyCode;
        select.appendChild(opt);

        if (select.id === "from" && currencyCode === defaultFromCurrency) {
            opt.selected = 'selected';
            updateFlag(select);
        } else if (select.id === "to" && currencyCode === defaultToCurrency) {
            opt.selected = 'selected';
            updateFlag(select);
        }
    }
}

amountInput.addEventListener('blur', (event) => {
    const value = parseFloat(event.target.value);
    if (value === '' || value < 1 || isNaN(value)) {
        event.target.style.borderColor = 'red';
    } else {
        event.target.style.borderColor = '';
    }
});

button.addEventListener('click', (event) => {
    event.preventDefault();
    fetchData();    
});

window.addEventListener('load', () => {
    fetchData();
})