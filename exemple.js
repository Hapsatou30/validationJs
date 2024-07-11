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

    // Masquer tous les champs sauf le prénom après la réinitialisation
    nom.parentElement.style.display = 'none';
    email.parentElement.style.display = 'none';
    password.parentElement.style.display = 'none';
    password2.parentElement.style.display = 'none';
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
    let isValid = true;

    // Validation du prénom
    const valeurPrenom = prenom.value.trim();
    if (valeurPrenom === '') {
        setError(prenom, 'Le prénom est obligatoire'); // Affiche une erreur si le prénom est vide
        isValid = false;
    } else if (valeurPrenom.length < 3 || valeurPrenom.length > 15) {
        setError(prenom, 'Le prénom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le prénom est hors des limites
        isValid = false;
    } else {
        setSuccess(prenom); // Affiche un succès si le prénom est valide

        // Afficher le champ suivant (Nom) seulement si prénom est valide
        nom.parentElement.style.display = 'block';
    }

    // Validation du nom si prénom est valide
    const valeurNom = nom.value.trim();
    if (nom.parentElement.style.display === 'block') {
        if (valeurNom === '') {
            setError(nom, 'Le nom est obligatoire'); // Affiche une erreur si le nom est vide
            isValid = false;
        } else if (valeurNom.length < 3 || valeurNom.length > 15) {
            setError(nom, 'Le nom doit contenir entre 3 et 15 caractères'); // Affiche une erreur si le nom est hors des limites
            isValid = false;
        } else {
            setSuccess(nom); // Affiche un succès si le nom est valide

            // Afficher le champ suivant (Email) seulement si nom est valide
            email.parentElement.style.display = 'block';
        }
    }

    // Validation de l'email si nom est valide
    const valeurEmail = email.value.trim();
    if (email.parentElement.style.display === 'block') {
        if (valeurEmail === '') {
            setError(email, "L'email est obligatoire"); // Affiche une erreur si l'email est vide
            isValid = false;
        } else if (!isValidEmail(valeurEmail)) {
            setError(email, "L'email n'est pas valide"); // Affiche une erreur si l'email n'est pas valide
            isValid = false;
        } else {
            setSuccess(email); // Affiche un succès si l'email est valide

            // Afficher le champ suivant (Mot de passe) seulement si email est valide
            password.parentElement.style.display = 'block';
        }
    }

    // Validation du mot de passe si email est valide
    const valeurPassword = password.value.trim();
    if (password.parentElement.style.display === 'block') {
        if (valeurPassword === '') {
            setError(password, 'Le mot de passe est obligatoire'); // Affiche une erreur si le mot de passe est vide
            isValid = false;
        } else if (valeurPassword.length < 6) {
            setError(password, 'Le mot de passe doit contenir au moins 6 caractères'); // Affiche une erreur si le mot de passe est trop court
            isValid = false;
        } else {
            setSuccess(password); // Affiche un succès si le mot de passe est valide

            // Afficher le champ suivant (Confirmation du mot de passe) seulement si mot de passe est valide
            password2.parentElement.style.display = 'block';
        }
    }

    // Validation de la confirmation du mot de passe si mot de passe est valide
    const valeurPassword2 = password2.value.trim();
    if (password2.parentElement.style.display === 'block') {
        if (valeurPassword2 === '') {
            setError(password2, 'Veuillez confirmer votre mot de passe'); // Affiche une erreur si la confirmation du mot de passe est vide
            isValid = false;
        } else if (valeurPassword !== valeurPassword2) {
            setError(password2, 'Les mots de passe ne correspondent pas'); // Affiche une erreur si la confirmation du mot de passe ne correspond pas au mot de passe
            isValid = false;
        } else {
            setSuccess(password2); // Affiche un succès si la confirmation du mot de passe est valide
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
    }
};
