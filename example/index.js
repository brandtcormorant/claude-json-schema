import Ajv from "ajv"
import addFormats from 'ajv-formats'

import { claudeSchema } from '../schema.js'
import { conversations } from './data.js'

// Claude generated weird uuids in this example data
// so ignoring format validation temporarily
const ajv = new Ajv({ validateFormats: false })
addFormats(ajv)

const validate = ajv.compile(claudeSchema)
const valid = validate(conversations)
if (!valid) console.log(validate.errors)
