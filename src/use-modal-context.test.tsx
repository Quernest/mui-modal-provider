import { useContext } from 'react';
import useModalContext from './use-modal-context';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useModalContext', () => {
  it('throws an error when not used within ModalProvider', () => {
    (useContext as jest.Mock).mockReturnValue(undefined);
    expect(() => useModalContext()).toThrow(
      'useModalContext must be used within a ModalProvider'
    );
  });

  it('returns the context when used within ModalProvider', () => {
    const mockContextValue = { someValue: 'mockValue' };
    (useContext as jest.Mock).mockReturnValue(mockContextValue);
    expect(useModalContext()).toBe(mockContextValue);
  });
});
