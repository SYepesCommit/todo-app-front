import { ConfigMetadata } from "../types/types.config.parameter";

export const REMOTE_CONFIG_DICTIONARY: ConfigMetadata[] = [
  {
    key: 'show_edit_category',
    type: 'boolean',
    defaultValue: false,
    description: 'Habilita el botón de edición en el gestor de categorías.'
  },
  {
    key: 'max_tasks_allowed',
    type: 'number',
    defaultValue: 3,
    description: 'Límite máximo de tareas que un usuario puede crear.'
  }
];