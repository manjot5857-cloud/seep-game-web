const API_URL = "https://api.fastedgehosting.com/api";

//----------------------------------------
// Get JWT Token
//----------------------------------------

function getToken() {

    return localStorage.getItem("token");

}

//----------------------------------------
// Common Headers
//----------------------------------------

function getHeaders(isJson = true) {

    const headers = {};

    if (isJson) {
        headers["Content-Type"] = "application/json";
    }

    const token = getToken();

    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    return headers;

}

//----------------------------------------
// API Helper
//----------------------------------------

const api = {

    //------------------------------------
    // GET
    //------------------------------------

    async get(endpoint) {

        const response = await fetch(API_URL + endpoint, {

            method: "GET",

            headers: getHeaders(false)

        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(data?.message || "Request failed.");

        }

        return data;

    },

    //------------------------------------
    // POST
    //------------------------------------

    async post(endpoint, body) {

        const response = await fetch(API_URL + endpoint, {

            method: "POST",

            headers: getHeaders(),

            body: JSON.stringify(body)

        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(data?.message || "Request failed.");

        }

        return data;

    },

    //------------------------------------
    // PUT
    //------------------------------------

    async put(endpoint, body) {

        const response = await fetch(API_URL + endpoint, {

            method: "PUT",

            headers: getHeaders(),

            body: JSON.stringify(body)

        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(data?.message || "Request failed.");

        }

        return data;

    },

    //------------------------------------
    // DELETE
    //------------------------------------

    async delete(endpoint) {

        const response = await fetch(API_URL + endpoint, {

            method: "DELETE",

            headers: getHeaders(false)

        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(data?.message || "Request failed.");

        }

        return data;

    }

};
