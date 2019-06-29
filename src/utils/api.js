const api = "http://127.0.0.1:5000"

const headers = {
  'Accept': 'application/json'
}

export const getFilePaths = (path) =>
  fetch(`${api}/filePath/${path}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const loadTable = (tableName, path, file) =>
  fetch(`${api}/loadTable/${tableName}/${path}/${file}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const loadTableWithDelimiter = (tableName, path, file, delimiter) =>
  fetch(`${api}/loadTableWithDelimiter/${tableName}/${path}/${file}/${delimiter}`, { headers })
    .then(res => {
      if(!res.ok){
        throw Error("Failed to load")
      }
      return res
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)

export const getFolders = (path) =>
  fetch(`${api}/foldersPath/${path}`, { headers })
    .then(res => res.json())
    .then(data => data)
