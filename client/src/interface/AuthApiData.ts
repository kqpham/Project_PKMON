import { iSchool } from './School';

export interface AuthApiDataSuccess {
    message: string;
    token: string;
}

export interface AuthApiData{
    error?: {message: string};
    success?: AuthApiDataSuccess;
    schools?: [iSchool];
}

export interface AuthApiSchoolData {
    error?: {message: string};
    success?: AuthApiDataSuccess;
    school?: iSchool;
}