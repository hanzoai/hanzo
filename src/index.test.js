import rollupJestBoilerplate from './index.js';

describe('rollupJestBoilerplate', () => {
  it('rollupJestBoilerplate(string)', () => {
    expect(rollupJestBoilerplate('cool')).toMatchSnapshot();
  });
});
