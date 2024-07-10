// Déclaration des variables : Récupération des éléments du DOM
const form = document.getElementById('form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const listePersonnes = document.getElementById('liste-personnes');
const messageDiv = document.getElementById('message'); // Élément pour afficher le message de succès



// Tableau pour stocker les informations des personnes
const personnes = [];


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

// Fonction pour valider les entrées du formulaire
const validateInputs = () => {
    const valeurPrenom = prenom.value.trim(); // Récupère la valeur du prénom et supprime les espaces autour
    const valeurNom = nom.value.trim(); // Récupère la valeur du nom et supprime les espaces autour
    const valeurEmail = email.value.trim(); // Récupère la valeur de l'email et supprime les espaces autour
    const valeurPassword = password.value.trim(); // Récupère la valeur du mot de passe et supprime les espaces autour
    const valeurPassword2 = password2.value.trim(); // Récupère la valeur du mot de passe de confirmation et supprime les espaces autour

    let isValid = true;

    // Validation du prénom
    if (valeurPrenom === '') {
        setError(prenom, 'Le prénom est obligatoire'); // Affiche une erreur si le prénom est vide
        isValid = false;
    } else if (valeurPrenom.length < 3 || valeurPrenom.length > 15) {
        setError(prenom, 'Le prénom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le prénom est hors des limites
        isValid = false;
    } else {
        setSuccess(prenom); // Affiche un succès si le prénom est valide
    }

    // Validation du nom
    if (valeurNom === '') {
        setError(nom, 'Le nom est obligatoire'); // Affiche une erreur si le nom est vide
        isValid = false;
    } else if (valeurNom.length < 3 || valeurNom.length > 15) {
        setError(nom, 'Le nom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le nom est hors des limites
        isValid = false;
    } else {
        setSuccess(nom); // Affiche un succès si le nom est valide
    }

    // Validation de l'email
    if (valeurEmail === '') {
        setError(email, "L'email est obligatoire"); // Affiche une erreur si l'email est vide
        isValid = false;
    } else if (!isValidEmail(valeurEmail)) {
        setError(email, "L'email n'est pas valide"); // Affiche une erreur si l'email n'est pas valide
        isValid = false;
    } else {
        setSuccess(email); // Affiche un succès si l'email est valide
    }

    // Validation du mot de passe
    if (valeurPassword === '') {
        setError(password, 'Le mot de passe est obligatoire'); // Affiche une erreur si le mot de passe est vide
        isValid = false;
    } else if (valeurPassword.length < 8) {
        setError(password, "Le mot de passe doit contenir au moins 8 caractères"); // Affiche une erreur si le mot de passe est trop court
        isValid = false;
    } else {
        setSuccess(password); // Affiche un succès si le mot de passe est valide
    }

    // Validation de la confirmation du mot de passe
    if (valeurPassword2 === '') {
        setError(password2, 'Veuillez confirmer votre mot de passe'); // Affiche une erreur si la confirmation du mot de passe est vide
        isValid = false;
    } else if (valeurPassword2 !== valeurPassword) {
        setError(password2, "Les mots de passe ne correspondent pas"); // Affiche une erreur si les mots de passe ne correspondent pas
        isValid = false;
    } else {
        setSuccess(password2); // Affiche un succès si les mots de passe correspondent
    }
    if (isValid) {
        // Ajoute les informations de la personne au tableau
        personnes.push({
            prenom: valeurPrenom,
            nom: valeurNom,
            email: valeurEmail
        });

        // form.innerHTML = '<h1>Succès : Le formulaire a été bien soumis.</h1>'; // Remplace le formulaire par un message de succès

        afficherPersonnes(); // Appelle la fonction pour afficher la liste des personnes
        resetFormFields(); // Réinitialise les champs du formulaire
        afficherMessageSucces(); // Affiche le message de succès
    }

     
};
