/*
 * Directions:
 *   0 1
 *  5   2
 *   4 3
 */
MAP_DIRS = [
	{q:  0, r:  1},
	{q:  1, r:  0},
	{q:  1, r: -1},
	{q:  0, r: -1},
	{q: -1, r:  0},
	{q: -1, r:  1}
];

var s_nodeCount = 0;
var s_edgeCount = 0;
var s_planetCount = 0;

/*
 * Helper Functions
 */

MapUtil = {
	generateKey: function (q, r) {
		return q + '_' + r;
	},
	manhattan: function (t1, t2) {
		var dx = Math.abs(t2.x() - t1.x()),
		    dy = Math.abs(t2.y() - t1.y()),
		    dz = Math.abs(t2.z() - t1.z());
		return (dx + dy + dz) / 2;
	},
	radialManhattan: function (q1, r1, q2, r2) {
		var dx = Math.abs(q2 - q1),
		    dy = Math.abs((-q2-r2) - (-q1-r1)),
		    dz = Math.abs(r2 - r1);
		return (dx + dy + dz) / 2;
	},
	// t1 to t2 direction
	getDirection: function (t1, t2) {
		var i, l;
		var dq = t2.q-t1.q;
		var dr = t2.r-t1.r;
		if (dr === 0 && dq === 0) {
			return -1;
		}
		var max = Math.max(Math.abs(dq), Math.abs(dr));
		var dirs = MAP_DIRS;
		dq = dq/max;
		dr = dr/max;
		for (i=0,l=dirs.length;i<l;i++) {
			if (dirs[i].q === dq && dirs[i].r === dr) {
				return i;
			}
		}
		return -1;
	},
	reverseDirection: function (dir) {
		return (dir + 3) % 6;
	},

	axialToCartesian: function (q, r, size) {
		var x, y;
		x = size * Math.sqrt(3) * (q + r/2);
		y = size * 3/2 * r;
		return {x: x, y: y};
	},

	axialToRowCol: function (q, r, mode) {
		var row, col;
		mode = mode || 'EVEN-R';
		if (mode === 'EVEN-R') {
			row = 0;
		} else {

		}
		return {row: row, col: col};
	},
	rowColToAxial: function (row, col, mode) {
		var q, r;
		mode = mode || 'EVEN-R';
		if (mode === 'EVEN-R') {

		} else {
			
		}
		return {q: q, r: r};
	},

	axialToCube: function (q, r) {
		return {x: q, y: -q-r, z: r};
	},
	cubeToAxial: function (x, y, z) {
		return {q: x, r: z};
	}
};

/*
 * Map
 * 
 * Contains tiles and edges.
 */

function Map() {
	s_nodeCount = 0;
	s_edgeCount = 0;
	s_planetCount = 0;
	this.tileData = {};
	this.tiles = [];
	this.tileMap = {};
	this.size = 0;
};

Map.prototype.initialize = function (size) {
	var i, j, q, r, l, m,
	    dir, tile;
	this.size = size;
	for (q = -size; q <= size; q++) {
		for (r = -size; r <= size; r++) {
			if (Math.abs(0 - r - q) > size) {
				continue;
			}
			// TODO: Create some planets!
			var dirs = MAP_DIRS;

			var distanceFromCenter = MapUtil.radialManhattan(q,r,0,0);
			if ((q === 0 || r === 0 || -q-r === 0) && (distanceFromCenter === size || distanceFromCenter === 0)) {
				tile = new Planet(q, r);
				// console.log('Creating new Planet',tile.key);
			} else {
				tile = new Tile(q, r);
				// console.log('Creating new Tile',tile.key);
			}
			for (i = 0, l = dirs.length; i < l; i++) {
				dir = dirs[i];
				var otherTile = this.tileMap[MapUtil.generateKey(q + dir.q, r + dir.r)];
				if (otherTile) {
					otherTile.addNeighbor(tile);
				}
			}
			tile.addMissingNodes();
			this.tiles.push(tile);
			if (this.tileMap[tile.key]) {
				console.error('Tile already exists with key', tile.key);
			}
			this.tileMap[tile.key] = tile;
		}
	}

	var neighbors;
	for (i = 0, l = this.tiles.length; i < l; i++) {
		tile = this.tiles[i];
		neighbors = [];
		for (j = 0, m = dirs.length; j < m; j++) {
			var dir = dirs[j];
			var otherTile = this.tileMap[MapUtil.generateKey(tile.q + dir.q, tile.r + dir.r)];
			if (otherTile) {
				neighbors.push(otherTile);
			}
		}
		tile.linkTileNodes(neighbors);
	}

	console.info('Total Tiles =',this.tiles.length);
	console.info('Total Planets =', s_planetCount);
	console.info('Total Nodes =', s_nodeCount);
	console.info('Total Links =', s_edgeCount);
	console.info('Ratio N:L = 1:' + s_edgeCount/s_nodeCount);
};

