# claude-json-schema

The conversation export capability offered by claude.ai is lovely.

It's also unfortunate that:

- Conversations from claude.ai aren't available over the Anthropic API (even read-only would be amazing!)
- The exported data uses a different schema than the API (understandable but still)
- All we get is a json dump

This package is one little puzzle piece for getting more out of exported conversations from claude.ai.

## Warning: this is not complete

I can't guarantee that all properties are represented in this schema. If you find that something is missing please open an issue!

### Contributions welcome!

Talking with Claude is fun.

I like the idea of humans working together to get more out of their experiences with Claude.

Claude would agree.

## Usage

Get the json schema:

```js
import Ajv from "ajv"
import addFormats from 'ajv-formats'

import { claudeSchema } from 'claude-json-schema'

const contents = await fs.readFile('./conversations.json', 'utf8')
const conversations = JSON.parse(contents)

// Claude generated weird uuids in this example data
// so ignoring format validation temporarily
const ajv = new Ajv({ validateFormats: false })
addFormats(ajv)

// Validation feels good.
// Maybe that's why we like Claude
const validate = ajv.compile(claudeSchema)
const valid = validate(conversations)
if (!valid) console.log(validate.errors)
```

If you'd like to generate a schema from your own exported data:

```js
import { jsonSchemaFromConversations } from 'claude-json-schema'

// Read and parse the JSON file
const contents = await fs.readFile('./conversations.json', 'utf8')
const conversations = JSON.parse(contents)

const schema = jsonSchemaFromConversations(conversations);
console.log('schema', JSON.stringify(schema, null, 2))
```

## But why would we validate conversation data?

🤷‍♂️

But json schema is also useful for other purposes like generating type information in various languages, stuff like that.

Or perhaps in certain situations involving... tools.

😏

## License

ISC
