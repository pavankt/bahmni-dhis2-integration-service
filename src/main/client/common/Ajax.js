import {audit, sync} from './constants';

const responseCodes = {
    "INTERNAL_SERVER_ERROR": 500,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "BAD_REQUEST": 400,
    "OK": 200,
    "USER_UNAUTHORISED": 401
};

export default class Ajax {

    static instance() {
        return new Ajax();
    }

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
        let actualUrl = url;

        if (keys.length) {
            let keyValues = keys.map(queryKey => `${queryKey}=${encodeURIComponent(queryParams[queryKey])}`);
            actualUrl = url + "?" + keyValues.join("&");
        }
        return await this.request(actualUrl, {
            "method": "GET"
        });
    }

    async request(url, params) {
        let response = await fetch(url, params);

        if (response.status === responseCodes.USER_UNAUTHORISED) {
            window.location.pathname = '/home';
            return;
        }

        if (response.status === responseCodes.OK) {
            if (url !== audit.URI && !url.includes(sync.URI)) {
                return await response.json();
            }
            return response;
        } else if (response.status === responseCodes.INTERNAL_SERVER_ERROR) {
            throw "Could not able to connect to server";
        } else if (response.status === responseCodes.FORBIDDEN) {
            throw "Session Timed Out. Login again.";
        } else if (response.status === responseCodes.NOT_FOUND) {
            throw "Could not able to get the details";
        }

        throw response;
    }
}
