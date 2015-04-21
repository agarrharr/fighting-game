var game = function() {
	var FIRST_SPACE = 1;
	var LAST_SPACE = 18;

	var players = [
			{
				direction: 1
			},
			{
				direction: -1
			}
		];
	var currentPlayer;	
	var deck;
	var lastPlayedCards = [];
	
	var board = function() {}();

	var setupGame = function(config) {
		deck = [1,1,1,1,1,
				2,2,2,2,2,
				3,3,3,3,3,
				4,4,4,4,4,
				5,5,5,5,5];
		currentPlayer = 0;

		if (config === undefined) {
			players[0] = {
				location: FIRST_SPACE,
				cards: getRandomCard(5),
				roundsWon: 0,
				direction: 1,
				isAttacked: false
			};
			
			players[1] = {
				location: LAST_SPACE,
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

		if (config.currentPlayer) {
			currentPlayer = config.currentPlayer;
		}

		if (config.player1)	{
			players[0].location = config.player1.location || 1;	
			players[0].cards = config.player1.cards;
			players[0].roundsWon = config.player1.roundsWon || 0;
			players[0].isAttacked = config.player1.isAttacked || false;
		}

		if (config.player2) {
			players[1].location = config.player2.location || LAST_SPACE;
			players[1].cards = config.player2.cards;
			players[1].roundsWon = config.player2.roundsWon || 0;
			players[1].isAttacked = config.player2.isAttacked || false;
		}
	};

	var playTurn = function(player, cards, moveType) {
		if (players[player].isAttacked) {
			playTurnAttacked(player, cards, moveType);
		} else {
			playTurnNormal(player, cards, moveType);
		}
		lastPlayedCards = cards;
		currentPlayer = currentPlayer ? 0 : 1;
	};

	var playTurnAttacked = function(player, cards, moveType) {
		var moveTypes = {
			'block': function() { return; },
			'retreat': function(player, cards) {
				players[player].location += cards[0] * -players[player].direction;
			}
		};
		moveTypes[moveType](player, cards);

		players[player].isAttacked = false;
	};

	var playTurnNormal = function(player, cards, moveType) {
		var moveTypes = {
			'attack': attack,
			'dashing strike': dashingStrike,
			'push': push,
			'move': move
		};
		moveTypes[moveType](player, cards);
	};

	var playedValidAttackCard = function(player, cards) {
		var newLocation = players[player].location + (cards[0] * players[player].direction);
		var otherPlayer = ! player ? 1 : 0;

		return newLocation === players[otherPlayer].location;
	};

	var attack = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		players[otherPlayer].isAttacked = true;
		
		if (playerWins(player, cards)) {
			players[player].roundsWon += 1;
		}
	};
	
	var playerWins = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		var isDashingStrike = cards.length > 1 && cards[0] !== cards[1];

		if (isDashingStrike) {
			if (players[otherPlayer].location === FIRST_SPACE ||
					players[otherPlayer].location === LAST_SPACE) {
				players[player].roundsWon += 1;
			}
		} else {
			if (players[otherPlayer].cards.indexOf(cards[0]) === -1) {
				players[player].roundsWon += 1;
			}
		}
	};

	var move = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		players[player].location += cards[0] * players[player].direction;
		if (movedPastOtherPlayer()) {
			players[player].location = players[otherPlayer].location - players[player].direction;
		}
	};

	var movedPastOtherPlayer = function() {
		return (players[0].location > players[1].location);
	};

	var playersAreNextToEachOther = function(player) {
		var otherPlayer = ! player ? 1 : 0;
		return Math.abs(players[player].location - players[otherPlayer].location) === 1;
	};

	var dashingStrike = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		move(player, cards);
		attack(player, cards);
	};

	var push = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		players[otherPlayer].location += cards[0] * -players[otherPlayer].direction;
		if (players[otherPlayer].location > LAST_SPACE) {
			players[otherPlayer].location = LAST_SPACE;
		} else if (players[otherPlayer].location < FIRST_SPACE) {
			players[otherPlayer].location = FIRST_SPACE;
		}
	};

	var isDashingStrike = function(player, cards) {
		if (cards.length !== 2) {
			return false;
		}
		var sumOfCards = cards[0] + cards[1];
		
		var otherPlayer = ! player ? 1 : 0;
		var firstLocation = players[player].location + sumOfCards;
		var secondLocation = players[otherPlayer].location;

		return firstLocation === secondLocation;
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

	var cardsAreTheSame = function(cards1, cards2) {
		if (cards1.length === cards2.length) {
			for(var i = 0; i < cards1.length; i += 1) {
				if (cards2[i] === undefined) {
					return false;
				}
				if (cards1[i] !== cards2[i]) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	};

	var getPlayers = function() {
		return {
			player1: players[0],
			player2: players[1]
		};
	};

	var getCurrentPlayer = function() {
		return currentPlayer;
	};

	return {
		getPlayerLocations: getPlayerLocations,
		getPlayerCards: getPlayerCards,
		getDeck: getDeck,
		getLastPlayedCards: getLastPlayedCards,
		getRoundsWon: getRoundsWon,
		playTurn: playTurn,
		setupGame: setupGame,
		getPlayers: getPlayers,
		getCurrentPlayer: getCurrentPlayer
	};
}();
