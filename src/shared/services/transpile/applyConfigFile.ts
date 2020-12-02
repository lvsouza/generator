import { observe } from 'react-observing';

import path from 'path';

import { readFile, writeFile } from '../../../core/services';
import { IConfigFile, IPropertie } from '../../interfaces';
import { transpileByPatterns } from './transpileService';

export const applyConfigFile = (configs: IConfigFile & { properties: IPropertie[] }, templatePath: string): void => {
  const transpilePatternsAndFunctions = (value: string): string => {
    return transpileByPatterns(value, configs.patterns);
  };

  configs.propertiesPatterns.forEach(propPattern => {
    const content: string[] = [];

    configs.properties.forEach(propertie => {
      if (!propertie[propPattern.key].value) return;

      propPattern.contentString = '';
      propPattern.content.forEach(contentLine => {
        if (propPattern.contentString !== '') {
          propPattern.contentString = propPattern.contentString + '\n';
        }

        propPattern.contentString = propPattern.contentString + transpileByPatterns(contentLine, [
          ...configs.patterns,
          {
            key: 'PropType',
            value: propertie.type,
            props: { displayName: '' }
          },
          {
            key: 'PropName',
            value: propertie.name,
            props: { displayName: '' }
          },
          {
            key: 'PropMinLength',
            value: propertie.minLength,
            props: { displayName: '' }
          },
          {
            key: 'PropMaxLength',
            value: propertie.maxLength,
            props: { displayName: '' }
          },
          {
            key: 'PropDefaultValue',
            value: propertie.defaultValue,
            props: { displayName: '' }
          },
          {
            key: 'PropAllowNull',
            value: propertie.allowNull,
            props: { displayName: '' }
          }
        ]);
      });

      content.push(propPattern.contentString);
    });

    configs.patterns.push({
      key: propPattern.key,
      props: { displayName: '' },
      value: observe(content.join('\n'))
    });
  });

  configs.filesToMove.forEach((fileToMove, index) => {
    if (!fileToMove.targetPathString) return;

    let file;
    try {
      file = readFile(path.join(templatePath, fileToMove.originalName));
    } catch (e) {
      throw new Error(`In key filesToMove[${index}]. Error reading the file "${fileToMove.originalName}".\n\nError message:\n          ${e.message}`);
    }
    if (!file.content) return;

    file.fullName = fileToMove.newName;
    file.content = transpilePatternsAndFunctions(file.content);

    try {
      writeFile(path.join(fileToMove.targetPathString, file.fullName), file);
    } catch (e) {
      throw new Error(`In key filesToMove[${index}]. Error writing to file "${fileToMove.originalName}".\n\nError message:\n          ${e.message}`);
    }
  });

  configs.filesToChange.forEach((fileToChange, index) => {
    if (!fileToChange.pathString) return;

    let file;
    try {
      file = readFile(fileToChange.pathString);
    } catch (e) {
      throw new Error(`In key fileToChange[${index}]. Error reading the file "${fileToChange.name}".\n\nError message:\n          ${e.message}`);
    }
    if (!file.content) return;

    const lines = file.content.split(/\r?\n/);

    fileToChange.actions.forEach((action, actionIndex) => {
      try {
        action.contentTranspiled = action.content?.map(content => transpilePatternsAndFunctions(content));

        const targetIndex = lines.findIndex(line => line.trim() === action.target);
        if (!action.contentTranspiled || !(targetIndex >= 0)) return;

        lines.splice((action.position === 'after' ? targetIndex + 1 : targetIndex), 0, ...action.contentTranspiled);
      } catch (e) {
        throw new Error(`In key fileToChange[${index}] action[${actionIndex}] has error.\n\nError message:\n          ${e.message}`);
      }
    });

    file.content = lines.join('\n');

    try {
      writeFile(fileToChange.pathString, file);
    } catch (e) {
      throw new Error(`In key fileToChange[${index}]. Error in "${fileToChange.name}".\n\nError message:\n          ${e.message}`);
    }
  });
};
