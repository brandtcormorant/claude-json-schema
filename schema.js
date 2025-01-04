export const claudeSchema = {
  "title": "claude-json-schema",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "account": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "format": "uuid"
          }
        }
      },
      "chat_messages": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid"
            },
            "text": {
              "type": "string"
            },
            "content": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string"
                  },
                  "text": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "input": {
                    "type": "object",
                    "properties": {
                      "code": {
                        "type": "string"
                      },
                      "id": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string"
                      },
                      "title": {
                        "type": "string"
                      },
                      "command": {
                        "type": "string"
                      },
                      "content": {
                        "type": "string"
                      },
                      "version_uuid": {
                        "type": "string"
                      },
                      "language": {
                        "type": "string"
                      },
                      "new_str": {
                        "type": "string"
                      },
                      "old_str": {
                        "type": "string"
                      },
                      "path": {
                        "type": "string"
                      },
                      "pattern": {
                        "type": "string"
                      }
                    }
                  },
                  "content": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        },
                        "text": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "is_error": {
                    "type": "boolean"
                  }
                }
              }
            },
            "sender": {
              "type": "string"
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
            },
            "attachments": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "file_name": {
                    "type": "string"
                  },
                  "file_size": {
                    "type": "number"
                  },
                  "file_type": {
                    "type": "string"
                  },
                  "extracted_content": {
                    "type": "string"
                  }
                }
              }
            },
            "files": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "file_name": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
