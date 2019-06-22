import { combineReducers } from 'redux'
import {
  ADD_FILES,
  ADD_FOLDER,
  ADD_TIMESTAMP_FOLDER
} from '../actions'

function fileSystem (state={}, action) {
  const { folderName, tenantFolderName, timestampFolderName } = action
  switch (action.type) {
    case ADD_FILES:
      const { files } = action
      return {
        ...state,
        [folderName]: {
          ...state[folderName],
          [tenantFolderName]: {
            ...state[folderName][tenantFolderName],
            [timestampFolderName]: files
          }
        } 
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
      //const { timestampFolderName } = action
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
