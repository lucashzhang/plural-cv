import { BlobProvider, StyleSheet } from "@react-pdf/renderer";
import { createContext, useReducer, useEffect, useState, FC, ReactNode } from "react";
import PDFDoc from "./PDFDoc";
import { Key, PDFDataItem, PDFDataState, PDFStyle, Contact, School, Activity, Skill, Award, SchoolItem } from "./PDFTypes";
import NoSSR from "./NoSSR";

// Pseudo-Redux implementation

export enum pdfDataActions {
    MODIFY_TEMPLATE,
    ADD_CONTACTS,
    REMOVE_CONTACTS,
    MODIFY_CONTACTS,
    OVERWRITE_CONTACTS,
    ADD_EDUCATION,
    REMOVE_EDUCATION,
    MODIFY_EDUCATION,
    OVERWRITE_EDUCATION,
    ADD_WORK,
    REMOVE_WORK,
    MODIFY_WORK,
    OVERWRITE_WORK,
    ADD_ACTIVITIES,
    REMOVE_ACTIVITIES,
    MODIFY_ACTIVITES,
    OVERWRITE_ACTIVITIES,
    ADD_SKILLS,
    REMOVE_SKILLS,
    MODIFY_SKILLS,
    OVERWRITE_SKILLS,
    ADD_AWARDS,
    REMOVE_AWARDS,
    MODIFY_AWARDS,
    OVERWRITE_AWARDS,
    ADD_COURSES,
    REMOVE_COURSES,
    MODIFY_COURSES,
    OVERWRITE_COURSES,
    ADD_HONORS,
    REMOVE_HONORS,
    MODIFY_HONORS,
    OVERWRITE_HONORS,
    WRITE_STATE
};

export type PDFAction =
    | { type: pdfDataActions.MODIFY_TEMPLATE, payload: string }
    | { type: pdfDataActions.ADD_CONTACTS, payload: Contact }
    | { type: pdfDataActions.REMOVE_CONTACTS, payload: Key }
    | { type: pdfDataActions.MODIFY_CONTACTS, payload: Contact }
    | { type: pdfDataActions.OVERWRITE_CONTACTS, payload: Array<Contact> }
    | { type: pdfDataActions.ADD_EDUCATION, payload: School }
    | { type: pdfDataActions.REMOVE_EDUCATION, payload: Key }
    | { type: pdfDataActions.MODIFY_EDUCATION, payload: School }
    | { type: pdfDataActions.OVERWRITE_EDUCATION, payload: Array<School> }
    | { type: pdfDataActions.ADD_WORK, payload: Activity }
    | { type: pdfDataActions.REMOVE_WORK, payload: Key }
    | { type: pdfDataActions.MODIFY_WORK, payload: Activity }
    | { type: pdfDataActions.OVERWRITE_WORK, payload: Array<Activity> }
    | { type: pdfDataActions.ADD_ACTIVITIES, payload: Activity }
    | { type: pdfDataActions.REMOVE_ACTIVITIES, payload: Key }
    | { type: pdfDataActions.MODIFY_ACTIVITES, payload: Activity }
    | { type: pdfDataActions.OVERWRITE_ACTIVITIES, payload: Array<Activity> }
    | { type: pdfDataActions.ADD_SKILLS, payload: Skill }
    | { type: pdfDataActions.REMOVE_SKILLS, payload: Key }
    | { type: pdfDataActions.MODIFY_SKILLS, payload: Skill }
    | { type: pdfDataActions.OVERWRITE_SKILLS, payload: Array<Skill> }
    | { type: pdfDataActions.ADD_AWARDS, payload: Award }
    | { type: pdfDataActions.REMOVE_AWARDS, payload: Key }
    | { type: pdfDataActions.MODIFY_AWARDS, payload: Award }
    | { type: pdfDataActions.OVERWRITE_AWARDS, payload: Array<Award> }
    //  Extra Actions dealing with nested structures
    | { type: pdfDataActions.ADD_COURSES, payload: SchoolItem }
    | { type: pdfDataActions.REMOVE_COURSES, payload: SchoolItem }
    | { type: pdfDataActions.MODIFY_COURSES, payload: SchoolItem }
    | { type: pdfDataActions.OVERWRITE_COURSES, payload: Array<SchoolItem> }
    | { type: pdfDataActions.ADD_HONORS, payload: SchoolItem }
    | { type: pdfDataActions.REMOVE_HONORS, payload: SchoolItem }
    | { type: pdfDataActions.MODIFY_HONORS, payload: SchoolItem }
    | { type: pdfDataActions.OVERWRITE_HONORS, payload: Array<SchoolItem> }
    | { type: pdfDataActions.WRITE_STATE, payload: PDFDataState }

const pdfDataInitialState: PDFDataState = {
    template: "BASIC",
    contacts: [],
    education: [],
    work: [],
    activities: [],
    skills: [],
    awards: []
}

const initialStyle: PDFStyle = StyleSheet.create({
    page: {},
    header: {}
})

function removeHelper(key: Key): (item: PDFDataItem) => boolean {
    return (item: PDFDataItem): boolean => item.key !== key;
}

