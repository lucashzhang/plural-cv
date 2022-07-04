import type { FC } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFProps } from '../PDFTypes';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        flexGrow: 1
    }
});

const Basic: FC<PDFProps> = ({ data }) => {
    const { template, contacts, education, work, activities, skills, awards } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        section: {
            flexGrow: 1
        }
    });
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text render={() => template}></Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Basic;