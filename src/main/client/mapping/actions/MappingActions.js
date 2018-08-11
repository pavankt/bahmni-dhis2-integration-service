import { showMessage, hideSpinner } from "../../common/Actions";
import Ajax from "../../common/Ajax";

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


export function allMappingNames(mappingNames = []){
  return{
    type: 'renderedMappingNames',
    renderedMappingNames: mappingNames
  }
}

export function addNewMapping(mappingName) {
    return {
        type: 'addNewMapping',
        mappingName
    }
}

export function hasNoMappings(mappings) {
    let elementIds = Object.values(mappings);
    return elementIds.filter(element => element !== "").length === 0;
}

export function createJson(columnMappings) {
    let mappingObj = {};
    Array.from(columnMappings).map(mapping => {
        mappingObj[mapping.firstElementChild.innerText] = mapping.lastChild.firstElementChild.value;
    });

    return mappingObj;
}

const isEmptyString = (aString) => aString === "";

export function saveMappings(mappingName = "", columnMappings, lookupTable, history = {}, category = "instance") {
    return async (dispatch, getState) => {
        const mappingObj = createJson(columnMappings);

        if (isEmptyString(mappingName)) {
            dispatch(showMessage("Should have Mapping Name", "error"));
        }else if (hasNoMappings(mappingObj)) {
            dispatch(showMessage("At least one Bahmni Data Point should have DHIS2 Data Element ID mapped", "error"));
        }else if(getState().allMappingNames.includes(mappingName)) {
            dispatch(showMessage("Mapping Name should be unique", "error"));
        } else {
            let body = {
                mappingName,
                category,
                lookupTable,
                mappingJson: JSON.stringify(mappingObj)
            };

            let ajax = Ajax.instance();

            dispatch(selectedTable());
            dispatch(filteredTables());

            try {
                dispatch(hideSpinner(false));
                let response = await ajax.put("/dhis-integration/addMapping", body);
                dispatch(showMessage(response.data, "success"));
                dispatch(addNewMapping(mappingName));
                dispatch(hideSpinner());
                history.push("/dhis-integration/mapping");
            } catch (e) {
                dispatch(showMessage(e.message, "error"));
            }
        }
    };
}
