import * as React from "react";
import {
  Glyphicon
} from "react-bootstrap";
import classSet from "react-classset";

export interface IProps {
  // String to be used as a class prefix for the approriate glyphicon library.
  library?: "glyphicon" | "fa",
  glyph: string,
  fixedWidth?: boolean
}

export default class Icon extends React.Component<IProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> {
  // Font Awesome glyphicons.
  // See: https://fortawesome.github.io/Font-Awesome/icons/
  public static defaultProps = {
    fixedWidth: false,
    library: "fa",
  }

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      glyph,
      fixedWidth,
      library,
      ...otherProps
    } = this.props;

    if (library === "glyphicon") {
      return (
        <Glyphicon glyph={this.props.glyph} />
      );
    }

    // currently only support font library
    const fontLibrary = "fa";
    const classes = {
      [fontLibrary]: true,
      [fontLibrary + "-" + this.props.glyph]: true,
      [fontLibrary + "-fw"]: this.props.fixedWidth,
    };

    return (
      <i {...otherProps} className={classSet(classes)} />
    );
  }
}
