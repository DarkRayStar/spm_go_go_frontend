import React from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import axios from 'axios'
import Swal from "sweetalert2";
import NavBarGoGo from '../navigatonBar/navbarGoGo';

let updateID = JSON.parse(sessionStorage.getItem("itemID"))
let cartObj = JSON.parse(sessionStorage.getItem("ordQty"))
let price = sessionStorage.getItem("totalPayemt")
let payId = "";
let DUId = "";
let qty = "";

const onSubmit = async () => {

    try {
        const data = {
            paidStatus: true,
            showOnCart: false,
            orderedDate: new Date().toLocaleString(),
        }

        for (var j = 0; j < updateID.length; j++) {
            payId = updateID[j];
            var response = await axios.post(`http://localhost:5050/cart/updatePayment/${payId}`, data)
        }

        for (var i = 0; i < cartObj.length; i++) {
            DUId = cartObj[i].itemId;
            qty = cartObj[i].orderedQuanity;

            const qtyData = {
                orderedQuanity: qty,
            }

            var response1 = await axios.post(`http://localhost:5050/storeAdmin/updateItemPayment/${DUId}`, qtyData)
        }
        if (response.status === 200 && response1.status === 200) {
            Swal.fire(
                'Payment Successful!',
                'RS: ' + price + '.00',
                'success',
            )
            window.location = '/order-history'
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        }

    } catch (error) {
        alert(error);
    }
}

const goBack = () => {
    window.location = '/cart/view'
}

const Payment = () => (
    <Styles>
        <h3 className="PaymentHeaderMod"> Payment Section</h3>
        <Form
            onSubmit={onSubmit}
            render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
                active
            }) => {
                return (<>
                    {/* <NavBarGoGo /> */}
                    <form onSubmit={handleSubmit}>
                        <Card
                            number={values.number || ''}
                            name={values.name || ''}
                            expiry={values.expiry || ''}
                            cvc={values.cvc || ''}
                            focused={active}
                        />
                        <center>
                            <div>
                                Total : {price}
                            </div>
                        </center>
                        <div>
                            <Field
                                name="number"
                                component="input"
                                type="text"
                                pattern="[\d| ]{16,22}"
                                placeholder="Card Number"
                                format={formatCreditCardNumber}
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <Field
                                name="expiry"
                                component="input"
                                type="text"
                                pattern="\d\d/\d\d"
                                placeholder="Valid Thru"
                                format={formatExpirationDate}
                                required
                            />
                            <Field
                                name="cvc"
                                component="input"
                                type="text"
                                pattern="\d{3}"
                                placeholder="CVC"
                                format={formatCVC}
                                required
                                className="wid"
                            />
                        </div>
                        <div className="buttons">
                            <button className='payBackBtn' onClick={() => goBack()} type="button">
                                Cancel
                            </button>
                            <button
                                className='restBtn'
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>

                            <button type="submit" className='payBtn' disabled={submitting}>
                                Pay Now
                            </button>
                        </div>

                    </form>
                </>
                )
            }}
        />
    </Styles>
)


export default Payment
