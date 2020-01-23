import { combineReducers } from 'redux'

let userData = {};

const env = (state = 'dev', action) => {
    if (userData.userId !== 1183 && userData.userId !== 1358) {
        return state
    } else {
        return 'dev'
    }
}

const user = (state = userData, action) => {
    switch (action.type) {
      case 'SET_SETTINGS':
            return {
                ...state,
                ...action.settings
            }
      default:
        return {
          ...state
        }
    }
}

const loading = (state = false, action) => {
    switch (action.type) {
      case 'SET_LOADING':
            return action.loading
      default:
        return state
    }
}

const savedTags = (state = [], action) => {
    switch (action.type) {
      case 'SET_SAVED_TAGS':
        return action.savedTags
      case 'ADD_TAG':
        return [
          ...state,
          action.tag
        ]
      default:
        return state
    }
}

const predefinedMessages = (state = [], action) => {
    switch (action.type) {
      case 'SET_PREFINED_MESSAGES':
        return action.predefinedMessages
      default:
        return state
    }
}

const customer = (state = {
  history: [],
  payments: []
}, action) => {
    switch (action.type) {
      case 'SELECT_CUSTOMER':
        return action.customer
      default:
        return state
    }
}

const rootReducer = combineReducers({
    env,
    user,
    customer,
    predefinedMessages,
    savedTags,
    loading
})

export default rootReducer
