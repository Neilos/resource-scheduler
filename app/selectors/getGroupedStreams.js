import underscore from 'underscore'
import { createSelector } from 'reselect'

const blankDay = (resource_id, activity_id, day) => {
  return {
    id: null,
    day: day,
    resource_id,
    activity_id,
    hours: undefined,
    scheduled: false,
    uid: `${day}:${resource_id}:${activity_id}`,
  }
}

const getResources = (state) => state.resources
const getActivities = (state) => state.activities
const getDays = (state) => state.days
const getResourceActivityDayLookup = (state) => {
  return state.resourceActivityDays.lookup
}

const getGroupedStreams = createSelector(
  [
    getResources,
    getActivities,
    getDays,
    getResourceActivityDayLookup,
  ],
  (resources, activities, days, resourceActivityDayLookup) => {
    let groupedByActivity = {}
    let groupedByResource = {}

    resources.ids.forEach((resource_id) => {
      activities.ids.forEach((activity_id) => {
        let streamDays = []
        let hasWorkedOrScheduledDays = false
        const resource = resources.lookup[resource_id]
        const activity = activities.lookup[activity_id]

        days.forEach((day) => {
          const key = `${day}:${resource_id}:${activity_id}`
          const resourceActivityDay = resourceActivityDayLookup[key]
          if (resourceActivityDay) {
            streamDays.push(resourceActivityDay)
            hasWorkedOrScheduledDays = hasWorkedOrScheduledDays || true
          } else {
            streamDays.push(blankDay(resource_id, activity_id, day))
          }
        })

        const baseStream = {
          streamDays,
          activity_id,
          resource_id,
          hasWorkedOrScheduledDays,
          uid: `${resource_id}:${activity_id}`,
        }

        const activityStream = Object.assign(
          {label: activity.name}, baseStream
        )

        const resourceStream = Object.assign(
          {label: resource.name}, baseStream
        )

        groupedByActivity[activity_id] = groupedByActivity[activity_id] || []
        groupedByActivity[activity_id].push(resourceStream)

        groupedByResource[resource_id] = groupedByResource[resource_id] || []
        groupedByResource[resource_id].push(activityStream)
      })
    })

    return {
      streamsGroupedByActivities: groupedByActivity,
      streamsGroupedByResources: groupedByResource,
    }

  }
)

export default getGroupedStreams
