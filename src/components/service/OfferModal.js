import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Modal from '../Modal';
import { createOffer } from 'api';
import { createRef } from 'actions';

const OfferModal = ({ service, auth }) => {
  const { addToast } = useToasts();
  const [offer, setOffer] = useState({
    fromUser: '',
    toUser: '',
    service: '',
    status: 'pending',
    price: 0,
    time: 0,
    note: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    let price;
    if (name === 'time') {
      price = Math.round(value * service.price * 100) / 100;
      return setOffer({ ...offer, [name]: value, price });
    }
    setOffer({ ...offer, [name]: value });
  };

  const handleSubmit = async done => {
    const offerCopy = { ...offer };
    offerCopy.fromUser = createRef('profiles', auth.user.uid);
    offerCopy.toUser = createRef('profiles', service.user.uid);
    offerCopy.service = createRef('services', service.id);
    offerCopy.time = +offer.time;

    await createOffer(offerCopy)
      .then(_ => {
        addToast('Offer successfully submitted!', {
          appearance: 'success',
          autoDismiss: 3000,
        });
      })
      .catch(err => addToast(err, { appearance: 'error', autoDismiss: 3000 }));

    done();
  };
  return (
    <Modal onModalSubmit={handleSubmit} openButtonText='Make an offer'>
      <div className='field'>
        <input
          className='input is-large'
          type='text'
          placeholder='Write some catchy note'
          autofocus=''
          name='note'
          value={offer.note}
          onChange={handleChange}
        />
        <p className='help'>Note can increase chance of getting the service </p>
      </div>
      <div className='field'>
        <input
          className='input is-large'
          type='number'
          placeholder='How long you need service for ?'
          min='1'
          autoFocus=''
          name='time'
          value={offer.time}
          onChange={handleChange}
        />
        <p className='help'>Enter time in hours</p>
      </div>
      <div className='service-price has-text-centered'>
        <div className='service-price-title'>
          Upon acceptance {service.user.fullName} will charge you:
        </div>
        <div className='service-price-value'>
          <h1 className='title'>{offer.price}$</h1>
        </div>
      </div>
    </Modal>
  );
};

export default OfferModal;
