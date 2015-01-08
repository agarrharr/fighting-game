var game = function() {
	var player1 = {
		location: 1
	};
	
	var board = function() {
			
	}();

	var setupGame = function(config) {
		if (config === undefined) {
			return;
		}

		if (config.player1)	{
			player1.location = config.player1.location || 1;	
		}
	};

	var playTurn = function(player, cards) {
		player1.location = 6;
	};

	var getPlayerLocations = function() {
		return {
			player1: player1.location,
			player2: 15
		};
	};

	var getPlayerCards = function() {
		return {
			player1: [1,1,1,1,1],
			player2: [1,1,1,1,1]
		};
	};

	var getDeck = function() {
		return [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5];
	};

	var getDiscardPile = function() {
		return [];
	};

	var getRoundsWon = function() {
		return {
			player1: 0,
			player2: 0
		};
	};

	return {
		getPlayerLocations: getPlayerLocations,
		getPlayerCards: getPlayerCards,
		getDeck: getDeck,
		getDiscardPile: getDiscardPile,
		getRoundsWon: getRoundsWon,
		playTurn: playTurn,
		setupGame: setupGame
	};
}();
