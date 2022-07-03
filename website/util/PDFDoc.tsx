import type { FC } from "react";
import type { PDFProps, PDFStyle } from "./PDFTypes";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const PDFDoc: FC<PDFProps> = ({ data, styles }) => {
    const { contacts, education, work, activities, skills, awards } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {contacts.map((contact) => (
                        <Text key={contact.key}>{contact.item}</Text>
                    ))}
                </View>
                <View style={styles.header}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

export default PDFDoc