import React, { useCallback, useState } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';
import { VscAdd, VscClose, VscEdit, VscTrash } from 'react-icons/vsc';

import { CheckBox, Input, Select } from '../../../observable-components';
import { IColumnPatternsCreator } from '../../../shared/interfaces';
import { PatternsSuggestions } from './PatternsSuggestions';

interface CustomFieldsVariablesProps {
  variables: IObservable<IColumnPatternsCreator[]>;
}
export const CustomFieldsVariables: React.FC<CustomFieldsVariablesProps> = ({ variables: _variables }) => {
  const [modal, setModal] = useState<IObservable<string[] | undefined> | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [variables, setVariables] = useObserver(_variables);

  const handleAdd = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setVariables(oldVariables => [
      ...oldVariables,
      {
        key: observe(''),
        props: {
          suggestions: observe(['']),
          description: observe(''),
          displayName: observe(''),
          required: observe(false),
          type: observe('text')
        }
      }
    ]);
  }, [setVariables]);

  const handleRemove = useCallback((index: number) => {
    setVariables(oldVariables => {
      oldVariables.splice(index, 1);
      return [...oldVariables];
    });
  }, [setVariables]);

  return (
    <>
      <section className="flex1 margin-right-s">
        <div className="flex1 background-bars padding-s border-radius-soft flex-column">
          <div className="flex1 flex-space-between flex-items-center">
            <h3>Variables</h3>
            <button
              onClick={() => setModalIsOpen(true)}
              className="padding-xs text-white border-radius-rounded"
            ><VscEdit size={18} /></button>
          </div>
          {variables.length > 0 &&
            <table className="full-width background-bars margin-top-s" cellSpacing={0}>
              <tbody>
                {variables.map((variable, index) => (
                  <tr key={index}>
                    <td>
                      <Input
                        readOnly
                        className="full-width"
                        observable={variable.key}
                        placeholder="Key name..."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
          {variables.length <= 0 && (
            <caption className="padding-m"><i className="font-weight-s">No variables</i></caption>
          )}
        </div>
      </section>

      {modalIsOpen &&
        <div className="flex-content-center flex-items-center z5 fixed background-blur" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
          <div className="padding-m border-default border-radius background-bars box-shadow-medium-center flex-column">
            <div className="flex-space-between flex-items-center">
              <h3>Action content</h3>
              <button
                onClick={() => setModalIsOpen(false)}
                className="text-white padding-xs border-radius-rounded"
              >
                <VscClose size={20} />
              </button>
            </div>
            <hr className="hr hr-transparent margin-top-s margin-bottom-s" />
            <main className=" overflow-auto">
              <table className="full-width background-bars margin-top-s" cellSpacing={0}>
                <thead>
                  <tr>
                    <th />
                    <th>Key</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Display name</th>
                    <th>Description</th>
                    <th>Suggestions</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map((variable, index) => (
                    <tr key={index}>
                      <td
                        tabIndex={0}
                        align="center"
                        className="padding-xs pointer"
                        onClick={() => handleRemove(index)}
                      >
                        <VscTrash />
                      </td>
                      <td>
                        <Input
                          className="full-width"
                          observable={variable.key}
                          placeholder="Type here..."
                        />
                      </td>
                      <td>
                        <Select required className="full-width" observable={variable.props.type}>
                          <option value="text">text</option>
                          <option value="number">number</option>
                          <option value="select">select</option>
                          <option value="checkbox">checkbox</option>
                          <option value="date">date</option>
                        </Select>
                      </td>
                      <td>
                        <label>
                          <CheckBox
                            type="checkbox"
                            className="full-width"
                            placeholder="Type here..."
                            observable={variable.props.required}
                          />
                        </label>
                      </td>
                      <td>
                        <Input
                          className="full-width"
                          placeholder="Type here..."
                          observable={variable.props.displayName}
                        />
                      </td>
                      <td>
                        <Input
                          className="full-width"
                          placeholder="Type here..."
                          observable={variable.props.description}
                        />
                      </td>
                      <td>
                        <Input
                          readOnly
                          className="full-width"
                          placeholder="Click here to edit..."
                          observable={variable.props.suggestions}
                          onClick={() => setModal(variable.props.suggestions)}
                          onKeyPress={() => setModal(variable.props.suggestions)}
                        />
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan={7}>
                      <button
                        onClick={handleAdd}
                        className="display-flex flex-items-center full-width padding-s padding-horizontal-sm text-white"
                      ><VscAdd className="margin-right-s" size={18} />Add</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </main>
          </div>
        </div>
      }

      {modal && <PatternsSuggestions suggestions={modal} onClose={() => setModal(null)} />}
    </>
  );
};
