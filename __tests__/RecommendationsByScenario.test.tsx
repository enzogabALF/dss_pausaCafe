import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecommendationsByScenario from '../app/components/alerts/RecommendationsByScenario';

describe('RecommendationsByScenario Component', () => {
  it('should render the three scenarios (Favorable, Normal, Desfavorable)', () => {
    render(<RecommendationsByScenario />);
    
    expect(screen.getByText('Favorable')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('Desfavorable')).toBeInTheDocument();
  });

  it('should render at least three recommendations per scenario', () => {
    render(<RecommendationsByScenario />);
    
    // There are 9 checkmarks overall if each has 3.
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBeGreaterThanOrEqual(9);
    
    // Test a specific recommendation presence
    expect(screen.getByText('Expandir horarios de atención en peak hours')).toBeInTheDocument();
    expect(screen.getByText('Monitorear márgenes semanalmente')).toBeInTheDocument();
    expect(screen.getByText('Ajustar precios de manera estratégica')).toBeInTheDocument();
  });
});
