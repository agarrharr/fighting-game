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
		if (players[player].isAttacked) {
			playTurnAttacked(player, cards);
		} else {
			playTurnNormal(player, cards);
		}
		lastPlayedCards = cards;
	};

	var playTurnAttacked = function(player, cards) {
		if (cardsAreTheSame(cards, lastPlayedCards)) {
			// Do nothing. This is a block
		} else {
			// Retreat
			players[player].location += cards[0] * -players[player].direction;
		}
		players[player].isAttacked = false;
	};

	var playTurnNormal = function(player, cards) {
		if (playedValidAttackCard(player, cards)) {
			attack(player, cards);
		} else if (isDashingStrike(player, cards)) {
			dashingStrike(player, cards);
		} else if (playersAreNextToEachOther(player)) {
			push(player, cards);
		} else {
			move(player, cards);
		}
	};

	var playedValidAttackCard = function(player, cards) {
		var newLocation = players[player].location + (cards[0] * players[player].direction);
		var otherPlayer = ! player ? 1 : 0;

		return newLocation === players[otherPlayer].location;
	};

	var attack = function(player, cards) {
		var otherPlayer = ! player ? 1 : 0;
		players[otherPlayer].isAttacked = true;
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
		if (players[otherPlayer].location > 15) {
			players[otherPlayer].location = 15;
		} else if (players[otherPlayer].location < 1) {
			players[otherPlayer].location = 1;
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
