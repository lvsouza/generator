import React from 'react';
import { VscAdd, VscEdit, VscTrash } from 'react-icons/vsc';

import { ICustomFieldsCreator } from '../../../shared/interfaces';
import { CustomFieldsVariables } from './CustomFieldsVariables';
import { Input, Select } from '../../../observable-components';

interface CustomFieldsProps {
  customFields: ICustomFieldsCreator
}
export const CustomFields: React.FC<CustomFieldsProps> = ({ customFields: _customFields }) => {
  return (
    <div className="padding-m">
      <CustomFieldsVariables variables={_customFields.columnPatterns} />

      <section className="flex3 background-bars padding-m border-radius-soft flex-column">
        <h3>Custom fields</h3>
        <table className="full-width background-bars margin-top-s" cellSpacing={0}>
          <thead>
            <tr>
              <th />
              <th>Key</th>
              <th>Display name</th>
              <th>Description</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                tabIndex={0}
                align="center"
                className="padding-xs pointer"
              // onClick={() => handleRemove(index)}
              >
                <VscTrash />
              </td>
              <td>
                <Select
                  // observable={position}
                  placeholder="Type here..."
                  className="full-width"
                >
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </Select>
              </td>
              <td>
                <Input
                  // observable={target}
                  placeholder="Type here..."
                  className="full-width"
                />
              </td>
              <td>
                <Input
                  // observable={description}
                  placeholder="Type here..."
                  className="full-width"
                />
              </td>
              <td
                width={80}
                tabIndex={0}
                align="center"
                className="padding-xs pointer"
              // onClick={() => setModal(content)}
              // onKeyDown={() => setModal(content)}
              >
                <VscEdit />
              </td>
            </tr>

            <tr>
              <td colSpan={5}>
                <button
                  // onClick={handleAdd}
                  className="display-flex flex-items-center full-width padding-s padding-horizontal-sm text-white"
                ><VscAdd className="margin-right-s" size={18} />Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
