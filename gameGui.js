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
				var data = [];
				for(var i = 1; i <= 18; i += 1) {
					data.push(i);
				}

				return this.selectAll('rect')
					.data(data);
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
				return this.selectAll('g')
				.data(data);
			},
			insert: function() {
				var card = this.append('g');
				card.append('rect');
				card.append('text').classed('leftNumber', true);
				card.append('text').classed('centerNumber', true);
				card.append('text').classed('rightNumber', true);

				return card;
			},
			events: {
				'enter': function() {
					this.select('rect').attr({
						'x': 0,
						'y': 0,
						'height': cardHeight,
						'width': cardWidth
					})
					.style({
						'fill': 'white',
						'stroke': 'black'
					});

					this.selectAll('text')
						.style({
							'font-family': 'Open Sans, sans-serif'
						});

					this.select('.leftNumber')
						.text(function(d, i) {
							return d;
						})
						.attr({
							'x': 15,
							'y': 30
						})
						.style({
							'font-size': '24px'
						});

					this.select('.centerNumber')
						.text(function(d, i) {
							return d;
						})
						.attr({
							'x': cardWidth / 2,
							'y': cardHeight / 2 + 15
						})
						.style({
							'font-size': '48px',
							'text-anchor': 'middle',
						});

					var x = cardHeight - 30;
					var y = cardWidth - 15;

					this.select('.rightNumber')
						.text(function(d, i) {
							return d;
						})
						.attr({
							'transform': 'rotate(180, ' + x + ',' + y + ') translate(' + x + ',' + y + ')'
						})
						.style({
							'font-size': '24px',
							'text-anchor': 'end',
						});

					this.transition()
						.duration(800)
						.attr({
							'transform': function(d, i) {
								return 'translate(' + xScale(i) + ',0)';
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
