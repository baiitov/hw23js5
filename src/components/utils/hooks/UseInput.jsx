import { useState } from "react"
export const useInput = (validState)=>{
    const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false )
  const valueIsValid = validState(enteredValue)
  const nameInputIsValid =!valueIsValid && isTouched

  

  const valueChangeHandler=(e)=>{
      setEnteredValue(e.target.value)
  }
  const valueBlurHandler=()=>{
setIsTouched(true)
  }
  return{
     
      value: enteredValue,
      isValid: valueIsValid,
      hasError: nameInputIsValid,
      valueChangeHandler,
      valueBlurHandler
  }
}