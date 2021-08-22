import { Config } from '~/core/config';

export const formatPhoneNumber = (e) => {
  const cleaned = ('' + e).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return '+' + cleaned;
};

export const formatString = (str, length) =>
  str && (str.length <= length ? str : str.substr(0, length) + '...');

export const fetchAPI = (url, options) => {
  return fetch(`${Config.apiBaseURL}${url}`, options)
    .then(async (res) => {
      // console.log(res.status);
      if(res.status >= 200 && res.status <= 300){
        return res;
      }else{
        let json = await res.json();

        console.log(`${Config.apiBaseURL}${url}`, options);
        console.log(json);

        throw Error(json.message);
      }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(`${Config.apiBaseURL}${url}`, options);
      console.log(res);
      return res;
    })
    ;
};

export const formatCCExpiry = (str) => {
  const temp = str.replace(/ /g, '');
  if (temp) {
    if (temp.includes('/')) {
      const arr = temp.split('/');
      if (arr[1] !== '') {
        return `${arr[0]} / ${arr[1]}`;
      }
    } else if (temp.length > 2) {
      return `${temp.substr(0, 2)} / ${str.substr(2)}`;
    }
  }
  return str;
};

export const formatCategoryString = (territory, category) => {
  const params = {
    territory: territory,
    category: category,
  };
  return Object.keys(params)
    .filter((k) => params[k] !== null)
    .map((k) => params[k])
    .join(' - ');
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const renderHTML = (htmlString) => {
  var stripedHtml = htmlString.replace(/<[^>]+>/g, '');

  return stripedHtml;
}

const pluralizeTime = (val,string) => {
  return val+' '+string+(val>1 && "s")+' Ago'
}

export const getTimePassed = (pastDate,futureDate = new Date()) => {
  
  if(typeof pastDate === 'string')
  pastDate = pastDate.replaceAll("-","/")

  pastDate = new Date(Date.parse(pastDate+"-06:00"));

  let seconds = Math.floor((futureDate - (pastDate))/1000);
  let minutes = Math.floor(seconds/60);
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);

  hours = hours-(days*24);
  minutes = minutes-(days*24*60)-(hours*60);
  seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

  if(days > 0){
    return pluralizeTime(days,"Day")
  } else if(hours > 0){
    return pluralizeTime(hours,"Hr")
  }else if(minutes > 0){
    return pluralizeTime(minutes,"Min")
  }else if(seconds > 0){
    return pluralizeTime(seconds,"Sec")
  }else{
    return null;
  }
}

export const truncateAddress = (addressString) => {
    if(typeof addressString == 'string'){
      const addressObj = addressString.split(",");
      return addressObj[0];
    }else{
      return addressString;
    }
}