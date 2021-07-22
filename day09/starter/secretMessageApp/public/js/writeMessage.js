const submitMessage = () => {
    console.log("Submitting message...")
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const messageValue = messageInput.value;
    const passcodeValue = passcodeInput.value;

    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });

    passcodeInput.value = ''
    messageInput.value = ''
}

// const sendMessageButton = document.querySelector('.button');
// sendMessageButton.addEventListener('click', submitMessage)
