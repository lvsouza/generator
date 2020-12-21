import React, { useEffect } from 'react';

interface WizardItemProps {
  onInit?(): void;
}
export const WizardItem: React.FC<WizardItemProps> = ({ children, onInit }) => {
  useEffect(() => onInit && onInit(), [onInit]);
  return <>{children}</>;
};
