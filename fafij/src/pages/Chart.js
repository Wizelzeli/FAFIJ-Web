import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);
const Chart = () => {

    const [data, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor:[
                "white"
            ]
        },
        ],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
    });
    useEffect(()=> {
        const fetchData = () => {
            const json = JSON.stringify({
                journalName: localStorage.getItem('journal'),
            });
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            };
            axios.post('http://localhost:8081/private/listNote', json, {headers})
                .then(response => {
                    console.log(response)
                    const map1 = new Map();
                    response.data.map((note) => {
                        if (note.sum < 0) {
                            if (!map1.has(note.category.name)) {
                                map1.set(note.category.name, 0)
                            }
                            map1.set(note.category.name, map1.get(note.category.name) + Math.abs(note.sum))
                        }
                    })
                    const label = [];
                    const data = [];
                    for (let entry of map1) {
                        var i = 0
                        label.push(entry[i]);
                        data.push(map1.get(entry[i]))
                        i++
                    }
                    setData(
                        {
                            datasets: [{
                                data: data,
                                backgroundColor: [
                                    '#26c6da',
                                    '#b2ebf2',
                                    '#0097a7',
                                    '#4dd0e1',
                                    '#00acc1',
                                    '#80deea',
                                    '#00bcd4'
                                ]
                            },
                            ],
                            labels: label,
                        }
                    )
                })
        }
        fetchData();
    }, [])

    return (
        <div >
            <div>
            <h2>Диаграмма трат по категориям</h2>
            </div>
            <div style={{width:'100%', height:'100%'}}>
            <Doughnut data={data}/>
        </div>
        </div>
    );
};

export default Chart;