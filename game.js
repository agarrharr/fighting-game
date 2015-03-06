var game = function() {
	var players = [
			{
				direction: 1
			},
			{
				direction: -1
			}
		];
	
	var deck;
	var lastPlayedCards = [];
	
	var board = function() {}();

	var setupGame = function(config) {
		deck = [1,1,1,1,1,
				2,2,2,2,2,
				3,3,3,3,3,
				4,4,4,4,4,
				5,5,5,5,5];

		if (config === undefined) {
			players[0] = {
				location: 1,
				cards: getRandomCard(5),
				roundsWon: 0,
				direction: 1,
				isAttacked: false
			};
			
			players[1] = {
				location: 15,
				cards: getRandomCard(5),
				roundsWon: 0,
				direction: -1,
				isAttacked: false
			};

			return;
		}

		if (config.lastPlayedCards) {
			lastPlayedCards = config.lastPlayedCards;
		}

		if (config.player1)	{
			players[0].location = config.player1.location || 1;	
			players[0].cards = config.player1.cards;
			players[0].roundsWon = config.player1.roundsWon || 0;
			players[0].isAttacked = config.player1.isAttacked || false;
		}

		if (config.player2) {
			players[1].location = config.player2.location || 15;
			players[1].cards = config.player2.cards;
			players[1].roundsWon = config.player2.roundsWon || 0;
			players[1].isAttacked = config.player2.isAttacked || false;
		}
	};

	var playTurn = function(player, cards) {
		lastPlayedCards = cards;
		var newLocation = players[player].location + (cards[0] * players[player].direction);
		var otherPlayer = ! player ? 1 : 0;
		if (newLocation !== players[otherPlayer].location) {
			players[player].location += cards[0] * players[player].direction;
		} else {
			players[otherPlayer].isAttacked = true;
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

	var getLastPlayedCards = function() {
		return lastPlayedCards;
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

	var getPlayers = function() {
		return {
			player1: players[0],
			player2: players[1]
		};
	};

	return {
		getPlayerLocations: getPlayerLocations,
		getPlayerCards: getPlayerCards,
		getDeck: getDeck,
		getLastPlayedCards: getLastPlayedCards,
		getRoundsWon: getRoundsWon,
		playTurn: playTurn,
		setupGame: setupGame,
		getPlayers: getPlayers
	};
}();
