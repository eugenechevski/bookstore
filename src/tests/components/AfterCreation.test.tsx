import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AfterCreation from 'components/forms/AfterCreation';

describe('AfterCreation component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AfterCreation></AfterCreation>
      </MemoryRouter>
    );
  });

  it("displays a message after an account has been created", () => {
    expect(screen.getByText(/The account has been created./i)).toBeInTheDocument();
  });

    
});