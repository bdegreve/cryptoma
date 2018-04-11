/* @flow */

import React from 'react'

import style from './loader.less'

export default () => (
  <div className={style.loader}>
    <span
      className={`${style.spinner} text-muted glyphicon glyphicon-refresh`}
      aria-hidden='true'
    />
  </div>
)
