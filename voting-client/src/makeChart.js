import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';



 export default function makeChart(answers, id){

  let margin ={t:10, r:45, b:25,l:75};
  let w =420-margin.l-margin.r;
  let h=250-margin.t-margin.b;

    var svg = d3Select.select(id).append('svg').attr('width',w+margin.l+margin.r).attr('height',h+margin.t+margin.b);
    var graph = svg.append('g').attr('width',w).attr('heigth',h).attr("transform", "translate(" + margin.l + "," + margin.t + ")");


      let labels = answers.map((val)=>{
        return val.answer;
      })

      let totalVotes = answers.reduce((prev,curr)=>{  console.log(prev); console.log(curr.vote);return (prev+curr.votes)},0)
        let maxPercent = answers.reduce((prev,curr)=>{if((curr.votes/totalVotes)>prev){return (curr.votes/totalVotes)}return prev},0)
      console.log('totalVotes');
      console.log(totalVotes)
      console.log(answers)
       let xScale = d3Scale.scaleLinear().domain([0,maxPercent]).range([0,w]);
       let yScale = d3Scale.scaleBand().domain(labels).range([0, h]).padding(0.1);

       // graph.append('g')
       //      .attr("class", "axis axis--x")
       //      .attr("transform", "translate(0," + h + ")")
       //      .call(d3Axis.axisBottom(xScale))

       graph.append('g')
       .call(d3Axis.axisLeft(yScale))
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("Frequency");


       var rect = graph.selectAll('rect').data(answers).enter()

           rect.append('rect').attr('class','chart-bar')
                .attr('x', function(d){return 0})
                .attr('y', function(d){return yScale(d.answer)})
                .attr('fill','#4682b4')
                .attr('width',function(d){return xScale((d.votes/totalVotes))})
                .attr('height',function(d){return yScale.bandwidth()})

          rect.append('text')
              .attr('x', function(d){return (xScale((d.votes/totalVotes))+2)})
              .attr('y', function(d){return (yScale(d.answer)+(yScale.bandwidth()/2)) })
              .text(function(d){return Math.round(((d.votes/totalVotes)*100),0)+'%'})

        graph.append('text')
              .attr('x',5)
              .attr('y',h+10)
              .text('Votes: '+totalVotes)





}
