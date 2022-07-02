import { FC, useRef, useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFContext } from "../../util/PDFProvider";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Prop = {
    pageNumber: number
}

const Viewer: FC<Prop> = ({ pageNumber }) => {

    const shadowCanvas: any = useRef();
    const pdfCanvas: any = useRef();
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

    function renderShadow() {
        shadowCanvas.current.width = pdfCanvas.current.width;
        shadowCanvas.current.height = pdfCanvas.current.height;
        shadowCanvas.current.style.width = pdfCanvas.current.style.width;
        shadowCanvas.current.style.height = pdfCanvas.current.style.height;
        shadowCanvas.current.getContext('2d').drawImage(pdfCanvas.current, 0, 0);
    }


    return (
        <div className="rounded overflow-hidden relative">
            <Document file={blob} loading="" className="absolute top-0 left-0">
                <Page pageNumber={pageNumber} width={500} onRenderSuccess={renderShadow} onLoadSuccess={cleanViewPort} canvasRef={pdfCanvas} />
            </Document>
            <canvas ref={shadowCanvas} />
        </div>
    )
}
export default Viewer