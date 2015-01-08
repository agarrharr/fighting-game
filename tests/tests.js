test( "Game start", function() {
	equal(game.getPlayerLocations().player1, 1);
	equal(game.getPlayerLocations().player2, 15);
	equal(game.getPlayerCards().player1.length, 5);
	equal(game.getPlayerCards().player2.length, 5);
	equal(game.getDeck().length, 20);
	equal(game.getDiscardPile().length, 0);
	equal(game.getRoundsWon().player1, 0);
	equal(game.getRoundsWon().player2, 0);
});

test( "First move", function() {
	game.playTurn(1, [5]);
	equal(game.getPlayerLocations().player1, 6);
});
