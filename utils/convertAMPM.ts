export const formatAMPM = (date:Date):string => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    console.log(`date and hour....`, date, hours);
    console.log(`'0'+ minutes : minutes`, minutes);
    
    return `${hours}:${minutes < 10 ? '0'+ minutes : minutes} ${ampm}`;
}