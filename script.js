// On ajoute le bouton pour sauvegarder les notes déjà vues :
button = document.createElement("button");
button.innerHTML = "Sauvegarder les notes connues"
button.classList.add('btn', 'btn-sm', 'btn-primary')
button.id = "save-notes-btn"

notesTitle = document.querySelector("#mainContent > div.row > div:nth-child(5) > div > h4")
notesTitle.appendChild(button)


// Fonction qui revoit la liste des id des notes
function getNotesId() {
    ids = []
    lines = document.querySelectorAll("#mainContent > div.row > div:nth-child(5) > div > div > table > tbody > tr")
    lines.forEach(line => {
        button = line.querySelector("td:nth-child(7) > button")
        url = button.dataset.url.split('/')
        noteId = parseInt(url[url.length-1])
        ids.push(noteId)
    });

    return ids
}


// Fonction pour mettre en surbriance les notes inconnues
function addColorToUnknowNotes(notesAlreadyKnow) {
    lines = document.querySelectorAll("#mainContent > div.row > div:nth-child(5) > div > div > table > tbody > tr")
    lines.forEach(line => {
        button = line.querySelector("td:nth-child(7) > button")
        url = button.dataset.url.split('/')
        noteId = parseInt(url[url.length-1])
        console.log(noteId + " " + notesAlreadyKnow)
        if (!notesAlreadyKnow || !notesAlreadyKnow.includes(noteId)) {
            line.classList.add('new-note')
        } else {
            line.classList.remove('new-note')
        }
    });
}

function trierNotes() {
    
}


// Quand le bouton est cliqué, on sauvegarder les notes, puis en recharge les notes en surbriance
button.addEventListener('click', () => {
    console.log('clic du bouton')
    ids = getNotesId()
    chrome.storage.sync.set({notesAlreadyKnow: ids}, function() {
        console.log('rechargement de la page')
        addColorToUnknowNotes(ids)
    });
})


// Lors du chargement de la page, on met les notes inconnues en surbriance
chrome.storage.sync.get(['notesAlreadyKnow'], function(result) {
    console.log('Chargement des notes.')
    addColorToUnknowNotes(result.notesAlreadyKnow);
});