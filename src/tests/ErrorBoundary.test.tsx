import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

test('ErrorBoundary component renders error message when error occurs', async () => {
  const CustomComponent = () => {
    throw new Error('Test error occurred');
  };

  render(<ErrorBoundary><CustomComponent /></ErrorBoundary>);

  await screen.findByText("Test error occurred");
});
