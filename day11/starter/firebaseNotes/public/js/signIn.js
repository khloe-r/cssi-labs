const signIn = () => {
    console.log("Calling sign in")
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            //do something
            console.log(`Result is: ${result}`)
            const credential = result.credential
            const token = credential.accessToken
            const user = result.user
            console.log(user.uid)
            window.location = 'writeNote.html'
        })
        .catch(error => {
            //something bad happens
            console.log(error)
        })
}

const signInManually = () => {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value

    const loginRef = firebase.database().ref('login/');
    loginRef.on('value', (snapshot) => {
        const data = snapshot.val();

        for(user in data) {
            if(data[user].username === username && data[user].password === password) {
                window.location = 'writeNote.html'
            }
        }
    });
}