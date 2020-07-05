const host = 'https://github.com';
const repo = 'chejen/eslint-plugin-i18n';
const path = 'blob/master/docs/rules';

module.exports = function(lang, regex) {
  return {
    meta: {
      type: 'suggestion',

      docs: {
        description: `This rule helps to find out where ${lang} characters are.`,
        category: 'Best Practices',
        recommended: false,
        url: `${host}/${repo}/${path}/no-${lang.toLowerCase()}-character.md`,
      },
      schema: [], // no options
    },
    create: function(context) {
      const report = function(node, val) {
        context.report({
          node: node,
          message: `Using ${lang} characters: {{ character }}`,
          data: {
            character: val,
          },
        });
      };
      const validate = function(node) {
        if (typeof node.value === 'string' && regex.exec(node.raw)) {
          report(node, node.raw);
        }
      };

      return {
        'Literal': validate,
        'JSXText': validate,
        'TemplateElement': function(node) {
          const v = node.value;
          if (v && v.raw && regex.exec(v.raw)) {
            report(node, v.raw);
          }
        },
      };
    },
  };
};
