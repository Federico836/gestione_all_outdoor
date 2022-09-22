const convertStringToSeconds = (time_string) => {

    const time_string_array = time_string.split(':')

    let time_in_seconds = 0;

    if(time_string_array.length === 2) {

        time_in_seconds += Number(time_string_array[0]*60)
        time_in_seconds += Number(time_string_array[1])
    }
    else if(time_string_array.length === 3) {
        time_in_seconds += Number(time_string_array[0]*3600)
        time_in_seconds += Number(time_string_array[1]*60)
        time_in_seconds += Number(time_string_array[2])
    }

    return time_in_seconds

}

export {convertStringToSeconds}
