import React, { Component } from 'react'

import ScheduleTable from '../components/ScheduleTable'
import DialogForm from '../components/DialogForm'
import StreamDaysEditor from '../components/StreamDaysEditor'

const styles = {
  Schedule: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    padding: 16,
  },
}

export default function Schedule (props) {
  const {
    newResource, cancelNewResource, createResource,
    editResource, cancelEditResource, updateResource,
    newActivity, cancelNewActivity, createActivity,
    editActivity, cancelEditActivity, updateActivity,
    updateStreamDaySelection,
    updateStreamDays,

    activeStream,
    activities,
    editing,
    resources,
    selectedStreamDays,
    streamsGroupedByActivities,
    streamsGroupedByResources,
    streamGrouping,
  } = props

  return (
    <div className="Schedule" style={styles.Schedule}>

      <DialogForm
        newEntity={editing.newResource}
        existingEntity={editing.existingResource}
        onCancelNew={cancelNewResource}
        onCreate={createResource}
        onCancelEdit={cancelEditResource}
        onUpdate={updateResource}
        formId='formResource'
        entityType='Resource'
      />

      <DialogForm
        newEntity={editing.newActivity}
        existingEntity={editing.existingActivity}
        onCancelNew={cancelNewActivity}
        onCreate={createActivity}
        onCancelEdit={cancelEditActivity}
        onUpdate={updateActivity}
        formId='formActivity'
        entityType='Activity'
      />

      <StreamDaysEditor
        activeStream={activeStream}
        updateStreamDays={updateStreamDays}
      />

      <ScheduleTable
        {...props}
        style={styles.ScheduleTable}
      />

    </div>
  )
}
