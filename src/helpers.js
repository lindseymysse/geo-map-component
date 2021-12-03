export function getURLValues(URL = window.location.href ){
  const search_params = new URLSearchParams(URL)
  let options = {}
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}

export function setURLValues(obj){
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    let encodedvalue = encodeURI(obj[key])
    url += `&${key}=${encodedvalue}`
  })
  history.pushState(obj, '', url)
}

/*
  *** begin ascii art ***
    8888b.  88 .dP"Y8 88""Yb    db    888888  dP""b8 88  88
     8I  Yb 88 `Ybo." 88__dP   dPYb     88   dP   `" 88  88
     8I  dY 88 o.`Y8b 88"""   dP__Yb    88   Yb      888888
    8888Y"  88 8bodP' 88     dP""""Yb   88    YboodP 88  88
  *** end ascii art ***
  dispatches a custom event with a detail to the application.
  
*/

export function dispatch(name, detail = {}, div = document){
  const initialize_event = new CustomEvent(name, {detail: detail})
  div.dispatchEvent(initialize_event)
}

export function ready(callbackFunction){
  if(document.readyState === 'complete')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

