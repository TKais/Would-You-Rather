import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App';

describe('App', () => {
  it('renders App component', () => {
    render(<App/>);
    screen.getByText('Sign In').toBeInTheDocument();
  });
})
