var host = "https://github.com/";
var repo = "chejen/eslint-plugin-i18n/";
var path = "blob/master/docs/rules"

module.exports = function(lang, description, regex, message) {
	return {
		meta: {
			type: "suggestion",
	
			docs: {
				description: description,
				category: "Best Practices",
				recommended: false,
				url: `${host}/${repo}/${path}/no-${lang.toLowerCase()}-character.md`,
			},
			schema: [], // no options
		},
		create: function(context) {
			var report = function(node, val) {
				context.report({
					node: node,
					message: message,
					data: {
						character: val,
					},
				});
			};
			var validate = function(node) {
				if (typeof node.value === "string" && regex.exec(node.raw)) {
					report(node, node.raw);
				}
			};

			return {
				"Literal": validate,
				"JSXText": validate,
				"TemplateElement": function(node) {
					var v = node.value;
					if (v && v.raw && regex.exec(v.raw)) {
						report(node, v.raw);
					}
				},
			};
		},
	};
}
