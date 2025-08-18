{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "import"],
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier"
  ],
  "env": {
    "es2021": true,
    "node": true
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  "ignorePatterns": ["dist/", "node_modules/"]
}
