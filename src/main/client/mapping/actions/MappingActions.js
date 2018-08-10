import { showMessage, hideSpinner } from "../../common/Actions";
import Ajax from "../../common/Ajax";

const isEmptyString = (aString) => aString === "";

const objectify = (key,value) => (
    {
        [key]:value
    }
);

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


export function saveMappings(mappingName = "", columnMappings, lookupTable, history, category = "instance") {
    return async (dispatch, getState) => {
        const mappingObj = createJson(columnMappings);

        if (isEmptyString(mappingName)) {
            dispatch(showMessage("Should have Mapping Name", "error"));
        }else if (hasNoMappings(mappingObj)) {
            dispatch(showMessage("At least one Column should have Mapping", "error"));
        }else if(getState().allMappingNames.includes(mappingName)) {
            dispatch(showMessage("Mapping Name should be unique", "error"));
        } else {
            let body = {
                mappingName,
                lookupTable: JSON.stringify(objectify(category,lookupTable)),
                mappingJson: JSON.stringify(objectify(category,mappingObj))
            };

            let ajax = new Ajax();

            dispatch(selectedTable());
            dispatch(filteredTables());

            try {
                dispatch(hideSpinner(false));
                let response = await ajax.put("/addMapping", body);
                dispatch(showMessage(response.data, "success"));
                dispatch(addNewMapping(mappingName));
                dispatch(hideSpinner());
                history.push("/mapping");
            } catch (e) {
                dispatch(showMessage(e.message, "error"));
            }
        }
    };
}
