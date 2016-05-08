import React from 'react'
import FlipMove from 'react-flip-move'
import {List} from 'material-ui/List'
import underscore from 'underscore'

import StatefulDivider from './StatefulDivider'
import ListGroupResource from './ListGroupResource'
import ListGroupActivity from './ListGroupActivity'
import ListItemResource from './ListItemResource'
import ListItemActivity from './ListItemActivity'
import dimensions from './../constants/dimensions'
import animations from './../constants/animations'

const styles = {
  List: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  UnnestedListItem: {
    paddingLeft: 0,
  },
  NestedListItem: {
    paddingLeft: 42,
  }
}

export default function StreamLabelsContainer(props) {
  const {
    streams,
    resources,
    activities,
    viewGroupedBy,
    editResource,
    editActivity,
    activeStream,
    changeActiveStream,
  } = props

  const activityGroups = () => {
    const groupedStreams = streams.groupedByActivity
    const list = []

    activities.ids.forEach((activity_id) => {
      const activity = activities.lookup[activity_id]
      const streams = groupedStreams[activity_id] || []

      list.push(<StatefulDivider key={`d${activity_id}`} />)

      list.push(
        <ListGroupActivity
          key={`r${activity_id}`}
          activity={activity}
          onEdit={() => editActivity(activity)}
          layoutStyles={styles.UnnestedListItem}
        />
      )

      streams.forEach((stream) => {
        const resource = resources.lookup[stream.resource_id] || {}
        list.push(
          <ListItemResource
            key={stream.uid}
            uid={stream.uid}
            onTouchTap={changeActiveStream}
            isActive={stream.uid == activeStream.uid}
            resourceName={resource.name || '-'}
            layoutStyles={styles.NestedListItem}
          />
        )
      })
    })

    return list
  }

  const resourceGroups = () => {
    const groupedStreams = streams.groupedByResource
    const list = []

    resources.ids.forEach((resource_id) => {
      const resource = resources.lookup[resource_id]
      const streams = groupedStreams[resource_id] || []

      list.push(<StatefulDivider key={`d${resource_id}`} />)

      list.push(
        <ListGroupResource
          key={`r${resource_id}`}
          resource={resource}
          onEdit={() => editResource(resource)}
          layoutStyles={styles.UnnestedListItem}
        />
      )

      streams.forEach((stream) => {
        const activity = activities.lookup[stream.activity_id] || {}
        list.push(
          <ListItemActivity
            key={stream.uid}
            uid={stream.uid}
            onTouchTap={changeActiveStream}
            isActive={stream.uid == activeStream.uid}
            activityName={activity.name || '-'}
            layoutStyles={styles.NestedListItem}
          />
        )
      })
    })

    return list
  }

  const groups = () => {
    if (viewGroupedBy == 'activity_id') {
      return activityGroups()
    } else {
      return resourceGroups()
    }
  }

  return (
    <List style={styles.List} className="StreamLabelsContainer">
      <FlipMove {...animations.list}>
        { groups() }
      </FlipMove>
    </List>
  )
}
