import { render, screen } from '@testing-library/react';
import { expect, it } from '@jest/globals';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders', () => {
    render(<HomePage />);

    const title = screen.getByTestId('page-title');

    expect(title.textContent).toBe('home');
  });
});
