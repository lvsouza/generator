import React, { useCallback } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';
import { VscAdd, VscTrash } from 'react-icons/vsc';

import path from 'path';

import { IFileToMoveCreator } from '../../../shared/interfaces';
import { Input } from '../../../observable-components';

interface FilesToMoveProps {
  filesToMove: IObservable<IFileToMoveCreator[]>
}
export const FilesToMove: React.FC<FilesToMoveProps> = ({ filesToMove: _filesToMove }) => {
  const [filesToMove, setFilesToMove] = useObserver(_filesToMove);

  const handleAdd = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setFilesToMove(oldFilesToMove => [
      ...oldFilesToMove,
      {
        newName: observe(''),
        targetPath: observe(''),
        originalName: observe('')
      }
    ]);
  }, [setFilesToMove]);

  const handleRemove = useCallback((index: number) => {
    setFilesToMove(oldFilesToMove => {
      oldFilesToMove.splice(index, 1);
      return [...oldFilesToMove];
    });
  }, [setFilesToMove]);

  return (
    <div className="background-bars padding-m border-radius margin-m flex-column">
      <h3>Files to move</h3>
      <table className="margin-top-s" cellSpacing={0}>
        <thead>
          <tr>
            <th />
            <th>Original name</th>
            <th>New name</th>
            <th>Target path</th>
          </tr>
        </thead>
        <tbody>
          {filesToMove.map(({ newName, originalName, targetPath }, index) => (
            <tr key={index}>
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
                  placeholder="Type here..."
                  observable={originalName}
                  className="full-width"
                />
              </td>
              <td>
                <Input
                  observable={newName}
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
                  observable={targetPath}
                  placeholder="Type here..."
                  className="full-width"
                />
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={5}>
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
