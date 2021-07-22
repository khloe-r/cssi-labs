let numAttempts = 0;

const getMessages = () => {
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const passcodeAttempt = document.querySelector('#passcode').value
        let passwordTrue = false;
        
        for (const recordKey in data) {
            const record = data[recordKey]
            const storedPasscode = record.passcode;

            if (passcodeAttempt === storedPasscode) {
                passwordTrue = true;
                console.log(`Message is: ${record.message}`);
                renderMessageAsHtml(record.message);
            }
        }
        if (passwordTrue === false) {
            renderMessageAsHtml("Error! Incorrect Password!");
            numAttempts += 1;
            if (numAttempts > 5) {
                const submitBtn = document.querySelector("#viewMsg");
                submitBtn.disabled = true;
                setTimeout(function () {
                    submitBtn.disabled = false;
                    numAttempts = 0;
                }, 5000)
            }
        }
    })
}

const renderMessageAsHtml = (message) => {
    const passCodeInput = document.querySelector('#passcode');
    passCodeInput.value = "";
    const resultCard = document.querySelector("#resultCard");
    resultCard.classList.toggle("is-invisible", false);
    const messageDisplay = document.querySelector('#message');
    messageDisplay.innerHTML = message;
}