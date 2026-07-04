async post(endpoint, body) {

    const response = await fetch(API_URL + endpoint, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization": "Bearer " + localStorage.getItem("token")

        },

        body: JSON.stringify(body)

    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {

        throw new Error(data?.message || "Server error");

    }

    return data;

}
