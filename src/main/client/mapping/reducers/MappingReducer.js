export function allTables(state = [], action = {}) {
  switch (action.type) {
    case 'allTables':
      return action.allTables;
    default:
      return state;
  }
}

export function filteredTables(state = [], action = {}) {
  switch (action.type) {
    case 'filteredTables':
      return action.filteredTables;
    default:
      return state;
  }
}

export function selectedTable(state = '', action = {}) {
  switch (action.type) {
    case 'selectedTable':
      return action.selectedTable;
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
