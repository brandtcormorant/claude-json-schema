import * as schema from "./schema.js";

export const claudeSchema = schema.claudeSchema

/**
 * Generates a JSON Schema from an array of Claude conversation objects.
 *
 * This function analyzes the structure of Claude conversations by:
 * 1. Collecting all possible keypaths from every conversation
 * 2. Converting these paths into a structured JSON Schema
 *
 * The resulting schema describes the complete structure of Claude conversations,
 * including message content, attachments, and tool usage patterns.
 *
 * @param {Array<Object>} data - Array of Claude conversation objects to analyze
 * @returns {Object} A JSON Schema object describing the structure of Claude conversations
 * @example
 * const conversations = [
 *   {
 *     uuid: "123",
 *     chat_messages: [{
 *       content: [{ type: "text", text: "Hello" }]
 *     }]
 *   }
 * ];
 * const schema = jsonSchemaFromConversations(conversations);
 */
export function jsonSchemaFromConversations(data) {
  // Get all keypaths from all conversations
  const keypaths = new Set();
  data.forEach((conversation) => {
    generateKeypaths(conversation).forEach((path) => keypaths.add(path));
  });

  // Build schema from paths
  return buildSchemaFromPaths(Array.from(keypaths));
}

function generateKeypaths(obj, path = "root", results = []) {
  if (Array.isArray(obj)) {
    results.push(`${path},array`);
    obj.forEach((item, index) => {
      generateKeypaths(item, `${path}.${index}`, results);
    });
  } else if (typeof obj === "object" && obj !== null) {
    results.push(`${path},object`);
    Object.entries(obj).forEach(([key, value]) => {
      generateKeypaths(value, `${path}.${key}`, results);
    });
  } else {
    results.push(`${path},${typeof obj}`);
  }
  return results;
}

function buildSchemaFromPaths(paths) {
  // Start with basic schema structure
  const schema = {
    title: "claude conversations",
    type: "array",
    items: {
      type: "object",
      properties: {},
    },
  };

  // Group paths by their structural level
  const grouped = paths.reduce((acc, path) => {
    const [keypath, type] = path.split(",");
    const parts = keypath.split(".");

    // Skip root and numeric indices
    const structuralPath = parts
      .filter((part) => part !== "root" && isNaN(part))
      .join(".");

    if (!acc[structuralPath]) {
      acc[structuralPath] = new Set();
    }
    acc[structuralPath].add(type);

    return acc;
  }, {});

  return buildSchemaStructure(grouped, schema);
}

function buildSchemaStructure(grouped, schema) {
  Object.entries(grouped).forEach(([path, types]) => {
    if (!path) return

    const parts = path.split('.')
    let current = schema.items.properties

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1

      if (!current[part]) {
        current[part] = {}
      }

      if (isLast) {
        // For the final property, set its type and format
        const type = inferType(types)
        current[part] = {
          type,
          ...(type === 'array' ? {
            items: {
              type: 'object',
              properties: {}
            }
          } : {}),
          ...(inferFormat(part, type) || {})
        }
      } else {
        if (current[part]?.type && current[part].type === 'object') {
          current[part].properties = current[part].properties ?? {}
        }

        // For intermediate properties, set up the structure
        if (!current[part].type) {
          current[part].type = 'object'
          current[part].properties = {}
        }

        if (current[part].type === 'array') {
          current = current[part].items.properties
          continue
        }

        if (current[part].type === 'object') {
          current = current[part].properties
        }
      }
    }
  })

  return schema
}

function inferType(types) {
  // Convert Set to Array for easier handling
  const typeArray = Array.from(types);

  // If we see both array and object, it's an array of objects
  if (typeArray.includes("array") && typeArray.includes("object")) {
    return "array";
  }

  if (typeArray.includes("array")) return "array";
  if (typeArray.includes("object")) return "object";
  if (typeArray.includes("string")) return "string";
  if (typeArray.includes("number")) return "number";
  if (typeArray.includes("boolean")) return "boolean";

  return "string"; // default
}

function inferFormat(key, type) {
  if (type !== "string") return null;

  if (key === "uuid") {
    return { format: "uuid" };
  }

  if (key.endsWith("_at") || key.endsWith("date")) {
    return { format: "date-time" };
  }

  return null;
}
