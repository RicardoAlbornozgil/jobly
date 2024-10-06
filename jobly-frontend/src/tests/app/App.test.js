import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/app/App';

test('renders Jobly homepage', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/Jobly/i); // Look for multiple "Jobly" instances
  expect(headerElements.length).toBeGreaterThan(0); // Ensure there's at least one match
});
