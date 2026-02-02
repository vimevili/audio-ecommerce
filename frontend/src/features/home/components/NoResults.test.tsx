import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NoResults from './NoResults';

describe('NoResults', () => {
  it('should render search message when isSearching is true', () => {
    render(<NoResults isSearching={true} searchTerm="wireless" />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(
      screen.getByText('We couldn\'t find any products matching "wireless"'),
    ).toBeInTheDocument();
  });

  it('should render no products message when isSearching is false', () => {
    render(<NoResults isSearching={false} />);

    expect(screen.getByText('No products available')).toBeInTheDocument();
    expect(
      screen.getByText('There are no products in this category yet'),
    ).toBeInTheDocument();
  });

  it('should display search icon emoji', () => {
    render(<NoResults isSearching={true} searchTerm="test" />);

    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('should handle empty search term', () => {
    render(<NoResults isSearching={true} searchTerm="" />);

    expect(
      screen.getByText('We couldn\'t find any products matching ""'),
    ).toBeInTheDocument();
  });

  it('should handle undefined search term when searching', () => {
    render(<NoResults isSearching={true} />);

    expect(
      screen.getByText('We couldn\'t find any products matching "undefined"'),
    ).toBeInTheDocument();
  });
});
