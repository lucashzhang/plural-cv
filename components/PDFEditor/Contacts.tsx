import { FC, useContext, ChangeEvent } from 'react';
import { PDFContext, pdfDataActions } from '../../util/PDFProvider';
import { createKey } from '../../util/functions';

const PDFEditor: FC = () => {

    const { dispatch, contacts } = useContext(PDFContext);

    function handleChange(e: ChangeEvent<HTMLInputElement>, key: string) {
        dispatch({
            type: pdfDataActions.MODIFY_CONTACTS,
            payload: {
                item: e.target.value,
                key
            }
        })
    }

    function handleDelete(key: string) {
        dispatch({
            type: pdfDataActions.REMOVE_CONTACTS,
            payload: key
        })
    }

    function handleAdd() {
        dispatch({
            type: pdfDataActions.ADD_CONTACTS,
            payload: {
                item: "",
                key: createKey()
            }
        })
    }

    return (
        <div className="card p-1">
            <h1 className="font-bold">Contacts</h1>
            <div>
                {contacts.map(({ item, key }) => (
                    <div className="form-control py-1" key={key}>
                        <div className="input-group w-full">
                            <input type="text" placeholder="Input Contact" className="input input-bordered w-full" value={item} onChange={(e) => handleChange(e, key)} />
                            <button className="btn btn-square" onClick={() => handleDelete(key)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className='btn' onClick={handleAdd}>Add New Contact</button>
        </div>
    )
}

export default PDFEditor;