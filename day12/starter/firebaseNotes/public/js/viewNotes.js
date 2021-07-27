let googleUser, googleUserId, data;

window.onload = () => {
// When page loads, check user logged in state
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // If logged in, get user's notes from db
            //      Display notes on page
            googleUserId = user.uid;
            googleUser = user;
            getNotes(googleUserId);
        } else {
            // If not logged in redirect to log in page
            window.location = 'index.html';
        }
    }); 
}



const getNotes = (userId) => {
    console.log(userId)
    const userRef = firebase.database().ref(`users/${userId}`)
    userRef.on('value', snapshot => {
        writeNotesToHtml(snapshot.val())
        data = snapshot.val()
    })
}

const writeNotesToHtml = (data) => {
    const noteRenderArea = document.querySelector('#app')
    for (let noteKey in data) {
        // Create HTML string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        noteRenderArea.innerHTML += noteHtml;

    }
    // Put all HTML into page at once
}

const createHtmlForNote = (Note) => {
    let bgcolor = [Math.floor(Math.random() * 127), Math.floor(Math.random() * 127), Math.floor(Math.random() * 127)]
    //TODO rgb(${255-bgcolor[0]}, ${255-bgcolor[1]}, ${255-bgcolor[2]})
    let noteFullHtml = `<div class="column is-one-third">
                <div class="card" style="background-color:rgb(${bgcolor[0]}, ${bgcolor[1]}, ${bgcolor[2]});color:white">
                    <header class="card-header">
                        <p class="card-header-title is-size-3" style="color:white">
                            ${Note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content is-size-4">
                            ${Note.text}
                        </div>`
    Note.labels.forEach((element) => {
        if (element !== "") {
            noteFullHtml += `<span class="tag is-black mr-2 is-medium">${element}</span>`
        } else {
            noteFullHtml += `<span class="tag is-invisible is-medium"></span>`
        }
    })
    noteFullHtml += `</div>
                    <footer class="card-footer">
                        <span class="pl-5 py-5">
                            Written by ${googleUser.displayName} (${googleUser.email})
                        </span>
                    </footer>
                </div>
             </div>`;
    return noteFullHtml
}

const searchLabels = () => {
    let index = 0
    const filteredNotes = {}
    const searchBar = document.querySelector("#searchBar")
    const noteRenderArea = document.querySelector('#app')
    const userRef = firebase.database().ref(`users/${googleUserId}`)
    userRef.on('value', snapshot => {
        const data = snapshot.val()
        for (let noteKey in data) {
            console.log(data[noteKey])
            if(data[noteKey].labels.includes(searchBar.value)) {
                filteredNotes[index] = data[noteKey]
                index += 1;
                console.log(filteredNotes)
            }
        }
    })
    noteRenderArea.innerHTML = ""
    writeNotesToHtml(filteredNotes)
    
}

const resetSearch = () => {
    const noteRenderArea = document.querySelector('#app')
    noteRenderArea.innerHTML = ""
    writeNotesToHtml(data)
}