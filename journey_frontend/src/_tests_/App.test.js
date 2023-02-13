import { render, screen, cleanup } from '@testing-library/react';
import App from '../components/App';

test('App contents should render', () => {
  render(<App/>)
  const appElement = screen.getByTestId('main-content')
  expect(appElement).toBeInTheDocument();
})

