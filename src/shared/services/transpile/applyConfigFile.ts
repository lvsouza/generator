import { observe } from 'react-observing';

import { transpileByPatterns, traspileFunctions } from './TranspileService';
import { IConfigFile } from '../../interfaces';

export const applyConfigFile = (configs: IConfigFile): void => {
  const transpilePatternsAndFunctions = (value: string): string => {
    return traspileFunctions(
      transpileByPatterns(value, [
        ...configs.patterns,
        {
          key: 'ProjectPath',
          value: observe(''),
          props: { displayName: 'Project path' }
        }
      ])
    );
  };
  console.log(configs);
};
