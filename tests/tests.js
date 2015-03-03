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
			roundsWon: 1
		},
		player2: {
			location: 10,
			cards: [1,2,2,3],
			roundsWon: 2
		}
	});

	equal(game.getPlayerLocations().player1, 5);
	equal(game.getPlayerLocations().player2, 10);
	deepEqual(game.getPlayerCards().player1, [1,2,2,3,5]);
	deepEqual(game.getPlayerCards().player2, [1,2,2,3]);
	equal(game.getRoundsWon().player1, 1);
	equal(game.getRoundsWon().player2, 2);
});

test( "First move", function() {
	game.setupGame();
	game.playTurn(0, [5]);
	equal(game.getPlayerLocations().player1, 6);
});

test( "Play two moves", function() {
	game.setupGame();
	game.playTurn(0, [5]);
	game.playTurn(1, [5]);
	equal(game.getPlayerLocations().player1, 6);
	equal(game.getPlayerLocations().player2, 10);
});

// test("Attack!", function() {
// 	game.setupGame({
// 		player1: {
// 			location: 1
// 		},
// 		player2: {
// 			location: 6
// 		}
// 	});
// 	game.playTurn(0, [5]);
// 	equal(game.getPlayerLocations().player1, 1);
// });
