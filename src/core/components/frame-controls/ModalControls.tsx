import React from 'react';
import { VscChromeClose, VscChromeMaximize, VscChromeRestore, VscChromeMinimize } from 'react-icons/vsc';

interface ModalControlsProps {
  toggleMaximize?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  close?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  showMaximize?: boolean;
  showMinimize?: boolean;
  isMaximized?: boolean;
  showClose?: boolean;
  minimize?(): void;
}
export const ModalControls: React.FC<ModalControlsProps> = ({ showClose = true, showMaximize = true, showMinimize = true, isMaximized = false, close, toggleMaximize, minimize }) => {
  return (
    <>
      {showMinimize &&
        <button onClick={minimize} className="display-flex flex-items-center padding-horizontal-sm background-transparent border-none text-color">
          <VscChromeMinimize size={18} className="margin-xs" />
        </button>
      }
      {(isMaximized && showMaximize) &&
        <button onClick={toggleMaximize} className="display-flex flex-items-center padding-horizontal-sm background-transparent border-none text-color">
          <VscChromeRestore size={18} className="margin-xs" />
        </button>
      }
      {(!isMaximized && showMaximize) &&
        <button onClick={toggleMaximize} className="display-flex flex-items-center padding-horizontal-sm background-transparent border-none text-color">
          <VscChromeMaximize size={18} className="margin-xs" />
        </button>
      }
      {showClose &&
        <button onClick={close} className="custom-hover display-flex flex-items-center background-transparent padding-horizontal-sm border-none text-color background-error-hover">
          <VscChromeClose size={18} className="margin-xs" />
        </button>
      }
    </>
  );
};
