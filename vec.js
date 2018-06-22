module.exports = {
	v3 : function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	},
	v2 : function(x, y) {
		this.x = x;
		this.y = y;
		this.sub = function(vec) {
			this.x -= vec.x;
			this.y -= vec.y;
		};
		this.add = function(vec) {
			this.x += vec.x;
			this.y += vec.y;
		};
	},
};