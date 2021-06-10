import React from 'react'
import classes from './styles.module.css'
import {getPOI} from '../../requests'
import Fuse from 'fuse.js'
import Map from './map'
import Placeholder from '../../assets/map.JPG'
class POI extends React.Component{
    state={
        data:[],
        map: false
    }
    
    async componentDidMount(){
        try{
            let response = await getPOI()
            this.cache=response
            this.setState({
                data: response,
                map: true
            })
        }
        catch(err){
            console.log(err)
        }
    }
    handleChange=(event)=>{
        this.setState({map: false})
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
            const options = {
                includeScore: true,
                // Search in `author` and in `tags` array
                keys: ['poi_id', 'name', 'lat', 'lon']
              }
              
              const fuse = new Fuse(this.cache, options)
              let result = fuse.search(event.target.value)
              result = result.map(ele=>ele.item)
              if(result.length===0 && event.target.value===""){
                this.setState({
                    data: this.cache,
                    map: true
                })
              }
              else{
                this.setState({
                    data: result,
                    map: true

                })
              }
            
        },500)
    }
    render(){
        return(
            <div>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:10}}>
                <h1>POI</h1>
                <input className={classes.Input} placeholder="Search" onChange={this.handleChange}/>
                </div>
                <table className={classes.Table}>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lat</th>
                        <th>Lon</th>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(ele=>(
                                <tr>
                                    <td>{ele.poi_id}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.lat}</td>
                                    <td>{ele.lon}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {this.state.map ?
                    <Map data={this.state.data}/> 
                :
                    <img src={Placeholder}/>
                }
            </div>
        )
    }

}

export default POI