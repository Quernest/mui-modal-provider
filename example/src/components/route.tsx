import * as React from 'react';
import { Button } from '@mui/material';
import { useModal } from '../../../src';
import { SimpleDialog } from './dialogs';
import { useEffect, useState } from 'react';

function RouteContent() {
  const { showModal } = useModal();

  return (
    <Button
      variant="contained"
      onClick={() => showModal(SimpleDialog)}
      color="primary"
    >
      Hurry, click me
    </Button>
  );
}

export default function Route() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(false), 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return isVisible ? <RouteContent /> : undefined;
}
