import { Router } from "express"
import { geocodeAddress } from "../services/geocode.service"

const router = Router()

router.post("/", async (req, res) => {

  try {

    const { address } = req.body

    const data = await geocodeAddress(address)

    res.json(data)

  } catch (error) {

    console.error("Geocode error:", error)

    res.status(500).json({
      error: "Geocode lookup failed"
    })
  }

})

export default router