import { renderHook } from '@testing-library/react-hooks';

import { ModalProviderWrapper as wrapper } from './test-utils';
import useModal from './useModal';

describe('useModal', () => {
  test('should render hook (without options)', () => {
    renderHook(() => useModal(), { wrapper });
  });

  test('should render hook (with "disableAutoDestroy: true" option)', () => {
    renderHook(() => useModal({ disableAutoDestroy: true }), { wrapper });
  });
});
