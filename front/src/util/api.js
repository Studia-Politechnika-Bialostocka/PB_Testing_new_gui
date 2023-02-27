import axios from "axios";

const BASE_URL = "http://localhost:5000";

export async function getPageHtml(site_url) {
    let params = { site_url: site_url };
    return await genericGetRequest("/scrape/page_html", params);
}

export async function getTags(tag_type = null, tag_attributes = null) {
    let params = {};
    if (!!tag_attributes) params = { ...tag_attributes };
    if (!!tag_type) params["tag_type"] = tag_type;
    return await genericGetRequest("/scrape/tags", params);
}

async function genericGetRequest(route, params) {
    return axios({
        baseURL: BASE_URL,
        url: route,
        headers: { "Content-Type": "application/json" },
        params: params,
    }).then((response) => {
        return response.data;
    });
}

export async function postFeature(feature_data) {
    return axios({
        baseURL: BASE_URL,
        url: "/features",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { "data": feature_data }
    }).then((response) => {
        return response.data;
    })
}
