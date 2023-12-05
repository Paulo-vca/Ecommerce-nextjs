/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react"
import axios from "axios";
import { API_URL } from "@/constans";
import {}

const stripePromise = loadStripe('pk_test_51OJm7TEOmfblKlb1rlBRPLP5ZjlwJe3FYt5iQSuONLIcaJBL7Pa3PKYhfgdF6cpBTTdTBvtTxCuglsowApRmOrIw00Qe1GTlz7')

interface CheckoutModalProps{
  showCheckoutModal: boolean;
  setShowCheckoutModal: any;
  total: number
}

function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  total
}: CheckoutModalProps){
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const loadClientSecret = async () => {
    try {
      setLoading(true)
      const {data} = await axios.post(`${API_URL}/payment`,{
        amount: total,
        currency: 'usd',
      })

    } catch (error: any) {
      notification.error({
        message:'Error on loadClint',
        description: error.message
      })
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClientSecret();
  }, [])


  return(
    <Modal title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: ${total}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}

      >
      <hr className="my-5" />
      <div className="mt-5">
        {stripePromise && clientSecret &&(
          <Elements
            stripe={stripePromise}
            options={{clientSecret: clientSecret}}
          >
            <CheckoutForm
            total={total}
            setShowCheckoutModal={setShowCheckoutModal}
            >

            </CheckoutForm>
          </Elements>
        )}
      </div>
    </Modal>
  )
}
export default CheckoutModal