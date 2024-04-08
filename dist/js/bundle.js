/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
var alertDiv = document.createElement('div');
alertDiv.classList.add('alert', 'alert-danger', 'foot-weight-bold', 'display-6');
alertDiv.innerHTML = "Important: L'extension MiaouNotes n'est plus maintenue et est donc obsol\u00E8te.<br>T\u00E9l\u00E9chargez son successeur, <a href=\"https://chromewebstore.google.com/detail/better-iut-rcc/jofahdhjofjoackgkaodimfhnbfkgnbj?hl=fr\" target=\"_blank\">Better IUT RCC</a> (aussi disponible sur Firefox et Android) d\u00E8s maintenant!";
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2pGLFFBQVEsQ0FBQyxTQUFTLEdBQUcsMlVBQW1ULENBQUM7QUFFelUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFekQsaUNBQWlDO0FBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taWFvdW5vdGVzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFsZXJ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5hbGVydERpdi5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdhbGVydC1kYW5nZXInLCAnZm9vdC13ZWlnaHQtYm9sZCcsICdkaXNwbGF5LTYnKTtcbmFsZXJ0RGl2LmlubmVySFRNTCA9IGBJbXBvcnRhbnQ6IEwnZXh0ZW5zaW9uIE1pYW91Tm90ZXMgbidlc3QgcGx1cyBtYWludGVudWUgZXQgZXN0IGRvbmMgb2Jzb2zDqHRlLjxicj5Uw6lsw6ljaGFyZ2V6IHNvbiBzdWNjZXNzZXVyLCA8YSBocmVmPVwiaHR0cHM6Ly9jaHJvbWV3ZWJzdG9yZS5nb29nbGUuY29tL2RldGFpbC9iZXR0ZXItaXV0LXJjYy9qb2ZhaGRoam9mam9hY2tna2FvZGltZmhuYmZrZ25iaj9obD1mclwiIHRhcmdldD1cIl9ibGFua1wiPkJldHRlciBJVVQgUkNDPC9hPiAoYXVzc2kgZGlzcG9uaWJsZSBzdXIgRmlyZWZveCBldCBBbmRyb2lkKSBkw6hzIG1haW50ZW5hbnQhYDtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW5Db250ZW50JykucHJlcGVuZChhbGVydERpdik7XG5cbi8vIFLDqWN1cMOpcmF0aW9uIGRlcyBub3RlcyBjb25udWVzXG4vKmJyb3dzZXIuc3RvcmFnZS5zeW5jLmdldCgnbm90ZXNBbHJlYWR5S25vdycpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIGNvbnN0IG5vdGVzQ29ubnVlczogbnVtYmVyW10gPSByZXN1bHQubm90ZXNBbHJlYWR5S25vdyB8fCBbXVxuXG4gICAgY29uc3QgdGFibGVhdTogSFRNTFRhYmxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbkNvbnRlbnQgPiBkaXYucm93ID4gZGl2Om50aC1jaGlsZCg1KSA+IGRpdiA+IGRpdiA+IHRhYmxlXCIpXG4gICAgbGV0IG5vdGVzID0gcmVjdXBlcmVyVG91dGVzTGVzTm90ZXNUcmllZXModGFibGVhdSlcblxuICAgIGNvbnNvbGUubG9nKG5vdGVzQ29ubnVlcylcbiAgICBsZXQgdGFibGVhdVRyaWUgPSByZWNyZWVyVGFibGVhdShub3Rlcywgbm90ZXNDb25udWVzKVxuXG4gICAgdGFibGVhdS5yZXBsYWNlV2l0aCh0YWJsZWF1VHJpZSlcblxuXG4gICAgY29uc3QgYm91dG9uU2F1dmVnYXJkZSA9IGFqb3V0ZXJCb3V0b25TYXV2ZWdhcmRlKClcbiAgICAvLyBRdWFuZCBsZSBib3V0b24gZXN0IGNsaXF1w6ksIG9uIHNhdXZlZ2FyZGVyIGxlcyBub3RlcywgcHVpcyBlbiByZWNyw6llIGxlIHRhYmxlYXVcbiAgICBib3V0b25TYXV2ZWdhcmRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBpZHM6IG51bWJlcltdID0gW11cbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4ge1xuICAgICAgICAgICAgaWRzLnB1c2gobm90ZS5pZClcbiAgICAgICAgfSlcblxuICAgICAgICBicm93c2VyLnN0b3JhZ2Uuc3luYy5zZXQoe25vdGVzQWxyZWFkeUtub3c6IGlkc30pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlY2hhcmdlbWVudCBkZSBsYSBwYWdlJylcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0pXG4gICAgfSlcbn0pKi8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=