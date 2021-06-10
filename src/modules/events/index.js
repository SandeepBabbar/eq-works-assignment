import React from 'react'
import './styles.css'
import classes from './styles.module.css'
import {getEvents} from '../../requests'
import moment from 'moment'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts'

class Events extends React.Component{
    state={
        duration:"daily",
        tab:"events",
        data:[]
    }
    cache=[]
    async componentDidMount(){
        try{
            let response = await getEvents(this.state.duration)
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
            let response = await getEvents("hourly")
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
        let totalevents = 0
        this.state.data.forEach(ele=>{
            totalevents += Number(ele.events)
        })
        return this.state.data.length>0?
            <div className={this.state.duration==="daily"?"daily":"hourly"}>
                <h1>Events</h1>
                <div className={classes.Header}>
                    <div className={[classes.Tab, classes.Date].join(" ")}>{this.state.duration==="daily"?
                            `${moment(this.state.data[0].date).format("MMM-YYYY")} - ${moment(this.state.data[this.state.data.length-1].date).format("MMM-YYYY")}`    
                        :
                            <div>
                                <span className={classes.Arrow} onClick={this.reset}>	&larr;</span>
                                <span>{`${moment(this.state.data[0].date).format("DD-MMM-YYYY")}`}</span>
                            </div>
                    }</div>
                    <div className={[classes.Tab, this.state.tab==="Events"?classes.Active:""].join(" ")} onClick={()=>this.setState({tab: "events", data: [...this.state.data]})}>Events <br/> <span className={classes.Count}>{`${totalevents}`}</span></div>
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

export default Events