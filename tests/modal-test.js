document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('newgame');
    const ruleButton = document.getElementById('rules');
    const modal = document.getElementById('modal');
    const modalRule = document.getElementById('ruleModal');
    const textModal = document.getElementById('text-modal');
    const startNewGameButton = document.getElementById('startNewGame');
    const closeModalButtons = document.querySelectorAll('.closeModalButton');
    const playerNames = document.getElementById('playerNames');
    const player1Input = document.getElementById('player1Input');
    const player2Input = document.getElementById('player2Input');
    const player1Name = document.getElementById('player1Name');
    const player2Name = document.getElementById('player2Name');
    const validateNamesButton = document.getElementById('validateNames');
    const closeRuleModalButtons = document.querySelectorAll('.btn-close');

    const openModal = (modalElement) => {
        modalElement.style.display = 'block';
        textModal.textContent = "Souhaitez-vous faire une autre partie ?";
    };

    const closeModal = () => {
        modal.style.display = 'none';
        closePlayerNames();
    };

    const openModalRule = () => {
        modalRule.style.display = 'block';
        textModal.textContent = "Souhaitez-vous faire une autre partie ?";
    };

    const closeModalRule = () => {
        modalRule.style.display = 'none';
    };

    const showPlayerNames = () => {
        playerNames.style.display = 'block';
    };

    const closePlayerNames = () => {
        playerNames.style.display = 'none';
    };

    const updatePlayerNames = (event) => {
        
        // Récupérer les noms des joueurs depuis les champs de saisie
        const playerName1 = player1Input.value.trim();
        const playerName2 = player2Input.value.trim();
    
        // Vérifier si les noms des joueurs sont non vides
        if (playerName1 !== "" && playerName2 !== "") {
            // Mettre à jour les éléments <h2> avec les noms des joueurs
            player1Name.textContent = playerName1;
            player2Name.textContent = playerName2;
    
            // Fermer la modale
            closeModal();
        } else {
            // Afficher un message d'erreur si les noms des joueurs sont vides
      
            document.getElementById('erreur').textContent="Veuillez saisir les noms des joueurs.";
        }
    };
    newGameButton.addEventListener('click', () => openModal(modal));
    ruleButton.addEventListener('click', () => openModalRule());
    startNewGameButton.addEventListener('click', () => {
        textModal.textContent = "Veuillez renseigner le nom des joueurs";
        showPlayerNames();
    });

    closeModalButtons.forEach((button) => button.addEventListener('click', closeModal));
    closeModalButtons.forEach((button) => button.addEventListener('click', closeModalRule));
    validateNamesButton.addEventListener('click', updatePlayerNames);

    closeRuleModalButtons.forEach((button) => button.addEventListener('click', closeModalRule));
});
