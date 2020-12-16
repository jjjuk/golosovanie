import React, { useState, useEffect, useMemo } from 'react'

import { useClient } from 'urql'
import { EVENT_NAMES } from 'api'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

import { theme, useStyles } from 'useStyles'

function PaperComponent({ children, ...props }) {
  const classes = useStyles(theme)
  return <Paper {...props} className={classes.suggPaper} children={children} />
}

const AutoComplete = ({ value, setValue, trigger }) => {
  const classes = useStyles(theme)
  const client = useClient()

  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        client
          .query(EVENT_NAMES, { name: request || '' })
          .toPromise()
          .then(callback)
      }, 300),
    [client]
  )

  const renderOption = (option) => {
    const parts = parse(option.name, match(option.name, inputValue))

    return (
      <Grid style={{ width: '260px' }} alignItems='center'>
        <Grid item xs>
          {parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ))}
        </Grid>
      </Grid>
    )
  }

  useEffect(() => {
    fetch(value, ({ data: { eventNames = [] } }) => {
      setOptions(eventNames)
    })
  }, [value, fetch, trigger])

  const getOptionLabel = (option) =>
    typeof option === 'string' ? option : option.name

  const handleChange = (_, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue?.name)
  }
  const handleInputChange = (_, newInputValue) => {
    setInputValue(newInputValue)
    setValue(newInputValue)
  }
  const renderInput = (params) => (
    <TextField
      {...params}
      color='secondary'
      label='Event name'
      variant='outlined'
      fullWidth
    />
  )

  return (
    <Autocomplete
      autoComplete
      filterSelectedOptions
      freeSolo
      className={classes.autoComplete}
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      options={options}
      value={value}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={renderInput}
      renderOption={renderOption}
      PaperComponent={PaperComponent}
    />
  )
}

export default AutoComplete
