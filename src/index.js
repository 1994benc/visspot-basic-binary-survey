import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import styles from './styles.module.css'

export const BasicBinarySurvey = ({
  dataset,
  settings,
  dataOptions,
  hideLegend,
  chartId,
  setInputData,
  inputData
}) => {
  const [question, setquestion] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [yesCount, setYesCount] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [reveal, setReveal] = useState(false)
  const setNewValue = (v) => {
    setInputData({ value: v })
    setReveal(true)
  }
  useEffect(() => {
    if (!settings || settings.length <= 0) {
      return
    }
    const questionObj = _.find(settings, ['id', 'question'])

    if (!questionObj || !inputData) {
      return
    }
    const yeses = _.filter(inputData, (item) => {
      return item.value === 1
    })
    const nos = _.filter(inputData, (item) => {
      return item.value === 0
    })
    setquestion(questionObj.value)
    setTotalCount(inputData.length)
    setYesCount(yeses.length)
    setNoCount(nos.length)
  }, [settings, inputData])


  const yesPercent = (yesCount / totalCount) * 100
  const noPercent = (noCount / totalCount) * 100
  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className={styles.question}>{question}</div>
      <div className={styles.choices}>
        <button
          onClick={() => setNewValue(1)}
          style={{
            width: `${reveal ? yesPercent : 50}%`,
            fontSize: reveal ? '1em' : '1.4em',
            borderTopRightRadius: reveal && yesPercent === 100 ? '1.3rem' : 0,
            borderBottomRightRadius: reveal && yesPercent === 100 ? '1.3rem' : 0
          }}
          className={styles.yes}
        >
          <span style={{ opacity: yesPercent < 10 && reveal ? 0 : 1 }}>
            Yes {reveal && `${(yesPercent).toFixed(2)}%`}
          </span>
        </button>
        <button
          onClick={() => setNewValue(0)}
          style={{
            width: `${reveal ? noPercent : 50}%`,
            fontSize: reveal ? '1em' : '1.4em',
            borderTopLeftRadius: reveal && noPercent === 100 ? '1.3rem' : 0,
            borderBottomLeftRadius: reveal && noPercent === 100 ? '1.3rem' : 0
          }}
          className={styles.no}
        >
          <span style={{ opacity: noPercent < 10 && reveal ? 0 : 1 }}>
            No {reveal && `${(noPercent).toFixed(2)}%`}
          </span>
        </button>
      </div>
      <div className={styles.totalVotes}>
        {totalCount} total votes
      </div>
    </div>
  )
}
