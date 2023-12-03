import { setModalConfig } from './modal-config';
import { useContext } from 'react';
import useModalContext from './use-modal-context';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useModalContext', () => {
  it('throws an error when not used within ModalProvider', () => {
    (useContext as jest.Mock).mockReturnValue(undefined);
    setModalConfig({ enforceProvider: true });
    expect(() => useModalContext()).toThrow(
      'useModalContext must be used within a ModalProvider'
    );
    setModalConfig({ enforceProvider: false });
  });

  it('returns the context when used within ModalProvider', () => {
    const mockContextValue = { someValue: 'mockValue' };
    (useContext as jest.Mock).mockReturnValue(mockContextValue);
    expect(useModalContext()).toBe(mockContextValue);
  });
});
