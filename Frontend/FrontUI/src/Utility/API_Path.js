export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "Auth/register",
        LOGIN: "/Auth/login",
        GET_PROFILE: "/Auth/profile"
    },

    CHALLENGE: {
        CREATE: "/Chlg/Create",
        GET_ALL: "/Chlg/GetAll",
        GET_BY_ID: (id) => `/Chlg/GetAll/${id}`,
        UPDATE: (id) => `/Chlg/Update/${id}`,
        DELETE: (id) => `/Chlg/Delete/${id}`,
        UPLOAD_IMAGES: (id) => `/Resume/${id}/upload-image`
    },

    IMAGE: {
        UPLOAD_IMAGE: "/Auth/uploadImg"
    }
};
