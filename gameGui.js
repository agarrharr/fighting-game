d3.chart('gameBoard', {
	initialize: function() {
		var circleRadius = 20;
		var circleY = 50;

		this.layer('circles', this.base.append('g'), {
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
							return xScale(d);
						}
					});
				}
			}
		});

		var xScale = function(d) {
			return d * 50;
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
