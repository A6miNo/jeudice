class Player {
    constructor() {
        this.name = '';
        this.currentScore = 0;
        this.globalScore = 0;
    }

    resetScores() {
        this.currentScore = 0;
        this.globalScore = 0;
    }
}

class Dice {
    rollNormalDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    rollVariantDice() {
        const combinations = [1, 1, 2, 5, 6, 6];
        const randomIndex = Math.floor(Math.random() * combinations.length);
        return combinations[randomIndex];
    }
}

class Game {
    constructor(player1, player2, diceImageElement) {
        this.player1 = player1;
        this.player2 = player2;
        this.activePlayer = this.player1;
        this.isGameOver = false;
        this.dice = new Dice();
        this.isVariantDice = false; 
        this.diceImageElement = diceImageElement;
    }

    switchPlayer() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
        const messageElement = document.getElementById('message');
        messageElement.textContent = `C'est au tour de ${this.activePlayer.name} de jouer!`;
    }

    holdScore() {
        if (!this.isGameOver) {
            this.activePlayer.globalScore += this.activePlayer.currentScore;
            this.activePlayer.currentScore = 0;

            this.updateScores();

            if (this.activePlayer.globalScore >= 100) {
                this.endGame();
            } else {
                this.switchPlayer();
            }
        }
    }

    newGame() {
        this.isGameOver = false;
        this.player1.resetScores();
        this.player2.resetScores();
        this.activePlayer = this.player1;
        this.updateScores();
    }

    updateScores() {
        document.getElementById('score1').textContent = this.player1.globalScore;
        document.getElementById('scoreTemp1').textContent = this.player1.currentScore;

        document.getElementById('score2').textContent = this.player2.globalScore;
        document.getElementById('scoreTemp2').textContent = this.player2.currentScore;

        document.getElementById('resultDice').textContent = '';
        
    }

    endGame() {//Message de fin de jeu
        this.isGameOver = true;
        const messageElement = document.getElementById('message');
        messageElement.textContent = `${this.activePlayer.name} a gagné!`;
    }

    rollDice() {
        if (!this.isGameOver) {
             // Vérifiez si useToggleDiceType est vrai avant d'appeler toggleDiceType
             if (useToggleDiceType) {
                this.toggleDiceType();
            }
            const dice = this.isVariantDice ? this.dice.rollVariantDice() : this.dice.rollNormalDice();
    
            if (dice !== 1) {
                this.activePlayer.currentScore += dice;
            } else {
                this.activePlayer.currentScore = 0;
                this.switchPlayer();
            }
    
            this.updateScores();
    
            const imageName = this.isVariantDice ? `diceV${dice}` : `dice${dice}`;
            this.diceImageElement.setAttribute('src', `./image/${imageName}.png`);
            this.diceImageElement.setAttribute('alt', `Dé ${dice}`);
    
            const resultDiceElement = document.getElementById('resultDice');
            resultDiceElement.textContent = `Résultat du dé : ${dice}`;
            
       
        }
    }
    toggleDiceType() {
        this.isVariantDice = !this.isVariantDice;
        const diceTypeElement = document.getElementById('diceType');
        diceTypeElement.textContent = this.isVariantDice ? 'Dé Variant' : 'Dé Normal';
    }
}

class GameApp {
    constructor() {
        this.initializeDOMElements();
        this.initializeEventListeners();
        this.initializeGame();
       
    }

    initializeDOMElements() {
          // Récupération des éléments du DOM
          this.newGameButton = document.getElementById('newgame');
          this.ruleButton = document.getElementById('rules');
          this.modal = document.getElementById('modal');
          this.modalRule = document.getElementById('ruleModal');
          this.textModal = document.getElementById('text-modal');
          this.startNewGameButton = document.getElementById('startNewGame');
          this.closeModalButtons = document.querySelectorAll('.closeModalButton');
          this.diceImageElement = document.getElementById('dice');
          this.playerNames = document.getElementById('playerNames');
          this.player1Input = document.getElementById('player1Input');
          this.player2Input = document.getElementById('player2Input');
          this.player1Name = document.getElementById('player1Name');
          this.player2Name = document.getElementById('player2Name');
          this.validateNamesButton = document.getElementById('validateNames');
          this.closeRuleModalButtons = document.querySelectorAll('.btn-close');
          this.changeDiceButton = document.getElementById('changeDiceType');
    }

    initializeEventListeners() {
        // Ajout des écouteurs d'événements
        this.newGameButton.addEventListener('click', () => this.openModal());
        this.ruleButton.addEventListener('click', () => this.openModalRule());
        this.startNewGameButton.addEventListener('click', () => {
            this.showPlayerNames()
            this.textModal.textContent = "Veuillez renseigner le nom des joueurs";
        });
        this.closeModalButtons.forEach((button) => button.addEventListener('click', () => this.closeModal()));
        this.closeRuleModalButtons.forEach((button) => button.addEventListener('click', () => this.closeModalRule()));
        this.validateNamesButton.addEventListener('click', (event) => this.updatePlayerNames(event));
        this.changeDiceButton.addEventListener('click', () => this.toggleDiceType());
   
        let allowRoll = true;

        document.querySelectorAll('.rollDice').forEach(button => {
            button.addEventListener('click', () => {
                if (allowRoll) {
                    this.rollDice(); // Appel de la méthode rollDice de l'instance GameApp
                    allowRoll = false;
        
                    // Définir un délai d'une demi-seconde avant de permettre un nouveau clic
                    setTimeout(() => {
                        allowRoll = true;
                    }, 500);
                }
            });
           });
        

        document.getElementById('holdBtn').addEventListener('click', () => this.game.holdScore());
        document.getElementById('newgame').addEventListener('click', () => this.game.newGame());
        document.getElementById('rules').addEventListener('click', () => this.openModalRule());
    }

    initializeGame() {
        this.player1 = new Player();
        this.player2 = new Player();
        this.game = new Game(this.player1, this.player2, this.diceImageElement);
    }

    openModal() {
        this.modal.style.display = 'block';
        this.textModal.textContent = "Souhaitez-vous faire une autre partie ?";
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.closePlayerNames();
    }

    openModalRule() {
        this.modalRule.style.display = 'block';
    }

    closeModalRule() {
        this.modalRule.style.display = 'none';
        this.closePlayerNames();
    }

    showPlayerNames() {
        this.playerNames.style.display = 'block';
        this.startNewGameButton.style.display = "none";
    }

    closePlayerNames() {
        this.playerNames.style.display = 'none';
    }

    updatePlayerNames(event) {
        event.preventDefault();

        const nomJoueur1 = this.player1Input.value || 'Joueur 1';
        const nomJoueur2 = this.player2Input.value || 'Joueur 2';

        this.player1.name = nomJoueur1;
        this.player2.name = nomJoueur2;

        this.player1Name.textContent = nomJoueur1;
        this.player2Name.textContent = nomJoueur2;

        this.closeModal();

        if (nomJoueur1 && nomJoueur2) {
            const messageElement = document.getElementById('message');
            messageElement.textContent = `C'est au tour de ${this.player1.name} de jouer!`;
        }
        
    }

    rollDice() {
        
        this.game.rollDice();
    }
    toggleDiceType() {
        this.game.toggleDiceType();
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Récupération de l'élément à cacher
   const elementHide = document.getElementById('hide');

    // Vérification si l'élément existe
    if (elementHide) {
        // Cacher l'élément en définissant la propriété display sur "none"
        elementHide.style.display = 'none';
    }
    new GameApp();
});