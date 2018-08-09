const responseCodes = {
  "INTERNAL_SERVER_ERROR": 500,
  "NOT_FOUND": 404,
  "BAD_REQUEST": 400,
  "OK": 200
};

export default class Ajax {

    async post(url, data) {

        return await this.request(url, {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            "body": JSON.stringify(data)
        });
    }

    async put(url, data) {
        return await this.request(url, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            "body": JSON.stringify(data)
        });
    }

    async get(url, queryParams = {}) {
        let keys = Object.keys(queryParams);
        if (keys.length) {
            let keyValues = keys.map(queryKey => `${queryKey}=${encodeURIComponent(queryParams[queryKey])}`);
            url = url + "?" + keyValues.join("&");
        }
        return await this.request(url, {
            "method": "GET"
        });
    }

    async request(url, params) {
        let response = await fetch(url, params);

        let responseJson = await response.json();

        if(response.status === responseCodes.OK) {
            return responseJson;
        }else if(response.status === responseCodes.INTERNAL_SERVER_ERROR) {
            throw "Could not able to connect to server";
        } else if (response.status === responseCodes.NOT_FOUND) {
            throw "Could not able to get the details";
        }

        throw response;
    }
}
