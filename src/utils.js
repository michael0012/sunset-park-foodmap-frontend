export function formatTime(timeString) {
  const timeStringArray = timeString.split(':');
  let finalTimeArray = [];
  let amOrPm = "AM";
  if(timeStringArray[0]>=12){
      finalTimeArray[0] = String(parseInt(timeStringArray[0]) - 12);
      amOrPm = "PM";
  }else{
      finalTimeArray[0] = timeStringArray[0];
  }
  if(finalTimeArray[0] === "0"){
      finalTimeArray[0] = "12";
  }
  if(finalTimeArray[0] === "00"){
      finalTimeArray[0] = "12";
  }
  if( (finalTimeArray[0].length === 1) && (parseInt(finalTimeArray[0]) < 10) ){
      finalTimeArray[0] = "0" + finalTimeArray[0];
  }
  finalTimeArray[1] = timeStringArray[1];
  return finalTimeArray.join(":") + " " + amOrPm;
}

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export const removeValArray = (arr, value) =>{
	
	for(var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] === value) {
			arr.splice(i, 1);
		}
	}
	return arr;
};

export async function fileListToBase64(fileList) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file) {
      const reader = new FileReader()
      return new Promise(resolve => {
        reader.onload = ev => {
          resolve(ev.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
    // here will be array of promisified functions
    const promises = []
  
    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]))
    }
  
    // array with base64 strings
    return await Promise.all(promises)
  };
 
export const camelToSnake = (camelString) => {
  return camelString.replace(/[A-Z]/g, function(s){ return "_" + s.toLowerCase(); })
};