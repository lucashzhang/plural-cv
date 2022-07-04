import { FC, useRef, useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFContext } from "../../util/PDFProvider";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Prop = {
    pageNumber: number
}

const Viewer: FC<Prop> = ({ pageNumber }) => {

    const puppetCanvas: any = useRef();
    const shadowCanvas: any = useRef();
    const { blob } = useContext(PDFContext);

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


    return (
        <div className="rounded overflow-hidden relative">
            <Document file={blob} loading="" className="absolute top-0 left-0">
                <Page pageNumber={pageNumber} width={500} onRenderSuccess={renderPuppet} onLoadSuccess={cleanViewPort} canvasRef={shadowCanvas} />
            </Document>
            <canvas ref={puppetCanvas} />
        </div>
    )
}
export default Viewer