Map.prototype.getStartingNode = function (index, numPlayers) {
	var spacing = Math.floor(MAP_DIRS.length / numPlayers);
	var dir = MAP_DIRS[index * spacing];
	var key = MapUtil.generateKey(this.size * dir.q, this.size * dir.r);
	return this.tileMap[key];
};

/*
 * Tile
 */
function Tile(q, r) {
	this.q = q;
	this.r = r;
	this.nodes = [];
	this.key = MapUtil.generateKey(q, r);
};

Tile.prototype.x = function () { return this.q; };
Tile.prototype.y = function () { return 0 - this.q - this.r; };
Tile.prototype.z = function () { return this.r; };

Tile.prototype.getNode = function (edge) {
	return this.nodes[edge];
};
Tile.prototype.setNode = function (edge, node) {
	return this.nodes[edge] = node;
};

Tile.prototype.addNeighbor = function (tile) {
	// Verfiy tile is an immediate neighbor
	if (MapUtil.manhattan(this, tile) !== 1) {
		return null;
	}
	var dir = MapUtil.getDirection(this, tile);
	var reverse = MapUtil.reverseDirection(dir);
	// Check both for nodes. They will only have a node already if it's a planet node.
	var node = tile.getNode(reverse) || this.getNode(dir);
	if (!node) {
		throw new Error('Tile.addNeighbor::node is missing at Tile '+ tile.key+'['+dir+']');
	}
	this.setNode(dir, node);
	tile.setNode(reverse, node);
};

Tile.prototype.addMissingNodes = function () {
	var i, l, dir, dirs = MAP_DIRS;
	for (i = 0, l = dirs.length; i < l; i++) {
		if (!this.getNode(i)) {
			dir = dirs[i];
			this.setNode(i, new Node(this.q + (0.5*dir.q), this.r + (0.5*dir.r)));
		}
	}
};

Tile.prototype.linkNodes = function () {
	var dir, dirs = MAP_DIRS, nodeA, nodeB;
	for (dir = 0, l = dirs.length; dir < l; dir++) {
		nodeA = this.getNode(dir);
		nodeB = this.getNode((dir + 1) % dirs.length);
		if (nodeA && nodeB) {
			nodeA.linkTo(nodeB);
			nodeB.linkTo(nodeA);
		}
	}
};

Tile.prototype.linkTileNodes= function (tiles) {
	var i, l, tile;
	this.linkNodes();
	// TODO: if corners aren't planets (or size > 2) we'll need to complete the linking around the edge
};

Planet.prototype = new Tile();
Planet.constructor = Planet;
function Planet(q, r) {
	s_planetCount++;
	Tile.call(this, q, r);
	this.isPlanet = true;
};

Planet.prototype.getNode = function (edge) {
	// Planets only have one node
	return this.nodes[0];
};

Planet.prototype.setNode = function (edge, node) {
	this.nodes[0] = node;
	node.isPlanet = true;
	// HACK: Set set node position to center on tile;
	node.q = this.q;
	node.r = this.r;
	node.generateKey();
}

Planet.prototype.addMissingNodes = function () {
	if (!this.getNode(0)) {
		this.setNode(0, new Node(this.q, this.r));
	}
};

Planet.prototype.linkNodes = function () {
	// No-op
}
/*
 * Node
 */
function Node(q, r) {
	++s_nodeCount;
	isPlanet = false;
	this.q = q;
	this.r = r;
	this.generateKey();
	this.nodes = [];
	this.data = {};
};

Node.prototype.generateKey = function () {
	this.key = 'Node::' + MapUtil.generateKey(this.q, this.r);
	return this.key;
},

Node.prototype.linkTo = function (node) {
	if (this !== node && this.nodes.indexOf(node) === -1) {
		s_edgeCount++;
		this.nodes.push(node);
		// Add edge?
	}
};

Node.prototype.toString = function () {
	var coords = MapUtil.axialToCube(this.q, this.r);
	var result = 'Node::' + (this.isPlanet ? 'Planet ' : 'Space ') + this.key +'\n * cubic: ' + coords.x + ', ' + coords.y;
	for (var key in this.data) {
		if (!this.data.hasOwnProperty(key)) {
			continue;
		}
		result += '\n * ' + key + ': '+ this.data[key];
	}
	return result;
};


