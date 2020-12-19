import React, { useCallback, Fragment } from 'react';
import { VscChevronUp, VscChevronDown, VscTrash, VscAdd } from 'react-icons/vsc';
import { IObservable, observe, useObserver, set } from 'react-observing';

import path from 'path';

import { Input, Hidden, NotHidden } from '../../../observable-components';
import { IFileToChangeCreator } from '../../../shared/interfaces';
import { FilesToChangeAction } from './FilesToChangeActions';

interface FilesToChangeProps {
  filesToChange: IObservable<IFileToChangeCreator[]>
}
export const FilesToChange: React.FC<FilesToChangeProps> = ({ filesToChange: _filesToChange }) => {
  const [filesToChange, setFilesToChange] = useObserver(_filesToChange);

  const handleAdd = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setFilesToChange(oldFilesToChange => [
      ...oldFilesToChange,
      {
        name: observe(''),
        path: observe(''),
        actions: observe([]),
        description: observe(''),
        isShowActions: observe(false)
      }
    ]);
  }, [setFilesToChange]);

  const handleRemove = useCallback((index: number) => {
    setFilesToChange(oldFilesToChange => {
      oldFilesToChange.splice(index, 1);
      return [...oldFilesToChange];
    });
  }, [setFilesToChange]);

  return (
    <div className="background-bars padding-m border-radius margin-m flex-column">
      <h3>Files to change</h3>
      <table className="margin-top-s" cellSpacing={0}>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Target path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filesToChange.map(({ name, description, path: filePath, isShowActions, actions }, index, array) => (
            <Fragment key={index}>
              <tr>
                <td
                  width={30}
                  tabIndex={0}
                  align="center"
                  className="pointer text-color"
                  onClick={() => handleRemove(index)}
                >
                  <VscTrash />
                </td>
                <td>
                  <Input
                    observable={name}
                    placeholder="Type here..."
                    className="full-width"
                  />
                </td>
                <td>
                  <Input
                    observable={description}
                    placeholder="Type here..."
                    className="full-width"
                  />
                </td>
                <td className="display-flex">
                  <label
                    htmlFor={`target_path_${index}`}
                    className="font-weight-s font-size-sm display-flex flex-justfy-center flex-column background border-radius margin-top-xs margin-bottom-xs padding-horizontal-s"
                  >{'{{ProjectPath}}' + path.sep}</label>
                  <Input
                    id={`target_path_${index}`}
                    observable={filePath}
                    placeholder="Type here..."
                    className="full-width"
                  />
                </td>
                <td
                  tabIndex={0}
                  align="center"
                  className="pointer"
                  onClick={() => {
                    array.forEach((file, i) => i !== index && set(file.isShowActions, false));
                    set(isShowActions, value => !value);
                  }}
                >
                  <NotHidden observable={isShowActions}>
                    <VscChevronUp />
                  </NotHidden>
                  <Hidden observable={isShowActions}>
                    <VscChevronDown />
                  </Hidden>
                </td>
              </tr>
              <NotHidden observable={isShowActions}>
                <tr>
                  <td colSpan={6} className="padding-m background-blur collapse">
                    <FilesToChangeAction actions={actions} />
                  </td>
                </tr>
              </NotHidden>
            </Fragment>
          ))}
          <tr>
            <td colSpan={6}>
              <button
                onClick={handleAdd}
                className="display-flex flex-items-center full-width padding-s padding-horizontal-sm text-white"
              ><VscAdd className="margin-right-s" size={18} />Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
