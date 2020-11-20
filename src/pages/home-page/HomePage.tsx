import React, { useCallback } from 'react';

import { Wizard } from '../../shared/components';

export const HomePage: React.FC = () => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="flex1 flex-content-center flex-items-center">
      <div className="padding-m background-bars border-radius-soft flex-column">
        <h2 className="text-align-center">Generator</h2>
        <form className="flex-column margin-top-m" style={{ maxHeight: 500 }} onSubmit={handleSubmit}>
          <Wizard step={2}>
            <p>teste 1</p>
            <p>teste 2</p>
            <p>teste 3</p>
            <p>teste 4</p>
          </Wizard>
        </form>
      </div>
    </div>
  );
};
