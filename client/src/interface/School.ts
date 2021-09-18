export interface schoolFields {
    schoolName: string,
    schoolAbout: string,
    schoolLocation: string,
    schoolAdmission: string,
}

export interface schoolFieldErrors {
    schoolName: boolean;
    schoolAbout: boolean;
    schoolLocation: boolean;
    schoolAdmission: boolean;
}

export interface iSchool {
    _id: string;
    schoolName: string;
    schoolAbout: string;
    schoolLocation: string;
    schoolAdmission: string;
    schoolImage: string;
    creationDate: Date;
    creatorId: string;
}