import axios from "axios";
import { AuthApiData, AuthApiSchoolData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";
import { v4 as uuidv4 } from 'uuid';

function setTokenExpiry(value: string) {
    const now = new Date();

    const item = {
        value: value,
        expiry: (now.getTime() + 300000),
    }
    localStorage.setItem("sessionId", JSON.stringify(item));
}

function getExpiredKey() {
    const localItem = localStorage.getItem('sessionId');
    if (!localItem) {
        return null;
    }
    const item = JSON.parse(localItem);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem('sessionId');
        return null;
    }
    return item.value;
}

export const getSchoolById = async (id: string): Promise<AuthApiSchoolData> => {
    const fetchOption: FetchOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    };
    return await fetch(`/${id}`, fetchOption)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
};

export const createSchool = async (data: FormData): Promise<any> => {
    const config = {
        headers: {
            accept:'/',
            'Content-Type': `multipart/form-data; boundary='xxx'`,
        },
    };
    const sessionId = getExpiredKey();
    console.log(data.getAll);
    if (sessionId != null) {
        return await axios.post(`/${sessionId.value}`, data.getAll, config).then((res) => { return res.data }).catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
    } else {
        const tempID = uuidv4();
        setTokenExpiry(tempID);
        return await axios.post(`/${tempID}`, data, config).then((res) => { return res.data }).catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
    }

};

export const getAllSchools = async (): Promise<AuthApiData> => {
    const fetchOptions: FetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    };
    return await fetch('/schools', fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: 'Unable to connect to server. Please try again' },
        }));
};