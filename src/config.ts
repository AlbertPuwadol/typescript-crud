import configYaml from 'config-yaml'

const rawConfig = configYaml(`${__dirname}/../config/config.yml`)

export class ConfigUtility {
  static get(): any {
    return rawConfig
  }
}

export const config = ConfigUtility.get()