import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxoisSecure';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        console.log('card', card);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error);
            setError(error.message)
        }
        else {
            setError('')
            console.log('payment method', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        console.log('payment intent', paymentIntent);
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const transactionId = paymentIntent.id

            const payment = {
                email: user?.email,
                transactionId,
                price,
                date: new Date(),
                quantity: cart.length,
                status: 'service pending',
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuFoodId),
                itemsName: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res);
                    if (res.data.insertedId) {
                        Swal.fire(
                            'Succeed',
                            'Your payment success.',
                            'success'
                        )
                    }
                })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary my-8 btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {error && <p className='text-red-600'>{error}</p>}
            {transactionId && <p className='text-green-500'>Transaction completed with transactionId: {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;