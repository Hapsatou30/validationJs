// Récupération des éléments du DOM
const form = document.getElementById('form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const listePersonnes = document.getElementById('liste-personnes');
const messageDiv = document.getElementById('message');

// Tableau pour stocker les informations des personnes
const personnes = [];

// Initialisation des étapes du formulaire
let currentStep = 1; // Étape actuelle du formulaire

// Écouteur d'événement pour la soumission du formulaire
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
};

// Fonction pour afficher un succès
const setSuccess = element => {
    const inputControl = element.parentElement; // Récupère le parent de l'élément (contrôle de saisie)
    const errorDisplay = inputControl.querySelector('.error'); // Sélectionne l'élément d'affichage de l'erreur

    errorDisplay.innerText = ''; // Vide le message d'erreur
    inputControl.classList.add('success'); // Ajoute la classe 'success' au contrôle de saisie
    inputControl.classList.remove('error'); // Supprime la classe 'error' si elle est présente
};

// Fonction pour valider l'email
const isValidEmail = email => {
    // Expression régulière pour valider l'email
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;

    return re.test(String(email).toLowerCase());
};

// Fonction pour réinitialiser les champs du formulaire
const resetFormFields = () => {
    prenom.value = '';
    nom.value = '';
    email.value = '';
    password.value = '';
    password2.value = '';
};

// Fonction pour afficher la liste des personnes inscrites
const afficherPersonnes = () => {
    listePersonnes.innerHTML = ''; // Vide la liste avant de la remplir à nouveau
    personnes.forEach(personne => {
        const li = document.createElement('li'); // Crée un nouvel élément de liste
        li.textContent = `${personne.prenom} ${personne.nom} - ${personne.email}`; // Ajoute le texte avec les informations de la personne
        listePersonnes.appendChild(li); // Ajoute l'élément de liste à la liste
    });
};

// Fonction pour afficher un message de succès temporaire
const afficherMessageSucces = () => {
    messageDiv.innerText = 'Formulaire soumis avec succès !'; // Affiche le message de succès
    setTimeout(() => {
        messageDiv.innerText = ''; // Réinitialise le message après 3 secondes
    }, 3000);
};

// Fonction pour valider les entrées du formulaire en fonction de l'étape actuelle
const validateInputs = () => {
    let isValid = true;

    // Validation en fonction de l'étape actuelle
    switch (currentStep) {
        case 1: // Validation du prénom
            const valeurPrenom = prenom.value.trim();
            if (valeurPrenom === '') {
                setError(prenom, 'Le prénom est obligatoire');
                isValid = false;
            } else if (valeurPrenom.length < 3 || valeurPrenom.length > 15) {
                setError(prenom, 'Le prénom doit contenir entre 3 et 15 caractères');
                isValid = false;
            } else {
                setSuccess(prenom);
                showNextStep(); // Affiche l'étape suivante
            }
            break;
        case 2: // Validation du nom
            const valeurNom = nom.value.trim();
            if (valeurNom === '') {
                setError(nom, 'Le nom est obligatoire');
                isValid = false;
            } else if (valeurNom.length < 3 || valeurNom.length > 15) {
                setError(nom, 'Le nom doit contenir entre 3 et 15 caractères');
                isValid = false;
            } else {
                setSuccess(nom);
                showNextStep(); // Affiche l'étape suivante
            }
            break;
        case 3: // Validation de l'email
            const valeurEmail = email.value.trim();
            if (valeurEmail === '') {
                setError(email, "L'email est obligatoire");
                isValid = false;
            } else if (!isValidEmail(valeurEmail)) {
                setError(email, "L'email n'est pas valide");
                isValid = false;
            } else {
                setSuccess(email);
                showNextStep(); // Affiche l'étape suivante
            }
            break;
        case 4: // Validation du mot de passe
            const valeurPassword = password.value.trim();
            if (valeurPassword === '') {
                setError(password, 'Le mot de passe est obligatoire');
                isValid = false;
            } else if (valeurPassword.length < 8) {
                setError(password, 'Le mot de passe doit contenir au moins 8 caractères');
                isValid = false;
            } else {
                setSuccess(password);
                showNextStep(); // Affiche l'étape suivante
            }
            break;
        case 5: // Validation de la confirmation du mot de passe
            const valeurPassword2 = password2.value.trim();
            if (valeurPassword2 === '') {
                setError(password2, 'Veuillez confirmer votre mot de passe');
                isValid = false;
            } else if (valeurPassword2 !== password.value.trim()) {
                setError(password2, "Les mots de passe ne correspondent pas");
                isValid = false;
            } else {
                setSuccess(password2);
            }
            break;
    }

    // Si toutes les validations sont correctes, enregistre les informations de la personne
    if (isValid && currentStep === 5) {
        personnes.push({
            prenom: prenom.value.trim(),
            nom: nom.value.trim(),
            email: email.value.trim()
        });

        afficherPersonnes(); // Affiche la liste des personnes inscrites
        resetFormFields(); // Réinitialise les champs du formulaire
        afficherMessageSucces(); // Affiche le message de succès
        currentStep = 1; // Réinitialise l'étape actuelle
        showNextStep(); // Affiche l'étape suivante (retour à l'étape 1)
    }
};

// Fonction pour afficher l'étape suivante du formulaire
const showNextStep = () => {
    // Cache toutes les étapes du formulaire sauf celle correspondant à l'étape actuelle
    document.querySelectorAll('.input-control').forEach(control => {
        control.style.display = 'none';
    });

    // Affiche l'étape suivante
    document.getElementById(`${getStepControlId()}-control`).style.display = 'block';
};

// Fonction pour obtenir l'ID du contrôle de saisie correspondant à l'étape actuelle
const getStepControlId = () => {
    switch (currentStep) {
        case 1: return 'prenom';
        case 2: return 'nom';
        case 3: return 'email';
        case 4: return 'password';
        case 5: return 'password2';
    }
};

// Initialisation : Affiche la première étape du formulaire
showNextStep();
