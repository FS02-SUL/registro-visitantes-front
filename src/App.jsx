import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './components/PDFDocument';
import Ways from './routes';
import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
const App = () => {
  const [estaLogado, setEstaLogado] = useState(true);
  return (
    <>
      <AuthContext.Provider value={{ estaLogado, setEstaLogado }}>
        <Ways />
      </AuthContext.Provider>
    </>
  );
}

export default App;