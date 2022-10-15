import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

import "./Compiler.css";
import { python } from '@codemirror/lang-python'
import { dracula } from '@uiw/codemirror-theme-dracula';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
// var React = require('react');
// require('codemirror/mode/python/python');



function Compiler() {
  const BASE_URL = "http://13.233.6.228";
  const [code, setCode] = useState('print("Hello world")');
  let [codeOutput, setCodeOutput] = useState();

  let Submit = (e) => {
    e.preventDefault();
    if (code === null) {
      return false;
    } else {
      CompileCode();
    }
  };
  let CompileCode = async () => {
    await axios
      .post(BASE_URL + "/python_compiler/", {
        code_area: code,
      })
      .then((response) => {
        setCodeOutput(response.data);
      });
  };

  return (
    <div>
      <Typography variant="h5" ml sx={{ fontFamily: "fantasy" }}>
        Python Online Compiler
      </Typography>
      <div >
        <CodeMirror
          className="codemirror"
          placeholder='Enter the python code'
          onChange={(value) => setCode(value)}
          options={{
          theme:{dracula},
            // keyMap: "sublime",
          
          // mode="python"
          
          }}
          value={code}
          mode= {python}
          theme={dracula}
        />
      </div>
      <Box mt >
      <Button mt variant="contained" color="success" onClick={Submit}>
        run
      </Button>
      </Box>
      <br />
      <Typography>Output:</Typography>
      <textarea 
        disabled
        style={{ width: "100%", padding: "10px",fontSize:'large',height:'auto' }}
        cols="30"
        rows="10"
        
        value={codeOutput ? codeOutput.output : ""}
      >
        <br />
      </textarea>
    </div>
  );
}

export default Compiler;
