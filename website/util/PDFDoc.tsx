import type { FC } from "react";
import type { PDFProps, PDFStyle } from "./PDFTypes";
import { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const initialStyle: PDFStyle = StyleSheet.create({
    page: {},
    header: {}
})


const PDFDoc: FC<PDFProps> = ({ data, styles }) => {
    const { template, contacts, education, work, activities, skills, awards } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text render={() => template}></Text>
                </View>
                <View style={styles.header}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

export default PDFDoc