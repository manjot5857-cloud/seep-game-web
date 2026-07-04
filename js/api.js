const API_URL = "https://api.fastedgehosting.com/api";

const api = {

    async get(endpoint) {

        const response = await fetch(API_URL + endpoint, {

            headers: {

                "Authorization": "Bearer " + localStorage.getItem("token")

            }

        });

        if (!response.ok)
            throw new Error(await response.text());

        return await response.json();

    },

    async post(endpoint, body) {

        const response = await fetch(API_URL + endpoint, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + localStorage.getItem("token")

            },

            body: JSON.stringify(body)

        });

        if (!response.ok)
            throw new Error(await response.text());

        return await response.json();

    }

};
