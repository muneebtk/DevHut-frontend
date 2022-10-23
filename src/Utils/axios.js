import React from 'react'
import axios from 'axios'

const instance = axios.create({baseURL:'https://www.devhut.ml/'})
export default instance;