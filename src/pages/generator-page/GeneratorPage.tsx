import React, { useCallback, useState } from 'react';
import { observe, useObserver } from 'react-observing';
import { VscEllipsis, VscTrash, VscSaveAll, VscAdd } from 'react-icons/vsc';

import { remote } from 'electron';
import path from 'path';

import { applyConfigFile, transpileByPatterns } from '../../shared/services';
import { readFolder, readJsonFile, configsStore, setProgressBar } from '../../core/services';
import { PatternCellProp } from './components/PatternCellProp';
import { Wizard, WizardItem } from '../../shared/components';
import { IConfigFile, ILine } from '../../shared/interfaces';
import { ProjectLocationStore } from '../../shared/stores';
import { PatternInput } from './components/PatternInput';

export const GeneratorPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useObserver(ProjectLocationStore.selectedTemplate);
  const [templatesPath, setTemplatesPath] = useObserver(ProjectLocationStore.templatesPath);
  const [filesToChange, setFilesToChange] = useObserver(ProjectLocationStore.filesToChange);
  const [columns, setColumns] = useObserver(ProjectLocationStore.customFields.columns);
  const [projectPath, setProjectPath] = useObserver(ProjectLocationStore.projectPath);
  const [filesToMove, setFilesToMove] = useObserver(ProjectLocationStore.filesToMove);
  const [lines, setLines] = useObserver(ProjectLocationStore.customFields.lines);
  const [patterns, setPatterns] = useObserver(ProjectLocationStore.patterns);
  const [currentStep, setCurrentStep] = useState(1);

  const transpilePatternsAndFunctions = useCallback((value: string): string => {
    return transpileByPatterns(value, [
      ...patterns.map(pattern => ({ key: pattern.key, value: pattern.value?.value || '' })),
      {
        key: 'ProjectPath',
        value: projectPath
      }
    ]);
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

  const handleInitFinsTemplatesPath = useCallback(() => {
    if (projectPath) {
      configsStore.set('projectPath', projectPath);
    }
  }, [projectPath]);

  const handleInitChooseTemplates = useCallback(() => {
    if (templatesPath) {
      configsStore.set('templatePath', templatesPath);
    }
  }, [templatesPath]);

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
    const _filesToMove = configFile.content?.filesToMove;

    if (_filesToMove) {
      try {
        setFilesToMove(_filesToMove.map(file => ({
          ...file,
          newName: transpilePatternsAndFunctions(file.newName),
          targetPathString: transpilePatternsAndFunctions(path.join(...file.targetPath))
        })));
      } catch (e) {
        alert(e.message);
        setCurrentStep(4);
      }
    } else {
      setFilesToMove([]);
      setCurrentStep(oldStep => ++oldStep);
    }
  }, [selectedTemplate, templatesPath, setFilesToMove, transpilePatternsAndFunctions]);

  const initFilesToChange = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const _filesToChange = configFile.content?.filesToChange;

    if (_filesToChange) {
      try {
        setFilesToChange(_filesToChange.map(file => ({
          ...file,
          pathString: transpilePatternsAndFunctions(path.join(...file.path)),
          description: transpilePatternsAndFunctions(file.description),
          actions: file.actions.map(action => ({
            ...action,
            description: transpilePatternsAndFunctions(action.description)
          }))
        })));
      } catch (e) {
        alert(e.message);
        setCurrentStep(4);
      }
    } else {
      setFilesToChange([]);
      setCurrentStep(oldStep => ++oldStep);
    }
  }, [selectedTemplate, templatesPath, setFilesToChange, transpilePatternsAndFunctions]);

  const handleAddNewLine = useCallback(() => {
    const newLine: ILine = {};
    setColumns(columns => {
      columns.forEach(column => {
        switch (column.props.type) {
          case undefined:
            newLine[column.key] = observe(true);
            break;
          case 'checkbox':
            newLine[column.key] = observe(true);
            break;
          case 'number':
            newLine[column.key] = observe(NaN);
            break;
          default:
            newLine[column.key] = observe('');
            break;
        }
      });

      return columns;
    });

    setLines(lines => [
      ...lines,
      newLine
    ]);
  }, [setColumns, setLines]);

  const initPropertiesPatterns = useCallback(() => {
    const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));
    const customFields = configFile.content?.customFields;

    if (customFields?.columnPatterns && customFields?.interableColumnPatterns) {
      setColumns([
        ...customFields.columnPatterns,
        ...customFields.interableColumnPatterns.map(interableColumn => ({
          key: interableColumn.key,
          props: {
            type: undefined,
            description: interableColumn.props.description,
            displayName: interableColumn.props.displayName
          }
        }))
      ]);

      if (lines.length === 0) {
        handleAddNewLine();
      }
    } else {
      setColumns([]);
      setCurrentStep(currentStep => ++currentStep);
      initFilesToMove();
    }
  }, [templatesPath, selectedTemplate, setColumns, lines.length, handleAddNewLine, initFilesToMove]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (currentStep) {
      case 1:
        setCurrentStep(2);
        break;
      case 2:
        setCurrentStep(3);
        break;
      case 3:
        setCurrentStep(4);
        break;
      case 4:
        setCurrentStep(5);
        setLines([]);
        break;
      case 5:
        setCurrentStep(6);
        break;
      case 6:
        setCurrentStep(7);
        break;
      case 7:
        setCurrentStep(8);
        break;
    };
  }, [currentStep, setLines]);

  const handlePrevius = useCallback((step: number) => {
    if (step === 5 && columns.length === 0) {
      handlePrevius(--step);
    } else if (step === 6 && filesToMove.length === 0) {
      handlePrevius(--step);
    } else if (step === 7 && filesToChange.length === 0) {
      handlePrevius(--step);
    } else {
      setCurrentStep(step);
    }
  }, [columns, filesToMove, filesToChange]);

  const handleWriteChanges = useCallback(() => {
    try {
      const configFile = readJsonFile<IConfigFile>(path.join(templatesPath, selectedTemplate, 'config.json'));

      setProgressBar(0, { mode: 'indeterminate' });

      applyConfigFile({
        customFields: {
          columnPatterns: configFile.content?.customFields?.columnPatterns || [],
          interableColumnPatterns: configFile.content?.customFields?.interableColumnPatterns || []
        },
        filesToChange,
        filesToMove,
        lines,
        patterns: [
          ...patterns,
          {
            key: 'ProjectPath',
            value: observe(projectPath),
            props: { displayName: '' }
          }
        ]
      }, path.join(templatesPath, selectedTemplate));

      setProgressBar(0, { mode: 'normal' });
      alert('All changes applied');
    } catch (e) {
      setProgressBar(0, { mode: 'normal' });
      alert(e.message);
    }
  }, [filesToChange, filesToMove, lines, patterns, projectPath, selectedTemplate, templatesPath]);

  const readTemplateByTemplatesPath = useCallback((path: string) => {
    try {
      return readFolder(path);
    } catch (e) {
      return [];
    }
  }, []);

  return (
    <div className="flex1 flex-content-center flex-items-center">
      <div className="padding-m background-bars border-radius-soft flex-column" style={{ maxHeight: '90vh' }}>
        <form className="flex-column" onSubmit={handleSubmit}>
          <Wizard
            step={currentStep}
            onClickPrevious={handlePrevius}
            isNextVisible={currentStep !== 8}
            buttonNextText={currentStep === 8 ? 'Finish' : undefined}
          >
            <WizardItem key={1}>
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
                  autoFocus
                  onClick={handleSelectPath}
                  className="border-default padding-horizontal-s border-radius-soft margin-left-s background-transparent text-white"
                ><VscEllipsis /></button>
              </label>
            </WizardItem>
            <WizardItem key={2} onInit={handleInitFinsTemplatesPath}>
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
            <WizardItem key={3} onInit={handleInitChooseTemplates}>
              <label>
                Choose a template<br />
                <select
                  required
                  style={{ width: 300 }}
                  value={selectedTemplate}
                  onChange={e => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Select</option>
                  {readTemplateByTemplatesPath(templatesPath).map((template, index) => (
                    <option key={index} value={template.name}>{template.name}</option>
                  ))}
                </select>
              </label>
            </WizardItem>
            <WizardItem key={4} onInit={initPatterns}>
              <div className="flex-column">
                <h3 className="text-align-center">Patterns to replace</h3>
                <div className="flex-column margin-top-m overflow-auto" style={{ maxHeight: '35vh' }}>
                  <table cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patterns.map((pattern, index) => (
                        <PatternInput key={index} id={index} patternProps={pattern.props} value={pattern.value || observe('')} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </WizardItem>
            <WizardItem key={5} onInit={initPropertiesPatterns}>
              <div className="flex-column">
                <p className="text-align-center margin-bottom-sm">Create or custumize fields</p>
                <div className="overflow-auto padding-bottom-s" style={{ maxHeight: '50vh', maxWidth: '90vw' }}>
                  <table cellSpacing={0}>
                    <thead>
                      <tr>
                        <th />
                        {columns.map((column, index) => (
                          <th key={index} title={column.props?.description} style={{ minWidth: 100 }}>
                            {column.props?.displayName || column.key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lines.map((line, index, array) => (
                        <tr key={index} className="fade-in">
                          <td
                            tabIndex={0}
                            className="padding-xs pointer"
                            onClick={() => {
                              array.splice(index, 1);
                              setLines([...array]);
                            }}
                          >
                            <VscTrash />
                          </td>
                          {columns.map((column, indexColumn) => (
                            <PatternCellProp
                              type={column.props.type}
                              pattern={line[column.key]}
                              key={`${index}_${indexColumn}`}
                              required={column.props.required}
                              suggestions={column.props.suggestions}
                            />
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={columns.length + 1}>
                          <button
                            type="button"
                            onClick={handleAddNewLine}
                            className="display-flex flex-items-center full-width padding-s padding-horizontal-sm text-white"
                          ><VscAdd className="margin-right-s" size={18} />Add</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </WizardItem>
            <WizardItem key={6} onInit={initFilesToMove}>
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
                {filesToMove.length === 0 && <p className="text-color text-align-center"><i>No files to move</i></p>}
              </div>
            </WizardItem>
            <WizardItem key={7} onInit={initFilesToChange}>
              <div className="flex-column">
                <h3 className="text-align-center padding-s text-align-center">Files to change</h3>
                {filesToChange.map((file, index) => (
                  <div key={index} className="flex-column padding-s border-default border-radius-soft margin-top-xs">
                    <p className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">Name:</b>
                      <i>{file.name}</i>
                    </p>
                    <div className="font-weight-s">
                      <b className="font-weight-g margin-right-xs">Path:</b>
                      <i>{file.pathString}</i>
                    </div>
                    <div className="font-weight-s text-color flex-column">
                      <p className="margin-top-s margin-bottom-xs">{file.description}</p>
                      <div className="font-size-s flex-column">
                        {file.actions.map((action, index) => (
                          <p key={index}>{action.description}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {filesToChange.length === 0 && <p className="text-color text-align-center"><i>No files to change</i></p>}
              </div>
            </WizardItem>
            <WizardItem key={8}>
              <div className="flex-column flex-content-center flex1" style={{ minWidth: 200, minHeight: 100 }}>
                <button onClick={handleWriteChanges} className="padding-s background-primary border-none border-radius-soft text-white shadow-l display-flex flex-items-center flex-content-center">
                  <VscSaveAll size={20} className="margin-s" />
                    Write changes
                </button>
              </div>
            </WizardItem>
          </Wizard>
        </form>
      </div>
    </div>
  );
};
