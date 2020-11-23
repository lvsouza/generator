import Store from 'electron-store';
import { JSONSchemaType } from 'json-schema-typed';

interface ISchema {
  projectPath: string,
  templatePath: string
}

const schema = {
  projectPath: {
    type: JSONSchemaType.String,
    default: ''
  },
  templatePath: {
    type: JSONSchemaType.String,
    default: ''
  }
};

const configsStore = new Store<ISchema>({
  watch: true,
  schema
});

export { schema, configsStore };
