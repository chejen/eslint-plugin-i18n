module.exports = function(context, regex, message) {
	var report = function(node, val) {
		context.report({
			node: node,
			message: message,
			data: {
				character: val
			}
		});
	};
	var validate = function(node) {
		if (typeof node.value === "string" && regex.exec(node.raw)) {
			report(node, node.raw);
		}
	}

	return {
		"Literal": validate,
		"JSXText": validate,
		"TemplateElement": function(node) {
			var v = node.value;
			if (v && v.raw && regex.exec(v.raw)) {
				report(node, v.raw);
			}
		}
	};
}
