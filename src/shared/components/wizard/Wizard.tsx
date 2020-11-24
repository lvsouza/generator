import React, { useCallback } from 'react';

interface IWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild | React.ReactChild[];
  onClickPrevious?(step: number): void;
  onClickNext?(step: number): void;
  isShowStepControls?: boolean;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  isNextVisible?: boolean;
  buttonNextText?: string;
  step: number;
}
export const Wizard: React.FC<IWizardProps> = ({ children, step = 1, isNextDisabled = false, isNextVisible = true, buttonNextText = 'Next', isPreviousDisabled = false, onClickNext, onClickPrevious, isShowStepControls = true, ...rest }) => {
  const wizardLength = Array.isArray(children) ? children.length : 1;

  if (step > wizardLength) {
    step = wizardLength;
  } else if (step < 1) {
    step = 1;
  }

  const handleNext = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if ((step + 1) <= wizardLength) {
      onClickNext && onClickNext(step + 1);
    } else {
      onClickNext && onClickNext(step);
    }
  }, [onClickNext, step, wizardLength]);

  const handlePrevious = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if ((step - 1) > 0) {
      onClickPrevious && onClickPrevious(step - 1);
    } else {
      onClickPrevious && onClickPrevious(step);
    }
  }, [onClickPrevious, step]);

  return (
    <div className="flex-column">
      <div {...rest}>
        {Array.isArray(children) ? children[step - 1] : children}
      </div>
      {isShowStepControls &&
        <div className="margin-top-m flex-content-end">
          <button
            onClick={handlePrevious}
            disabled={step === 1 || isPreviousDisabled}
            className="padding-s text-white padding-horizontal-m border-radius-soft margin-left-s background-transparent border-default"
          >Back</button>
          {isNextVisible && <button
            onClick={handleNext}
            disabled={step === wizardLength || isNextDisabled}
            className="border-none padding-s text-white padding-horizontal-m border-radius-soft margin-left-s background-primary"
          >{buttonNextText}</button>}
        </div>
      }
    </div>
  );
};
