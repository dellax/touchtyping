import React from 'react';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';
var ProgressBar = require('progressbar.js');


export default class Statistics extends React.Component {
	constructor(props) {
		super(props);
		this.stats = props.stats;
		this.labels = [];
		for (let i = 0; i < this.stats.wpmList.length; i++) {
			this.labels.push(' ');
		}
	}

	componentDidMount() {
		
    let accuracyBar = ReactDOM.findDOMNode(this.refs.accuracyBar);
    var circleAccuracyBar = new ProgressBar.Circle(accuracyBar, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 5,
      trailWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#FF0000', width: 1 },
      to: { color: '#15ff00', width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }

      }
    });
    circleAccuracyBar.animate(0.8);
	}

	

	render() {
		return (
      <div className="tt-statistics">
        <div className="chart-wpm">
  			 <ChartWpm stats={this.stats} />
        </div>
        <div className="chart-words">
          <ChartWords stats={this.stats} />
        </div>
        
          
  			
        <div id="circle-accuracy" ref="accuracyBar"></div>
      </div>
		)
	}
}


class ChartWpm extends React.Component {
  constructor(props) {
    super(props);
    this.stats = props.stats;
    this.labels = [];
    for (let i = 0; i < this.stats.wpmList.length; i++) {
      this.labels.push('');
    }
  }
  
  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.wpmChart);
    let ctx = canvas.getContext('2d');

    let wpmChartData = {
      labels: this.labels,
      datasets: [
        {
          label: "WPM",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,

          data: this.stats.wpmList,

          yAxisID: "y-axis-0",
        }
      ]
    };

    let wpmChart = new Chart(ctx, {
      type: 'line',
      data: wpmChartData,
      options: {
        xAxes: [{
          display: false
        }],
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }
  
  render() {
    return (
      <div><canvas ref="wpmChart"/></div>
    )
  }
}

class ChartWords extends React.Component {
  constructor(props) {
    super(props);
    this.stats = props.stats;
  }

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this.refs.correctIncorrectChart);
    let ctx = canvas.getContext('2d');
    let incorrectWordsCount = this.stats.incorrectWords.length;
    let correctWordsCount = this.stats.wordsTyped - incorrectWordsCount;
    let chartData = {
        labels: [
          "Správne slová",
          "Nesprávne slová",
        ],
        datasets: [
          {
            data: [correctWordsCount, incorrectWordsCount],
            backgroundColor: [
              "#36A2EB",
              "#FF6384"
            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384"
            ]
          }
        ]
    };
    let correctIncorrectChart = new Chart(ctx, {
        type: 'pie',
        data: chartData
    });
    let wordsChartLegend = ReactDOM.findDOMNode(this.refs.wordsCharLegend);
    //wordsCharLegend.innerHTML = correctIncorrectChart.generateLegend();
  }

  render() {
    return (
      <div>
        <canvas ref="correctIncorrectChart"/>
        <div className="chart-words-legend" ref="wordsChartLegend"></div>
      </div>
    )
  }
}