/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { TypeConfig } from './config/enums'
import track from './track'

export function unsupportedType(type: TypeConfig, env?: 'main' | 'renderer'): never {
  const args = [track(), 'unsupported type', type]

  if (env) {
    args.push('for', env)
  }

  console.error(...args)
  process.exit(1)
}

export default class Logger {
  constructor(private namespace: string) {}

  log(...args: unknown[]): void {
    console.log(track(), `(${this.namespace})`, ...args)
  }

  debug(...args: unknown[]): void {
    if ((process.env.DEBUG ?? '').trim() !== '') {
      console.log(track(), `(${this.namespace})`, ...args, '[DEBUG]')
    }
  }

  error(...args: unknown[]): void {
    console.error(track(), `(${this.namespace})`, ...args)
  }

  end(...args: unknown[]): never {
    this.error(...args)
    process.exit(1)
  }
}
