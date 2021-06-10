// Describing the shape of the pricing's slice of state
export interface Config {
  theme: string;
  storageType: {
    name: string;
    company: string;
    type: 'cloud' | 'cdn' | 'local';
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfigState extends Config {}

/**
 * @desc here is were all actio types are located
 */
// eslint-disable-next-line import/prefer-default-export
export const CHANGE_CONFIG = 'CHANGE_CONFIG';
