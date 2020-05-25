"use strict";
const Generator = require("yeoman-generator");
// Const chalk = require("chalk");
// const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("componentName", { type: String, required: false });
    this.option("mdx");
  }

  Prompting() {
    if (!this.options.componentName) {
      const prompts = [
        {
          type: "input",
          name: "componentName",
          required: true,
          message: "Would you like to name the component(eg. Hero)"
        },
        {
          type: "confirm",
          name: "mdx",
          default: false,
          message: "Would you like to use MDX for the storybook story?"
        }
      ];

      return this.prompt(prompts).then(props => {
        this.props = props;
      });
    }
  }

  writing() {
    const { componentName, mdx } = this.options.componentName
      ? this.options
      : this.props;

    const componentPath = `app/javascript/components/${componentName}`;

    this.fs.copyTpl(
      this.templatePath("component.tsx"),
      this.destinationPath(`${componentPath}/${componentName}.tsx`),
      { componentName }
    );
    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath(`${componentPath}/index.ts`),
      { componentName }
    );

    if (mdx) {
      this.fs.copyTpl(
        this.templatePath("stories.mdx"),
        this.destinationPath(`${componentPath}/${componentName}.stories.mdx`),
        {
          componentName
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath("stories.tsx"),
        this.destinationPath(`${componentPath}/${componentName}.stories.tsx`),
        {
          componentName
        }
      );
    }
  }
};