function operateInArray<T>(array: Array<T>, key: string, operate: (item: T) => T): Array<T> {
    if (!key) return array;
    const idx = array.findIndex((element: any) => element.key === key);
    array[idx] = operate(array[idx]);
    return [...array];
}


function stateReducer(state: PDFDataState, action: PDFAction): PDFDataState {

    switch (action.type) {
        case pdfDataActions.MODIFY_TEMPLATE:
            return { ...state, template: action.payload }
        case pdfDataActions.ADD_CONTACTS:
            return { ...state, contacts: [...state.contacts, action.payload] }
        case pdfDataActions.REMOVE_CONTACTS:
            return { ...state, contacts: state.contacts.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_CONTACTS:
            return { ...state, contacts: operateInArray(state.contacts, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_CONTACTS:
            return { ...state, contacts: action.payload }
        case pdfDataActions.ADD_EDUCATION:
            return { ...state, education: [...state.education, action.payload] }
        case pdfDataActions.REMOVE_EDUCATION:
            return { ...state, education: state.education.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_EDUCATION:
            return { ...state, education: operateInArray(state.education, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_EDUCATION:
            return { ...state, education: action.payload }
        case pdfDataActions.ADD_WORK:
            return { ...state, work: [...state.work, action.payload] }
        case pdfDataActions.REMOVE_WORK:
            return { ...state, work: state.work.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_WORK:
            return { ...state, work: operateInArray(state.work, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_WORK:
            return { ...state, work: action.payload }
        case pdfDataActions.ADD_ACTIVITIES:
            return { ...state, activities: [...state.activities, action.payload] }
        case pdfDataActions.REMOVE_ACTIVITIES:
            return { ...state, activities: state.activities.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_ACTIVITES:
            return { ...state, activities: operateInArray(state.activities, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_ACTIVITIES:
            return { ...state, activities: action.payload }
        case pdfDataActions.ADD_SKILLS:
            return { ...state, skills: [...state.skills, action.payload] }
        case pdfDataActions.REMOVE_SKILLS:
            return { ...state, skills: state.skills.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_SKILLS:
            return { ...state, skills: operateInArray(state.skills, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_SKILLS:
            return { ...state, skills: action.payload }
        case pdfDataActions.ADD_AWARDS:
            return { ...state, awards: [...state.awards, action.payload] }
        case pdfDataActions.REMOVE_AWARDS:
            return { ...state, awards: state.awards.filter(removeHelper(action.payload)) }
        case pdfDataActions.MODIFY_AWARDS:
            return { ...state, awards: operateInArray(state.awards, action.payload.key, (_) => action.payload) }
        case pdfDataActions.OVERWRITE_AWARDS:
            return { ...state, awards: action.payload }
        // For interacting with the courses nested in a school;
        case pdfDataActions.ADD_COURSES:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    courses: [
                        ...school.courses,
                        action.payload
                    ]
                }))
            }
        case pdfDataActions.REMOVE_COURSES:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    courses: school.courses.filter(removeHelper(action.payload.key))
                }))
            }
        case pdfDataActions.MODIFY_COURSES:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    courses: operateInArray(school.courses, action.payload.key, (_) => action.payload)
                }))
            }
        case pdfDataActions.OVERWRITE_COURSES:
            return {
                ...state, education: operateInArray(state.education, action.payload[0]?.schoolKey, (school: School) => ({
                    ...school,
                    courses: action.payload
                }))
            }
        case pdfDataActions.ADD_HONORS:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    honors: [
                        ...school.courses,
                        action.payload
                    ]
                }))
            }
        case pdfDataActions.REMOVE_HONORS:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    honors: school.courses.filter(removeHelper(action.payload.key))
                }))
            }
        case pdfDataActions.MODIFY_HONORS:
            return {
                ...state, education: operateInArray(state.education, action.payload.schoolKey, (school: School) => ({
                    ...school,
                    honors: operateInArray(school.honors, action.payload.key, (_) => action.payload)
                }))
            }
        case pdfDataActions.OVERWRITE_HONORS:
            return {
                ...state, education: operateInArray(state.education, action.payload[0]?.schoolKey, (school: School) => ({
                    ...school,
                    honors: action.payload
                }))
            }
        case pdfDataActions.WRITE_STATE:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

interface PDFState extends PDFDataState {
    blob: Blob | null,
    dispatch: (action: PDFAction) => void
}

export const PDFContext = createContext<PDFState>({
    ...pdfDataInitialState,
    dispatch: (_: PDFAction) => { },
    blob: null
});

type Props = {
    children: ReactNode
}

const PDFProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(stateReducer, pdfDataInitialState);
    const [style, setStyle] = useState(initialStyle);

    useEffect(() => {
        const newStyle: PDFStyle = {
            page: {},
            header: {}
        }

        setStyle(newStyle)
    }, [state.template])

    return (
        <NoSSR>
            <BlobProvider document={<PDFDoc data={state} styles={style} />}>
                {({ blob }) => (
                    <PDFContext.Provider value={{
                        ...state,
                        dispatch,
                        blob
                    }}>
                        {children}
                    </PDFContext.Provider>
                )}
            </BlobProvider>
        </NoSSR>

    )
}

export default PDFProvider