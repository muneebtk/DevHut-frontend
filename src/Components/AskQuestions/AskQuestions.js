import { Grid, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

function AskQuestions() {
  return (
    <div>
        <Grid container apacing={3}>
            <Grid item >
                <Typography>Top Questions</Typography>
            </Grid>
        </Grid>
    </div>
  )
}

export default AskQuestions