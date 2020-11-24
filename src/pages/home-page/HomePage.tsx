import React, { useCallback, useState } from 'react';
import { observe, useObserver } from 'react-observing';
import { VscEllipsis } from 'react-icons/vsc';

import { remote } from 'electron';
import path from 'path';

import { applyConfigFile, transpileByPatterns, traspileFunctions } from '../../shared/services';
import { readFolder, readJsonFile, configsStore } from '../../core/services';
import { Wizard, WizardItem } from '../../shared/components';
import { ProjectLocationStore } from '../../shared/stores';
import { PatternInput } from './components/PatternInput';
import { IConfigFile } from '../../shared/interfaces';

export const HomePage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useObserver(ProjectLocationStore.selectedTemplate);
  const [templatesPath, setTemplatesPath] = useObserver(ProjectLocationStore.templatesPath);
  const [filesToChange, setFilesToChange] = useObserver(ProjectLocationStore.filesToChange);
  const [projectPath, setProjectPath] = useObserver(ProjectLocationStore.projectPath);
  const [filesToMove, setFilesToMove] = useObserver(ProjectLocationStore.filesToMove);
  const [patterns, setPatterns] = useObserver(ProjectLocationStore.patterns);
  const [currentStep, setCurrentStep] = useState(1);

  const transpilePatternsAndFunctions = useCallback((value: string): string => {
    return traspileFunctions(
      transpileByPatterns(value, [
        ...patterns,
        {
          key: 'ProjectPath',
          value: observe(projectPath),
          props: { displayName: 'Project path', description: '' }
        }
      ])
    );
  }, [patterns, projectPath]);

  const handleSelectPath = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const folderPath = await remote.dialog.showOpenDialog({ properties: ['openDirectory'] });

    switch (currentStep) {
      case 1:
        setProjectPath(folderPath.filePaths[0]);
        break;
      case 2:
        setTemplatesPath(folderPath.filePaths[0]);
        break;
      case 3:
        break;
    }
  }, [currentStep, setProjectPath, setTemplatesPath]);

  const initPatterns = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const patterns = configFile.content?.patterns;

    if (patterns) {
      setPatterns(patterns.map(pattern => ({ ...pattern, value: observe('') })));
    } else {
      alert('"patterns" key was not found in config file');
      setCurrentStep(3);
    }
  }, [selectedTemplate, templatesPath, setPatterns]);

  const initFilesToMove = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const filesToMove = configFile.content?.filesToMove;

    if (filesToMove) {
      try {
        setFilesToMove(filesToMove.map(file => ({
          ...file,
          newName: transpilePatternsAndFunctions(file.newName),
          targetPathString: transpilePatternsAndFunctions(path.join(...file.targetPath))
        })));
      } catch (e) {
        alert(e.message);
        setCurrentStep(4);
      }
    } else {
      alert('"filesToMove" key was not found in config file');
      setCurrentStep(3);
    }
  }, [patterns, selectedTemplate, templatesPath, projectPath, setFilesToMove, transpilePatternsAndFunctions]);

  const initFilesToChange = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const filesToChange = configFile.content?.filesToChange;

    if (filesToChange) {
      try {
        setFilesToChange(filesToChange.map(file => ({
          ...file,
          pathString: transpilePatternsAndFunctions(path.join(...file.path))
        })));
      } catch (e) {
        alert(e.message);
        setCurrentStep(4);
      }
    } else {
      alert('"filesToMove" key was not found in config file');
      setCurrentStep(3);
    }
  }, [patterns, selectedTemplate, templatesPath, projectPath, setFilesToMove, setFilesToChange, transpilePatternsAndFunctions]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (currentStep) {
      case 1:
        setCurrentStep(2);
        configsStore.set('projectPath', projectPath);
        break;
      case 2:
        setCurrentStep(3);
        configsStore.set('templatePath', templatesPath);
        break;
      case 3:
        setCurrentStep(4);
        initPatterns();
        break;
      case 4:
        setCurrentStep(5);
        initFilesToMove();
        break;
      case 5:
        setCurrentStep(6);
        initFilesToChange();
        break;
      case 6:
        setCurrentStep(7);
        break;
    };
  }, [currentStep, projectPath, templatesPath, initFilesToMove, initFilesToChange, initPatterns]);

  const handlePrevius = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handleWriteChanges = useCallback(() => {
    try {
      applyConfigFile({
        filesToChange,
        filesToMove,
        patterns
      });
      alert('All changes applied');
    } catch (e) {
      alert(e.message);
    }
  }, [filesToChange, filesToMove, patterns]);

  return (
    <div className="flex1 flex-content-center flex-items-center">
      <div className="padding-m background-bars border-radius-soft flex-column" style={{ maxHeight: '90vh' }}>
        <h2 className="text-align-center">Generator</h2>
        <form className="flex-column margin-top-m" onSubmit={handleSubmit}>
          <Wizard
            step={currentStep}
            onClickPrevious={handlePrevius}
            isNextVisible={currentStep !== 7}
            buttonNextText={currentStep === 7 ? 'Finish' : undefined}
          >
            <WizardItem>
              <label>
                Projects path<br />
                <input
                  required
                  value={projectPath}
                  style={{ width: 258 }}
                  placeholder="/www/projects/my-project"
                  onChange={e => setProjectPath(e.target.value)}
                />
                <button
                  onClick={handleSelectPath}
                  className="border-default padding-horizontal-s border-radius-soft margin-left-s background-transparent text-white"
                ><VscEllipsis /></button>
              </label>
            </WizardItem>
            <WizardItem>
              <label>
                Template path<br />
                <input
                  required
                  value={templatesPath}
                  style={{ width: 258 }}
                  placeholder="/www/projects/my-project/templates"
                  onChange={e => setTemplatesPath(e.target.value)}
                />
                <button
                  onClick={handleSelectPath}
                  className="border-default padding-horizontal-s border-radius-soft margin-left-s background-transparent text-white"
                ><VscEllipsis /></button>
              </label>
            </WizardItem>
            <WizardItem>
              <label>
                Choose a template<br />
                <select
                  required
                  style={{ width: 300 }}
                  value={selectedTemplate}
                  onChange={e => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Select</option>
                  {readFolder(templatesPath).map((template, index) => (
                    <option key={index} value={template.name}>{template.name}</option>
                  ))}
                </select>
              </label>
            </WizardItem>
            <WizardItem>
              <div className="flex-column">
                <h3 className="text-align-center">Patterns to replace</h3>
                <div className="flex-column margin-top-m overflow-auto" style={{ maxHeight: '35vh' }}>
                  {patterns.map((pattern, index) => (
                    <PatternInput key={index} patternProps={pattern.props} value={pattern.value || observe('')} />
                  ))}
                </div>
              </div>
            </WizardItem>
            <WizardItem>
              <div className="flex-column">
                <h3 className="text-align-center padding-s text-align-center">Files to move</h3>
                {filesToMove.map((file, index) => (
                  <div key={index} className="flex-column padding-s border-default border-radius-soft margin-top-xs">
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">Name:</b>
                      <i>{file.originalName}</i>
                    </p>
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">
                        New name:
                      </b>
                      {file.newName}
                    </p>
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">
                        Target path:
                      </b>
                      {file.targetPathString}
                    </p>
                  </div>
                ))}
              </div>
            </WizardItem>
            <WizardItem>
              <div className="flex-column">
                <h3 className="text-align-center padding-s text-align-center">Files to change</h3>
                {filesToChange.map((file, index) => (
                  <div key={index} className="flex-column padding-s border-default border-radius-soft margin-top-xs">
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">Name:</b>
                      <i>{file.name}</i>
                    </p>
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">Path:</b>
                      <i>{file.pathString}</i>
                    </p>
                    <p className="font-weight-s text-color">
                      <i>{file.description}</i>
                      <p className="font-size-s">
                        {file.actions.map((action, index) => (
                          <p key={index}>{action.description}</p>
                        ))}
                      </p>
                    </p>
                  </div>
                ))}
              </div>
            </WizardItem>
            <WizardItem>
              <div className="flex-column flex-content-center flex1" style={{ minWidth: 200, minHeight: 100 }}>
                <button onClick={handleWriteChanges} className="padding-s background-primary border-none border-radius-soft text-white shadow-l">Write changes</button>
                <button onClick={() => setCurrentStep(1)} className="padding-s margin-top-m background-transparent border-radius-soft text-white border-default">Reset</button>
              </div>
            </WizardItem>
          </Wizard>
        </form>
      </div>
    </div>
  );
};
