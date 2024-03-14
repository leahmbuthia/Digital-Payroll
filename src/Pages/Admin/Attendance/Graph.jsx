import React from 'react'
import './Graph.scss'
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";

function Graph({chartData}){
    return <Bar data ={chartData}/>
}

export default Graph