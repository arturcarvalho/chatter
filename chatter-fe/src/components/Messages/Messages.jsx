import React, { Component, Fragment } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import Message from "../Message/Message";
import styles from "./Messages.module.scss";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = React.createRef();
  }

  componentDidMount() {
    this.scrollMessagesToBottom();
  }

  /**
   * Scroll the messages to the bottom.
   */
  scrollMessagesToBottom = () => {
    const node = this.messagesRef.current;
    node.scrollIntoView(false);
    node.scrollTop = node.scrollHeight;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollMessagesToBottom();
    }
  }

  render() {
    const {
      messages,
      userName,
      timeFormat,
      message,
      handleChange,
      handleCtrlEnter,
      handleSubmit
    } = this.props;

    const messageLines = messages.map((msg, idx) => {
      const chatBubbleArgs = {
        myName: userName,
        isNotification: msg.isNotification,
        name: msg.name,
        message: msg.message,
        timestamp: msg.timestamp,
        timeFormat
      };

      return <ChatBubble key={idx} {...chatBubbleArgs} />;
    });

    return (
      <Fragment>
        <div className={styles.wrapper}>
          <div className={styles.messages} ref={this.messagesRef}>
            {messageLines}
          </div>
        </div>

        <Message
          {...{
            message,
            handleChange,
            handleCtrlEnter,
            handleSubmit
          }}
        />
      </Fragment>
    );
  }
}

export default Messages;
