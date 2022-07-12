"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stupendous ${chalk.red(
          "generator-aws-lambda-ts"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "lambdaName",
        message: "What is the name of the lambda function?",
      },
      {
        type: "input",
        name: "description",
        message: "Describe the lambda function?",
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(this.props.lambdaName);
    this.fs.extendJSON(this.destinationPath("package.json"), {
      ...require("./templates/package.json"),
      name: this.props.lambdaName,
    });

    const self = this;
    [
      ".eslintrc.yml",
      ".gitignore",
      ".lintstagedrc.yaml",
      ".prettierignore",
      ".prettierrc.yaml",
      "esbuild.js",
      "jest.config.ts",
      "tsconfig.json",
    ].forEach((filename) => {
      self.fs.copy(self.templatePath(filename), self.destinationPath(filename));
    });

    this.fs.copy(
      this.templatePath("src/index.ts"),
      this.destinationPath("src/index.ts")
    );
    this.fs.copy(
      this.templatePath("__test__/index.test.ts"),
      this.destinationPath("__test__/index.test.ts")
    );
  }

  install() {
    this.yarnInstall(
      [
        "@types/aws-lambda",
        "@types/jest",
        "@types/node",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "cz-conventional-changelog",
        "esbuild",
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-jest",
        "eslint-plugin-prettier",
        "husky",
        "jest",
        "lint-staged",
        "prettier",
        "typescript",
      ],
      { dev: true }
    );
  }
};
