import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import withAuth from 'components/hoc/withAuth';
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
} from 'actions';
import JoinedUser from 'components/collaboration/JoinedUser';

class Collaboration extends React.Component {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { subToCollaboration, user } = this.props;
    joinCollaboration(id, user.uid);
    this.unsubFromCollaboration = subToCollaboration(id, ({ joinedPeople }) => {
      this.watchJoinedPeopleChanges(joinedPeople.map(jp => jp.uid));
    });
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    const { user } = this.props;
    leaveCollaboration(id, user.uid);
    this.unsubFromCollaboration && this.unsubFromCollaboration();
    this.unsubPeopleWatchers();
  }

  renderJoinedPeople = joinedPeople => {
    if (joinedPeople.length) {
      return joinedPeople.map((person, idx) => <JoinedUser person={person} />);
    }

    return null;
  };

  watchJoinedPeopleChanges = ids =>
    ids.forEach(id => {
      const { subToProfile } = this.props;
      this.peopleWatchers = {};
      this.peopleWatchers[id] = subToProfile(id);
    });

  unsubPeopleWatchers = () => {
    if (this.peopleWatchers) {
      Object.keys(this.peopleWatchers).forEach(id => this.peopleWatchers[id]());
    }
  };

  onSendMessage = msgValue => {
    if (!msgValue.trim()) return;
    const timestamp = moment().valueOf().toString();

    const {
      auth: { user },
      collaboration,
    } = this.props;

    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName,
      },
      timestamp: parseInt(timestamp, 10),
      content: msgValue.trim(),
    };

    this.setState({ inputValue: '' });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') this.onSendMessage(this.state.inputValue);
  };

  render() {
    const { collaboration, joinedPeople } = this.props;
    const { inputValue } = this.state;
    return (
      <div className='content-wrapper'>
        <div className='root'>
          <h1 className='title'> {collaboration.title}</h1>
          <div className='body'>
            <div className='viewListUser'>
              {this.renderJoinedPeople(joinedPeople)}
            </div>

            <div className='viewBoard'>
              <div className='viewChatBoard'>
                <div className='headerChatBoard'>
                  <img
                    className='viewAvatarItem'
                    src='https://i.imgur.com/cVDadwb.png'
                    alt='icon avatar'
                  />
                  <span class='textHeaderChatBoard'>Filip Jerga</span>
                </div>
                <div className='viewListContentChat'>
                  <div class='viewWrapItemLeft'>
                    <div class='viewWrapItemLeft3'>
                      <img
                        src='https://i.imgur.com/cVDadwb.png'
                        alt='avatar'
                        class='peerAvatarLeft'
                      />
                      <div class='viewItemLeft'>
                        <span class='textContentItem'>hey</span>
                      </div>
                    </div>
                    <span class='textTimeLeft'>Oct 31, 2019</span>
                  </div>
                  <div class='viewItemRight'>
                    <span class='textContentItem'>hey</span>
                  </div>
                  <div style={{ float: 'left', clear: 'both' }}></div>
                </div>
                <div className='viewBottom'>
                  <input
                    className='viewInput'
                    onKeyPress={this.onKeyPress}
                    placeholder='Type your message...'
                    value={inputValue}
                    onChange={e =>
                      this.setState({ inputValue: e.target.value })
                    }
                  />
                  <button
                    onClick={() => this.onSendMessage(inputValue)}
                    className='button is-primary is-medium'
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ collaboration, auth }) => ({
  collaboration: collaboration.joined,
  joinedPeople: collaboration.joinedPeople,
  user: auth.user,
});
const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
});

const CollaborationWithRouter = withRouter(Collaboration);

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps())(CollaborationWithRouter)
);
