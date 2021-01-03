export function get_position(list, track_id){
    for( let el of list){
        
        if(el.tracking_number == track_id){
            return list.indexOf(el)
        }
    }
    return -1
}