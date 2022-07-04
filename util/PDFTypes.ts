export type Key = string;

export interface PDFDataItem {
    key: Key
}

export interface Contact extends PDFDataItem {
    item: string;
}

export interface School extends PDFDataItem {
    name: string;
    start: Date;
    end?: Date;
    honors: Array<SchoolItem>;
    courses: Array<SchoolItem>;
}

export interface SchoolItem extends PDFDataItem {
    name: string;
    schoolKey: Key;
}

export interface Activity extends PDFDataItem {
    name: string;
    title: string;
    start: Date;
    end?: Date;
    description: string;
}

export interface Skill extends PDFDataItem {
    name: string;
    type: string;
}

export interface Award extends PDFDataItem {
    title: string;
    description: string;
}

export interface PDFDataState {
    template: string;
    contacts: Array<Contact>;
    education: Array<School>;
    work: Array<Activity>;
    activities: Array<Activity>;
    skills: Array<Skill>;
    awards: Array<Award>;
}

export interface PDFStyle {
    page: Object,
    header: Object,
}

export type PDFProps = {
    data: PDFDataState,
    styles: PDFStyle
}