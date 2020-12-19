import React, { useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ConfigFileCreatorStore } from '../../shared/stores';
import { FilesToChange } from './components/FilesToChange';
import { FilesToMove } from './components/FilesToMove';
import { Input } from '../../observable-components';
import { Patterns } from './components/Patterns';

export const CriatorPage: React.FC = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { tab } = useParams<{ tab: string }>();
  const { push } = useHistory();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(ref.current);
  }, [ref.current]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="flex1">
      <div className="flex1 flex-column">

        <div className="padding-m">
          <label className="display-flex flex-items-center flex1">
            <p className="margin-right-m">Template name:</p>
            <Input
              ref={ref}
              autoFocus
              required={true}
              placeholder="Type here..."
              observable={ConfigFileCreatorStore.templateName}
            />
          </label>
          <button
            className="background-primary padding-horizontal-g border-radius text-white"
          >Save</button>
        </div>

        <div className="flex-column overflow-auto display-block full-width" style={{ height: 'calc(100vh - 20rem)' }}>

          <div className="background-bars margin-m">
            <button type="button" onClick={() => push('/creator/patterns')} className={`padding-s padding-horizontal-m text-color${tab === 'patterns' ? ' background-highlighted' : ''}`}>
              Patterns
            </button>
            <hr className="hr hr-vertical" />
            <button type="button" onClick={() => push('/creator/files-to-move')} className={`padding-s padding-horizontal-m text-color${tab === 'files-to-move' ? ' background-highlighted' : ''}`}>
              Files to move
            </button>
            <button type="button" onClick={() => push('/creator/files-to-change')} className={`padding-s padding-horizontal-m text-color${tab === 'files-to-change' ? ' background-highlighted' : ''}`}>
              Files to change
            </button>
            <button type="button" onClick={() => push('/creator/custom-fields')} className={`padding-s padding-horizontal-m text-color${tab === 'custom-fields' ? ' background-highlighted' : ''}`}>
              Custom fields
            </button>
          </div>

          {tab === 'patterns' && <Patterns patterns={ConfigFileCreatorStore.patterns} />}

          {tab === 'files-to-move' && <FilesToMove filesToMove={ConfigFileCreatorStore.filesToMove} />}

          {tab === 'files-to-change' && <FilesToChange filesToChange={ConfigFileCreatorStore.filesToChange} />}

          {tab === 'custom-fields' &&
            <div className="background-bars padding-m margin-m border-radius">
              <h3>Custom fields</h3>
            </div>
          }

        </div>

      </div>
    </form>
  );
};
