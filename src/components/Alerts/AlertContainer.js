import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertContainer = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert className="mt-3" color="success" isOpen={visible} toggle={onDismiss}>
      Sound warning! Dive in and start listening by clicking on the boxes below.
    </Alert>
  );
}

export default AlertContainer;
