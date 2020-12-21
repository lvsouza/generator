import React from 'react';
import { VscClose, VscTrash } from 'react-icons/vsc';
import { IObservable, set, useObserver } from 'react-observing';

import { Input } from '../../../observable-components';

interface PatternsSuggestionsProps {
  suggestions: IObservable<string[] | undefined>;
  onClose(): void;
}
export const PatternsSuggestions: React.FC<PatternsSuggestionsProps> = ({ suggestions: _suggestions, onClose }) => {
  if (!Array.isArray(_suggestions.value)) {
    set(_suggestions, !_suggestions.value ? [''] : [_suggestions.value]);
  }

  const [suggestions = [''], setSuggestions] = useObserver(_suggestions);

  return (
    <div className="flex-content-center flex-items-center z5 fixed background-blur" style={{ width: '100vw', height: '100vh', top: 0, left: 0 }}>
      <div className="padding-m border-default border-radius background-bars box-shadow-medium-center flex-column" style={{ maxHeight: '80%' }}>
        <div className="flex-space-between flex-items-center">
          <h3>Action content</h3>
          <button
            onClick={onClose}
            className="text-white padding-xs border-radius-rounded"
          >
            <VscClose size={20} />
          </button>
        </div>
        <hr className="hr hr-transparent margin-top-s margin-bottom-s" />
        <main className="display-flex flex-column overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex-items-center">
              <Input
                value={suggestion}
                style={{ width: 250 }}
                className="margin-top-xs"
                placeholder="Type a suggestion here..."
                onChange={e => setSuggestions(oldSuggestions => {
                  if (!oldSuggestions) return [e.target.value];
                  oldSuggestions[index] = e.target.value;
                  return [
                    ...oldSuggestions
                  ];
                })}
              />
              <button
                type="button"
                className="text-white padding-xs border-radius-rounded margin-left-s"
                onClick={() => setSuggestions(oldSuggestions => {
                  if (!oldSuggestions || oldSuggestions.length === 1) return [''];
                  oldSuggestions.splice(index, 1);
                  return [
                    ...oldSuggestions
                  ];
                })}
              >
                <VscTrash size={18} />
              </button>
            </div>
          ))}
        </main>
        <button
          type="button"
          className="text-white padding-s margin-top-xg border-radius border-default"
          onClick={() => setSuggestions(oldSuggestions => [...(oldSuggestions || []), ''])}
        >Add suggestion</button>
      </div>
    </div>
  );
};
