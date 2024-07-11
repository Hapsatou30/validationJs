// Déclaration des variables : Récupération des éléments du DOM
const form = document.getElementById('form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const tablePersonnes = document.getElementById('table-personnes');
const messageDiv = document.getElementById('message');
const submitButton = document.getElementById('submit-button');
let personnes = []; // Tableau pour stocker les informations des personnes, initialisé vide

// Récupérer les données depuis localStorage au chargement de la page
const personnesFromStorage = JSON.parse(localStorage.getItem('personnes')) || [];
personnes = personnesFromStorage; // Mettre à jour le tableau personnes avec les données récupérées

// Ajout d'un écouteur d'événement pour la soumission du formulaire
form.addEventListener('submit', e => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    validateInputs(); // Appelle la fonction pour valider les entrées du formulaire
});

// Fonction pour afficher un message d'erreur
const setError = (element, message) => {
    const inputControl = element.parentElement; // Récupère le parent de l'élément (contrôle de saisie)
    const errorDisplay = inputControl.querySelector('.error'); // Sélectionne l'élément d'affichage de l'erreur

    errorDisplay.innerText = message; // Affiche le message d'erreur
    inputControl.classList.add('error'); // Ajoute la classe 'error' au contrôle de saisie
    inputControl.classList.remove('success'); // Supprime la classe 'success' si elle est présente

    updateSubmitButton(); // Met à jour l'état du bouton de soumission
};

// Fonction pour afficher un succès
const setSuccess = element => {
    const inputControl = element.parentElement; // Récupère le parent de l'élément (contrôle de saisie)
    const errorDisplay = inputControl.querySelector('.error'); // Sélectionne l'élément d'affichage de l'erreur

    errorDisplay.innerText = ''; // Vide le message d'erreur
    inputControl.classList.add('success'); // Ajoute la classe 'success' au contrôle de saisie
    inputControl.classList.remove('error'); // Supprime la classe 'error' si elle est présente

    updateSubmitButton(); // Met à jour l'état du bouton de soumission
};

// Fonction pour valider l'email
const isValidEmail = email => {
    // Expression régulière pour valider l'email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());
};

// Fonction pour réinitialiser les champs du formulaire
const resetFormFields = () => {
    prenom.value = '';
    nom.value = '';
    email.value = '';
    password.value = '';
    password2.value = '';

    // Masquer tous les champs sauf le premier
    nom.parentElement.style.display = 'none';
    email.parentElement.style.display = 'none';
    password.parentElement.style.display = 'none';
    password2.parentElement.style.display = 'none';

    // Réinitialiser les classes de succès/erreur
    prenom.parentElement.classList.remove('success', 'error');
    nom.parentElement.classList.remove('success', 'error');
    email.parentElement.classList.remove('success', 'error');
    password.parentElement.classList.remove('success', 'error');
    password2.parentElement.classList.remove('success', 'error');

    submitButton.disabled = true; // Désactive le bouton de soumission après réinitialisation
};


// Fonction pour afficher la liste des personnes inscrites sous forme de table
const afficherPersonnes = () => {
    tablePersonnes.innerHTML = ''; // Vide la table avant de la remplir à nouveau
    personnes.forEach(personne => {
        const row = tablePersonnes.insertRow(); // Insère une nouvelle ligne dans la table

        // Insertion des cellules dans la ligne
        const cellPrenom = row.insertCell();
        const cellNom = row.insertCell();
        const cellEmail = row.insertCell();

        // Remplissage des cellules avec les informations de la personne
        cellPrenom.textContent = personne.prenom;
        cellNom.textContent = personne.nom;
        cellEmail.textContent = personne.email;
    });

    // Convertir le tableau personnes en JSON pour le stockage ou l'envoi
    const personnesJSON = JSON.stringify(personnes);
    console.log(personnesJSON); // Vous pouvez utiliser cette chaîne JSON comme nécessaire
};

// Fonction pour afficher un message de succès temporaire
const afficherMessageSucces = () => {
    messageDiv.innerText = 'Formulaire soumis avec succès !'; // Affiche le message de succès
    setTimeout(() => {
        messageDiv.innerText = ''; // Réinitialise le message après 3 secondes
    }, 3000);
};

