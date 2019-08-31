import {FETCH_RESULTS, SET_LOADING, HISTORY_PAGE} from "./types";
import data from "../data/report.json"
import config from "../data/config.json"

/**
 * Returns Redux Thunk function that takes the imported files 
 * and dispatches the response as a 'FETCH_RESULTS' action and
 * @method fetchResults
 * @returns {function} - Redux Thunk function
 */

export const fetchResults = () => async dispatch =>{
  // sorting data to make it easir to workwith
  data.healthBenefits = await sortObjArray(data.healthBenefits, "scoreHistory");
  data.markers = await sortObjArray(data.markers, "measurements");
  
  // gets the score ranges of each category according to the config file 
  let range = config.map((num)=>{
    return `${num.from}-${num.to}`
  })
  
  // creates an object that has the dates and referenceId of the old tests
  let history = data.healthBenefits[0].scoreHistory.map((element)=>{
    return {date:element.date, referenceId: element.referenceId }
  })

  // creates an array of object with the ranges as keys to make the data easir to work with
  let categories = range.reduce((obj, item)=>{
    obj[item]=[]
    return obj
  },{})

  history = history.map((element)=>{
    return {...element, categories}
  })

  let catKeys = Object.keys(history[0].categories)

  /**
 * Takes reviews and returns an object which has the reviews grouped based on
 * the selected grouping type
 * @param {Array} measurements - measurements for all tests from the same date.
 * @param {string} groupType - the range of score to see if the score is (Off track, Normal, Optimal).
 * @returns {array} - returns an array of object with the score ranges are separated
 */
  let results = (measurement, diff) =>{
    
    let result= measurement.reduce((arr,element)=>{
      if (parseInt(diff[0])< element.score && element.score <= parseInt(diff[1])) {
        arr.push(element)
      }
      return arr
    },[])
    return result
  }
  
  // loops over the history array and add categories to the history array that is more broken down
  history.forEach((element,index) => {
    let lm = data.markers.map((element2)=>{
      element2.measurements[index].id = element2.id
      return element2.measurements[index]
    })

    let latestGroup = catKeys.reduce((acc, val)=>{
    
      let diff = val.split("-");
      acc[val] = results(lm, diff)
      return acc
    },{})

    history[index].categories = latestGroup;
  });

  
  // updates the results state using the a dispatch method
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

// changes the page index according to the date
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