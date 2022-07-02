import type { FC } from 'react';
import { Document, Page } from '@react-pdf/renderer';


const Fallback: FC = () => {
    return (
        <Document>
            <Page size="A4" />
        </Document>
    )
}

export default Fallback;