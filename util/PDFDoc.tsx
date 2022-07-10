import type { FC } from "react";
import { Document, Page, Text, View } from '@react-pdf/renderer';


const PDFDoc: FC = () => {

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Lucas Zhang</Text>
                </View>
            </Page>
        </Document>
    )
}

export default PDFDoc