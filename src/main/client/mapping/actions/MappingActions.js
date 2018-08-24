import {hideSpinner, showMessage} from "../../common/Actions";
import { auditLogEventDetails } from '../../common/constants';
import Ajax from "../../common/Ajax";
import auditLog from '../../common/AuditLog';

const isEmptyString = (aString) => aString === "";

export function allTables(tables = []) {
  return {
    type: 'allTables',
    allTables: tables
  };
}

export function filteredInstanceTables(tables = []) {
  return {
    type: 'filteredInstanceTables',
    filteredInstanceTables: tables
  };
}

export function filteredEnrollmentTables(tables = []) {
  return {
    type: 'filteredEnrollmentTables',
    filteredEnrollmentTables: tables
  };
}

export function selectedInstanceTable(table = '') {
  return {
    type: 'selectedInstanceTable',
    selectedInstanceTable: table
  };
}

export function selectedEnrollmentsTable(table = '') {
  return {
    type: 'selectedEnrollmentsTable',
    selectedEnrollmentsTable: table
  };
}

export function instanceTableColumns(columns = []) {
  return {
    type: 'selectedInstanceTableColumns',
    selectedInstanceTableColumns: columns
  };
}

export function enrollmentTableColumns(columns = []) {
  return {
    type: 'selectedEnrollmentTableColumns',
    selectedEnrollmentTableColumns: columns
  };
}

export function allMappingNames(mappingNames = []){
  return{
    type: 'allMappings',
    allMappings: mappingNames
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

export function mappingJson(mappingJson = {instance:{}, enrollment:{}}) {
    return {
        type : 'mappingJson',
        mappingJson
    }
}

export function hasNoMappings(mappings) {
    let elementIds = Object.values(mappings);
    return elementIds.filter(element => element !== "").length === 0;
}

export function createJson (allMappings){
    let mappingObj = {};

    Object.keys(allMappings).forEach((mappingType)=>{
       let columnMapping = allMappings[mappingType];

            mappingObj[mappingType] = {};

            Array.from(columnMapping).forEach(mappingRow => {
                let columnName = mappingRow.firstElementChild.innerText;
                let mappingValue = mappingRow.lastChild.firstElementChild.value;
                let mapping = mappingObj[mappingType];

                mapping[columnName] = mappingValue;
            });
    });
    return mappingObj;
}

function mappingNameIsNotUnique(getState, mappingName) {
    return getState().allMappingNames.includes(mappingName.trim()) &&
        (getState().currentMapping === "" || mappingName !== getState().currentMapping);
}

export function saveMappings(mappingName = "", allMappings, lookupTable, history = {}, currentMappingName) {
    return async (dispatch, getState) => {
        const mappingObj = createJson(allMappings);

        if (isEmptyString(mappingName)) {
            dispatch(showMessage("Should have Mapping Name", "error"));
        }else if(mappingNameIsNotUnique(getState, mappingName)) {
            dispatch(showMessage("Mapping Name should be unique", "error"));
        }else if (hasNoMappings(mappingObj.instance)) {
            dispatch(showMessage("Please provide at least one mapping for patient instance", "error"));
        }else if (hasNoMappings(mappingObj.enrollments)) {
            dispatch(showMessage("Please provide at least one mapping for program enrollment", "error"));
        } else {
            let body = {
                mappingName : mappingName.trim(),
                lookupTable: JSON.stringify(lookupTable),
                mappingJson: JSON.stringify(mappingObj),
                currentMapping : currentMappingName
            };

            dispatch(hideSpinner(false));

            try {
                let ajax = Ajax.instance();
                let response = await ajax.put("/dhis-integration/saveMapping", body);
                afterOnSaveMappingSuccessResponse(dispatch, response, history);
                auditLog(auditLogEventDetails.SAVE_DHIS_MAPPING);
            } catch (e) {
                dispatch(hideSpinner());
                dispatch(showMessage(e.message, "error"));
            }
        }
    };
}

function afterOnSaveMappingSuccessResponse(dispatch, response, history) {
    dispatch(showMessage(response.data, "success"));
    dispatch(currentMapping());
    dispatch(mappingJson());
    dispatch(hideSpinner());
    dispatch(selectedInstanceTable());
    dispatch(selectedEnrollmentsTable());
    dispatch(filteredInstanceTables());

    history.push("/dhis-integration/mapping");
}


function isJSON(type) {
    return type !== undefined && type.toLowerCase() === 'json';
}

let parseResponse = (res)=>{
    let keys = Object.keys(res);
    keys.forEach((key)=>{
        if(isJSON(res[key].type)) {
            res[key].value = JSON.parse(res[key].value)
        }
    });

    return res;
};

export function getMapping(mappingNameToEdit, history) {
    return async (dispatch)=> {
        try {
            dispatch(hideSpinner(false));
            let ajax = Ajax.instance();
            let response = parseResponse(await ajax.get('/dhis-integration/getMapping', {"mappingName": mappingNameToEdit}));
            await dispatchInstanceTableDetails(response.lookup_table.value.instance, dispatch, ajax);
            await dispatchEnrollmentTableDetails(response.lookup_table.value.enrollments, dispatch, ajax);
            dispatch(currentMapping(response.mapping_name));
            dispatch(mappingJson(response.mapping_json.value));
            history.push('/dhis-integration/mapping/save');
        } catch (e) {
            dispatch(showMessage(e.message, "error"))
        } finally {
            dispatch(hideSpinner());
        }
    }
}

export function getAllMappings() {
    return async dispatch => {
        try {
            dispatch(hideSpinner(false));
            let ajax = Ajax.instance();
            let response = await ajax.get('/dhis-integration/getMappingNames');
            dispatch(allMappingNames(response));
        } catch (e) {
            dispatch(showMessage(e.message, "error"))
        } finally {
            dispatch(hideSpinner());
        }
    }
}

export function getTableColumns(tableName, category) {
    return async dispatch => {
        try {
            dispatch(hideSpinner(false));
            let ajax = Ajax.instance();
            await dispatchTableDetails(tableName, category, dispatch, ajax);
        } catch (e) {
            dispatch(showMessage(e.message, "error"))
        } finally {
            dispatch(hideSpinner());
        }
    }
}

async function getColumnNames(ajax, tableName) {
    let response = await ajax.get('/dhis-integration/getColumns', {tableName});
    return response;
}

async function dispatchInstanceTableDetails(tableName, dispatch, ajax) {
    let response = await getColumnNames(ajax, tableName);
    dispatch(selectedInstanceTable(tableName));
    dispatch(instanceTableColumns(response));
}

async function dispatchEnrollmentTableDetails(tableName, dispatch, ajax) {
    let response = await getColumnNames(ajax, tableName);
    dispatch(selectedEnrollmentsTable(tableName));
    dispatch(enrollmentTableColumns(response));
}

async function dispatchTableDetails(tableName, category, dispatch, ajax) {
    dispatch(mappingJson());

    if (category === "instance") {
        await dispatchInstanceTableDetails(tableName, dispatch, ajax);
    }else if(category === "enrollments"){
        await dispatchEnrollmentTableDetails(tableName, dispatch, ajax);
    }

}