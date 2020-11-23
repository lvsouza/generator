import React, { useCallback, useState } from 'react';
import { observe, useObserver } from 'react-observing';
import { VscEllipsis } from 'react-icons/vsc';

import { remote } from 'electron';
import path from 'path';

import { transpileByPatterns, traspileFunctions } from '../../shared/services';
import { readFolder, readJsonFile, configsStore } from '../../core/services';
import { ProjectLocationStore } from '../../shared/stores';
import { PatternInput } from './components/PatternInput';
import { IConfigFile } from '../../shared/interfaces';
import { Wizard } from '../../shared/components';

export const HomePage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useObserver(ProjectLocationStore.selectedTemplate);
  const [templatesPath, setTemplatesPath] = useObserver(ProjectLocationStore.templatesPath);
  const [projectPath, setProjectPath] = useObserver(ProjectLocationStore.projectPath);
  const [filesToMove, setFilesToMove] = useObserver(ProjectLocationStore.filesToMove);
  const [patterns, setPatterns] = useObserver(ProjectLocationStore.patterns);
  const [currentStep, setCurrentStep] = useState(1);

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
  }, [selectedTemplate, setPatterns, templatesPath]);

  const initFilesToMove = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const filesToMove = configFile.content?.filesToMove;

    if (filesToMove) {
      setFilesToMove(filesToMove.map(file => ({
        ...file,
        newName: traspileFunctions(transpileByPatterns(file.newName, patterns))
      })));
    } else {
      alert('"filesToMove" key was not found in config file');
      setCurrentStep(3);
    }
  }, [patterns, selectedTemplate, setFilesToMove, templatesPath]);

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
        // setCurrentStep(5);
        break;
    };
  }, [currentStep, initFilesToMove, initPatterns, projectPath, templatesPath]);

  const handlePrevius = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return (
    <div className="flex1 flex-content-center flex-items-center">
      <div className="padding-m background-bars border-radius-soft flex-column" style={{ maxHeight: '90vh' }}>
        <h2 className="text-align-center">Generator</h2>
        <form className="flex-column margin-top-m" onSubmit={handleSubmit}>
          <Wizard step={currentStep} onClickPrevious={handlePrevius}>
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
            <div className="flex-column">
              <h3 className="text-align-center">Patterns to replace</h3>
              <div className="flex-column margin-top-m overflow-auto" style={{ maxHeight: '35vh' }}>
                {patterns.map((pattern, index) => (
                  <PatternInput key={index} patternProps={pattern.props} value={pattern.value || observe('')} />
                ))}
              </div>
            </div>
            <div className="flex-column">
              <h3 className="text-align-center padding-s text-align-center">Files to change</h3>
              {filesToMove.map((file, index) => (
                <div key={index} className="flex-column padding-bottom-s">
                  <i className="font-weight-s">
                    <b className="font-weight-g margin-right-xs">
                      Name:
                    </b>
                    {file.originalName}
                  </i>
                  <p className="font-weight-s">
                    <b className="font-weight-g margin-right-xs">
                      New name:
                    </b>
                    {file.newName}
                  </p>
                </div>
              ))}
            </div>
          </Wizard>
        </form>
      </div>
    </div>
  );
};
