# Jeu de Dé
Dans le cadre de ma formation j'ai crée une application de jeu de Dé afin de mettre en avant l'utilsation de Javascript et de la POO (programmation orientée objet).
L'utilisation du framework boostrap pour la responsivité en plus du CSS pour la mise en page de l'application.

#Deploiement
L'application est déployée à cette adresse URL: https://a6mino.github.io/jeudice/

#Description
Cette application a été réalisée sur une période de 4 jours, avec une moyenne d'environ 4 heures de travail quotidien. Dans la conception de mon code JavaScript, j'ai opté pour une approche de programmation orientée objet complète. L'utilisation de classes distinctes favorise une approche modulaire, visant à simplifier la maintenance du code. Cette modularité permettrait, par exemple, d'ajouter un mode de jeu avec un joueur contre un bot, de permettre des parties à deux joueurs, de modifier le type de dé utilisé, ou encore d'introduire un délai entre chaque clic (comme illustré dans cette présentation).

Le projet comprend une interface soigneusement conçue, conforme à la maquette fournie et améliorée du point de vue de l'expérience utilisateur (IUX). J'ai intégré des ressources visuelles issues du dossier "images". L'application offre une fenêtre modale pour débuter une nouvelle partie, une modale exposant les règles du jeu, ainsi qu'une interface interactive 

#Detail

J’ai fait mon code JS suivant le modèle d’une programmation orientée objet totale. L’utilisation de classes distinctes offre une approche modulaire dont le but est de faciliter la maintenance du code. Par exemple si l’on veut proposer un mode 1 (cas du joueur contre le bot) ou 2 joueurs, modifier le dé variant ou apporter un délai entre chaque clic (un exemple est proposé dans cette présentation) …

Pour cela je crée 4 classes :

1.	La classe Player (l’objet Joueur) 
Cet objet contient des attributs et une méthode
	•	Attributs :
	•	name: Le nom du joueur.
	•	currentScore: Le score temporaire accumulé pendant un tour.
	•	globalScore: Le score total du joueur.
	•	Méthode :
	•	resetScores(): Réinitialise les scores du joueur.

2.	La classe Dice (l’objet Dé)
Cette classe offre les méthodes relatives aux catégories de Dé (normal ou variant) :
•	Méthodes :
•	rollNormalDice(): Lance un dé normal à six faces et renvoie le résultat.
•	rollVariantDice(): Lance un dé variant avec des combinaisons prédéfinies et renvoie le résultat.

3.	La classe Game (l’objet Jeu) 
Cet objet va se décomposer par un constructeur, des attributs et des méthodes.
•	Constructor (constructeur) :
•	Prend deux joueurs (player1 et player2) et un élément DOM représentant l'image du dé (diceImageElement).
•	Initialise l'état du jeu, le dé, et l'élément image du dé.
•	Attributs :
•	player1, player2: Les joueurs.
•	activePlayer: Le joueur actif.
•	isGameOver: Indique si le jeu est terminé.
•	dice: Une instance de la classe Dice.
•	isVariantDice: Indique si un dé variant est utilisé.
•	diceImageElement: L'élément DOM représentant l'image du dé.
•	Méthodes :
•	switchPlayer(): Passe au joueur suivant et met à jour le message.
•	holdScore(): Ajoute le score temporaire au score global du joueur actif et vérifie s'il a gagné.
•	newGame(): Réinitialise le jeu pour une nouvelle partie.
•	updateScores(): Met à jour les scores affichés dans l'interface utilisateur.
•	endGame(): Affiche le message de fin de jeu.
•	rollDice(): Lance le dé, met à jour les scores, affiche l'image du dé, et gère la règle du jeu pour le cas de la face 1.Tout d’abord le code vérifie le statut du jeu car si le jeu est terminé il n’y a plus de lancer de dé. Ensuite le code vérifie le type de dé (normal ou variant). Puis il met en place la règle du jeu avec l’accumulation du score temporaire tant que la face 1 n’apparait pas. Si 1 apparait on change de joueur et le score temporaire retombe à 0. Des mises à jour des scores de l’image est du résultat de Dé se fait également.
•	toggleDiceType(): Bascule entre un dé normal et un dé variant.

