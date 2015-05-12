var boardWidth = 900;

d3.chart('gameBoard', {
	initialize: function() {
		var boardHeight = 200;
		var tileWidth = boardWidth / 18;
		var circleY = boardHeight / 2;
		var circleRadius = 20;
		var playerColors = ['red', 'blue'];
		var boardGroup = this.base.append('g').classed('boardGroup', true)
				.attr('transform', 'translate(1, 1)');
		var circleGroup = this.base.append('g').classed('circleGroup', true)
				.attr('transform', 'translate(1, 1)');

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
		var cardGroup = this.base.append('g').classed('cardGroup', true)
				.attr('transform', 'translate(1, 1)');
		var numberOfCards = 5;
		var padding = 10;
		var cardHeightRatio = 1.4;
		var cardWidth = (boardWidth - (numberOfCards - 1) * padding) / numberOfCards;
		var cardHeight = cardWidth * cardHeightRatio;
		var selectedCards = [];

		this.layer('cards', cardGroup, {
			dataBind: function(data) {
				return this.selectAll('g')
				.data(data);
			},
			insert: function() {
				var card = this.append('g')
					.on('click', selectCard);
				card.append('rect');
				card.append('text').classed('leftNumber', true);
				card.append('text').classed('centerNumber', true);
				card.append('text').classed('rightNumber', true);

				return card;
			},
			events: {
				'enter': function() {
					var x = 15;
					var y = 30;

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
							'x': x,
							'y': y
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
							'y': cardHeight / 2 + x
						})
						.style({
							'font-size': '48px',
							'text-anchor': 'middle',
						});

					this.select('.rightNumber')
						.text(function(d, i) {
							return d;
						})
						.attr({
							'transform': 'rotate(180, ' + (cardWidth / 2) + ',' + (cardHeight / 2) + ') translate(' + x + ', ' + y + ')'
						})
						.style({
							'font-size': '24px'
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
					return this;
				}
			}
		});

		var selectCard = function(d, i) {
			var strokeColor;
			var cardIndex = selectedCards.indexOf(i);

			if (cardIndex >= 0) {
				strokeColor = 'black';
				selectedCards.splice(cardIndex, 1);
			} else {
				strokeColor = 'blue';
				selectedCards.push(i);
			}

			d3.select(this).select('rect')
				.style('stroke', strokeColor);
		};

		var xScale = function(i) {
			return i * (cardWidth + padding);
		};
	}
});

d3.chart('buttons', {
	initialize: function() {
		'use strict';
		var _Chart = this;

		var buttonsGroup = this.base.append('g').classed('buttonsGroup', true)
				.attr('transform', 'translate(1, 1)');
		var buttonHeight = 50;
		var buttonWidth;
		var padding = 10;
		var yOffset = 5;

		_Chart.transform = function(data) {
			buttonWidth = (boardWidth - (data.length - 1) * padding) / data.length;
			return data;
		};

		this.layer('cards', buttonsGroup, {
			dataBind: function(data) {
				return this.selectAll('g')
				.data(data);
			},
			insert: function() {
				var group = this.append('g');
				group.append('rect');
				group.append('text');

				return group;
			},
			events: {
				'enter': function() {
					this.attr({
						'transform': function(d, i) {
								return 'translate(' + xScale(i)  +', 0)';
							}
					});
					this.select('rect')
						.attr({
							'x': 0,
							'y': 0,
							'height': buttonHeight,
							'width': buttonWidth,
							'rx': 15,
							'ry': 15,
						})
						.style({
							'fill': '#fff',
							'stroke': '#000'
						});
					this.select('text')
						.text(function(d) {
							return d[0];
						})
						.attr({
							'x': buttonWidth / 2,
							'y': buttonHeight / 2 + yOffset
						})
						.style({
							'font-size': '14px',
							'text-anchor': 'middle',
							'font-family': 'Open Sans, sans-serif'
						});
					return this;
				},
				'merge': function() {
					return this;
				}
			}
		});

		var xScale = function(i) {
			return i * (buttonWidth + padding);
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
var cardsChart = svg.append('g').attr('transform', 'translate(0, 250)').chart('cards');
var buttons = svg.append('g').attr('transform', 'translate(0, 500)').chart('buttons');

chart.draw([1, 18]);
cardsChart.draw([2,4,1,5,1]);
buttons.draw([
	['Move', 'move'],
	['Block', 'block'],
	['Retreat', 'retreat'],
	['Attack', 'attack'],
	['Dashing Strike', 'dashingStrike'],
	['Push', 'push']
]);

setTimeout(function() {
	chart.draw([6, 18]);
}, 1000);
