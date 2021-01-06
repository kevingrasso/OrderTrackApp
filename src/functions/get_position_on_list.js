export function get_position(list, track_id){
    for( let el of list){
     
        if(el.tracking_number.toUpperCase() == track_id.toUpperCase()){
            return list.indexOf(el)
        }
    }
    return -1
}