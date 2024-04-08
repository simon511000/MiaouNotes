const alertDiv = document.createElement('div');
alertDiv.classList.add('alert', 'alert-danger', 'foot-weight-bold', 'display-6');
alertDiv.innerHTML = `Important: L'extension MiaouNotes n'est plus maintenue et est donc obsolète.<br>Téléchargez son successeur, <a href="https://chromewebstore.google.com/detail/better-iut-rcc/jofahdhjofjoackgkaodimfhnbfkgnbj?hl=fr" target="_blank">Better IUT RCC</a> (aussi disponible sur Firefox et Android) dès maintenant!`;

document.querySelector('#mainContent').prepend(alertDiv);

// Récupération des notes connues
/*browser.storage.sync.get('notesAlreadyKnow').then((result) => {
    const notesConnues: number[] = result.notesAlreadyKnow || []

    const tableau: HTMLTableElement = document.querySelector("#mainContent > div.row > div:nth-child(5) > div > div > table")
    let notes = recupererToutesLesNotesTriees(tableau)

    console.log(notesConnues)
    let tableauTrie = recreerTableau(notes, notesConnues)

    tableau.replaceWith(tableauTrie)


    const boutonSauvegarde = ajouterBoutonSauvegarde()
    // Quand le bouton est cliqué, on sauvegarder les notes, puis en recrée le tableau
    boutonSauvegarde.addEventListener('click', (e) => {
        e.preventDefault();

        let ids: number[] = []
        notes.forEach((note) => {
            ids.push(note.id)
        })

        browser.storage.sync.set({notesAlreadyKnow: ids}).then(() => {
            console.log('rechargement de la page')
            location.reload()
        })
    })
})*/