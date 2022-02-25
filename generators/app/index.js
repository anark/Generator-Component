"use strict";
const Generator = require("yeoman-generator");
// Const chalk = require("chalk");
// const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("component", { type: String, required: false });
    this.option("mdx");
  }

  Prompting() {
    if (!this.options.component) {
      const prompts = [
        {
          type: "input",
          name: "component",
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
    const { component, mdx } = this.options.component
      ? this.options
      : this.props;

    const componentPath = `app/javascript/components/${component}`;
    const componentName = component.split("/").pop();

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
          componentName,
          componentPath: component
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath("stories.tsx"),
        this.destinationPath(`${componentPath}/${componentName}.stories.tsx`),
        {
          componentName,
          componentPath: component
        }
      );
    }
  }
};
