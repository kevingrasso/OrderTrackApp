export function containsTrackId(orders, track_id){
    let res = []
    for (let key of Object.keys(orders)){
        if(orders[key].track_id.toUpperCase() == track_id.toUpperCase()){
            res.push(orders[key])
        }
    }
    if(res.length > 0){
        return true
    }
    else{
        return false
    }
    
}