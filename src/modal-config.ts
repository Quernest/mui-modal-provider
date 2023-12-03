import { ModalConfig } from './types';

const config: ModalConfig = {
  /**
   * If set to `true` you will get an error when trying to access
   * a context without the `ModalProvider` declared above.
   */
  enforceProvider: false,
};

export function setModalConfig(newConfig: Partial<ModalConfig>) {
  Object.assign(config, newConfig);
}

export function getModalConfig() {
  return config;
}
