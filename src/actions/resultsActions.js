import {FETCH_RESULTS, SET_LOADING, HISTORY_PAGE} from "./types";
import data from "../data/report.json"
import config from "../data/config.json"

export const fetchResults = () => async dispatch =>{
  data.healthBenefits = await sortObjArray(data.healthBenefits, "scoreHistory");
  data.markers = await sortObjArray(data.markers, "measurements");
  
  
  let range = config.map((num)=>{
    return `${num.from}-${num.to}`
  })
  
  let history = data.healthBenefits[0].scoreHistory.map((element)=>{
    return {date:element.date, referenceId: element.referenceId }
  })

  let categories = range.reduce((obj, item)=>{
    obj[item]=[]
    return obj
  },{})

  history = history.map((element)=>{
    return {...element, categories}
  })
  let catKeys = Object.keys(history[0].categories)

  let tmm = (measurement, diff) =>{
    let bb= measurement.reduce((arr,element)=>{
      if (parseInt(diff[0])< element.score && element.score <= parseInt(diff[1])) {
        arr.push(element)
      }
      return arr
    },[])
    return bb
  }
  

  history.forEach((element,index) => {
    let lm = data.markers.map((element2)=>{
      element2.measurements[index].id = element2.id
      return element2.measurements[index]
    })

    let latestGroup = catKeys.reduce((acc, val)=>{
    
      let diff = val.split("-");
      acc[val] = tmm(lm, diff)
      return acc
    },{})

    history[index].categories = latestGroup;
  });

  

  await dispatch({
      type: FETCH_RESULTS,
      payload: data,
      config,
      history,
    });

  
    
}

export const setLoading = () => async dispatch =>{
  await dispatch({
    type: SET_LOADING,
    payload: false
  });
  
}

export const setPage = (pageNumber) =>async dispatch =>{
  
  await dispatch({
    type: HISTORY_PAGE,
    payload: pageNumber
  });
}

const sortObjArray = async (list, key) =>{
  let content = await list.map(element => {
    element[key] = element[key].sort((a, b) => (a.date > b.date) ? -1 : 1)
    return element
  });

  return content;
}