import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages } from 'reducers';
import { markMessageAsRead } from 'actions';

const ReceivedMessages = ({ messages }) => {
  const history = useHistory();
  const renderMessages = () => {
    if (!messages.length)
      return <div className='navbar-item'>No new Messages</div>;

    const goToCollaboration = message => {
      markMessageAsRead(message);
      history.push(message.cta);
    };

    return messages
      .filter(message => !message.isRead)
      .map(message => (
        <div key={message.id}>
          <div className='from-user'>
            <span>From: </span>
            {message.fromUser.name}
          </div>
          <hr />
          <div className='navbar-item navbar-item-message'>
            <div>{message.text}</div>
            <div onClick={() => goToCollaboration(message)}>
              <div className='button is-success'>Join</div>
            </div>
            <button
              onClick={() => markMessageAsRead(message)}
              className='button is-warning'
            >
              Later
            </button>
          </div>
        </div>
      ));
  };
  return renderMessages();
};

const mapStatetoProps = state => ({
  messages: getMessages(state),
});

export default connect(mapStatetoProps)(ReceivedMessages);
