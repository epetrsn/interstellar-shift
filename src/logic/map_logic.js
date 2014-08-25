/*
 * Map Logic
 */

/*
 * Node Logic
 */

NodeLogic = {
	// buggy beyond dist 1
	findAdjacent: function (node, minCost, maxCost, found, visited, depth) {
		visited = visited || {};
		depth = depth || 0;
		if (node.data.version !== DebugState.costVersion || node.data.cost > depth) {
			node.data.cost = depth;
			node.data.version = DebugState.costVersion;
		}
		
		visited[node.key] = true;
		if (minCost < 0) {
			found.push(node);
		}
		if (maxCost <= 0) {
			return;
		}
		var i, l, nodes = node.nodes;
		for (i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (!visited[node.key]) {
				this.findAdjacent(node, minCost - 1, maxCost - 1, found, visited, depth + 1);
			}
		}
	}
}