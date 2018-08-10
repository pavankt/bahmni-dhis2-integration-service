import {hideSpinner, showMessage} from "../../common/Actions";
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

export function currentMapping(mappingName = "") {
    return {
        type : 'currentMapping',
        mappingName
    }
}

export function mappingJson(mappingJson = {}) {
    return {
        type : 'mappingJson',
        mappingJson
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


export function saveMappings(mappingName = "", columnMappings, lookupTable, history = {}, category = "instance") {
    return async (dispatch, getState) => {
        const mappingObj = createJson(columnMappings);

        if (isEmptyString(mappingName)) {
            dispatch(showMessage("Should have Mapping Name", "error"));
        }else if (hasNoMappings(mappingObj)) {
            dispatch(showMessage("At least one Bahmni Data Point should have DHIS2 Data Element ID mapped", "error"));
        }else if(getState().allMappingNames.includes(mappingName.trim()) && (getState().currentMapping === "" || mappingName !== getState().currentMapping)) {
                dispatch(showMessage("Mapping Name should be unique", "error"));
        } else {
            let body = {
                mappingName : mappingName.trim(),
                lookupTable: JSON.stringify(objectify(category,lookupTable)),
                mappingJson: JSON.stringify(objectify(category,mappingObj))
            };

            dispatch(selectedTable());
            dispatch(filteredTables());

            try {
                dispatch(hideSpinner(false));
                let ajax = Ajax.instance();
                let response = await ajax.put("/dhis-integration/saveMapping", body);
                dispatch(showMessage(response.data, "success"));
                dispatch(addNewMapping(mappingName));
                dispatch(hideSpinner());
                history.push("/dhis-integration/mapping");
                dispatch(currentMapping());
                dispatch(mappingJson())
            } catch (e) {
                dispatch(showMessage(e.message, "error"));
            }
        }
    };
}


function isJSON(type) {
    return type !== undefined && type.toLowerCase() === 'json';
}

let parseResponse = (res)=>{
    let keys = Object.keys(res);

    keys.forEach((key)=>{
        if(isJSON(res[key].type))
            res[key].value = JSON.parse(res[key].value)
    });

    return res;
};

export function getMapping(mappingNameToEdit, history) {
    return async (dispatch)=> {
        let ajax = Ajax.instance();
        let response = parseResponse(await ajax.get('/dhis-integration/getMapping',{"mappingName" : mappingNameToEdit}));
        console.log("json---->", response.mapping_json.value);
        dispatch(selectedTable(response.lookup_table.value.instance));
        dispatch(currentMapping(response.mapping_name));
        dispatch(mappingJson(response.mapping_json.value));
        history.push('/dhis-integration/mapping/addEditMappings');
    }
}