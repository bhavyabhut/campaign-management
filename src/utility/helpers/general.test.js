import { timeDifference } from './general';

it('Testing TimeDifference first', () => {
  expect(timeDifference('Mon, 12 Jul 2021 07:13:34 GMT')).toBe('8 hours ago');
});

it('Testing TimeDifference first', () => {
  expect(timeDifference(new Date())).toBe('a few seconds ago');
});