4.	La classe GameApp (l’objet interface) 
Cette classe se décompose avec un constructeur d’initialisation, et de méthodes.
•	Constructor (constructeur) :
•	Initialise les éléments DOM, les écouteurs d'événements, et le jeu.
•	Méthodes :
•	Diverses méthodes pour gérer l'interface utilisateur :
1)	initializeDOMElements() pour récupérer les éléments du DOM
2)	initializeEventListeners() pour ajouter les écouteurs d’évènements relatifs aux interactions utilisateurs : gérer l'interface utilisateur, y compris l'ouverture/fermeture de modals, l’enclenchement d’une nouvelle partie et lancer de dé. Voici quelques exemples significatifs :

a)	Nouvelle Partie :
this.newGameButton.addEventListener('click', () => this.openModal()); :Il écoute le clic sur le bouton "Nouvelle partie" et déclenche la méthode openModal() de l'instance GameApp

b)	La fermeture des modales
this.closeModalButtons.forEach((button) => button.addEventListener('click', () => this.closeModal()));: cela fait référence aux boutons de fermetures de modal. Ces boutons ont été récupérés par un querySelectorAll (stocke dans un tableau) c’est pourquoi j’utilise une boucle forEach qui itère sur chaque élément bouton de this.closeModalButtons . Chacun de ces boutons a un écouteur d’événement au clic. Donc lorsque l’un des bouton est cliqué la fonction fléchée () => this.closeModal() est appelée. Cette dernière appelle la méthode closeModal de l’instance actuelle de la classe GameApp.

c)	Le lancer de dé (évitant le rage clic)
Ma premiere version a été : document.getElementById('rollDice').addEventListener('click', this.rollDice.bind(this)); : Il écoute le clic sur le bouton "Lancer le dé" et déclenche la méthode rollDice() de l'instance GameApp. L’utilisation de  .bind(this) garantit que, lorsqu'il est appelé, this dans la fonction rollDice() fait référence à l'instance actuelle de GameApp.
Comme il s’agit d’un code très modulaire j’ai apporté des modifications pour éviter le clic intempestif pouvant gêner le jeu et un clic sur l’image avec querySelectorAll pour une meilleure expérience utilisateur.
La fonction fléchée utilisée dans addEventListener assure que la fonction conserve la référence correcte à l'instance de GameApp. Cette modification garantit qu'un délai de d’une demi seconde est respecté entre chaque clic sur le bouton "Lancer le dé". Pour cela je crée la variable booléenne allowRoll pour contrôler si le clic sur le bouton rollDice est autorisé. Je l’initialise à true. Ensuite j’attache un écouteur d’évènement au clic sur l’élément qui vérifie si la variable allowRoll est true et dans ce cas le lancé de dé est autorisé et la méthode rollDice de l’objet Game est appelé. Et après le lancé la variable allowRoll a une valeur de false pendant une demi seconde (grâce à la fonction setTimeout qui définit le délai pour réinitialiser la variable de false à true).
			
3)	initializeGame() pour instancier les objets Player et Game (et concomitamment l’objet Dé à travers Game). L’instance de la classe Game utilise ces joueurs et l’élément de l’image du Dé (s’il est variant ou non).

•	openModal(), closeModal() pour gérer les ouvertures et fermetures des modales
•	showPlayerNames() et closePlayerNames()  : Affiche et cache les noms des joueurs.
•	updatePlayerNames(event) : Met à jour les noms des joueurs et affiche le message à qui le tour. Les noms des joueurs sont lus à partir des champs saisis dans les inputs de la modale. S’ils sont vides des noms par défauts sont proposés. Ces noms sont ensuite attribuésaux instances de l’objet Player et dans l’interface utilisateur.
•	toggleDiceType() : Appelle la méthode toggleDiceType de la classe Game.
•	rollDice(): Appelle la méthode rollDice de la classe Game. Car la logique pour le lancer de dé est déplacée dans la classe Game

Une fois la création de ces classes faite j’instancie la classe GameApp . Cette instanciation est attachée au gestionnaire d’évènement de chargement du document.

La mise en place de ce code c’est fait en plusieurs étapes. Il a fallu décomposer la logique et faire de nombreux tests pour que la fonctionnalité de l’application soit conforme. Je savais dès le départ qu’il me faudrait les objets Dé et Joueur. Puis au fur et à mesure de la construction l’objet jeu s’est initié afin de regrouper notamment ces 2 objets. Cependant ayant d’autres fonctionnalités en rapport à l’interface utilisateur j’ai mis en place un 4ieme objet qui sera l’application générale et qui instancie les 3 autres objets (le dé étant instancié par la classe jeu)

NB : j’ai voulu immerger l’utilisateur davantage dans un univers de jeu  c’est pourquoi j’ai ajouté une histoire et j’ai amélioré  la maquette en proposant des backgrounds faisant référence à l’histoire.


