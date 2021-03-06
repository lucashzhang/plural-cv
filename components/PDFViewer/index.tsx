import { FC, useRef, useContext, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { usePDF, StyleSheet } from "@react-pdf/renderer";
import { PDFContext } from "../../util/PDFProvider";
import PDFDoc from "./PDFDoc";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { PDFStyle } from "../../util/PDFTypes";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Prop = {
    pageNumber: number
}

const Viewer: FC<Prop> = ({ pageNumber }) => {

    const puppetCanvas: any = useRef();
    const shadowCanvas: any = useRef();
    const { template, contacts, education, work, activities, skills, awards } = useContext(PDFContext);
    const pdfState = {
        template,
        contacts,
        education,
        work,
        activities,
        skills,
        awards
    }
    const initialStyle: PDFStyle = StyleSheet.create({
        page: {},
        header: {}
    })
    const doc = <PDFDoc data={pdfState} styles={initialStyle} />

    const [instance, setInstance] = usePDF({ document: doc })

    function cleanViewPort() {
        const textLayers = document.querySelectorAll<HTMLElement>(".react-pdf__Page__textContent");
        textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
    }

    function renderPuppet() {
        puppetCanvas.current.width = shadowCanvas.current.width;
        puppetCanvas.current.height = shadowCanvas.current.height;
        puppetCanvas.current.style.width = shadowCanvas.current.style.width;
        puppetCanvas.current.style.height = shadowCanvas.current.style.height;
        puppetCanvas.current.getContext('2d').drawImage(shadowCanvas.current, 0, 0);
    }

    useEffect(setInstance, [doc]);

    return (
        <div className="rounded overflow-hidden relative">
            <Document file={instance.blob} loading="" className="absolute top-0 left-0">
                <Page pageNumber={pageNumber} width={500} onRenderSuccess={renderPuppet} onLoadSuccess={cleanViewPort} canvasRef={shadowCanvas} />
            </Document>
            <canvas ref={puppetCanvas} />
        </div>
    )
}
export default Viewer