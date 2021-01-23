import React from 'react';

import withAuth from '../components/hoc/withAuth'

const Faq = () => {
  return (
    <div>
      Faq beeps
    </div>
  );
};

export default withAuth(Faq);