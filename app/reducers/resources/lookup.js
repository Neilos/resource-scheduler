import actionType from '../../constants/actionTypes'

const initialState = {}

export default function (state = initialState, action) {

  switch(action.type) {
    case actionType.CREATE_RESOURCE_SUCCEEDED:
    case actionType.UPDATE_RESOURCE_SUCCEEDED:
      const resource = action.data.resource
      return Object.assign({}, state, {[resource.id]: resource})

    default:
      return state
  }
}
