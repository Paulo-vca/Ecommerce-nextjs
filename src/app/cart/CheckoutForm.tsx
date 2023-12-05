'use client'

import { CartState, ClearCart } from "@/redux/cartSlice";
import { useElements } from "@stripe/react-stripe-js";
import { notification } from "antd";
import React from "react"
import { useDispatch, useSelector } from "react-redux";

function CheckoutForm({
  total,
  setShowCheckoutModal,
}: {
  total: number;
  setShowCheckoutModal: any;
}) {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const {cartItems}: CartState = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()

  const handleSubmit =async (event:any) => {
    try {
      setLoading(true)
      event.preventDefault();

      if(!stripe || !elements)
        throw new Error("Stripe.js hasn't ")

      const result = await stripe.confirmPayment({
        elements,
        confirmParams:{
          return_url: 'http://localhost:3000/cart',
        },
        redirect: 'if_required',
      });

      if(result.error){
        throw result.error
      }
      notification.success({
        message: "Payment successful",
        description: "Your payment was processed successfully"
      })

      const orderPayload = {
        user: setUserId,
        items: cartItems,
        paymentStatus: "paid",
        orderStatus: "order placed",
        shippingAddress: result.paymentIntent.shipping,
        transationId: result.paymentIntent.id,
        total
      }

      //save data to backend
      // e com vcs - POST]
      // nao esquecer de atualizar estoque

      dispatch(ClearCart())
      notification.success({
        message: "Order placed Successfully",
        description: "Your order was placed successfully"
      })
    } catch (error: any) {
      notification.error({
        message: "Order placed Successfully",
        description: "Your order was placed successfully"
      })
    } finally{
      setLoading(false)
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className="h-[350px] overflow-y-scroll pr-5"
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries:['US, BR'],
              mode: 'shipping',
            }}
          />
        </div>
          <div className="flex gap-5">
              <Button

              ></Button>
          </div>


      </form>
    </div>
  )
}