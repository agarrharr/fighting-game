test( "Game start", function() {
	game.setupGame();
	equal(game.getPlayerLocations().player1, 1);
	equal(game.getPlayerLocations().player2, 15);
	equal(game.getPlayerCards().player1.length, 5);
	equal(game.getPlayerCards().player2.length, 5);
	equal(game.getDeck().length, 15);
	equal(game.getRoundsWon().player1, 0);
	equal(game.getRoundsWon().player2, 0);
});

test("setupGame works", function() {
	game.setupGame({
		player1: {
			location: 5,
			cards: [1,2,2,3,5],
			roundsWon: 1,
			isAttacked: false
		},
		player2: {
			location: 10,
			cards: [1,2,2,3],
			roundsWon: 2,
			isAttacked: true
		},
		lastPlayedCards: [5]
	});

	equal(game.getPlayerLocations().player1, 5);
	equal(game.getPlayerLocations().player2, 10);
	deepEqual(game.getPlayerCards().player1, [1,2,2,3,5]);
	deepEqual(game.getPlayerCards().player2, [1,2,2,3]);
	equal(game.getRoundsWon().player1, 1);
	equal(game.getRoundsWon().player2, 2);
	equal(game.getPlayers().player1.isAttacked, false);
	equal(game.getPlayers().player2.isAttacked, true);
	deepEqual(game.getLastPlayedCards(), [5]);
});

test( "First move", function() {
	game.setupGame();
	game.playTurn(0, [5]);
	equal(game.getPlayerLocations().player1, 6);
});

test( "Play two moves", function() {
	game.setupGame();
	game.playTurn(0, [1]);
	game.playTurn(1, [1]);
	equal(game.getPlayerLocations().player1, 2);
	equal(game.getPlayerLocations().player2, 14);
});

test("Attack!", function() {
	game.setupGame({
		player1: {
			location: 1
		},
		player2: {
			location: 6
		}
	});
	game.playTurn(0, [5]);
	equal(game.getPlayerLocations().player1, 1);
	equal(game.getPlayers().player2.isAttacked, true);
});

test("Dashing strike!", function() {
	game.setupGame({
		player1: {
			location: 5
		},
		player2: {
			location: 13
		}
	});
	game.playTurn(0, [3, 5]);
	equal(game.getPlayerLocations().player1, 8);
	equal(game.getPlayers().player2.isAttacked, true);
});

test("Retreat from dashing strike", function() {
	game.setupGame({
		player1: {
			location: 1
		},
		player2: {
			location: 6,
			isAttacked: true
		},
		lastPlayedCards: [2,3]
	});
	game.playTurn(1, [2]);
	equal(game.getPlayerLocations().player2, 8);
	equal(game.getPlayers().player2.isAttacked, false);
});

test("Push", function() {
	game.setupGame({
		player1: {
			location: 5
		},
		player2: {
			location: 6
		}
	});
	game.playTurn(1, [3]);
	equal(game.getPlayerLocations().player1, 2);
	equal(game.getPlayers().player1.isAttacked, false);
});

test("Player 1 plays larger card, but only move up to the other player", function() {
	game.setupGame({
		player1: {
			location: 3
		},
		player2: {
			location: 6
		}
	});
	game.playTurn(0, [5]);
	equal(game.getPlayerLocations().player1, 5);
	equal(game.getPlayerLocations().player2, 6);
	equal(game.getPlayers().player1.isAttacked, false);
});

test("Player 2 plays larger card, but only move up to the other player", function() {
	game.setupGame({
		player1: {
			location: 3
		},
		player2: {
			location: 6
		}
	});
	game.playTurn(1, [5]);
	equal(game.getPlayerLocations().player1, 3);
	equal(game.getPlayerLocations().player2, 4);
	equal(game.getPlayers().player2.isAttacked, false);
});

test("Player 1 can't push Player 2 off the board", function() {
	game.setupGame({
		player1: {
			location: 13
		},
		player2: {
			location: 14
		}
	});
	game.playTurn(0, [5]);
	equal(game.getPlayerLocations().player1, 13);
	equal(game.getPlayerLocations().player2, 15);
	equal(game.getPlayers().player2.isAttacked, false);
});

test("Player 2 can't push Player 1 off the board", function() {
	game.setupGame({
		player1: {
			location: 2
		},
		player2: {
			location: 3
		}
	});
	game.playTurn(1, [5]);
	equal(game.getPlayerLocations().player1, 1);
	equal(game.getPlayerLocations().player2, 3);
	equal(game.getPlayers().player1.isAttacked, false);
});

test("Block", function() {
	game.setupGame({
		player1: {
			location: 3
		},
		player2: {
			location: 8,
			isAttacked: true
		},
		lastPlayedCards: [5]
	});
	game.playTurn(1, [5]);
	equal(game.getPlayerLocations().player1, 3);
	equal(game.getPlayerLocations().player2, 8);
	equal(game.getPlayers().player1.isAttacked, false);
	equal(game.getPlayers().player2.isAttacked, false);
});

test("Block with two cards", function() {
	game.setupGame({
		player1: {
			location: 3
		},
		player2: {
			location: 8,
			isAttacked: true
		},
		lastPlayedCards: [5,5]
	});
	game.playTurn(1, [5,5]);
	equal(game.getPlayerLocations().player1, 3);
	equal(game.getPlayerLocations().player2, 8);
	equal(game.getPlayers().player1.isAttacked, false);
	equal(game.getPlayers().player2.isAttacked, false);
});

test("Can't retreat from normal attack", function() {
	game.setupGame({
		player1: {
			location: 3,
			roundsWon: 0
		},
		player2: {
			location: 8,
			cards: [2,3,4,3,1]
		}
	});
	game.playTurn(0, [5]);
	equal(game.getPlayers().player1.roundsWon, 1);
});

// Test a block on a dashing strike
// Test no being able to block a normal attack
// Test that you can't retreat past the end of the board
// Test that one hit wins the round
// Test that winnig 3 out of 5 rounds wins the game
// Test that in the second round, the loser of the previous round chooses who goes first
// Test that when you block or retreat you can't draw cards until the end of your turn
