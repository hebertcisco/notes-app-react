import React, { useState, useEffect } from 'react'
import remark from 'remark'
import remark2react from 'remark-react'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

import {
  Container,
  NoteHeader,
  StyledTextarea,
  NotePreviewBody,
} from '../styles/styles'

function EditContainer({ text, ...props }) {
  return <StyledTextarea defaultValue={text} {...props} />
}

function ViewContainer({ text }) {
  return <NotePreviewBody>{text}</NotePreviewBody>
}

function NotesContainer({ note, idx, onDelete }) {
  const initialState =
    window.localStorage.getItem(`note-${idx}`) ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const [text, setText] = useState(initialState)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(`note-${idx}`, text)

    return () => {
      window.localStorage.removeItem(`note-${idx}`)
    }
  }, [text, idx])

  const createdOn = new Date(note.createdOn)
  let date = createdOn.getDate()
  let month = createdOn.getMonth() + 1
  const yyyy = createdOn.getFullYear()

  let hours = createdOn.getHours()
  const minutes = createdOn.getMinutes()
  let seconds = createdOn.getSeconds()

  if (date < 10) {
    date = `0${date}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  hours = hours > 12 ? hours - 12 : hours < 10 ? '0' + hours : hours

  const formattedDate = `${date}-${month}-${yyyy} ${hours}:${minutes}:${seconds} ${
    createdOn.getHours() > 12 ? 'PM' : 'AM'
  }`

  const onToggle = () => {
    setEdit(!edit)
  }

  return (
    <>
      <Container>
        <NoteHeader>
          <span>{formattedDate}</span>
          <div>
            {edit ? (
              <IconButton
                color="primary"
                role="img"
                aria-label="preview"
                onClick={() => onToggle()}
              >
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                role="img"
                aria-label="edit"
                onClick={() => onToggle()}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              color="secondary"
              role="img"
              aria-label="delete"
              onClick={() => onDelete()}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </NoteHeader>
        {edit ? (
          <EditContainer
            text={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <ViewContainer
            text={remark().use(remark2react).processSync(text).contents}
          />
        )}
      </Container>
    </>
  )
}

export default NotesContainer
