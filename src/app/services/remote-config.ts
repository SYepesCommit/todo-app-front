import { Injectable, inject } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';
import { REMOTE_CONFIG_DICTIONARY } from '../constants/remote-config.schema';


@Injectable({ providedIn: 'root' })
export class ConfigService {
  private remoteConfig = inject(RemoteConfig);

  private _values = new BehaviorSubject<Record<string, boolean | string | number>>({});
  public values$ = this._values.asObservable();

  constructor() {
    this.loadAllConfigs();
  }

  private async loadAllConfigs() {
    try {
      this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
      const n = await fetchAndActivate(this.remoteConfig);
      const newValues: Record<string, boolean | string | number> = {};

      REMOTE_CONFIG_DICTIONARY.forEach(meta => {
        const remoteVal = getValue(this.remoteConfig, meta.key);
        if (meta.type === 'boolean') newValues[meta.key] = remoteVal.asBoolean();
        else if (meta.type === 'number') newValues[meta.key] = remoteVal.asNumber();
        else newValues[meta.key] = remoteVal.asString();
      });
      this._values.next(newValues);
    } catch (err) {
      const defaults: Record<string, boolean | string | number> = {};
      REMOTE_CONFIG_DICTIONARY.forEach(m => defaults[m.key] = m.defaultValue);
      this._values.next(defaults);
    }
  }

  getValue(key: string): boolean | string | number | undefined {
    return this._values.value[key];
  }
}