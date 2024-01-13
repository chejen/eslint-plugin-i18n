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
      schema: [{
        type: 'object',
        properties: {
          includeIdentifier: {
            type: 'boolean',
            default: false,
          },
          includeComment: {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      }],
    },
    create: function(context) {
      const { includeIdentifier, includeComment } = context.options[0] || {};
      const report = function(node, val) {
        context.report({
          node: node,
          message: `Using ${lang} characters: {{ character }}`,
          data: {
            character: val,
          },
        });
      };

      const listeners = {
        'Literal, JSXText': function(node) {
          if (typeof node.value === 'string' && regex.exec(node.raw)) {
            report(node, node.raw);
          }
        },
        'TemplateElement': function(node) {
          const v = node.value;
          if (v && v.raw && regex.exec(v.raw)) {
            report(node, v.raw);
          }
        },
      };
      if (includeIdentifier) {
        listeners['Identifier, JSXIdentifier'] = function(node) {
          if (regex.exec(node.name)) {
            report(node, node.name);
          }
        };
      }
      if (includeComment) {
        listeners['Program'] = function(node) {
          if (node.comments && node.comments.length > 0) {
            node.comments.forEach(function(node) {
              if (regex.exec(node.value)) {
                report(node, node.value.trim());
              }
            });
          }
        };
      }

      return listeners;
    },
  };
};
