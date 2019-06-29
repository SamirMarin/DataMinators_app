import { combineReducers } from 'redux'
import {
  ADD_FILES,
  ADD_FOLDER,
  ADD_TIMESTAMP_FOLDER,
  SWITCH_TIMESTAMP_FOLDER_SHOW,
  TABLE_CREATE
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
            [timestampFolderName]: { 
              'files': files,
              'show': state[folderName][tenantFolderName][timestampFolderName]['show']
            }
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
            [timestampFolderName]:{
              'files': [],
              'show': false
            }
          }
        } 
      }
    case SWITCH_TIMESTAMP_FOLDER_SHOW:
      return {
        ...state,
        [folderName]: {
          ...state[folderName],
          [tenantFolderName]: {
            ...state[folderName][tenantFolderName],
            [timestampFolderName]:{
              ...state[folderName][tenantFolderName][timestampFolderName],
              'show': !state[folderName][tenantFolderName][timestampFolderName]['show']
            }
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

function loading (state={ table_creating: false }, action) {
  switch (action.type) {
    case TABLE_CREATE:
      const { tableCreating } = action
      return {
        ...state,
        ['table_creating']: tableCreating
      }
    default:
      return state
  }
}

export default combineReducers({
  fileSystem,
  loading,
})
