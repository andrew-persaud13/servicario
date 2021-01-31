import React from 'react';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';

import withAuth from 'components/hoc/withAuth';
import ServiceItem from 'components/service/ServiceItem';
import { fetchSentOffers, collaborate } from 'actions';
import { newCollaboration, newMessage } from 'helpers/offers';

class SentOffers extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    this.props.fetchSentOffers(auth.user.uid);
  }

  createCollaboration = offer => {
    const {
      auth: { user },
      collaborate,
      toastManager,
    } = this.props;
    const collaboration = newCollaboration({ offer, fromUser: user });
    const message = newMessage({ offer, fromUser: user });

    collaborate({ collaboration, message }).then(_ => {
      toastManager.add('Collaboration created!', {
        appearance: 'success',
        autoDismiss: true,
      });
    });
  };

  render() {
    const { sentOffers = [] } = this.props;
    return (
      <div className='container'>
        <div className='content-wrapper'>
          <h1 className='title'>Sent Offers</h1>
          <div className='columns'>
            {sentOffers.map(o => (
              <div className='column is-one-third' key={o.id}>
                <ServiceItem
                  noButton
                  className='offer-card'
                  service={o.service}
                >
                  <div className='tag is-large'>{o.status}</div>
                  <hr />
                  <div className='service-offer'>
                    <div>
                      <span className='label'>To User:</span>{' '}
                      {o.toUser.fullName}
                    </div>
                    <div>
                      <span className='label'>Note:</span> {o.note}
                    </div>
                    <div>
                      <span className='label'>Price:</span> ${o.price}
                    </div>
                    <div>
                      <span className='label'>Time:</span> {o.time} hours
                    </div>
                  </div>
                  {o.status === 'accepted' && !o.collaborationCreated && (
                    <div>
                      <hr />
                      <button
                        onClick={() => this.createCollaboration(o)}
                        className='button is-success'
                      >
                        Collaborate
                      </button>
                    </div>
                  )}
                </ServiceItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ offers: { sent }, auth }) => ({
  sentOffers: sent,
  auth,
});

const mapDispatchToProps = () => ({
  fetchSentOffers,
  collaborate,
});

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps())(withToastManager(SentOffers))
);
