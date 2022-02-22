/* jshint esversion: 11 */

function checkForm() {
    let formErrorsDiv = document.getElementById('form-errors');
    let errorList = [];

    const fullNameInput = document.getElementById('contact-name');
    let n = fullNameInput.value;
    fullNameInput.classList.remove('error');
    if (n.length < 1) {
        errorList.push('Missing full name.');
        fullNameInput.classList.add('error');
    }

    const emailInput = document.getElementById('contact-email');
    let e = emailInput.value;
    emailInput.classList.remove('error');
    if (!e.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/)){
        errorList.push('Invalid or missing email address.');
        emailInput.classList.add('error');
    }

    const phoneInput = document.getElementById('contact-phone');
    let p = phoneInput.value;
    phoneInput.classList.remove('error');
    let nd = [...p.match(/\d/g)]?.length ?? 0;
    console.log(nd);
    if (nd !== 10 && nd !== 11) {
        errorList.push('Invalid or missing phone number.');
        phoneInput.classList.add('error');
    }

    const messageField = document.getElementById('contact-message');
    let m = messageField.value;
    if (m.length < 1) {
        errorList.push('No message given.');
    }

    if (errorList.length >= 1) {
        formErrorsDiv.classList.remove('hide');
        let errUl = document.createElement('ul');
        for (let err of errorList) {
            let errLi = document.createElement('li');
            errLi.textContent = err;
            errUl.appendChild(errLi);
        }
        formErrorsDiv.replaceChildren(errUl);
        return false;
    } else {
        formErrorsDiv.classList.add('hide');
        return {
            name: n,
            email: e,
            phone: p,
            message: m
        };
    }
}

$('#contact-submit').on('click', e => {
    e.preventDefault();
    // https://go5sj4fn11.execute-api.us-west-1.amazonaws.com/prod

    let body;
    if ((body = checkForm())) {
        console.log(body);
        $.post(
            'https://go5sj4fn11.execute-api.us-west-1.amazonaws.com/prod', JSON.stringify(body),
            () => null
        );
    }
});