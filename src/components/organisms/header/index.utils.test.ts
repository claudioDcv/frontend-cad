import { describe, test, expect } from 'vitest';
import { matchRoute } from './index.utils';

describe('matchRoute', () => {
  const routes = {
    '/home': '/home',
    '/users/:id': 'UserComponent',
  };

  test('should match exact route and return match', () => {
    const result = matchRoute('/home', routes);
    expect(result).toEqual({ match: '/home', params: {} });
  });

  test('should match dynamic route and return params', () => {
    const result = matchRoute('/users/42', routes);
    expect(result).toEqual({ match: 'UserComponent', params: { id: '42' } });
  });

  test('should return null if no route matches', () => {
    const result = matchRoute('/not-found', routes);
    expect(result).toBeNull();
  });

  test('should normalize empty path in matchRoute', () => {
    const routes = { '/': 'HomeComponent' };
    expect(matchRoute('', routes)).toEqual({
      match: 'HomeComponent',
      params: {},
    });
  });
});
