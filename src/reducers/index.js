import { combineReducers } from 'redux'
import {
  ADD_FILE,
  ADD_FOLDER,
  ADD_TIMESTAMP_FOLDER
} from '../actions'

function fileSystem (state={}, action) {
  const { folderName, tenantFolderName } = action
  switch (action.type) {
    case ADD_FILE:
      const { folder, file } = action
      return {
        ...state,
        [folder]: [...state[folder], file] 
      }
    case ADD_FOLDER:
      return {
        ...state,
        [folderName]: {
          ...state[folderName],
          [tenantFolderName]: {}
        } 
      }
    case ADD_TIMESTAMP_FOLDER:
      const { timestampFolderName } = action
      return {
        ...state,
        [folderName]: {
          ...state[folderName],
          [tenantFolderName]: {
            ...state[folderName][tenantFolderName],
            [timestampFolderName]: []
          }
        } 
      }
    default:
      return state
  }
}

function folders (state={}, action) {
  switch (action.type) {
    case ADD_FOLDER:
      const { folder } = action
      return {
        ...state,
        [folder.name]: []
      }
    default:
      return state
  }
}

export default combineReducers({
  fileSystem,
})
