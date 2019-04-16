import React, { Component } from "react";
import styles from "./Settings.module.scss";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.userName });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userName !== this.props.userName) {
      this.setState({ name: this.props.userName });
    }
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  saveName = event => {
    event.preventDefault();
    this.props.saveName(this.state.name);
  };

  onFormatChange = event => {
    this.props.setTimeFormat(event.target.value);
  };

  onThemeChange = event => {
    this.props.setTheme(event.target.value);
  };

  render() {
    const { name } = this.state;
    const {
      userName,
      timeFormat,
      theme,
      isCtrlEnterEnabled,
      toggleCtrlEnter
    } = this.props;

    // the name on the settings is different from the name on the server
    const canSaveName = name !== userName;
    return (
      <div className={styles.settings}>
      <div className={styles.nameLabel}>User name</div>
        <form className={styles.name} onSubmit={this.saveName}>
          <input
            type="text"
            value={this.state.name || ""}
            onChange={this.handleNameChange}
          />
          <input
            type="submit"
            value="Save"
            disabled={canSaveName ? "" : "disabled"}
          />
        </form>

        <fieldset className={styles.theme}>
          <legend>Interface color</legend>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              onChange={this.onThemeChange}
              checked={theme === "light"}
            />{" "}
            Light
          </label>

          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              onChange={this.onThemeChange}
              checked={theme === "dark"}
            />{" "}
            Dark
          </label>
        </fieldset>

        <fieldset className={styles.timeFormat}>
          <legend>Clock display</legend>
          <label>
            <input
              type="radio"
              name="time-format"
              value="12h"
              onChange={this.onFormatChange}
              checked={timeFormat === "12h"}
            />
            12 Hours
          </label>
          <label>
            <input
              type="radio"
              name="time-format"
              value="24h"
              onChange={this.onFormatChange}
              checked={timeFormat === "24h"}
            />
            24 hours
          </label>
        </fieldset>

        <fieldset className={styles.ctrlEnter}>
          <legend>Shortcuts</legend>
          <label>
            <input
              className={styles.ctrlEnter}
              type="checkbox"
              name="ctrl-enter"
              onChange={toggleCtrlEnter}
              checked={isCtrlEnterEnabled}
            />
            Send message on Ctrl + Enter
          </label>
        </fieldset>

        <section className={styles.reset}>
          <button onClick={this.props.resetToDefaults}>
            Reset to defaults
          </button>
        </section>
      </div>
    );
  }
}

export default Settings;
