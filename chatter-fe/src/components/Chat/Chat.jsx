import React, { Component } from "react";
import { connect } from "react-redux";
import * as settingsActions from "../../store/settingsActions";
import * as messagesActions from "../../store/messagesActions";
import Menu from "../Menu/Menu";
import Settings from "../Settings/Settings";
import Messages from "../Messages/Messages";
import Warning from "../Warning/Warning.tsx";
import styles from "./Chat.module.scss";
import sockets from "../../utils/socketAPI";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisconnected: true,
      message: "",
      pageSelected: "chat",
      lastSeenCount: Infinity // count of messages seen for the last time
    };
  }

  componentDidMount() {
    const { userName, theme, setTheme, setMessages } = this.props;

    setTheme(theme);
    sockets.onConnect(userName, this.serverSync, this.setDisconnectedState);
    sockets.onNewMessages(setMessages);
  }

  componentDidUpdate(prevProps) {
    const { theme, setTheme } = this.props;
    if (prevProps.theme !== this.props.theme) {
      setTheme(theme);
    }
  }

  /**
   * Sync state with username and messages from the server.
   *
   * @param {Array} - Array with messages from the server
   * @param {string} - username from the server
   */
  serverSync = (messages, serverName) => {
    this.props.setUserName(serverName);
    this.props.setMessages(messages);
  };

  setDisconnectedState = val => {
    this.setState({ isDisconnected: val });
  };

  sendMessage = () => {
    const { message } = this.state;
    if (message.trim() === "") return;

    sockets.sendMessage(message);
    this.setState({ message: "" });
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
    event.preventDefault();
  };

  handleCtrlEnter = event => {
    const { isCtrlEnterEnabled } = this.props;
    if (isCtrlEnterEnabled && event.key === "Enter" && event.ctrlKey) {
      this.sendMessage();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.sendMessage();
  };

  saveName = newName => {
    const oldName = this.props.userName;
    sockets.renameUser(oldName, newName, this.serverSync);
  };

  resetToDefaults = () => {
    // the sockets should be on the action creator...
    sockets.reset(this.props.userName, this.serverSync);
    this.props.resetToDefaults();
  };

  changePage = page => {
    let lastSeenCount = Infinity;
    // save count of messages last seen
    if (page !== "chat") {
      lastSeenCount = this.props.messages.length;
    }
    this.setState({ lastSeenCount, pageSelected: page });
  };

  render() {
    const { isDisconnected, message, pageSelected, lastSeenCount } = this.state;
    const {
      messages,
      userName,
      timeFormat,
      theme,
      isCtrlEnterEnabled,
      setTheme,
      setTimeFormat,
      toggleCtrlEnter
    } = this.props;

    return (
      <div className={styles.wrapper}>
        {isDisconnected && (
          <Warning message={"Trying to connect to server..."} />
        )}
        <div className={styles.chat}>
          <Menu
            {...{
              lastSeenCount,
              messagesCount: messages.length,
              pageSelected: pageSelected,
              changePage: this.changePage
            }}
          />

          {pageSelected === "settings" && (
            <Settings
              {...{
                userName,
                timeFormat,
                theme,
                isCtrlEnterEnabled,
                saveName: this.saveName,
                resetToDefaults: this.resetToDefaults,
                toggleCtrlEnter,
                setTheme,
                setTimeFormat
              }}
            />
          )}

          {pageSelected === "chat" && (
            <Messages
              {...{
                messages,
                userName,
                timeFormat,
                message,
                handleChange: this.handleChange,
                handleCtrlEnter: this.handleCtrlEnter,
                handleSubmit: this.handleSubmit
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.settings.userName,
    timeFormat: state.settings.timeFormat,
    theme: state.settings.theme,
    isCtrlEnterEnabled: state.settings.isCtrlEnterEnabled,
    messages: state.messages.messages
  };
};

export default connect(
  mapStateToProps,
  { ...settingsActions, ...messagesActions }
)(Chat);
