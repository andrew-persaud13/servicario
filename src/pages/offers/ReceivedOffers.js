import React from 'react';
import { connect } from 'react-redux';
import withAuth from 'components/hoc/withAuth';
import ServiceItem from 'components/service/ServiceItem';

import { fetchReceivedOffers, changeOfferStatus } from 'actions';
import offers from 'reducers/offers';

class ReceivedOffers extends React.Component {
  componentDidMount() {
    const { auth } = this.props;
    this.props.fetchReceivedOffers(auth.user.uid);
  }

  handleChangeOfferStatus = (offerId, status) => {
    this.props.changeOfferStatus(offerId, status);
  };

  statusClass = status => {
    if (status === 'pending') return 'is-warning';
    if (status === 'accepted') return 'is-success';
    if (status === 'declined') return 'is-danger';
  };
  render() {
    const { receivedOffers } = this.props;
    return (
      <div className='container'>
        <div className='content-wrapper'>
          <h1 className='title'>Received Offers</h1>
          <div className='columns'>
            {receivedOffers.map(o => (
              <div className='column is-one-third' key={o.id}>
                <ServiceItem
                  noButton
                  className='offer-card'
                  service={o.service}
                >
                  <div
                    className={` ${this.statusClass(o.status)} tag is-large`}
                  >
                    {o.status}
                  </div>
                  <hr />
                  <div className='service-offer'>
                    <div>
                      <span className='label'>From User:</span>{' '}
                      {o.fromUser.fullName}
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
                  {o.status === 'pending' && (
                    <div>
                      <hr />
                      <button
                        onClick={() =>
                          this.handleChangeOfferStatus(o.id, 'accepted')
                        }
                        className='button is-success s-m-r'
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          this.handleChangeOfferStatus(o.id, 'declined')
                        }
                        className='button is-danger'
                      >
                        Decline
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

const mapStateToProps = ({ offers: { received } }) => ({
  receivedOffers: received,
});

const mapDispatchToProps = () => ({
  fetchReceivedOffers,
  changeOfferStatus,
});

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps())(ReceivedOffers)
);
