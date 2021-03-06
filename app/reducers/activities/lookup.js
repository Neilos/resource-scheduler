import actionType from '../../constants/actionTypes'

const initialState = {}

export default function (state = initialState, action) {

  switch(action.type) {
    case actionType.CREATE_ACTIVITY_SUCCEEDED:
    case actionType.UPDATE_ACTIVITY_SUCCEEDED:
      const activity = action.data.activity
      return Object.assign({}, state, {[activity.id]: activity})

    default:
      return state
  }
}
