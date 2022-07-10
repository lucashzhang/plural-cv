// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { renderToStream } from '@react-pdf/renderer';
import PDFDoc from '../../../util/PDFDoc';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pdfStream = await renderToStream(<PDFDoc />);

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-disposition', 'attachment;filename="filename.pdf"')
    res.send(pdfStream);
}
