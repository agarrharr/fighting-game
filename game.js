var game = function() {
	var players = [{},{}];
	
	var deck = [1,1,1,1,1,
				2,2,2,2,2,
				3,3,3,3,3,
				4,4,4,4,4,
				5,5,5,5,5];
	
	var board = function() {
			
	}();

	var setupGame = function(config) {
		if (config === undefined) {
			players[0] = {
				location: 1,
				cards: getRandomCard(5),
				roundsWon: 0
			};
			
			players[1] = {
				location: 15,
				cards: getRandomCard(5),
				roundsWon: 0
			};

			return;
		}

		if (config.player1)	{
			players[0].location = config.player1.location || 1;	
			players[0].cards = config.player1.cards;
			players[0].roundsWon = config.player1.roundsWon || 0;
		}

		if (config.player2) {
			players[1].location = config.player2.location || 15;
			players[1].cards = config.player2.cards;
			players[1].roundsWon = config.player2.roundsWon || 0;
		}
	};

	var playTurn = function(player, cards) {
		if (player === 0) {
			players[player].location += cards[0];
		} else {
			players[player].location -= cards[0];
		}
	};

	var getPlayerLocations = function() {
		return {
			player1: players[0].location,
			player2: players[1].location
		};
	};

	var getPlayerCards = function() {
		return {
			player1: players[0].cards,
			player2: players[1].cards
		};
	};

	var getDeck = function() {
		return deck;
	};

	var getRoundsWon = function() {
		return {
			player1: players[0].roundsWon,
			player2: players[1].roundsWon
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
