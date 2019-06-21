export const ADD_FILE = 'ADD_FILE'
export const ADD_FOLDER = 'ADD_FOLDER'


export function addFile ({ file }) {
  return {
    type: ADD_FILE,
    file,
  }
}

export function addFolder ({ folderName, tenantFolderName  }) {
  return {
    type: ADD_FOLDER,
    folderName,
    tenantFolderName,
  }
}


