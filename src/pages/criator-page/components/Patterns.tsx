import React, { useCallback, useState } from 'react';
import { IObservable, observe, useObserver } from 'react-observing';
import { VscAdd, VscTrash } from 'react-icons/vsc';

import { Input, Select } from '../../../observable-components';
import { IPatternCreator } from '../../../shared/interfaces';
import { PatternsSuggestions } from './PatternsSuggestions';

interface PatternsProps {
  patterns: IObservable<IPatternCreator[]>
}
export const Patterns: React.FC<PatternsProps> = ({ patterns: _patterns }) => {
  const [modal, setModal] = useState<IObservable<string[] | undefined> | null>(null);
  const [patterns, setPatterns] = useObserver(_patterns);

  const handleAddPattern = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setPatterns(oldPatterns => [
      ...oldPatterns,
      {
        key: observe(''),
        props: {
          suggestions: observe(['']),
          description: observe(''),
          displayName: observe(''),
          type: observe('text')
        }
      }
    ]);
  }, [setPatterns]);

  const handleRemovePattern = useCallback((index: number) => {
    setPatterns(oldPatterns => {
      oldPatterns.splice(index, 1);
      return [...oldPatterns];
    });
  }, [setPatterns]);

  return (
    <>
      <div className="background-bars padding-m border-radius margin-m flex-column">
        <h3>Patterns</h3>
        <table className="margin-top-s" cellSpacing={0}>
          <thead>
            <tr>
              <th />
              <th>Key</th>
              <th>Type</th>
              <th>Display name</th>
              <th>Description</th>
              <th>Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {patterns.map(({ key, props: { type, description, displayName, suggestions } }, index) => (
              <tr key={index}>
                <td
                  width={30}
                  tabIndex={0}
                  align="center"
                  className="pointer text-color"
                  onClick={() => handleRemovePattern(index)}
                >
                  <VscTrash />
                </td>
                <td>
                  <Input
                    required
                    observable={key}
                    className="full-width"
                    placeholder="Type here..."
                  />
                </td>
                <td width={80}>
                  <Select required className="full-width" observable={type as IObservable<string>}>
                    <option value="text">text</option>
                    <option value="number">number</option>
                    <option value="select">select</option>
                  </Select>
                </td>
                <td>
                  <Input
                    className="full-width"
                    observable={displayName}
                    placeholder="Type here..."
                  />
                </td>
                <td>
                  <Input
                    className="full-width"
                    observable={description}
                    placeholder="Type here..."
                  />
                </td>
                <td>
                  <Input
                    readOnly
                    className="full-width"
                    observable={suggestions}
                    placeholder="Type here..."
                    onClick={() => setModal(suggestions)}
                    onKeyPress={() => setModal(suggestions)}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={6}>
                <button
                  onClick={handleAddPattern}
                  className="display-flex flex-items-center full-width padding-s padding-horizontal-sm text-white"
                ><VscAdd className="margin-right-s" size={18} />Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {modal && <PatternsSuggestions suggestions={modal} onClose={() => setModal(null)} />}
    </>
  );
};
