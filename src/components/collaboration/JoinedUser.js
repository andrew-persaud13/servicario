import React from 'react';

const JoinedUser = ({ person }) => {
  const stateColor = state => (state === 'online' ? 'is-success' : '');
  return (
    <div key={person.uid} className='viewWrapItem'>
      <img className='viewAvatarItem' src={person.avatar} alt='icon avatar' />
      <div className='viewWrapContentItem'>
        <span className='textItem'>Nickname: {person.fullName}</span>
        <span className={`tag ${stateColor(person.state)}  textItem`}>
          {person.state}
        </span>
      </div>
    </div>
  );
};

export default JoinedUser;
