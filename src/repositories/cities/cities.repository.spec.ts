import { CitiesRepository } from './cities.repository';

describe('CitiesRepository', () => {
  it('should be defined', () => {
    expect(new CitiesRepository()).toBeDefined();
  });
});
