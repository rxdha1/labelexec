import { createContext, useContext, useState, useMemo, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "react-toastify"
import { createPaymentIntent } from "@/lib/stripe/createPaymentIntent"

const PaymentContext = createContext(null)

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const [stripeClientSecret, setStripeClientSecret] = useState(null)
  const [stripePaymentId, setStripePaymentId] = useState(null)
  const [stripePromise, setStripePromise] = useState(null)
  const [loading, setLoading] = useState(false)

  const appearance = {
    theme: "stripe",

    variables: {
      colorPrimary: "#d2d2d2",
      colorBackground: "#1a2629",
      colorText: "#d2d2d2",
      colorDanger: "#df1b41",
      fontFamily: "URWGeometric !important",
      fontSizeBase: "20px",
      borderRadius: "4px",
    },
  }

  const createStripePaymentIntent = async (
  ) => {
    const response = await createPaymentIntent()

    if (response.error) {
      toast.error("create payment failed")
      return false
    }
    setStripeClientSecret(response.client_secret)
    setStripePaymentId(response.id)
    return true
  }

  useEffect(() => {
    const loadStripePromise = async () => {
      const promise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string)
      setStripePromise(promise as any)
    }
    loadStripePromise()
  }, [])

  const stripeOption = {
    clientSecret: stripeClientSecret,
    appearance,
  }

  const value: any = useMemo(
    () => ({
      stripePromise,
      setStripeClientSecret,
      stripeClientSecret,
      stripeOption,
      createStripePaymentIntent,
      stripePaymentId,
      loading,
      setLoading,
    }),
    [
      stripePromise,
      setStripeClientSecret,
      stripeClientSecret,
      stripeOption,
      createStripePaymentIntent,
      stripePaymentId,
      loading,
      setLoading,
    ],
  )

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}

export const usePaymentProvider = () => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error("usePaymentProvider must be used within a PaymentProvider")
  }
  return context
}

export default PaymentProvider
