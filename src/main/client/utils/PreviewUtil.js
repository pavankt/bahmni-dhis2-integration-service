import Ajax from "../common/Ajax";

export async function getDeltaData(mappingName) {
    return await new Ajax().get('/dhis-integration/api/getDeltaData', {mappingName});
}