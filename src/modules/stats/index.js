import React from 'react'
import './styles.css'
import classes from './styles.module.css'
import {getStats} from '../../requests'
import moment from 'moment'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts'

class Stats extends React.Component{
    state={
        duration:"daily",
        tab:"clicks",
        data:[]
    }
    cache=[]
    async componentDidMount(){
        try{
            let response = await getStats(this.state.duration)
            this.setState({
                data: response    
            })
        }
        catch(err){
            console.log(err)
        }
    }
    handleHourly= async (bar)=>{
        try{
            let response = await getStats("hourly")
            let data = response.filter(ele=>bar.date===ele.date)
            this.cache=this.state.data
            this.setState({
                data: data,
                duration: "hourly"   
            })
        }
        catch(err){
            console.log(err)
        }
    }
    reset= async ()=>{
        this.setState({
            data: this.cache,
            duration: "daily"
        })
    }
    formatXAxis=(tickItem)=>{
        return this.state.duration==="daily"?moment(tickItem).format('MMM Do YY'): moment("2021-02-01").add("hour",tickItem).format("HH:mm")
    }
    render(){
        let totalClicks = 0
        let totalImpressions  = 0
        let totalRevenue = 0
        this.state.data.forEach(ele=>{
            totalClicks += Number(ele.clicks)
            totalImpressions += Number(ele.impressions)
            totalRevenue += Number(ele.revenue)
        })
        return this.state.data.length>0?
            <div className={this.state.duration==="daily"?"daily":"hourly"}>
                <h1>Stats</h1>
                <div className={classes.Header}>
                    <div className={[classes.Tab, classes.Date].join(" ")}>{this.state.duration==="daily"?
                            `${moment(this.state.data[0].date).format("MMM-YYYY")} - ${moment(this.state.data[this.state.data.length-1].date).format("MMM-YYYY")}`    
                        :
                            <div>
                                <span className={classes.Arrow} onClick={this.reset}>	&larr;</span>
                                <span>{`${moment(this.state.data[0].date).format("DD-MMM-YYYY")}`}</span>
                            </div>
                    }</div>
                    <div className={[classes.Tab, this.state.tab==="clicks"?classes.Active:""].join(" ")} onClick={()=>this.setState({tab: "clicks", data: [...this.state.data]})}>Clicks <br/> <span className={classes.Count}>{`${totalClicks}`}</span></div>
                    <div className={[classes.Tab, this.state.tab==="impressions"?classes.Active:""].join(" ")} onClick={()=>this.setState({tab: "impressions", data: [...this.state.data]})}>Impressions <br/><span className={classes.Count}>{`${totalImpressions}`}</span></div>
                    <div className={[classes.Tab, this.state.tab==="revenue"?classes.Active:""].join(" ")} onClick={()=>this.setState({tab: "revenue", data: [...this.state.data]})}>Revenue <br/><span className={classes.Count}>{`$ ${Math.ceil(totalRevenue)}`}</span></div>
                </div>
                <div>
                <BarChart width={730} height={250} data={this.state.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={this.state.duration==="daily"?"date":"hour"} tickFormatter={this.formatXAxis}/>
                    <YAxis/>
                    <Tooltip labelFormatter={this.formatXAxis}/>
                    <Bar onClick={this.state.duration==="daily"?this.handleHourly:()=>{}} dataKey={this.state.tab} fill="#8884d8" />
                </BarChart>
                </div>
            </div>
        : "Loading"
    }
}

export default Stats