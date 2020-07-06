import React, { useState, useEffect } from 'react'

import { useTheme } from './theme/ThemeContext'
import NotesContainer from './containers/NotesContainer.jsx'
import { GlobalStyle } from './styles/styles'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

function App() {
  const themeState = useTheme()
  const initialState = JSON.parse(window.localStorage.getItem('notes')) || [
    {
      createdOn: new Date(),
      edit: true,
    },
  ]
  const [notes, setNotes] = useState(initialState)

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    const tempNotes = [...notes]
    const result = { createdOn: new Date(), edit: true }
    tempNotes.push(result)
    setNotes(tempNotes)
  }

  const onDelete = (idx) => {
    const tempNotes = [...notes]
    tempNotes.splice(idx, 1)
    setNotes(tempNotes)
  }

  const createNotesContainer = () => {
    return notes.map((note, idx) => (
      <NotesContainer
        key={note.createdOn}
        note={note}
        idx={idx}
        onDelete={() => onDelete(idx)}
      />
    ))
  }

  return (
    <>
      <GlobalStyle />
      <div>
        <Typography variant="h6" component="h1">
          Notes App{' '}
          {themeState.dark ? (
            <IconButton
              color="secondary"
              role="img"
              aria-label="sun"
              onClick={themeState.toggle}
            >
              <Brightness5Icon />
            </IconButton>
          ) : (
            <IconButton
              role="img"
              aria-label="moon"
              color="primary"
              onClick={themeState.toggle}
            >
              <Brightness4Icon />
            </IconButton>
          )}
        </Typography>
      </div>
      <Button variant="outlined" color="primary" onClick={() => addNote()}>
        Add a New Note
      </Button>
      <br />
      <br />
      {createNotesContainer()}
    </>
  )
}

export default App
