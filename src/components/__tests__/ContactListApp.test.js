import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactListApp from '../ContactListApp';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Create a new QueryClient for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Wrapper component with QueryClientProvider
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('ContactListApp', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('renders loading state initially', () => {
    render(<ContactListApp />, { wrapper });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders contacts after loading', async () => {
    const mockContacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockContacts });

    render(<ContactListApp />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('can add a new contact', async () => {
    const newContact = { id: 3, name: 'New User', email: 'new@example.com' };
    axios.post.mockResolvedValueOnce({ data: newContact });

    render(<ContactListApp />, { wrapper });

    // Fill out the form
    fireEvent.change(screen.getByPlaceholder('Name'), {
      target: { value: newContact.name },
    });
    fireEvent.change(screen.getByPlaceholder('Email'), {
      target: { value: newContact.email },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Contact'));

    // Wait for the new contact to appear
    await waitFor(() => {
      expect(screen.getByText(newContact.name)).toBeInTheDocument();
    });
  });

  test('can search contacts', async () => {
    const mockContacts = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockContacts });

    render(<ContactListApp />, { wrapper });

    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Search for 'Jane'
    fireEvent.change(screen.getByPlaceholder('Search contacts...'), {
      target: { value: 'Jane' },
    });

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('shows error message when API fails', async () => {
    const errorMessage = 'Failed to fetch contacts';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<ContactListApp />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
