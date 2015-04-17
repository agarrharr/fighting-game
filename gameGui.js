d3.chart('gameBoard', {
	initialize: function() {
		var boardHeight = 200;
		var boardWidth = 50;
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
						'cx': function(d) {
							return xScale(d - 1) + (boardWidth / 2);
						},
						'fill': function(d, i) {
							return playerColors[i];
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
						'width': boardWidth,
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
			return i * boardWidth;
		};
	}
});

var chart = d3.select('#gameBoard')
	.append('svg')
	.attr({
		'height': 1000,
		'width': 1000
	})
	.chart('gameBoard');

chart.draw([1, 18]);
