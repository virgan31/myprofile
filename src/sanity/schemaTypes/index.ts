import { type SchemaTypeDefinition } from 'sanity'
import { profileType } from './profileType'
import { projectType } from './projectType'

export const schemaTypes: SchemaTypeDefinition[] = [profileType, projectType]
