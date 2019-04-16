import React, { Component } from "react";
import styles from "./ChatBubble.module.scss";
import formatTime from "../../utils/formatTime";

class ChatBubble extends Component {
  render() {
    const {
      name,
      message,
      timestamp,
      myName,
      timeFormat,
      isNotification
    } = this.props;

    const dateStr = formatTime(timeFormat, timestamp);
    const isMyMessage = name === myName;

    if (isNotification) {
      return (
        <div className={styles.bubbleMiddle}>
          {message} - {dateStr}
        </div>
      );
    }

    if (isMyMessage) {
      return (
        <div className={styles.bubbleRight}>
          <div className={styles.info}>{dateStr}</div>
          <div className={styles.messageRight}>{message}</div>
        </div>
      );
    }

    return (
      <div className={styles.bubbleLeft}>
        <div className={styles.info}>
          {name} <i>{dateStr}</i>
        </div>
        <div className={styles.messageLeft}>{message}</div>
      </div>
    );
  }
}

export default ChatBubble;
