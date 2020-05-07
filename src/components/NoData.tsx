import React from 'react'
import styles from './NoData.module.css'

const NoData = ({message="No Data"}) => {
    return (
        <div className={styles.root}>
            <img src="/no-data.svg" width={64} alt="No Data" />
            <div>{message}</div>
        </div>
    )
}

export default NoData