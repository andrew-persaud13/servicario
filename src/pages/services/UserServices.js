import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import withAuth from 'components/hoc/withAuth';

import { fetchUserServices } from '../../actions';
import ServiceItem from 'components/service/ServiceItem';

const UserServices = ({ auth }) => {
  const dispatch = useDispatch();
  const { services } = auth.user;

  useEffect(() => {
    dispatch(fetchUserServices(auth.user.uid));
  }, [dispatch, auth.user.uid]);

  return (
    <div className='container'>
      <div className='content-wrapper'>
        <h1 className='title'>Your Services</h1>
        <div className='columns is-multiline'>
          {services &&
            services.map(s => <ServiceItem key={s.id} service={s} />)}
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserServices);
