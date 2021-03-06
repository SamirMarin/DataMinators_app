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
