export function allTables(state = [], action = {}) {
  switch (action.type) {
    case 'allTables':
      return action.allTables;
    default:
      return state;
  }
}

export function filteredInstanceTables(state = [], action = {}) {
  switch (action.type) {
    case 'filteredInstanceTables':
      return action.filteredInstanceTables;
    default:
      return state;
  }
}

export function selectedInstanceTable(state = '', action = {}) {
  switch (action.type) {
    case 'selectedInstanceTable':
      return action.selectedInstanceTable;
    default:
      return state;
  }
}

export function selectedTableColumns(state = [], action = {}) {
  switch (action.type) {
    case 'selectedTableColumns':
      return action.selectedTableColumns;
    default:
      return state;
  }
}

export function allMappingNames(state = [], action = {}){
    switch (action.type) {
        case 'allMappings':
            return action.allMappings;
        case 'addNewMapping':
            return state.concat(action.mappingName);
        default:
            return state;
    }
}

export function currentMapping(state = '', action = {}) {
    switch (action.type) {
        case 'currentMapping':
            return action.mappingName;
        default:
            return state;
    }
}

export function mappingJson(state = {}, action = {}) {
    switch (action.type) {
        case 'mappingJson':
            return action.mappingJson;
        default:
            return state;
    }
}
