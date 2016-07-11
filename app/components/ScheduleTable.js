import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import ResourceActivityStream from './ResourceActivityStream'
import StreamLabelsContainer from './StreamLabelsContainer'
import TimeStream from './TimeStream'
import ResourceActivityStreamsContainer from './ResourceActivityStreamsContainer'
import dimensions from '../constants/dimensions'
import colors from '../constants/colors'
import ViewSwitcher from '../components/ViewSwitcher'

const styles = {
  ScheduleTable: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headerRow: {
    flex: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bodyRow: {
    flex: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: `calc(100% - ${dimensions.STREAM_CHANNEL_HEIGHT}px)`,
  },
  topLeftCorner: {
    width: dimensions.STREAM_LABEL_WIDTH,
    flex: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingLeft: dimensions.desktopGutterLess,
    zIndex: 3,
    height: dimensions.STREAM_CHANNEL_HEIGHT,
  },
  dateControl: {
    flex: 'none',
    width: 48,
  },
  ViewSwitcher: {
    flex: '1 1 auto',
    height: '100%'
  },
  timeStream: {
    flex: '1 1 auto',
    overflowY: 'hidden',
    overflowX: 'scroll',
    zIndex: 2,
    display: 'flex',
  },
  streamLabels: {
    flex: 'none',
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: dimensions.STREAM_LABEL_WIDTH,
    zIndex: 2,
  },
  streamsContainer : {
    flex: '1 1 auto',
    overflowY: 'hidden',
    overflowX: 'hidden',
    zIndex: 0,
    height: '100%',
  },
}

export default function ScheduleTable (props) {

  const onScrollTime = (event) => {
    const scrollLeft = event.target.scrollLeft
    document.getElementById('StreamsContainer').scrollLeft = scrollLeft
  }

  const onScrollResources = (event) => {
    const scrollTop = event.target.scrollTop
    document.getElementById('StreamsContainer').scrollTop = scrollTop
  }

  return (
    <Paper className="ScheduleTable"
      zDepth={2} rounded={false} style={styles.ScheduleTable} >

      <div className="ScheduleTable-headerRow"
        style={styles.headerRow} >

        <Paper className='ScheduleTable-topLeftCorner'
          zDepth={1} rounded={false} style={styles.topLeftCorner} >
          <ViewSwitcher
            viewGroupedBy={props.streamGrouping}
            onViewGroupChange={props.regroupStreams}
            layoutStyles={styles.ViewSwitcher} />
          <div style={styles.dateControl} >
            <IconButton
              onTouchTap={() => {
                const dateCount = props.dates.length
                const startDate = props.dates[0]
                const endDate = props.dates[dateCount - 1]
                props.editDateRange(startDate, endDate)
              }}
              tooltip="Change date range" >
              <FontIcon className="material-icons"
                hoverColor={colors.accent1Color} >
                date_range
              </FontIcon>
            </IconButton>
          </div>
        </Paper>

        <Paper className="ScheduleTable-timeStream"
          zDepth={2} rounded={false} style={styles.timeStream}
          onScroll={onScrollTime} >
          <TimeStream dates={props.dates} />
        </Paper>

      </div>

      <div className="ScheduleTable-bodyRow" style={styles.bodyRow} >

        <Paper className="ScheduleTable-streamLabels"
          zDepth={2} rounded={false} style={styles.streamLabels}
          onScroll={onScrollResources} >
          <StreamLabelsContainer {...props}
            viewGroupedBy={props.streamGrouping} />
        </Paper>

        <div id='StreamsContainer' className="ScheduleTable-streamsContainer"
          style={styles.streamsContainer} >
          <ResourceActivityStreamsContainer {...props}
            viewGroupedBy={props.streamGrouping} />
        </div>

      </div>

    </Paper>
  )
}

ScheduleTable.propTypes = {
  activeStream: PropTypes.object.isRequired,
  activities: PropTypes.object.isRequired,
  dates: PropTypes.array.isRequired,
  resourceActivityDays: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  streamsGroupedByActivities: PropTypes.object.isRequired,
  streamsGroupedByResources: PropTypes.object.isRequired,
  streamGrouping: PropTypes.string.isRequired,
  editDateRange: PropTypes.func.isRequired,
}
