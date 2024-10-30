// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Journal } = initSchema(schema);

export {
  Journal
};