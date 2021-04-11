const currency_El_one = document.getElementById('currency-one');
const amount_El_one = document.getElementById('amount-one');
const currency_El_two = document.getElementById('currency-two');
const amount_El_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM  
function calculate() {
    const currency_one = currency_El_one.value;
    const currency_two = currency_El_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
       .then(res => res.json())
         .then(data => {
             const rate = data.rates[currency_two];
             rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
             amount_El_two.value = (amount_El_one.value*rate).toFixed(2);
         });
}

//Event Listeners
currency_El_one.addEventListener('change',calculate);
amount_El_one.addEventListener('input',calculate);
currency_El_two.addEventListener('change',calculate);
amount_El_two.addEventListener('input',calculate);

swap.addEventListener('click',() => {
    const temp = currency_El_one.value;
    currency_El_one.value = currency_El_two.value;
    currency_El_two.value = temp;
    calculate();
});

calculate();