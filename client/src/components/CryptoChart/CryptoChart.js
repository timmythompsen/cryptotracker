import React, { Component } from 'react';
import {Bar, Line, Pie} from "react-chartjs-2";

class CryptoChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chartData:props.chartData
		}
	}

	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right'
	}

  render() {
    return (
    	<div className="chart">
			<Line
				data={this.state.chartData}
				options={{
					maintainAspectRatio: true,
					title: {
						display: this.props.displayTitle,
						text: 'CryptoCurrency Trading History',
						fontSize: 25
					},
					legend: {
						display: this.props.displayLegend,
						position: this.props.legendPosition
					}
				}}
			/>
		</div>
    )
  }
};

export default CryptoChart;