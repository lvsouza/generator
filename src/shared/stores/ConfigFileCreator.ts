import { observe } from 'react-observing';

import path from 'path';

import { IConfigFileCreator, IFileToChange, IFileToMove, IPattern } from '../interfaces';

const toString = (store: IConfigFileCreator): string => {
  const patterns: IPattern[] = store.patterns.value.map(pattern => ({
    key: pattern.key.value,
    props: {
      type: pattern.props.type.value,
      displayName: pattern.props.displayName.value,
      description: pattern.props.description.value,
      suggestions: pattern.props.suggestions.value?.filter(suggestion => suggestion !== '')
    }
  }));

  const filesToMove: IFileToMove[] = store.filesToMove.value.map(file => ({
    newName: file.newName.value,
    originalName: file.originalName.value,
    targetPath: ['{{ProjectPath}}', ...file.targetPath.value.split(new RegExp(`${path.sep}`, 'g'))]
  }));

  const filesToChange: IFileToChange[] = store.filesToChange.value.map(file => ({
    name: file.name.value,
    description: file.description.value,
    path: ['{{ProjectPath}}', ...file.path.value.split(new RegExp(`${path.sep}`, 'g'))],
    actions: file.actions.value.map(action => ({
      position: action.position.value,
      description: action.description.value,
      target: action.target.value,
      content: action.content.value?.split(/\n/g)
    }))
  }));

  return JSON.stringify({
    patterns,
    filesToMove,
    filesToChange
  }, null, 2);
};

export const ConfigFileCreatorStore: IConfigFileCreator = {
  toString: () => toString(ConfigFileCreatorStore),
  filesToChange: observe([]),
  templateName: observe(''),
  filesToMove: observe([]),
  patterns: observe([]),
  customFields: {
    interableColumnPatterns: observe([]),
    columnPatterns: observe([])
  }
};
