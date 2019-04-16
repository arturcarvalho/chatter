import React, { Component } from "react";
import styles from "./Warning.module.scss";

interface Props {
  message: string
}

class Warning extends Component<Props> {

  render() {

    return <div className={styles.warning}>{this.props.message}</div>;
  }
}
export default Warning;
