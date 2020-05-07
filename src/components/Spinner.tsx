import React from 'react';
import { FillSpinner } from "react-spinners-kit";
import styles from './Spinner.module.css'

const Spinner = ({minHeight = 0}) => (
  <div className={styles.root} style={{minHeight}}>
    <FillSpinner size={30} color="#686769" />
  </div>
)

export default Spinner