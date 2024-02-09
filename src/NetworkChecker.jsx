import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { waait } from './helper'
import { BsFillTelephoneForwardFill } from 'react-icons/bs';

const initialValues = {
    myInput: '',
}

const validationSchema = Yup.object().shape({
    myInput: Yup.string().phone('NG', 'Please enter a valid phone Number')
        .min(11, 'Complete your 11 digits')
        .max(11, 'More than 11 digits!')
        .required('Enter Your 11 digits')

})

const NetworkChecker = () => {

    const [myInput, setMyInput] = useState('');
    const [nspName, setNspName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [color, setColor] = useState('');
    const [mySrc, setMySrc] = useState('');
    const [notFound, setNotFound] = useState('');
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handleClick = async (value) => {
        setIsHighlighted(false)
        setNspName('')
        setMyInput('')
        setIsLoading(true)
        await waait()
        let parsedValue = JSON.stringify(value);
        let processedValue = parsedValue.split(':')[1];
        let updatedValue = processedValue.split('}')[0];
        let finishedValue = updatedValue.substring(1, 12);
        setMyInput(finishedValue)
        if (finishedValue.startsWith('0814') || finishedValue.startsWith('0803') || finishedValue.startsWith('0703') || finishedValue.startsWith('0706') || finishedValue.startsWith('0813') || finishedValue.startsWith('0816') || finishedValue.startsWith('0810') || finishedValue.startsWith('0814') || finishedValue.startsWith('0903') || finishedValue.startsWith('0906') || finishedValue.startsWith('0913') || finishedValue.startsWith('0916') || finishedValue.startsWith('07025') || finishedValue.startsWith('07026') || finishedValue.startsWith('0704')) {
            setIsLoading(false)
            setMySrc('images/mtnLogo.png')
            setIsHighlighted(true)
            setNspName('MTN : ')
            setColor('gold')
            setNotFound('')
        }
        else if (finishedValue.startsWith('0805') || finishedValue.startsWith('0807') || finishedValue.startsWith('0705') || finishedValue.startsWith('0815') || finishedValue.startsWith('0811') || finishedValue.startsWith('0905') || finishedValue.startsWith('0915')) {
            setIsLoading(false)
            setMySrc('images/gloLogo.jpg')
            setIsHighlighted(true)
            setColor('green')
            setNspName('GLO : ')
            setNotFound('')

        }
        else if (finishedValue.startsWith('0802') || finishedValue.startsWith('0808') || finishedValue.startsWith('0708') || finishedValue.startsWith('0812') || finishedValue.startsWith('0701') || finishedValue.startsWith('0902') || finishedValue.startsWith('0901') || finishedValue.startsWith('0904') || finishedValue.startsWith('0907') || finishedValue.startsWith('0912')) {
            setIsLoading(false)
            setMySrc('images/airtelLogo.jpg')
            setIsHighlighted(true)
            setNspName('AIRTEL : ')
            setColor('red')
            setNotFound('')

        }
        else if (finishedValue.startsWith('0809') || finishedValue.startsWith('0818') || finishedValue.startsWith('0817') || finishedValue.startsWith('0909') || finishedValue.startsWith('0908')) {
            setIsLoading(false)
            setMySrc('images/9mobileLogo.png')
            setIsHighlighted(true)
            setColor('green')
            setNspName('9mobile : ')
            setNotFound('')

        }
        else {
            setIsLoading(false)
            setMySrc('images/unknown.png')
            setNspName('Not Found : ')
            setColor('#333')
            setNotFound("Sorry, Number not found!")
        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleClick,
        validationSchema
    })

    return (
        <>
            <div className="container">
                <div className="form__wrapper">
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="title"><h2> Service Provider Checker</h2><BsFillTelephoneForwardFill /></div>
                        <div className="inputs">
                            <div className="ui-wrapper">
                                <input checked="" id="Nigeria" name="flag" type="radio" />
                                <input className="dropdown-checkbox" name="dropdown" id="dropdown" type="checkbox" />
                                <label className="dropdown-container" htmlFor="dropdown"></label>
                                <div className="input-wrapper">
                                    <legend>
                                        {/* <label htmlFor="phonenumber">
                                            Phone Number*
                                        </label> */}
                                    </legend>
                                    <div className="textfield">
                                        <input pattern="\d+" maxLength="11" inputMode='numeric'
                                            autoComplete='off'
                                            id="phonenumber"
                                            placeholder='phonenumber'
                                            type="text"
                                            name='myInput'
                                            {...formik.getFieldProps('myInput')} />
                                    </div>
                                </div>
                                <div className="select-wrapper">
                                    <ul>
                                        <li className="Nigeria"><label htmlFor="Nigeria"><span>NG</span>Nigeria (+234)</label></li>
                                    </ul>
                                </div>
                            </div>
                            <button type='submit'> {
                                isLoading ? (<div class="spinner">
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                    <div class="spinner-blade"></div>
                                </div>) : <span>Validate</span>
                            }</button>
                        </div>
                        {<span className='invalid'>{formik.touched.myInput && formik.errors.myInput}</span>}
                    </form>
                </div>
                <div className="outputs">
                    <div className="display__image">
                        {
                            isLoading ? (<div class="three-body">
                                <div className="three-body__dot"></div>
                                <div className="three-body__dot"></div>
                                <div className="three-body__dot"></div>
                            </div>) : (
                                <img src={mySrc} style={{ borderRadius: "9px", display: isHighlighted ? 'block' : 'none' }} className='display__Image' alt='serviceProvider_Image' height={150} width={150} />
                            )
                        }
                    </div>
                    <div className="output_text" style={{ display: isHighlighted ? 'block' : 'none', "--accent": color, color: color === 'gold' ? 'black' : 'white' }}>
                        {nspName}{myInput} <br />
                        {notFound}
                    </div>

                </div>
                <footer>
                    <span className='footer'>Powered by ❤ <a target='blank' href="www.linkedin.com/in/teslim-agboola-ab069b252">Tescode</a></span>
                </footer>
            </div>
        </>
    )
}

export default NetworkChecker
