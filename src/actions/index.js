export const ADD_FILES = 'ADD_FILES'
export const ADD_FOLDER = 'ADD_FOLDER'
export const ADD_TIMESTAMP_FOLDER = 'ADD_TIMESTAMP_FOLDER'


export function addFiles ({  folderName, tenantFolderName, timestampFolderName, files }) {
  return {
    type: ADD_FILES,
    folderName,
    tenantFolderName,
    timestampFolderName,
    files,
  }
}

export function addFolder ({ folderName, tenantFolderName  }) {
  return {
    type: ADD_FOLDER,
    folderName,
    tenantFolderName,
  }
}

export function addTimeStampFolder ( { folderName, tenantFolderName, timestampFolderName } ) {
  return {
    type: ADD_TIMESTAMP_FOLDER,
    folderName,
    tenantFolderName,
    timestampFolderName,
  }
}


