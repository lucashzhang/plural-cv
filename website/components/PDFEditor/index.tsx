import { FC, useContext, ChangeEvent } from 'react';
import { PDFContext, pdfDataActions } from '../../util/PDFProvider';

const PDFEditor: FC = () => {

    const { dispatch, template, contacts, education, work, activities, skills, awards } = useContext(PDFContext);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: pdfDataActions.MODIFY_TEMPLATE,
            payload: e.target.value
        })
    }

    return (
        <div className="card w-full h-full rounded bg-slate-50">
            <input onChange={handleChange}>
            </input>
        </div>
    )
}

export default PDFEditor;