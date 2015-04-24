var boardWidth = 900;

d3.chart('gameBoard', {
	initialize: function() {
		var boardHeight = 200;
		var tileWidth = boardWidth / 18;
		var circleY = boardHeight / 2;
		var circleRadius = 20;
		var playerColors = ['red', 'blue'];
		var boardGroup = this.base.append('g').classed('boardGroup', true)
				.attr('transform', 'translate(1,1)');
		var circleGroup = this.base.append('g').classed('circleGroup', true)
				.attr('transform', 'translate(1,1)');

		this.layer('circles', circleGroup, {
			dataBind: function(data) {
				return this.selectAll('circle')
				.data(data);
			},
			insert: function() {
				return this.append('circle');
			},
			events: {
				'enter': function() {
					this.attr({
						'r': circleRadius,
						'cy': circleY,
						'fill': function(d, i) {
							return playerColors[i];
						}
					});
				},
				'merge': function() {
					this.transition()
						.duration(500)
						.attr({
							'cx': function(d) {
								return xScale(d - 1) + (tileWidth / 2);
							}
						});
					}
				}
		});

		this.layer('board', boardGroup, {
			dataBind: function() {
				return this.selectAll('rect')
				.data([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
			},
			insert: function() {
				return this.append('rect');
			},
			events: {
				'enter': function() {
					this.attr({
						'height': boardHeight,
						'width': tileWidth,
						'y': 0,
						'x': function(d, i) {
							return xScale(i);
						},
						'fill': 'white',
						'stroke': 'black'
					});
				}
			}
		});

		var xScale = function(i) {
			return i * tileWidth;
		};
	}
});

d3.chart('cards', {
	initialize: function() {
		var cardGroup = this.base.append('g').classed('cardGroup', true);
		var numberOfCards = 5;
		var padding = 10;
		var cardHeightRatio = 1.4;
		var cardWidth = (boardWidth - (numberOfCards - 1) * padding) / numberOfCards;
		var cardHeight = cardWidth * cardHeightRatio;

		this.layer('cards', cardGroup, {
			dataBind: function(data) {
				return this.selectAll('rect')
				.data(data);
			},
			insert: function() {
				return this.append('rect');
			},
			events: {
				'enter': function() {
					this.attr({
						'x': 0,
						'y': 0,
						'height': cardHeight,
						'width': cardWidth
					})
					.style({
						'fill': 'white',
						'stroke': 'black'
					});

					this.transition()
						.duration(800)
						.attr({
							'x': function(d, i) {
								return xScale(i);
							}
						});
				},
				'merge': function() {
				}
			}
		});

		var xScale = function(i) {
			return i * (cardWidth + padding);
		};
	}
});

var svg = d3.select('#gameBoard')
	.append('svg')
	.attr({
		'height': 1000,
		'width': 1000
	});

var chart = svg.chart('gameBoard');
var cardsChart = svg.append('g').attr('transform', 'translate(0,250)').chart('cards');

chart.draw([1, 18]);
cardsChart.draw([2,4,1,5,1]);

setTimeout(function() {
	chart.draw([6, 18]);
}, 1000);
