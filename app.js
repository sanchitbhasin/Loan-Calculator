document.querySelector('#loan-form').addEventListener('submit', function(e) {
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'block';
    
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

function calculateResults() {
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    let principle = parseFloat(amount.value);
    let i = parseFloat(interest.value) / 100;
    const tp = principle * Math.pow((1+i), years.value);
    const mp = tp / (years.value * 12);
    const ti = tp - principle;

    if(isFinite(mp)) {
        monthlyPayment.disabled = false;
        monthlyPayment.value = mp;

        totalPayment.value = tp;
        totalPayment.disabled = false;

        totalInterest.value = ti;
        totalInterest.disabled = false;

        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check the numbers...');
    }
}

function showError(error) {

    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';

    const div = document.createElement('div');
    div.className = 'alert alert-danger';

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    div.appendChild(document.createTextNode(error));

    card.insertBefore(div, heading);

    //set time out
    setTimeout(clearError, 1500);
}

function clearError() {
    document.querySelector('.alert').remove();
}