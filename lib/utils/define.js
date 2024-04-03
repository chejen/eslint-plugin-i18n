const host = 'https://github.com';
const repo = 'chejen/eslint-plugin-i18n';
const path = 'blob/master/docs/rules';

const isExcludeFunction = (node, excludeFunction) => {
  if (node.parent.type === 'CallExpression') {
    const callee = node.parent.callee;
    if (callee.type === 'Identifier' && callee.name === excludeFunction) {
      return true;
    }
    if (
      callee.type === 'MemberExpression' &&
      callee.object.type === 'Identifier' &&
      callee.property.type === 'Identifier' &&
      `${callee.object.name}.${callee.property.name}` === excludeFunction
    ) {
      return true;
    }
  }
  return false;
};


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
          excludeArgsForFunctions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      }],
    },
    create: function(context) {
      const { includeIdentifier, includeComment, excludeArgsForFunctions } = context.options[0] || {};
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
          if (typeof excludeArgsForFunctions === 'object') {
            if (node.parent.type === 'CallExpression' && excludeArgsForFunctions.some((value) => isExcludeFunction(node, value))) {
              return;
            }
          }

          if (typeof node.value === 'string' && regex.exec(node.raw)) {
            report(node, node.raw);
          }
        },
        'TemplateElement': function(node) {
          if (typeof excludeArgsForFunctions === 'object') {
            if (node.parent.parent.type === 'CallExpression' && excludeArgsForFunctions.some((value) => isExcludeFunction(node.parent, value))) {
              return;
            }
          }

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
