import { Note } from './Note'

export function recupererToutesLesNotesTriees(tableauHtml: HTMLTableElement) : Note[] {
    const tbody = tableauHtml.querySelector("tbody")
    let notes: Note[] = []

    const lignes = tbody.querySelectorAll('tr')
    lignes.forEach(ligne => {
        let buttonUrl = ligne.querySelector('td:nth-child(7) > button').getAttribute('data-modal-modal-url-value').split('/')
        let noteId = parseInt(buttonUrl[buttonUrl.length-1])
        let noteMatiere = ligne.querySelector("td:nth-child(1)").textContent
        let noteEvaluation = ligne.querySelector("td:nth-child(2)").textContent
        let noteDate = ligne.querySelector("td:nth-child(3)").textContent
        let noteCommentaire = ligne.querySelector("td:nth-child(4)").textContent
        let noteNote = Number(ligne.querySelector('td:nth-child(5) .badge').textContent.replace(',', '.'))
        noteNote = isNaN(noteNote) ? -1 : noteNote
        let noteCoefficient = Number(ligne.querySelector('td:nth-child(6)').textContent)


        let note: Note = {
            id: noteId,
            matiere: noteMatiere,
            evaluation: noteEvaluation,
            date: noteDate,
            commentaire: noteCommentaire,
            note: noteNote,
            coefficient: noteCoefficient
        }

        notes.push(note)
    })

    notes.sort((a, b) => (a.matiere > b.matiere) ? 1 : -1)

    return notes
}

export function recreerTableau(notesTriees: Note[], notesConnues: number[]): HTMLTableElement {
    let table = document.createElement('table')
    table.classList.add('table', 'table-border', 'table-striped')


    let thead = document.createElement('thead')
    table.appendChild(thead)


    let trHead = document.createElement('tr')
    thead.appendChild(trHead)


    let thMatiere = document.createElement('th')
    thMatiere.textContent = 'Matière'
    trHead.appendChild(thMatiere)
    
    let thEvaluation = document.createElement('th')
    thEvaluation.textContent = 'Evaluation'
    trHead.appendChild(thEvaluation)

    let thDate = document.createElement('th')
    thDate.textContent = 'date'
    trHead.appendChild(thDate)

    let thCommentaire = document.createElement('th')
    thCommentaire.textContent = 'Commentaire de l\'évaluation'
    trHead.appendChild(thCommentaire)

    let thNote = document.createElement('th')
    thNote.textContent = 'Note'
    trHead.appendChild(thNote)

    let thCoefficient = document.createElement('th')
    thCoefficient.textContent = 'coefficient'
    trHead.appendChild(thCoefficient)
    
    let thInformation = document.createElement('th')
    thInformation.textContent = 'Informations'
    trHead.appendChild(thInformation)


    let tbody = document.createElement('tbody')
    table.appendChild(tbody)


    notesTriees.forEach((note, i) => {
        let estNouveau = !notesConnues.includes(note.id)
        let tr = creerLigne(note, false, estNouveau)
        tbody.appendChild(tr)

        // Si on a atteint la fin des notes d'une matière
        if(i == notesTriees.length-1 || notesTriees[i+1].matiere != note.matiere) {
            let tr = creerLigne({
                matiere: note.matiere,
                evaluation: 'Moyenne',
                note: calculerMoyenneMatiere(notesTriees, note.matiere)
            }, true)

            tbody.appendChild(tr)

        }
    })


    // Ajout de la moyenne générale
    let tr = creerLigne({
        matiere: '',
        evaluation: 'Moyenne Générale',
        note: calculerMoyenneGenerale(notesTriees)
    }, true)
    tbody.appendChild(tr)

    return table
}

export function ajouterBoutonSauvegarde(): HTMLButtonElement {
    let button = document.createElement("button");
    button.classList.add('btn', 'btn-sm', 'btn-danger');

    button.innerHTML = `
        <i class="fas fa-save"></i>
        Sauvegarder les notes connus
    `;

    let actions = document.querySelector("#mainContent > div > div:nth-child(5) > div > header > div")
    actions.prepend(button)

    return button;
}

