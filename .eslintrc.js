const path = require("path");

module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        jest: true
    },
    extends: ["airbnb", "prettier/react", "prettier"],
    plugins: ["react", "react-hooks", "prettier"],
    rules: {
        "consistent-return": "off",
        "no-prototype-builtins": "off",
        "no-param-reassign": "off",
        "no-shadow": "off",
        "react/require-default-props": "off",
        "no-use-before-define": "off",
        "react/state-in-constructor": "off",
        "react/no-unescaped-entities": 0,
        "no-extra-boolean-cast": "off",
        "react/forbid-prop-types": 0,
        "jsx-a11y/click-events-have-key-events": "off",
        "no-console": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "no-debugger": "warn",
        "import/prefer-default-export": "off",
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".js"]
            }
        ],
        "jsx-a11y/anchor-is-valid": [
            "error",
            {
                components: ["Link"],
                specialLink: ["url", "to"]
            }
        ],
        "react/jsx-props-no-spreading": 0,
        "class-methods-use-this": 0,
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "off"
    },
    settings: {
        "import/resolver": {
            node: {
                paths: [path.join(__dirname, "src")]
            }
        }
    }
};
