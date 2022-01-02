/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recupererToutesLesNotesTriees": () => (/* binding */ recupererToutesLesNotesTriees),
/* harmony export */   "recreerTableau": () => (/* binding */ recreerTableau),
/* harmony export */   "ajouterBoutonSauvegarde": () => (/* binding */ ajouterBoutonSauvegarde),
/* harmony export */   "calculerMoyenne": () => (/* binding */ calculerMoyenne),
/* harmony export */   "calculerMoyenneMatiere": () => (/* binding */ calculerMoyenneMatiere),
/* harmony export */   "calculerMoyenneGenerale": () => (/* binding */ calculerMoyenneGenerale),
/* harmony export */   "creerLigne": () => (/* binding */ creerLigne)
/* harmony export */ });
function recupererToutesLesNotesTriees(tableauHtml) {
    var tbody = tableauHtml.querySelector("tbody");
    var notes = [];
    var lignes = tbody.querySelectorAll('tr');
    lignes.forEach(function (ligne) {
        var buttonUrl = ligne.querySelector('td:nth-child(7) > button').getAttribute('data-modal-modal-url-value').split('/');
        var noteId = parseInt(buttonUrl[buttonUrl.length - 1]);
        var noteMatiere = ligne.querySelector("td:nth-child(1)").textContent;
        var noteEvaluation = ligne.querySelector("td:nth-child(2)").textContent;
        var noteDate = ligne.querySelector("td:nth-child(3)").textContent;
        var noteCommentaire = ligne.querySelector("td:nth-child(4)").textContent;
        var noteNote = parseFloat(ligne.querySelector('td:nth-child(5)').textContent);
        var noteCoefficient = parseFloat(ligne.querySelector('td:nth-child(6)').textContent);
        var note = {
            id: noteId,
            matiere: noteMatiere,
            evaluation: noteEvaluation,
            date: noteDate,
            commentaire: noteCommentaire,
            note: noteNote,
            coefficient: noteCoefficient
        };
        notes.push(note);
    });
    notes.sort(function (a, b) { return (a.matiere > b.matiere) ? 1 : -1; });
    return notes;
}
function recreerTableau(notesTriees, notesConnues) {
    var table = document.createElement('table');
    table.classList.add('table', 'table-border', 'table-striped');
    var thead = document.createElement('thead');
    table.appendChild(thead);
    var trHead = document.createElement('tr');
    thead.appendChild(trHead);
    var thMatiere = document.createElement('th');
    thMatiere.textContent = 'Matière';
    trHead.appendChild(thMatiere);
    var thEvaluation = document.createElement('th');
    thEvaluation.textContent = 'Evaluation';
    trHead.appendChild(thEvaluation);
    var thDate = document.createElement('th');
    thDate.textContent = 'date';
    trHead.appendChild(thDate);
    var thCommentaire = document.createElement('th');
    thCommentaire.textContent = 'Commentaire de l\'évaluation';
    trHead.appendChild(thCommentaire);
    var thNote = document.createElement('th');
    thNote.textContent = 'Note';
    trHead.appendChild(thNote);
    var thCoefficient = document.createElement('th');
    thCoefficient.textContent = 'coefficient';
    trHead.appendChild(thCoefficient);
    var thInformation = document.createElement('th');
    thInformation.textContent = 'Informations';
    trHead.appendChild(thInformation);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    notesTriees.forEach(function (note, i) {
        var estNouveau = !notesConnues.includes(note.id);
        var tr = creerLigne(note, false, estNouveau);
        tbody.appendChild(tr);
        // Si on a atteint la fin des notes d'une matière
        if (i == notesTriees.length - 1 || notesTriees[i + 1].matiere != note.matiere) {
            var tr_1 = creerLigne({
                matiere: note.matiere,
                evaluation: 'Moyenne',
                note: calculerMoyenneMatiere(notesTriees, note.matiere)
            }, true);
            tbody.appendChild(tr_1);
        }
    });
    // Ajout de la moyenne générale
    var tr = creerLigne({
        matiere: '',
        evaluation: 'Moyenne Générale',
        note: calculerMoyenneGenerale(notesTriees)
    }, true);
    tbody.appendChild(tr);
    return table;
}
function ajouterBoutonSauvegarde() {
    var button = document.createElement("button");
    button.innerHTML = "Sauvegarder les notes connues";
    button.classList.add('btn', 'btn-sm', 'btn-primary');
    button.id = "save-notes-btn";
    var notesTitle = document.querySelector("#mainContent > div.row > div:nth-child(5) > div > h4");
    notesTitle.appendChild(button);
    return button;
}
function calculerMoyenne(notes, coefficients) {
    // numérateur : n1*c1 + n2*c2 + n3*c3
    var numerateur = 0;
    var change = false;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i] >= 0) {
            numerateur += notes[i] * coefficients[i];
            change = true;
        }
    }
    // dénominateur : c1 + c2 + c3
    var moyenne = -1;
    if (change) {
        if (numerateur != -1) {
            var denominateur = coefficients.reduce(function (partial_sum, a) { return partial_sum + a; }, 0);
            moyenne = numerateur / denominateur;
        }
    }
    return moyenne;
}
function calculerMoyenneMatiere(toutesLesNotes, matiere) {
    var notes = [];
    var coefficients = [];
    // récupération des notes et coefficients de toutes les notes de la matière
    toutesLesNotes.forEach(function (note) {
        if (note.matiere == matiere) {
            notes.push(note.note);
            coefficients.push(note.coefficient);
        }
    });
    var moyenne = calculerMoyenne(notes, coefficients);
    return moyenne;
}
function calculerMoyenneGenerale(toutesLesNotes) {
    var notes = [];
    var coefficients = [];
    // récupération des notes et coefficients de toutes les notes
    var oldMatiere = '';
    toutesLesNotes.forEach(function (note) {
        if (oldMatiere != note.matiere) {
            var moyenne_1 = calculerMoyenneMatiere(toutesLesNotes, note.matiere);
            if (moyenne_1 >= 0) {
                notes.push(calculerMoyenneMatiere(toutesLesNotes, note.matiere));
                coefficients.push(1);
                oldMatiere = note.matiere;
            }
        }
    });
    var moyenne = calculerMoyenne(notes, coefficients);
    return moyenne;
}
function creerLigne(note, estUneMoyenne, nouveau) {
    if (nouveau === void 0) { nouveau = false; }
    var tr = document.createElement('tr');
    if (estUneMoyenne)
        tr.classList.add('moyenne');
    if (nouveau)
        tr.classList.add('new-note');
    var tdMatiere = document.createElement('td');
    tdMatiere.textContent = note.matiere;
    tr.appendChild(tdMatiere);
    var tdEvaluation = document.createElement('td');
    tdEvaluation.textContent = note.evaluation;
    tr.appendChild(tdEvaluation);
    var tdDate = document.createElement('td');
    tdDate.classList.add('hide');
    if (!estUneMoyenne)
        tdDate.textContent = note.date;
    tr.appendChild(tdDate);
    var tdCommentaire = document.createElement('td');
    tdCommentaire.classList.add('hide');
    if (!estUneMoyenne)
        tdCommentaire.textContent = note.commentaire;
    tr.appendChild(tdCommentaire);
    var tdNote = document.createElement('td');
    if (note.note >= 10) {
        tdNote.textContent = note.note.toPrecision(4).toString();
    }
    else if (note.note == -1) {
        tdNote.textContent = '';
    }
    else {
        var span = document.createElement('span');
        span.classList.add('badge', 'bg-warning');
        if (note.note < 0) {
            span.textContent = note.note.toString();
        }
        else {
            span.textContent = note.note.toPrecision(4).toString();
        }
        tdNote.appendChild(span);
    }
    tr.appendChild(tdNote);
    var tdCoefficient = document.createElement('td');
    tdCoefficient.classList.add('hide');
    if (!estUneMoyenne)
        tdCoefficient.textContent = note.coefficient.toString();
    tr.appendChild(tdCoefficient);
    var tdInformation = document.createElement('td');
    if (!estUneMoyenne) {
        var buttonInformation = document.createElement('button');
        buttonInformation.classList.add('btn', 'btn-info', 'btn-outline', 'btn-square', 'btn-xs');
        buttonInformation.setAttribute('data-controller', 'modal');
        buttonInformation.setAttribute('data-modal-modal-title-value', 'Détails d\'une note');
        buttonInformation.setAttribute('data-modal-modal-url-value', '/fr/application/etudiant/note/details/' + note.id);
        buttonInformation.setAttribute('data-action', 'click->modal#openModal');
        buttonInformation.setAttribute('data-bs-toggle', 'tooltip');
        buttonInformation.setAttribute('data-bs-placement', 'bottom');
        buttonInformation.setAttribute('data-bs-original-title', 'Détails');
        var iButtonInformation = document.createElement('i');
        iButtonInformation.classList.add('fas', 'fa-info');
        buttonInformation.appendChild(iButtonInformation);
        tdInformation.appendChild(buttonInformation);
    }
    tr.appendChild(tdInformation);
    return tr;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");

// Récupération des notes connues
chrome.storage.sync.get(['notesAlreadyKnow'], function (result) {
    var notesConnues = result.notesAlreadyKnow || [];
    var tableau = document.querySelector("#mainContent > div.row > div:nth-child(5) > div > div > table");
    var notes = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.recupererToutesLesNotesTriees)(tableau);
    console.log(notesConnues);
    var tableauTrie = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.recreerTableau)(notes, notesConnues);
    tableau.replaceWith(tableauTrie);
    var boutonSauvegarde = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.ajouterBoutonSauvegarde)();
    // Quand le bouton est cliqué, on sauvegarder les notes, puis en recrée le tableau
    boutonSauvegarde.addEventListener('click', function () {
        var ids = [];
        notes.forEach(function (note) {
            ids.push(note.id);
        });
        chrome.storage.sync.set({ notesAlreadyKnow: ids }, function () {
            console.log('rechargement de la page');
            location.reload();
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDekgsSUFBSSxLQUFLLEdBQUcsdUVBQTZCLENBQUMsT0FBTyxDQUFDO0lBRWxELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ3pCLElBQUksV0FBVyxHQUFHLHdEQUFjLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQztJQUVyRCxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUdoQyxJQUFNLGdCQUFnQixHQUFHLGlFQUF1QixFQUFFO0lBQ2xELGtGQUFrRjtJQUNsRixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7UUFDdkMsSUFBSSxHQUFHLEdBQWEsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUMsRUFBRTtZQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7QUFFTixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21pYW91bm90ZXMvLi9zcmMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9taWFvdW5vdGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21pYW91bm90ZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21pYW91bm90ZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9taWFvdW5vdGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWlhb3Vub3Rlcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RlIH0gZnJvbSAnLi9Ob3RlJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVjdXBlcmVyVG91dGVzTGVzTm90ZXNUcmllZXModGFibGVhdUh0bWw6IEhUTUxUYWJsZUVsZW1lbnQpIDogTm90ZVtdIHtcbiAgICBjb25zdCB0Ym9keSA9IHRhYmxlYXVIdG1sLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKVxuICAgIGxldCBub3RlczogTm90ZVtdID0gW11cblxuICAgIGNvbnN0IGxpZ25lcyA9IHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJylcbiAgICBsaWduZXMuZm9yRWFjaChsaWduZSA9PiB7XG4gICAgICAgIGxldCBidXR0b25VcmwgPSBsaWduZS5xdWVyeVNlbGVjdG9yKCd0ZDpudGgtY2hpbGQoNykgPiBidXR0b24nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtbW9kYWwtdXJsLXZhbHVlJykuc3BsaXQoJy8nKVxuICAgICAgICBsZXQgbm90ZUlkID0gcGFyc2VJbnQoYnV0dG9uVXJsW2J1dHRvblVybC5sZW5ndGgtMV0pXG4gICAgICAgIGxldCBub3RlTWF0aWVyZSA9IGxpZ25lLnF1ZXJ5U2VsZWN0b3IoXCJ0ZDpudGgtY2hpbGQoMSlcIikudGV4dENvbnRlbnRcbiAgICAgICAgbGV0IG5vdGVFdmFsdWF0aW9uID0gbGlnbmUucXVlcnlTZWxlY3RvcihcInRkOm50aC1jaGlsZCgyKVwiKS50ZXh0Q29udGVudFxuICAgICAgICBsZXQgbm90ZURhdGUgPSBsaWduZS5xdWVyeVNlbGVjdG9yKFwidGQ6bnRoLWNoaWxkKDMpXCIpLnRleHRDb250ZW50XG4gICAgICAgIGxldCBub3RlQ29tbWVudGFpcmUgPSBsaWduZS5xdWVyeVNlbGVjdG9yKFwidGQ6bnRoLWNoaWxkKDQpXCIpLnRleHRDb250ZW50XG4gICAgICAgIGxldCBub3RlTm90ZSA9IHBhcnNlRmxvYXQobGlnbmUucXVlcnlTZWxlY3RvcigndGQ6bnRoLWNoaWxkKDUpJykudGV4dENvbnRlbnQpXG4gICAgICAgIGxldCBub3RlQ29lZmZpY2llbnQgPSBwYXJzZUZsb2F0KGxpZ25lLnF1ZXJ5U2VsZWN0b3IoJ3RkOm50aC1jaGlsZCg2KScpLnRleHRDb250ZW50KVxuXG4gICAgICAgIGxldCBub3RlOiBOb3RlID0ge1xuICAgICAgICAgICAgaWQ6IG5vdGVJZCxcbiAgICAgICAgICAgIG1hdGllcmU6IG5vdGVNYXRpZXJlLFxuICAgICAgICAgICAgZXZhbHVhdGlvbjogbm90ZUV2YWx1YXRpb24sXG4gICAgICAgICAgICBkYXRlOiBub3RlRGF0ZSxcbiAgICAgICAgICAgIGNvbW1lbnRhaXJlOiBub3RlQ29tbWVudGFpcmUsXG4gICAgICAgICAgICBub3RlOiBub3RlTm90ZSxcbiAgICAgICAgICAgIGNvZWZmaWNpZW50OiBub3RlQ29lZmZpY2llbnRcbiAgICAgICAgfVxuXG4gICAgICAgIG5vdGVzLnB1c2gobm90ZSlcbiAgICB9KVxuXG4gICAgbm90ZXMuc29ydCgoYSwgYikgPT4gKGEubWF0aWVyZSA+IGIubWF0aWVyZSkgPyAxIDogLTEpXG5cbiAgICByZXR1cm4gbm90ZXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlY3JlZXJUYWJsZWF1KG5vdGVzVHJpZWVzOiBOb3RlW10sIG5vdGVzQ29ubnVlczogbnVtYmVyW10pOiBIVE1MVGFibGVFbGVtZW50IHtcbiAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXG4gICAgdGFibGUuY2xhc3NMaXN0LmFkZCgndGFibGUnLCAndGFibGUtYm9yZGVyJywgJ3RhYmxlLXN0cmlwZWQnKVxuXG5cbiAgICBsZXQgdGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQodGhlYWQpXG5cblxuICAgIGxldCB0ckhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXG4gICAgdGhlYWQuYXBwZW5kQ2hpbGQodHJIZWFkKVxuXG5cbiAgICBsZXQgdGhNYXRpZXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoTWF0aWVyZS50ZXh0Q29udGVudCA9ICdNYXRpw6hyZSdcbiAgICB0ckhlYWQuYXBwZW5kQ2hpbGQodGhNYXRpZXJlKVxuICAgIFxuICAgIGxldCB0aEV2YWx1YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhFdmFsdWF0aW9uLnRleHRDb250ZW50ID0gJ0V2YWx1YXRpb24nXG4gICAgdHJIZWFkLmFwcGVuZENoaWxkKHRoRXZhbHVhdGlvbilcblxuICAgIGxldCB0aERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhEYXRlLnRleHRDb250ZW50ID0gJ2RhdGUnXG4gICAgdHJIZWFkLmFwcGVuZENoaWxkKHRoRGF0ZSlcblxuICAgIGxldCB0aENvbW1lbnRhaXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKVxuICAgIHRoQ29tbWVudGFpcmUudGV4dENvbnRlbnQgPSAnQ29tbWVudGFpcmUgZGUgbFxcJ8OpdmFsdWF0aW9uJ1xuICAgIHRySGVhZC5hcHBlbmRDaGlsZCh0aENvbW1lbnRhaXJlKVxuXG4gICAgbGV0IHRoTm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aE5vdGUudGV4dENvbnRlbnQgPSAnTm90ZSdcbiAgICB0ckhlYWQuYXBwZW5kQ2hpbGQodGhOb3RlKVxuXG4gICAgbGV0IHRoQ29lZmZpY2llbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpXG4gICAgdGhDb2VmZmljaWVudC50ZXh0Q29udGVudCA9ICdjb2VmZmljaWVudCdcbiAgICB0ckhlYWQuYXBwZW5kQ2hpbGQodGhDb2VmZmljaWVudClcbiAgICBcbiAgICBsZXQgdGhJbmZvcm1hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICB0aEluZm9ybWF0aW9uLnRleHRDb250ZW50ID0gJ0luZm9ybWF0aW9ucydcbiAgICB0ckhlYWQuYXBwZW5kQ2hpbGQodGhJbmZvcm1hdGlvbilcblxuXG4gICAgbGV0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRib2R5KVxuXG5cbiAgICBub3Rlc1RyaWVlcy5mb3JFYWNoKChub3RlLCBpKSA9PiB7XG4gICAgICAgIGxldCBlc3ROb3V2ZWF1ID0gIW5vdGVzQ29ubnVlcy5pbmNsdWRlcyhub3RlLmlkKVxuICAgICAgICBsZXQgdHIgPSBjcmVlckxpZ25lKG5vdGUsIGZhbHNlLCBlc3ROb3V2ZWF1KVxuICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0cilcblxuICAgICAgICAvLyBTaSBvbiBhIGF0dGVpbnQgbGEgZmluIGRlcyBub3RlcyBkJ3VuZSBtYXRpw6hyZVxuICAgICAgICBpZihpID09IG5vdGVzVHJpZWVzLmxlbmd0aC0xIHx8IG5vdGVzVHJpZWVzW2krMV0ubWF0aWVyZSAhPSBub3RlLm1hdGllcmUpIHtcbiAgICAgICAgICAgIGxldCB0ciA9IGNyZWVyTGlnbmUoe1xuICAgICAgICAgICAgICAgIG1hdGllcmU6IG5vdGUubWF0aWVyZSxcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uOiAnTW95ZW5uZScsXG4gICAgICAgICAgICAgICAgbm90ZTogY2FsY3VsZXJNb3llbm5lTWF0aWVyZShub3Rlc1RyaWVlcywgbm90ZS5tYXRpZXJlKVxuICAgICAgICAgICAgfSwgdHJ1ZSlcblxuICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpXG5cbiAgICAgICAgfVxuICAgIH0pXG5cblxuICAgIC8vIEFqb3V0IGRlIGxhIG1veWVubmUgZ8OpbsOpcmFsZVxuICAgIGxldCB0ciA9IGNyZWVyTGlnbmUoe1xuICAgICAgICBtYXRpZXJlOiAnJyxcbiAgICAgICAgZXZhbHVhdGlvbjogJ01veWVubmUgR8OpbsOpcmFsZScsXG4gICAgICAgIG5vdGU6IGNhbGN1bGVyTW95ZW5uZUdlbmVyYWxlKG5vdGVzVHJpZWVzKVxuICAgIH0sIHRydWUpXG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpXG5cbiAgICByZXR1cm4gdGFibGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFqb3V0ZXJCb3V0b25TYXV2ZWdhcmRlKCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gXCJTYXV2ZWdhcmRlciBsZXMgbm90ZXMgY29ubnVlc1wiXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tc20nLCAnYnRuLXByaW1hcnknKVxuICAgIGJ1dHRvbi5pZCA9IFwic2F2ZS1ub3Rlcy1idG5cIlxuXG4gICAgbGV0IG5vdGVzVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5Db250ZW50ID4gZGl2LnJvdyA+IGRpdjpudGgtY2hpbGQoNSkgPiBkaXYgPiBoNFwiKVxuICAgIG5vdGVzVGl0bGUuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuXG4gICAgcmV0dXJuIGJ1dHRvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsZXJNb3llbm5lKG5vdGVzOiBudW1iZXJbXSwgY29lZmZpY2llbnRzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgLy8gbnVtw6lyYXRldXIgOiBuMSpjMSArIG4yKmMyICsgbjMqYzNcbiAgICBsZXQgbnVtZXJhdGV1ciA9IDBcbiAgICBsZXQgY2hhbmdlID0gZmFsc2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKG5vdGVzW2ldID49IDApe1xuICAgICAgICAgICAgbnVtZXJhdGV1ciArPSBub3Rlc1tpXSAqIGNvZWZmaWNpZW50c1tpXVxuICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZMOpbm9taW5hdGV1ciA6IGMxICsgYzIgKyBjM1xuICAgIGxldCBtb3llbm5lID0gLTFcbiAgICBpZihjaGFuZ2UpIHtcbiAgICAgICAgaWYobnVtZXJhdGV1ciAhPSAtMSkge1xuICAgICAgICAgICAgbGV0IGRlbm9taW5hdGV1ciA9IGNvZWZmaWNpZW50cy5yZWR1Y2UoKHBhcnRpYWxfc3VtLCBhKSA9PiBwYXJ0aWFsX3N1bSArIGEsIDApXG4gICAgXG4gICAgICAgICAgICBtb3llbm5lID0gbnVtZXJhdGV1ciAvIGRlbm9taW5hdGV1clxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1veWVubmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGVyTW95ZW5uZU1hdGllcmUodG91dGVzTGVzTm90ZXM6IE5vdGVbXSwgbWF0aWVyZTogU3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgbm90ZXM6IG51bWJlcltdID0gW11cbiAgICBsZXQgY29lZmZpY2llbnRzOiBudW1iZXJbXSA9IFtdXG5cbiAgICAvLyByw6ljdXDDqXJhdGlvbiBkZXMgbm90ZXMgZXQgY29lZmZpY2llbnRzIGRlIHRvdXRlcyBsZXMgbm90ZXMgZGUgbGEgbWF0acOocmVcbiAgICB0b3V0ZXNMZXNOb3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAgIGlmKG5vdGUubWF0aWVyZSA9PSBtYXRpZXJlKXtcbiAgICAgICAgICAgIG5vdGVzLnB1c2gobm90ZS5ub3RlKVxuICAgICAgICAgICAgY29lZmZpY2llbnRzLnB1c2gobm90ZS5jb2VmZmljaWVudClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBsZXQgbW95ZW5uZSA9IGNhbGN1bGVyTW95ZW5uZShub3RlcywgY29lZmZpY2llbnRzKVxuXG4gICAgcmV0dXJuIG1veWVubmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGVyTW95ZW5uZUdlbmVyYWxlKHRvdXRlc0xlc05vdGVzOiBOb3RlW10pOiBudW1iZXIge1xuICAgIGxldCBub3RlczogbnVtYmVyW10gPSBbXVxuICAgIGxldCBjb2VmZmljaWVudHM6IG51bWJlcltdID0gW11cblxuICAgIC8vIHLDqWN1cMOpcmF0aW9uIGRlcyBub3RlcyBldCBjb2VmZmljaWVudHMgZGUgdG91dGVzIGxlcyBub3Rlc1xuICAgIGxldCBvbGRNYXRpZXJlID0gJydcbiAgICB0b3V0ZXNMZXNOb3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAgIGlmKG9sZE1hdGllcmUgIT0gbm90ZS5tYXRpZXJlKXtcbiAgICAgICAgICAgIGxldCBtb3llbm5lID0gY2FsY3VsZXJNb3llbm5lTWF0aWVyZSh0b3V0ZXNMZXNOb3Rlcywgbm90ZS5tYXRpZXJlKVxuICAgICAgICAgICAgaWYobW95ZW5uZSA+PSAwKXtcbiAgICAgICAgICAgICAgICBub3Rlcy5wdXNoKGNhbGN1bGVyTW95ZW5uZU1hdGllcmUodG91dGVzTGVzTm90ZXMsIG5vdGUubWF0aWVyZSkpXG4gICAgICAgICAgICAgICAgY29lZmZpY2llbnRzLnB1c2goMSlcbiAgICAgICAgICAgICAgICBvbGRNYXRpZXJlID0gbm90ZS5tYXRpZXJlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IG1veWVubmUgPSBjYWxjdWxlck1veWVubmUobm90ZXMsIGNvZWZmaWNpZW50cylcblxuICAgIHJldHVybiBtb3llbm5lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVlckxpZ25lKG5vdGU6IE5vdGUsIGVzdFVuZU1veWVubmU6IGJvb2xlYW4sIG5vdXZlYXUgPSBmYWxzZSk6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICAgIGxldCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBpZihlc3RVbmVNb3llbm5lKSB0ci5jbGFzc0xpc3QuYWRkKCdtb3llbm5lJylcbiAgICBpZihub3V2ZWF1KSB0ci5jbGFzc0xpc3QuYWRkKCduZXctbm90ZScpXG5cbiAgICBsZXQgdGRNYXRpZXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgIHRkTWF0aWVyZS50ZXh0Q29udGVudCA9IG5vdGUubWF0aWVyZVxuICAgIHRyLmFwcGVuZENoaWxkKHRkTWF0aWVyZSlcblxuICAgIGxldCB0ZEV2YWx1YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgdGRFdmFsdWF0aW9uLnRleHRDb250ZW50ID0gbm90ZS5ldmFsdWF0aW9uXG4gICAgdHIuYXBwZW5kQ2hpbGQodGRFdmFsdWF0aW9uKVxuXG4gICAgbGV0IHRkRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcbiAgICB0ZERhdGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgaWYoIWVzdFVuZU1veWVubmUpIHRkRGF0ZS50ZXh0Q29udGVudCA9IG5vdGUuZGF0ZVxuICAgIHRyLmFwcGVuZENoaWxkKHRkRGF0ZSlcblxuICAgIGxldCB0ZENvbW1lbnRhaXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgIHRkQ29tbWVudGFpcmUuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgaWYoIWVzdFVuZU1veWVubmUpIHRkQ29tbWVudGFpcmUudGV4dENvbnRlbnQgPSBub3RlLmNvbW1lbnRhaXJlXG4gICAgdHIuYXBwZW5kQ2hpbGQodGRDb21tZW50YWlyZSlcblxuICAgIGxldCB0ZE5vdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgaWYobm90ZS5ub3RlID49IDEwKSB7XG4gICAgICAgIHRkTm90ZS50ZXh0Q29udGVudCA9IG5vdGUubm90ZS50b1ByZWNpc2lvbig0KS50b1N0cmluZygpXG4gICAgfSBlbHNlIGlmKG5vdGUubm90ZSA9PSAtMSkge1xuICAgICAgICB0ZE5vdGUudGV4dENvbnRlbnQgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnYmFkZ2UnLCAnYmctd2FybmluZycpXG4gICAgICAgIGlmKG5vdGUubm90ZSA8IDApIHtcbiAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBub3RlLm5vdGUudG9TdHJpbmcoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IG5vdGUubm90ZS50b1ByZWNpc2lvbig0KS50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgdGROb3RlLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgfVxuICAgIHRyLmFwcGVuZENoaWxkKHRkTm90ZSlcblxuICAgIGxldCB0ZENvZWZmaWNpZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgIHRkQ29lZmZpY2llbnQuY2xhc3NMaXN0LmFkZCgnaGlkZScpXG4gICAgaWYoIWVzdFVuZU1veWVubmUpIHRkQ29lZmZpY2llbnQudGV4dENvbnRlbnQgPSBub3RlLmNvZWZmaWNpZW50LnRvU3RyaW5nKClcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZENvZWZmaWNpZW50KVxuXG4gICAgbGV0IHRkSW5mb3JtYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgaWYoIWVzdFVuZU1veWVubmUpIHtcbiAgICAgICAgbGV0IGJ1dHRvbkluZm9ybWF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgYnV0dG9uSW5mb3JtYXRpb24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1pbmZvJywgJ2J0bi1vdXRsaW5lJywgJ2J0bi1zcXVhcmUnLCAnYnRuLXhzJylcbiAgICAgICAgYnV0dG9uSW5mb3JtYXRpb24uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRyb2xsZXInLCAnbW9kYWwnKVxuICAgICAgICBidXR0b25JbmZvcm1hdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtbW9kYWwtdGl0bGUtdmFsdWUnLCAnRMOpdGFpbHMgZFxcJ3VuZSBub3RlJylcbiAgICAgICAgYnV0dG9uSW5mb3JtYXRpb24uc2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLW1vZGFsLXVybC12YWx1ZScsICcvZnIvYXBwbGljYXRpb24vZXR1ZGlhbnQvbm90ZS9kZXRhaWxzLycgKyBub3RlLmlkKVxuICAgICAgICBidXR0b25JbmZvcm1hdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJywgJ2NsaWNrLT5tb2RhbCNvcGVuTW9kYWwnKVxuICAgICAgICBidXR0b25JbmZvcm1hdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtdG9nZ2xlJywgJ3Rvb2x0aXAnKVxuICAgICAgICBidXR0b25JbmZvcm1hdGlvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtcGxhY2VtZW50JywgJ2JvdHRvbScpXG4gICAgICAgIGJ1dHRvbkluZm9ybWF0aW9uLnNldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScsICdEw6l0YWlscycpXG4gICAgICAgIGxldCBpQnV0dG9uSW5mb3JtYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJylcbiAgICAgICAgaUJ1dHRvbkluZm9ybWF0aW9uLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS1pbmZvJylcbiAgICAgICAgYnV0dG9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQoaUJ1dHRvbkluZm9ybWF0aW9uKVxuICAgICAgICB0ZEluZm9ybWF0aW9uLmFwcGVuZENoaWxkKGJ1dHRvbkluZm9ybWF0aW9uKVxuICAgIH1cbiAgICB0ci5hcHBlbmRDaGlsZCh0ZEluZm9ybWF0aW9uKVxuXG4gICAgcmV0dXJuIHRyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZWN1cGVyZXJUb3V0ZXNMZXNOb3Rlc1RyaWVlcywgYWpvdXRlckJvdXRvblNhdXZlZ2FyZGUsIHJlY3JlZXJUYWJsZWF1IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG4vLyBSw6ljdXDDqXJhdGlvbiBkZXMgbm90ZXMgY29ubnVlc1xuY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoWydub3Rlc0FscmVhZHlLbm93J10sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIGNvbnN0IG5vdGVzQ29ubnVlczogbnVtYmVyW10gPSByZXN1bHQubm90ZXNBbHJlYWR5S25vdyB8fCBbXVxuXG4gICAgY29uc3QgdGFibGVhdTogSFRNTFRhYmxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbkNvbnRlbnQgPiBkaXYucm93ID4gZGl2Om50aC1jaGlsZCg1KSA+IGRpdiA+IGRpdiA+IHRhYmxlXCIpXG4gICAgbGV0IG5vdGVzID0gcmVjdXBlcmVyVG91dGVzTGVzTm90ZXNUcmllZXModGFibGVhdSlcblxuICAgIGNvbnNvbGUubG9nKG5vdGVzQ29ubnVlcylcbiAgICBsZXQgdGFibGVhdVRyaWUgPSByZWNyZWVyVGFibGVhdShub3Rlcywgbm90ZXNDb25udWVzKVxuXG4gICAgdGFibGVhdS5yZXBsYWNlV2l0aCh0YWJsZWF1VHJpZSlcblxuXG4gICAgY29uc3QgYm91dG9uU2F1dmVnYXJkZSA9IGFqb3V0ZXJCb3V0b25TYXV2ZWdhcmRlKClcbiAgICAvLyBRdWFuZCBsZSBib3V0b24gZXN0IGNsaXF1w6ksIG9uIHNhdXZlZ2FyZGVyIGxlcyBub3RlcywgcHVpcyBlbiByZWNyw6llIGxlIHRhYmxlYXVcbiAgICBib3V0b25TYXV2ZWdhcmRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgaWRzOiBudW1iZXJbXSA9IFtdXG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IHtcbiAgICAgICAgICAgIGlkcy5wdXNoKG5vdGUuaWQpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe25vdGVzQWxyZWFkeUtub3c6IGlkc30sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlY2hhcmdlbWVudCBkZSBsYSBwYWdlJylcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0pO1xuICAgIH0pXG5cbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==