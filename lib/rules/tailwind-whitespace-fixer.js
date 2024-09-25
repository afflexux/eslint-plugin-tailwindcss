/**
 * @fileoverview Fix whitespace issues in class and className attributes
 * @description This rule fixes whitespace issues in class and className attributes
 * @category Stylistic Issues
 * @recommended false
 */

'use strict';

const docsUrl = require('../util/docsUrl');

module.exports = {
  meta: {
    docs: {
      description: 'Fix whitespace issues in class and className attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('tailwind-whitespace-fixer'),
    },
    fixable: 'whitespace',
    schema: [], // no options
  },

  create: function (context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    /**
     * Fix whitespace issues in class and className attributes
     * @param {ASTNode} node The JSXAttribute node
     * @returns {void}
     */
    const fixWhitespace = (node) => {
      if (node.name.name === 'class' || node.name.name === 'className') {
        const value = node.value.value;
        if (typeof value === 'string') {
          const fixedClassNames = value.replace(/\s+/g, ' ').trim();
          if (value !== fixedClassNames) {
            context.report({
              node,
              message: 'Whitespace issues found in class or className attribute.',
              fix: function (fixer) {
                return fixer.replaceText(node.value, `"${fixedClassNames}"`);
              },
            });
          }
        }
      }
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    return {
      JSXAttribute: fixWhitespace,
    };
  },
};
