import { SalesmenRepository } from './salesmen.repository';

describe('SalesmenRepository', () => {
  it('should be defined', () => {
    expect(new SalesmenRepository()).toBeDefined();
  });
});
