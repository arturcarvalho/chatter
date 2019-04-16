import React, { Component } from "react";
import styles from "./Menu.module.scss";

class Menu extends Component {
  goChat = event => {
    event.preventDefault();
    this.props.changePage("chat");
  };

  goSettings = event => {
    event.preventDefault();
    this.props.changePage("settings");
  };

  render() {
    const { pageSelected, lastSeenCount, messagesCount } = this.props;

    let showUnreadBadge = false,
      newMessagesCount = 0;
    if (messagesCount > lastSeenCount) {
      showUnreadBadge = true;
      newMessagesCount = messagesCount - lastSeenCount;
    }

    return (
      <div className={styles.menu}>
        <button
          className={styles.button}
          disabled={pageSelected === "chat"}
          onClick={this.goChat}
        >
          {showUnreadBadge && (
            <div className={styles.unreadMessages}>
              <span className={styles.count}>{newMessagesCount}</span>
            </div>
          )}
          Chat
        </button>
        <button
          className={styles.button}
          disabled={pageSelected === "settings"}
          onClick={this.goSettings}
        >
          Settings
        </button>
      </div>
    );
  }
}
export default Menu;
