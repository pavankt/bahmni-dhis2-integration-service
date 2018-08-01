export function allTables(tables = []) {
  return {
    type: 'allTables',
    allTables: tables
  };
}

export function filteredTables(tables = []) {
  return {
    type: 'filteredTables',
    filteredTables: tables
  };
}

export function selectedTable(table = '') {
  return {
    type: 'selectedTable',
    selectedTable: table
  };
}

export function tableColumns(columns = []) {
  return {
    type: 'selectedTableColumns',
    selectedTableColumns: columns
  };
}
