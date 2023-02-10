import { render, screen, cleanup } from '@testing-library/react';
import App from '../components/App';

test('Should render app component', () => {
  render(<App/>)
  const appElement = screen.getByTestId('testComponent')
  expect(appElement).toBeInTheDocument();
  expect(appElement).toHaveTextContent('test');
})
