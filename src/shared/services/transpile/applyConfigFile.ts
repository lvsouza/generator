import path from 'path';

import { transpileByPatterns, traspileFunctions } from './transpileService';
import { readFile, writeFile } from '../../../core/services';
import { IConfigFile } from '../../interfaces';

export const applyConfigFile = (configs: IConfigFile, templatePath: string): void => {
  const transpilePatternsAndFunctions = (value: string): string => {
    return traspileFunctions(
      transpileByPatterns(value, configs.patterns)
    );
  };

  try {
    configs.filesToMove.forEach(fileToMove => {
      if (!fileToMove.targetPathString) return;

      const file = readFile(path.join(templatePath, fileToMove.originalName));
      if (!file.content) return;

      file.fullName = fileToMove.newName;
      file.content = transpilePatternsAndFunctions(file.content);

      writeFile(path.join(fileToMove.targetPathString, file.fullName), file);
    });
  } catch (e) {
    throw new Error('In "filesToMove": ' + e.message);
  }

  try {
    configs.filesToChange.forEach(fileToChange => {
      if (!fileToChange.pathString) return;

      const file = readFile(fileToChange.pathString);
      if (!file.content) return;

      const lines = file.content.split(/\r?\n/);

      fileToChange.actions.forEach(action => {
        action.contentTranspiled = action.content?.map(content => transpilePatternsAndFunctions(content));

        const targetIndex = lines.findIndex(line => line.trim() === action.target);
        if (!action.contentTranspiled || !(targetIndex >= 0)) return;

        lines.splice((action.position === 'after' ? targetIndex + 1 : targetIndex), 0, ...action.contentTranspiled);
      });

      file.content = lines.join('\n');
      writeFile(fileToChange.pathString, file);
    });
  } catch (e) {
    throw new Error('In "filesToChange": ' + e.message);
  }
};