export function calculerMoyenne(notes: number[], coefficients: number[]): number {
    // numérateur : n1*c1 + n2*c2 + n3*c3
    let numerateur = 0
    let change = false
    for (let i = 0; i < notes.length; i++) {
        if(notes[i] >= 0){
            numerateur += notes[i] * coefficients[i]
            change = true
        }
    }

    // dénominateur : c1 + c2 + c3
    let moyenne = -1
    if(change) {
        if(numerateur != -1) {
            let denominateur = coefficients.reduce((partial_sum, a) => partial_sum + a, 0)
    
            moyenne = numerateur / denominateur
        }
    }

    return moyenne
}

export function calculerMoyenneMatiere(toutesLesNotes: Note[], matiere: String): number {
    let notes: number[] = []
    let coefficients: number[] = []

    // récupération des notes et coefficients de toutes les notes de la matière
    toutesLesNotes.forEach((note) => {
        if(note.matiere == matiere){
            notes.push(note.note)
            coefficients.push(note.coefficient)
        }
    })

    let moyenne = calculerMoyenne(notes, coefficients)

    return moyenne
}

export function calculerMoyenneGenerale(toutesLesNotes: Note[]): number {
    let notes: number[] = []
    let coefficients: number[] = []

    // récupération des notes et coefficients de toutes les notes
    let oldMatiere = ''
    toutesLesNotes.forEach((note) => {
        if(oldMatiere != note.matiere){
            let moyenne = calculerMoyenneMatiere(toutesLesNotes, note.matiere)
            if(moyenne >= 0){
                notes.push(calculerMoyenneMatiere(toutesLesNotes, note.matiere))
                coefficients.push(1)
                oldMatiere = note.matiere
            }
        }
    })

    let moyenne = calculerMoyenne(notes, coefficients)

    return moyenne
}

export function creerLigne(note: Note, estUneMoyenne: boolean, nouveau = false): HTMLTableRowElement {
    let tr = document.createElement('tr')
    if(estUneMoyenne) tr.classList.add('moyenne')
    if(nouveau) tr.classList.add('new-note')

    let tdMatiere = document.createElement('td')
    tdMatiere.textContent = note.matiere
    tr.appendChild(tdMatiere)

    let tdEvaluation = document.createElement('td')
    tdEvaluation.textContent = note.evaluation
    tr.appendChild(tdEvaluation)

    let tdDate = document.createElement('td')
    tdDate.classList.add('hide')
    if(!estUneMoyenne) tdDate.textContent = note.date
    tr.appendChild(tdDate)

    let tdCommentaire = document.createElement('td')
    tdCommentaire.classList.add('hide')
    if(!estUneMoyenne) tdCommentaire.textContent = note.commentaire
    tr.appendChild(tdCommentaire)

    let tdNote = document.createElement('td')
    let span = document.createElement('span')
    if(note.note >= 10) {
        span.classList.add('badge', 'bg-success')
        span.textContent = note.note.toPrecision(4).toString()
    } else if(note.note == -1) {
        span.classList.add('badge', 'bg-warning')
        span.textContent = 'Pas de note ou pas de saisie ?'
    } else {
        span.classList.add('badge', 'bg-warning')
        if(note.note < 0) {
            span.textContent = note.note.toString()
        } else {
            span.textContent = note.note.toPrecision(4).toString()
        }
    }
    tdNote.appendChild(span)
    tr.appendChild(tdNote)

    let tdCoefficient = document.createElement('td')
    tdCoefficient.classList.add('hide')
    if(!estUneMoyenne) tdCoefficient.textContent = note.coefficient.toString()
    tr.appendChild(tdCoefficient)

    let tdInformation = document.createElement('td')
    if(!estUneMoyenne) {
        let buttonInformation = document.createElement('button')
        buttonInformation.classList.add('btn', 'btn-info', 'btn-outline', 'btn-square', 'btn-xs')
        buttonInformation.setAttribute('data-controller', 'modal')
        buttonInformation.setAttribute('data-modal-modal-title-value', 'Détails d\'une note')
        buttonInformation.setAttribute('data-modal-modal-url-value', '/fr/application/etudiant/note/details/' + note.id)
        buttonInformation.setAttribute('data-action', 'click->modal#openModal')
        buttonInformation.setAttribute('data-bs-toggle', 'tooltip')
        buttonInformation.setAttribute('data-bs-placement', 'bottom')
        buttonInformation.setAttribute('data-bs-original-title', 'Détails')
        let iButtonInformation = document.createElement('i')
        iButtonInformation.classList.add('fas', 'fa-info')
        buttonInformation.appendChild(iButtonInformation)
        tdInformation.appendChild(buttonInformation)
    }
    tr.appendChild(tdInformation)

    return tr
}