import React from 'react'
import './style.scss'

function Page10001_home() {

    function change() {
        console.log(document.querySelector('html'));
        document.querySelector('html').setAttribute('data-theme', 'dark')
    }

    return (
        <div className={'aa'} onClick={change}>Page10001_home</div>
    )
}

export default Page10001_home