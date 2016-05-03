import React from 'react'

import dimensions from '../constants/dimensions'
import colors from '../constants/colors'


const height = dimensions.STREAM_HEIGHT -
                2 * dimensions.BORDER_THICKNESS;

const styles = {
  ResourceActivityDay: {
    display: 'inline-block',
    position: 'relative',
    width: dimensions.DAY_WIDTH - 2 * dimensions.BORDER_THICKNESS,
    height: height,
    borderWidth: dimensions.BORDER_THICKNESS,
    borderStyle: 'solid',
    borderColor: colors.BORDER,
    verticalAlign: 'bottom',
    overflowY: 'hidden',
    zIndex: 0,
  },
  textContainer: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  text: {
    display: 'inline-flex',
    justifyContent: 'center',
    flex: '1 0 auto',
  },
  scheduled: {
    backgroundColor: colors.SCHEDULED_CELL,
  },
  unscheduled: {
    backgroundColor: colors.BACKGROUND,
  },
  bar: {
    display: 'block',
    background: colors.HOURS_BAR,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
}

export default function ResourceActivityDay(props) {
  const {
    scheduled,
    hours,
  } = props

  const backgroundStyles = scheduled ? styles.scheduled : styles.unscheduled

  const hrsKnown = typeof hours == 'number'

  const barHeight = (scheduled && hrsKnown) ? hours*dimensions.HOUR_HEIGHT : 0
  const barStyles = Object.assign({}, styles.bar, {height: barHeight})

  return (
    <div
      className="ResourceActivityDay"
      style={Object.assign(styles.ResourceActivityDay, backgroundStyles)}>
      <div style={styles.textContainer}>
        <div style={styles.text}>
          {(scheduled ) ? (hrsKnown ? hours : '?'): null}
        </div>
      </div>
      <div style={barStyles}/>
    </div>
  )
}
