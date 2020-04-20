import React, { useEffect, useState } from 'react'
import { BasicBinarySurvey } from 'visspot-basic-binary-survey'
import 'visspot-basic-binary-survey/dist/index.css'

/**Mock data
 * Retrieved from visspot.com/getsamplechart/<dev_chart_id> */
const settings = [
  {
    id: 'question',
    isRequired: true,
    name: 'Question',
    options: [],
    rangeEnd: 100,
    rangeStart: 0,
    type: 'text',
    value: 'Should pineapple go on pizza?'
  }
]
const dataOptions = []
const dataset = []

const App = () => {

  // On VisSpot, this would be pulled from the database
  const [inputData, setInputData] = useState([
    { id: 'unique1', createdAt: new Date(), value: 0 },
    { id: 'unique2', createdAt: new Date(), value: 1 },
    { id: 'unique3', createdAt: new Date(), value: 1 },
    { id: 'unique4', createdAt: new Date(), value: 1 },
    { id: 'unique5', createdAt: new Date(), value: 0 },
    { id: 'unique6', createdAt: new Date(), value: 0 },
    { id: 'unique7', createdAt: new Date(), value: 0 }
  ])

  return (
    <BasicBinarySurvey
      settings={settings}
      dataOptions={dataOptions}
      dataset={dataset}
      inputData={inputData}
      /** This setInputData function receives an object {value:0} or {value:1}
       * depending on how user votes*/
      setInputData={(value) =>
        setInputData((d) => {
          // In production on VisSpot, we'd set this in our database
          return [
            ...d,
            {
              id: `unique${d.length + 1}`,
              createdAt: new Date(),
              value: value.value
            }
          ]
        })
      }
    />
  )
}

export default App
