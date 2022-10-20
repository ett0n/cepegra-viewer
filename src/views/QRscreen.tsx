// @ts-nocheck

// Ancien composant test, on l'a migré correctement sur Accueil mais je le garde pour trace

import { useState } from "react";
import QrReader from "../components/QrReader"
import React from "react"

const QRscreen = () => {
  const [getQrResult, setQrResult] = useState<string>("");
  const [GetShowQR, SetShowQR] = useState(false)

  const handleClick = () => {
    SetShowQR(!GetShowQR) 
  }
  console.log(getQrResult)
  return (
  <main>
    <h1>bonjour gallerie</h1>
    <h2>Scannes ton code QR</h2>
    <button onClick={handleClick} className="btn">ah bah oui</button>
            Quand le scan donne un résultat, on arrête le composant (NE FONCTIONNE PAS !)
           {GetShowQR && <QrReader setQrResult={setQrResult} />
            }
  </main>
  )
}

export default QRscreen