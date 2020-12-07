import { observe } from 'react-observing';

import path from 'path';

import { transpileByPatterns } from './transpile/transpileService';
import { readFile, writeFile } from './../../core/services';
import { ILine, IConfigFile } from './../interfaces';

export const applyConfigFile = (configs: IConfigFile & { lines: ILine[] }, templatePath: string): void => {
  configs.customFields.interableColumnPatterns.forEach(interableColumnPattern => {
    const content: string[] = [];

    configs.lines.forEach(line => {
      if (!line[interableColumnPattern.key].value) return;

      interableColumnPattern.contentString = '';
      interableColumnPattern.content.forEach(contentLine => {
        if (contentLine === '') {
          interableColumnPattern.contentString = interableColumnPattern.contentString + '\n';
        } else {
          if (interableColumnPattern.contentString && interableColumnPattern.contentString !== '' && interableColumnPattern.contentString !== '\n' && interableColumnPattern.contentString?.replace(/\n/g, '').length > 0) {
            interableColumnPattern.contentString = interableColumnPattern.contentString + '\n';
          }

          interableColumnPattern.contentString = interableColumnPattern.contentString + transpileByPatterns(contentLine, [
            ...configs.patterns.filter(pattern => pattern.value?.value !== undefined).map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })),
            ...configs.customFields.columnPatterns.map(column => ({
              key: column.key,
              value: line[column.key].value
            }))
          ]);
        }
      });

      content.push(interableColumnPattern.contentString);
    });

    configs.patterns.push({
      props: { displayName: '' },
      key: interableColumnPattern.key,
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
    file.content = transpileByPatterns(file.content, configs.patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })));

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
        action.contentTranspiled = action.content?.map(content => transpileByPatterns(content, configs.patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' }))));

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
