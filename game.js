var game = function() {
	var player1 = {};
	
	var player2 = {};

	var board = function() {
			
	}();

	var setupGame = function(config) {
		if (config === undefined) {
			player1 = {
				location: 1,
				cards: getRandomCard(5)
			};
			
			player2 = {
				location: 15,
				cards: getRandomCard(5)
			};

			return;
		}

		if (config.player1)	{
			player1.location = config.player1.location || 1;	
			player1.cards = config.player1.cards;
		}

		if (config.player2) {
			player2.location = config.player2.location || 15;
			player2.cards = config.player2.cards;
		}
	};

	var playTurn = function(player, cards) {
		player1.location = 6;
	};

	var getPlayerLocations = function() {
		return {
			player1: player1.location,
			player2: player2.location
		};
	};

	var getPlayerCards = function() {
		return {
			player1: player1.cards,
			player2: player2.cards
		};
	};

	var getDeck = function() {
		return [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5];
	};

	var getRoundsWon = function() {
		return {
			player1: 0,
			player2: 0
		};
	};

	var getRandomCard = function(numberOfCards) {
		return [1,1,1,1,1];
	};

	return {
		getPlayerLocations: getPlayerLocations,
		getPlayerCards: getPlayerCards,
		getDeck: getDeck,
		getRoundsWon: getRoundsWon,
		playTurn: playTurn,
		setupGame: setupGame
	};
}();
