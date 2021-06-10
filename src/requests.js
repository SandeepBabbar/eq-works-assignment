import axios from './axios-instance'

export async function getStats(duration){
    try{
        let response = await axios.get(`/stats/${duration}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function getEvents(duration){
    try{
        let response = await axios.get(`/events/${duration}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function getPOI(){
    try{
        let response = await axios.get(`/poi`)
        return response.data
    }
    catch(error){
        throw error
    }
}