var game = function() {
	var player1 = {};
	
	var player2 = {};
	
	var deck = [1,1,1,1,1,
				2,2,2,2,2,
				3,3,3,3,3,
				4,4,4,4,4,
				5,5,5,5,5];
	
	var board = function() {
			
	}();

	var setupGame = function(config) {
		if (config === undefined) {
			player1 = {
				location: 1,
				cards: getRandomCard(5),
				roundsWon: 0
			};
			
			player2 = {
				location: 15,
				cards: getRandomCard(5),
				roundsWon: 0
			};

			return;
		}

		if (config.player1)	{
			player1.location = config.player1.location || 1;	
			player1.cards = config.player1.cards;
			player1.roundsWon = config.player1.roundsWon || 0;
		}

		if (config.player2) {
			player2.location = config.player2.location || 15;
			player2.cards = config.player2.cards;
			player2.roundsWon = config.player2.roundsWon || 0;
		}
	};

	var playTurn = function(player, cards) {
		if (player === 1) {
			player1.location += cards[0];
		} else {
			player2.location -= cards[0];
		}
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
		return deck;
	};

	var getRoundsWon = function() {
		return {
			player1: player1.roundsWon,
			player2: player2.roundsWon
		};
	};

	var getRandomCard = function(numberOfCards) {
		var cards = [];
		for (var i = 0; i < numberOfCards; i += 1) {
			cards.push(deck.pop());
		}
		return cards;
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
