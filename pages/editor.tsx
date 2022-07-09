import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import PDFProvider from '../util/PDFProvider';
import PDFEditor from '../components/PDFEditor';

const PDFViewer = dynamic(import('../components/PDFViewer'), {
  ssr: false
})

const Home: NextPage = () => {

  return (
    <PDFProvider>
      <div className='grid grid-cols-2 w-10/12 max-w-7xl mx-auto h-full p-2'>
        <div>
          <PDFEditor />
        </div>
        <div className="h-full w-full grid place-items-center">
          <div className="w-fit h-fit">
            <PDFViewer pageNumber={1} />
          </div>
        </div>
      </div>
    </PDFProvider>
  )
}

export default Home;
