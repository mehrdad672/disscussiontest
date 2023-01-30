 const useTimeConvert = (time: number) => {
    const current = new Date().getTime();
    const diff = Math.floor((current - time) / 1000);
    const month = Math.floor(diff / 2592000);
    const day = Math.floor((diff - month * 2592000) / 86400);
    const hour = Math.floor((diff - (month * 2592000 + day * 86400)) / 3600);
    const min = Math.floor(
      (diff - (month * 2592000 + day * 86400 + hour * 3600)) / 60
    );

    return `${month >= 1 ? month + "m" : ""} ${day >= 1 ? day + "d" : ""} ${
      hour >= 1 ? hour + "h" : ""
    } ${
      min >= 1 && hour === 0 && day === 0 && month === 0 ? min + "minutes" : ""
    } ${month===0 && day===0 && hour===0 && min===0 && 'one minute' }`}
    export default useTimeConvert