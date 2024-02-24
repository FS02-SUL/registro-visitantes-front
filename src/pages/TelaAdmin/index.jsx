import { PDFDownloadLink } from "@react-pdf/renderer";
import styled from "styled-components";
import PDFDocument from "../../components/PDFDocument";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Api } from "../../services";

const TelaAdminContainer = styled.section`
    padding: 60px;
    & h1{
        display: flex;
        justify-content: space-between;
        align-items: center;
        & a{
            display: inline-block;
            line-height: 46px;
            background-color: #ff00a2;
            padding: 0 26px;
            border-radius: 5px;
            color: white;
            font-size: 14px;
            text-transform: uppercase;
            text-decoration: none;
        }
    }
    & .graficos{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 26px;
        & div{
            width: calc(70% - 16px);
            padding: 16px;
            border-radius: 5px;
            border: 1px solid #DDD;
            &:nth-child(even){
                width: 30%;
            }
            & .grafico{
                width: 100%;
                /* height: 250px; */
                border: 0;
            }
        }
    }
`;

const TelaAdmin = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chartDataPie, setChartDataPie] = useState({});
    const [chartOptionsPie, setChartOptionsPie] = useState({});

    const visitantesPorGenero = async () => {
        try {
            const request = await Api.get("visitantes/total-por-genero");
            const response = await request.data;
            // CONFIGURAÇÕES DO CHART PIE

            const dataPie = {
                labels: response.map(r => r.genero),
                datasets: [
                    {
                        data: response.map(r => r.total),
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                        ]
                    }
                ]
            }
            const optionsPie = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };

            setChartDataPie(dataPie);
            setChartOptionsPie(optionsPie);
        } catch (error) {
            alert(error.message)   
        }
    }

    useEffect(() => {
        visitantesPorGenero();
    }, []);

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                },
                {
                    label: 'teste label',
                    data: [1000, 225, 652, 189],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ]
                },
            ]
        };
        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);

    }, []);

    return (
        <>
            <TelaAdminContainer>
                <h1>
                    Dashboard
                    <PDFDownloadLink
                        document={<PDFDocument />}
                        fileName={'registros.pdf'}
                    >
                        Baixar PDF
                    </PDFDownloadLink>
                </h1>
                <div className="graficos">
                    <div>
                        <h6>Total de visitantes</h6>
                        <Chart className="grafico"  type="bar" data={chartData} options={chartOptions} />
                    </div>
                    <div>
                        <h6>Total por gênero</h6>
                        <Chart className="grafico" type="pie" data={chartDataPie} options={chartOptionsPie} />
                    </div>
                    <div>grafico de linha</div>
                    <div>grafico de pizza</div>
                </div>
            </TelaAdminContainer>
        </>
    );
}

export default TelaAdmin;