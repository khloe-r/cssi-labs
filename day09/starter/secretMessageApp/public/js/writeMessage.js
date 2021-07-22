function numeric(inputtxt)
{
    var nonnumbers = /^[a-zA-Z-,_!@#$%^&*().:;"'/?|]+$/;
    if((inputtxt.match(nonnumbers)))
    {
        return true;
    }
    else
    { 
        // If returns false means there is a number
        return false; 
    }
}
const submitMessage = () => {
    console.log("Submitting message...")
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const messageValue = messageInput.value;
    const passcodeValue = passcodeInput.value;

    const messageLength = messageValue.length;
    const messageLimit = 25;

    if (messageLength <= 25) {
        if(numeric(passcodeValue) === false) {
            firebase.database().ref().push({
            message: messageValue,
            passcode: passcodeValue
            });
        }
        else {
            alert('Error! Passcode must contain a number and capital letter')
        }
    }
    else {
        alert(`Error! Message is over the ${messageLimit} character limit.`)
    }
        

    passcodeInput.value = ''
    messageInput.value = ''
}

// const sendMessageButton = document.querySelector('.button');
// sendMessageButton.addEventListener('click', submitMessage)
