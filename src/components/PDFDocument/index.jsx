import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import brasao from './brasao-do-ceara.png';
import { useEffect, useState } from "react";
import { Api } from "../../services";

const PDFDocument = () => {
    const [dataGenero, setDataGenero] = useState([]);
    const visitantesPorGenero = async () => {
        const request = await Api.get("visitantes/total-por-genero");
        setDataGenero(await request.data);
    }
    useEffect(() => {
        visitantesPorGenero();
    }, []);

    const tabela = `
        <html>
            <table border='1'>
                <tr>
                    <td>Visitantes total</td>
                    <td>1000</td>
                </tr>
                ${
                    dataGenero.map(data => (
                        `<tr>
                            <td>Visitantes ${data.genero}</td>
                            <td>${data.total}</td>
                        </tr>`        
                    ))
                }
            </table>
        </html>
    `;

    const styles = StyleSheet.create({
        container: {
            position: 'relative'
        },
        bg_imagem: {
            width: '50%',
            position:'absolute',
            left: '25%',
            top: '25%',
            opacity: .1,
            zIndex: 1
        },
        main: {
            width: '100%',
            height: '100%',
            padding: '60px',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            fontSize: 12
        }
    });
    return (
        <>
            <Document style={styles.container}>
                <Page size={'A4'}>
                    <Image src={brasao} style={styles.bg_imagem}/>
                    <View style={styles.main}>
                        <Text>{'Hello word'}</Text>
                        <Html>{tabela}</Html>
                    </View>
                </Page>
            </Document>
        </>
    )
}

export default PDFDocument;