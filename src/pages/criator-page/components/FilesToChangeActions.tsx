import React, { useCallback, Fragment, useState } from 'react';
import { IObservable, observe, useObserver, set } from 'react-observing';
import { VscAdd, VscClose, VscEdit, VscTrash } from 'react-icons/vsc';

import { Input, Select, TextArea } from '../../../observable-components';
import { IFileToChangeActionCreator } from '../../../shared/interfaces';

interface FilesToChangeActionProps {
  actions: IObservable<IFileToChangeActionCreator[]>
}
export const FilesToChangeAction: React.FC<FilesToChangeActionProps> = ({ actions: _actions }) => {
  const [modal, setModal] = useState<IObservable<string | undefined> | null>(null);
  const [actions, setActions] = useObserver(_actions);

  const handleAdd = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setActions(oldActions => [
      ...oldActions,
      {
        target: observe(''),
        content: observe(''),
        description: observe(''),
        position: observe('before'),
        isShowcontent: observe(false)
      }
    ]);
  }, [setActions]);

  const handleRemove = useCallback((index: number) => {
    setActions(oldActions => {
      oldActions.splice(index, 1);
      return [...oldActions];
    });
  }, [setActions]);

  return (
    <>
      <table className="full-width background-bars" cellSpacing={0}>
        <thead>
          <tr>
            <th />
            <th>Position</th>
            <th>Target</th>
            <th>Description</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {actions.map(({ position, content, description, target }, index) => (
            <Fragment key={index}>
              <tr>
                <td
                  tabIndex={0}
                  align="center"
                  className="padding-xs pointer"
                  onClick={() => handleRemove(index)}
                >
                  <VscTrash />
                </td>
                <td>
                  <Select
                    observable={position}
                    placeholder="Type here..."
                    className="full-width"
                  >
                    <option value="before">Before</option>
                    <option value="after">After</option>
                  </Select>
                </td>
                <td>
                  <Input
                    observable={target}
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
                <td
                  width={80}
                  tabIndex={0}
                  align="center"
                  className="padding-xs pointer"
                  onClick={() => setModal(content)}
                  onKeyDown={() => setModal(content)}
                >
                  <VscEdit />
                </td>
              </tr>
            </Fragment>
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

      {modal &&
        <div className="flex-content-center flex-items-center z5 fixed background-blur" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
          <div className="padding-m border-default border-radius background-bars box-shadow-medium-center flex-column">
            <div className="flex-space-between flex-items-center">
              <h3>Action content</h3>
              <button
                className="text-white padding-xs border-radius-rounded"
                onClick={() => setModal(null)}
              >
                <VscClose size={20} />
              </button>
            </div>
            <hr className="hr hr-transparent margin-top-s margin-bottom-s" />
            <main className="">
              <TextArea
                observable={modal}
                placeholder="Type here..."
                style={{
                  minWidth: 400,
                  minHeight: 150,
                  maxWidth: '90vw',
                  maxHeight: '80vh'
                }}
              />
            </main>
          </div>
        </div>
      }
    </>
  );
};
