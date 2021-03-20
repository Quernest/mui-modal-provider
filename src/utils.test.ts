import { uid } from './utils';

describe('utils', () => {
  describe('uid', () => {
    test('uid should create id with correct length', () => {
      const id = uid(5);
      expect(id).toHaveLength(5);
    });

    test('uid should create id with correct length (without argument)', () => {
      const id = uid();
      expect(id).toHaveLength(8);
    });
  });
});
