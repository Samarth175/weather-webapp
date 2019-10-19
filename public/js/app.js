const formElement = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

messageOne.textContent = '';
messageTwo.textContent = '';
messageThree.textContent = '';

formElement.addEventListener('submit',(e) => {
    e.preventDefault();

    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.Location;
                messageTwo.textContent = data.Temperature;
                messageThree.textContent = data.Summary;
            }
        });
    });
});