// Validation du prénom en temps réel
prenom.addEventListener('input', function() {
    const valeurPrenom = prenom.value.trim();
    if (valeurPrenom === '') {
        setError(prenom, 'Le prénom est obligatoire'); // Affiche une erreur si le prénom est vide
    } else if (valeurPrenom.length < 3 || valeurPrenom.length > 15) {
        setError(prenom, 'Le prénom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le prénom est hors des limites
    } else {
        setSuccess(prenom); // Affiche un succès si le prénom est valide

        // Afficher le champ suivant (Nom)
        nom.parentElement.style.display = 'block';
    }
});

// Validation du nom en temps réel
nom.addEventListener('input', function() {
    const valeurNom = nom.value.trim();
    if (valeurNom === '') {
        setError(nom, 'Le nom est obligatoire'); // Affiche une erreur si le nom est vide
    } else if (valeurNom.length < 3 || valeurNom.length > 15) {
        setError(nom, 'Le nom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le nom est hors des limites
    } else {
        setSuccess(nom); // Affiche un succès si le nom est valide

        // Afficher le champ suivant (Email)
        email.parentElement.style.display = 'block';
    }
});

// Validation de l'email en temps réel
email.addEventListener('input', function() {
    const valeurEmail = email.value.trim();
    if (valeurEmail === '') {
        setError(email, "L'email est obligatoire"); // Affiche une erreur si l'email est vide
    } else if (!isValidEmail(valeurEmail)) {
        setError(email, "L'email n'est pas valide"); // Affiche une erreur si l'email n'est pas valide
    } else {
        setSuccess(email); // Affiche un succès si l'email est valide

        // Afficher le champ suivant (Mot de passe)
        password.parentElement.style.display = 'block';
    }
});

// Validation du mot de passe en temps réel
password.addEventListener('input', function() {
    const valeurPassword = password.value.trim();
    if (valeurPassword === '') {
        setError(password, 'Le mot de passe est obligatoire'); // Affiche une erreur si le mot de passe est vide
    } else if (valeurPassword.length < 6) {
        setError(password, 'Le mot de passe doit contenir au moins 6 caractères'); // Affiche une erreur si le mot de passe est trop court
    } else {
        setSuccess(password); // Affiche un succès si le mot de passe est valide

        // Afficher le champ suivant (Confirmation du mot de passe)
        password2.parentElement.style.display = 'block';
    }
});

// Validation de la confirmation du mot de passe en temps réel
password2.addEventListener('input', function() {
    const valeurPassword = password.value.trim();
    const valeurPassword2 = password2.value.trim();
    if (valeurPassword2 === '') {
        setError(password2, 'Veuillez confirmer votre mot de passe'); // Affiche une erreur si la confirmation du mot de passe est vide
    } else if (valeurPassword !== valeurPassword2) {
        setError(password2, 'Les mots de passe ne correspondent pas'); // Affiche une erreur si la confirmation du mot de passe ne correspond pas au mot de passe
    } else {
        setSuccess(password2); // Affiche un succès si la confirmation du mot de passe est valide
    }
});

// Fonction pour valider les entrées du formulaire lors de la soumission
const validateInputs = () => {
    let isValid = true;

    // Validation du prénom
    const valeurPrenom = prenom.value.trim();
    if (valeurPrenom === '') {
        setError(prenom, 'Le prénom est obligatoire'); // Affiche une erreur si le prénom est vide
        isValid = false;
    } else if (valeurPrenom.length < 3 || valeurPrenom.length > 15) {
        setError(prenom, 'Le prénom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le prénom est hors des limites
        isValid = false;
    }

    // Validation du nom si prénom est valide
    const valeurNom = nom.value.trim();
    if (prenom.parentElement.classList.contains('success')) {
        if (valeurNom === '') {
            setError(nom, 'Le nom est obligatoire'); // Affiche une erreur si le nom est vide
            isValid = false;
        } else if (valeurNom.length < 3 || valeurNom.length > 15) {
            setError(nom, 'Le nom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le nom est hors des limites
            isValid = false;
        }
    }

    // Validation de l'email si nom est valide
    const valeurEmail = email.value.trim();
    if (nom.parentElement.classList.contains('success')) {
        if (valeurEmail === '') {
            setError(email, "L'email est obligatoire"); // Affiche une erreur si l'email est vide
            isValid = false;
        } else if (!isValidEmail(valeurEmail)) {
            setError(email, "L'email n'est pas valide"); // Affiche une erreur si l'email n'est pas valide
            isValid = false;
        }
    }

    // Validation du mot de passe si email est valide
    const valeurPassword = password.value.trim();
    if (email.parentElement.classList.contains('success')) {
        if (valeurPassword === '') {
            setError(password, 'Le mot de passe est obligatoire'); // Affiche une erreur si le mot de passe est vide
            isValid = false;
        } else if (valeurPassword.length < 6) {
            setError(password, 'Le mot de passe doit contenir au moins 6 caractères'); // Affiche une erreur si le mot de passe est trop court
            isValid = false;
        }
    }

    // Validation de la confirmation du mot de passe si mot de passe est valide
    const valeurPassword2 = password2.value.trim();
    if (password.parentElement.classList.contains('success')) {
        if (valeurPassword2 === '') {
            setError(password2, 'Veuillez confirmer votre mot de passe'); // Affiche une erreur si la confirmation du mot de passe est vide
            isValid = false;
        } else if (valeurPassword !== valeurPassword2) {
            setError(password2, 'Les mots de passe ne correspondent pas'); // Affiche une erreur si la confirmation du mot de passe ne correspond pas au mot de passe
            isValid = false;
        }
    }

    // Si toutes les validations sont réussies, ajouter la personne à la liste
    if (isValid) {
        const personne = {
            prenom: valeurPrenom,
            nom: valeurNom,
            email: valeurEmail,
            password: valeurPassword
        };

        personnes.push(personne); // Ajoute la personne au tableau
        afficherPersonnes(); // Met à jour l'affichage de la liste des personnes inscrites
        resetFormFields(); // Réinitialise les champs du formulaire après soumission
        afficherMessageSucces(); // Affiche un message de succès temporaire

        // Sauvegarder dans localStorage
        localStorage.setItem('personnes', JSON.stringify(personnes));
    }
};

// Fonction pour mettre à jour l'état du bouton de soumission
const updateSubmitButton = () => {
    const prenomValid = prenom.parentElement.classList.contains('success');
    const nomValid = nom.parentElement.classList.contains('success');
    const emailValid = email.parentElement.classList.contains('success');
    const passwordValid = password.parentElement.classList.contains('success');
    const password2Valid = password2.parentElement.classList.contains('success');

    if (prenomValid && nomValid && emailValid && passwordValid && password2Valid) {
        submitButton.disabled = false; // Active le bouton de soumission si toutes les validations sont réussies
    } else {
        submitButton.disabled = true; // Désactive le bouton de soumission si au moins une validation échoue
    }
};


