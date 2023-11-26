document.addEventListener('DOMContentLoaded', () => {

    const newGameButton = document.getElementById('newgame');
    const ruleButton = document.getElementById('rules');
    const modal = document.getElementById('modal');
    const modalRule = document.getElementById('ruleModal');
    let textModal = document.getElementById('text-modal');
    // Référence des boutons  dans la modale
    const startNewGameButton = document.getElementById('startNewGame');
    const closeModalButtons = document.querySelectorAll('.closeModalButton');

    // Bloc des noms des joueurs à renseigner
    const playerNames = document.getElementById('playerNames');
    const player1Input = document.getElementById('player1Input');
    const player2Input = document.getElementById('player2Input');
    const player1Name = document.getElementById('player1Name');
    const player2Name = document.getElementById('player2Name');

    // Fonctions pour ouvrir et fermer la modale
    const openModal = () => {
        modal.style.display = 'block';
          // Modifier le text-modal
          textModal.textContent="Souhaitez-vous faire une autre partie ?";
    };
    const closeModal = () => {
        modal.style.display = 'none';
        //fermeture du champs des joueurs pour une meilleure fonctionnalité
        closePlayerNames();
    };

        // Fonctions pour ouvrir et fermer la modale rule
        const openModalRule = () => {
            modalRule.style.display = 'block';
        };
        const closeModalRule = () => {
            modalRule.style.display = 'none';
            //fermeture du champs des joueurs pour une meilleure fonctionnalité
            closePlayerNames();
        };
    

    // Fonction pour afficher et cacher le champ d'entrée des noms des joueurs
    const showPlayerNames = () => {
        playerNames.style.display = 'block';
    };
        const closePlayerNames = () => {
        playerNames.style.display = 'none';
    };

    //Fonction de mise à jour des noms des joueurs
    
    const updatePlayerNames = (event) => {
        event.preventDefault(); // Empêcher la soumission du formulaire
        
        
        player1Name.textContent = player1Input.value;
        player2Name.textContent = player2Input.value;
        closeModal(); // Fermer la modale après la validation des noms
    };

    // Ajouter un écouteur d'événements au bouton "Nouvelle partie"
    newGameButton.addEventListener('click', openModal);
    ruleButton.addEventListener('click', openModalRule);
    // Ajouter un écouteur d'événements au bouton "Commencer" dans la modale
    startNewGameButton.addEventListener('click', () => {
        // Modifier le text-modal
        textModal.textContent="Veuillez renseigner le nom des joueurs";
        //Afficher le champ d'entrée des noms des joueurs
        showPlayerNames();
    });

    // Ajouter des écouteurs d'événements aux boutons "Annuler" dans la modale
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });
     // Ajouter des écouteurs d'événements aux boutons "Annuler" dans la modale rule
     closeModalButtons.forEach((button) => {
        button.addEventListener('click', closeModalRule);
    });
    const validateNamesButton = document.getElementById('validateNames');
    validateNamesButton.addEventListener('click', updatePlayerNames);

     // Ajouter des écouteurs d'événements aux boutons "Fermer" dans la modale rule
     const closeRuleModalButtons = document.querySelectorAll('.btn-close');
     closeRuleModalButtons.forEach((button) => {
         button.addEventListener('click', closeModalRule);
     });
 

});