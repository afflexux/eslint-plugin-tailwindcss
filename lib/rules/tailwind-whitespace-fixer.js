module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'fix whitespace issues in class and className attributes',
        category: 'Stylistic Issues',
        recommended: false
      },
      fixable: 'whitespace',
      schema: [] // no options
    },
    create: function(context) {
      return {
        JSXAttribute(node) {
          if (node.name.name === 'class' || node.name.name === 'className') {
            const value = node.value.value;
            if (typeof value === 'string') {
              const fixedClassNames = value.replace(/\s+/g, ' ').trim();
              if (value !== fixedClassNames) {
                context.report({
                  node,
                  message: 'Whitespace issues found in class or className attribute.',
                  fix: function(fixer) {
                    return fixer.replaceText(node.value, `"${fixedClassNames}"`);
                  }
                });
              }
            }
          }
        }
      };
    }
  };
