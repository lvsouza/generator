import React from 'react';
import { useObserver, useObserverValue } from 'react-observing';
import { VscTrash } from 'react-icons/vsc';

import { IPropertie, IPropertiesList } from '../../../shared/interfaces';
import { ProjectLocationStore } from '../../../shared/stores';
import { PatternCellProp } from './PatternCellProp';

interface IPatternInputProps {
  propertiesList: IPropertiesList;
  propertie: IPropertie;
  onDelete?(): void;
}
export const PatternRow: React.FC<IPatternInputProps> = ({ propertiesList, propertie, onDelete }) => {
  const [defaultValue, setDefaultValue] = useObserver(propertie.defaultValue);
  const [minLength, setMinLength] = useObserver(propertie.minLength);
  const [maxLength, setMaxLength] = useObserver(propertie.maxLength);
  const [allowNull, setAllowNull] = useObserver(propertie.allowNull);
  const dataTypes = useObserverValue(ProjectLocationStore.dataTypes);
  const [type, setType] = useObserver(propertie.type);
  const [name, setName] = useObserver(propertie.name);

  return (
    <tr className="fade-in">
      <td className="padding-xs pointer" tabIndex={0} onClick={onDelete}>
        <VscTrash />
      </td>
      <td>
        <input required className="padding-xs background-transparent" value={name} onChange={e => setName(e.target.value)} />
      </td>
      <td>
        <select required className="padding-xs background-transparent" value={type} style={{ width: 100 }} onChange={e => setType(e.target.value)}>
          <option value="">Select</option>
          {dataTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>
      </td>
      <td align="center" className=" pointer" tabIndex={0} onClick={() => setAllowNull(!allowNull)} onKeyPress={() => setAllowNull(!allowNull)}>
        <input type="checkbox" className="padding-xs pointer" tabIndex={-1} defaultChecked={allowNull} style={{ width: 100 }} />
      </td>
      <td>
        <input type="number" className="padding-xs background-transparent" style={{ width: 100 }} min={0} value={minLength} onChange={e => setMinLength(e.target.value === '' ? e.target.value : Number(e.target.value))} />
      </td>
      <td>
        <input type="number" className="padding-xs background-transparent" style={{ width: 100 }} min={0} value={maxLength} onChange={e => setMaxLength(e.target.value === '' ? e.target.value : Number(e.target.value))} />
      </td>
      <td>
        <input className="padding-xs background-transparent" value={defaultValue} onChange={e => setDefaultValue(e.target.value)} />
      </td>
      {propertiesList.patterns.map((pattern, index) => (
        <PatternCellProp key={index} pattern={propertie[pattern.key]} />
      ))}
    </tr>
  );
};
