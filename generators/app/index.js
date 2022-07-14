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
      const firstWord = props.lambdaName.split("-").shift();
      const lower = firstWord.toLowerCase();

      props.lower = lower;
      props.templateName = firstWord.charAt(0).toUpperCase() + lower.slice(1);
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
      "buildspec.yml",
      "jest.config.ts",
      "rollup.config.js",
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
    this.fs.copyTpl(
      this.templatePath("template.yaml"),
      this.destinationPath("template.yaml"),
      {
        lambdaName: this.props.lambdaName,
        templateName: this.props.templateName,
        lower: this.props.lower,
      }
    );
  }

  install() {
    this.yarnInstall(
      [
        "@rollup/plugin-commonjs",
        "@rollup/plugin-json",
        "@rollup/plugin-node-resolve",
        "@rollup/plugin-typescript",
        "@types/aws-lambda",
        "@types/jest",
        "@types/node",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "cz-conventional-changelog",
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-jest",
        "eslint-plugin-prettier",
        "husky",
        "jest",
        "lint-staged",
        "prettier",
        "rollup",
        "rollup-plugin-terser",
        "rollup-plugin-zip",
        "typescript",
      ],
      { dev: true }
    );
  }
};
