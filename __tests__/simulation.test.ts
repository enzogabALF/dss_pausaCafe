import { describe, it, expect } from 'vitest';
import { runSimulation, SimulationInput } from '../lib/simulation';

describe('Simulation Engine', () => {
  const mockInput: SimulationInput = {
    initialInvestment: 800000,
    costPerOrder: 20,
    dailyOrders: 50,
    averageTicket: 10000,
  };

  it('should calculate Favorable scenario exactly (+38%)', () => {
    const result = runSimulation(mockInput);
    
    // Base monthly flow: (50 * 30 * 10000) - (50 * 30 * 2000) = 15M - 3M = 12,000,000
    // Favorable: 12,000,000 * 1.38 = 16,560,000
    // 24 months income = 16,560,000 * 24 = 397,440,000
    expect(result.favorable.income).toBeCloseTo(397440000);
    
    // VAN calculation test (rough estimation since exact discount rate logic applies)
    expect(result.favorable.van).toBeGreaterThan(0);
    
    // Payback should be quick (less than 1 month) since flow >> investment
    expect(result.favorable.payback).toBeLessThan(1);
    expect(result.favorable.tir).toBeGreaterThan(0);
  });

  it('should calculate Normal scenario exactly (+13.5%)', () => {
    const result = runSimulation(mockInput);
    
    // Normal: 12,000,000 * 1.135 = 13,620,000
    // 24 months income = 13,620,000 * 24 = 326,880,000
    expect(result.normal.income).toBeCloseTo(326880000);
    expect(result.normal.van).toBeGreaterThan(0);
    expect(result.normal.payback).toBeLessThan(1);
  });

  it('should calculate Unfavorable scenario exactly (-28%)', () => {
    const result = runSimulation(mockInput);
    
    // Unfavorable: 12,000,000 * 0.72 = 8,640,000
    // 24 months income = 8,640,000 * 24 = 207,360,000
    expect(result.unfavorable.income).toBeCloseTo(207360000);
    expect(result.unfavorable.van).toBeGreaterThan(0);
    expect(result.unfavorable.payback).toBeLessThan(1);
  });

  it('should include correct risk analysis', () => {
    const result = runSimulation(mockInput);
    expect(result.risks).toEqual({
      dolarVariation: 2,
      demandVariation: 4.5,
      competitionVariation: 2.5,
      energyCostVariation: 3.5,
      totalImpact: 1.3,
    });
  });
});
