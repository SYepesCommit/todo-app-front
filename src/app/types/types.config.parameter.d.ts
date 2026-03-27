export type ConfigValueType = 'boolean' | 'number' | 'string';

export interface ConfigMetadata {
  key: string;
  type: ConfigValueType;
  defaultValue: any;
  description: string;
}