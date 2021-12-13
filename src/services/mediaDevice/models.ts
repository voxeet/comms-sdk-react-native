/** The ComfortNoiseLevel enum gathers the available comfort noise levels. */
export enum ComfortNoiseLevel {
  /** The default comfort noise level that is based on the device database. The database includes the proper comfort noise levels, individual for all devices. */
  Default = 'default',
  /** The low comfort noise level. */
  Low = 'low',
  /** The medium comfort noise level. */
  Medium = 'medium',
  /** The disabled comfort noise. */
  Off = 'off',
}
