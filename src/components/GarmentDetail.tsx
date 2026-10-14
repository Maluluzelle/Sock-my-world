
import type { Garment } from "../types/Garment"
import { categoryLabels } from "../data/categoryLabels"
import {
  garmentTypeLabels,
  garmentFeatureLabels,
} from "../data/garmentLabels"
import {
  Shirt,
  CalendarDays,
  Ruler,
  Palette,
  Tags,
  StickyNote,
  Package,
} from "lucide-react"
import { useState } from "react"

type GarmentDetailProps = {
  garment: Garment
  onEdit: () => void
  onDelete: () => void
  onTransfer: (destination: "family" | "sell" | "donate") => void
}

export function GarmentDetail({
  garment,
  onEdit,
  onDelete,
  onTransfer,
}: GarmentDetailProps) {

  const [showTransferOptions, setShowTransferOptions] = useState(false)

  const seasons = {
    spring: "Printemps",
    summer: "Été",
    autumn: "Automne",
    winter: "Hiver",
  }

  const singularTypeLabels: Record<string, string> = {
  pants: "Pantalon",
  leggings: "Legging",
  shorts: "Short",
  skirt: "Jupe",
  tshirt: "T-shirt",
  shirt: "Chemise",
  sweater: "Pull",
  sweatshirt: "Sweat",
  cardigan: "Gilet",
  dress: "Robe",
  overall: "Salopette",
  jacket: "Veste",
  raincoat: "Imperméable",
  winterCoat: "Manteau d'hiver",
  sneakers: "Baskets",
  boots: "Bottes",
  sandals: "Sandales",
  pyjamas: "Pyjama",
}

const garmentTitle = [
  singularTypeLabels[garment.type] ??
    garmentTypeLabels[garment.type] ??
    garment.type,
  garment.brand,
]
  .filter(Boolean)
  .join(" ")

  return (
    <article className="garment-detail">
      <div className="garment-detail-visual">
        {garment.photo ? (
          <img
            src={garment.photo}
            alt={`${garmentTypeLabels[garment.type] ?? garment.type} ${garment.brand}`}
            className="garment-detail-photo"
          />
        ) : (
          <div className="garment-detail-photo-placeholder">
            Photo à ajouter
          </div>
        )}
      </div>

      <h2 className="garment-detail-title">
        {garmentTitle}
      </h2>

      <div className="garment-detail-fields">
        <div className="garment-detail-field">
          <Shirt size={22} />
          <div>
            <strong>Catégorie et type</strong>
            <p>
              {categoryLabels[garment.category] ?? garment.category}
              {" · "}
              {garmentTypeLabels[garment.type] ?? garment.type}
            </p>
          </div>
        </div>

        <div className="garment-detail-field">
          <CalendarDays size={22} />
          <div>
            <strong>Saisons</strong>
            <p>
              {garment.seasons.length === 4
                ? "Toutes saisons"
                : garment.seasons
                    .map((season) => seasons[season])
                    .join(" · ")}
            </p>
          </div>
        </div>
        
        
        <div className="garment-detail-field">
          <Ruler size={22} />
          <div>
            <strong>Taille</strong>
            <p>{garment.size} {garment.category === "shoes" ? "" : "cm"}</p>
          </div>
        </div>

        <div className="garment-detail-field">
          <Palette size={22} />
          <div>
            <strong>Couleur</strong>
            <p>{garment.color}</p>
          </div>
        </div>

        <div className="garment-detail-field">
          <Tags size={22} />
          <div>
            <strong>Spécificités</strong>
            <p>
              {garment.features.length > 0
                ? garment.features
                    .map((feature) => garmentFeatureLabels[feature])
                    .join(" · ")
                : "Aucune"}
            </p>
          </div>
        </div>

        <div className="garment-detail-field">
          <Tags size={22} />
          <div>
            <strong>Marque</strong>
            <p>{garment.brand}</p>
          </div>
        </div>
        <div className="garment-detail-field">
          <Package size={22} />
          <div>
            <strong>Stock actuel</strong>
            <p>
              {garment.status === "toSell"
                ? "Stock à vendre"
                : garment.status === "toDonate"
                  ? "Stock à donner"
                  : "Stock familial"}
            </p>
          </div>
        </div>
        <div className="garment-detail-field">
          <StickyNote size={22} />
          <div>
            <strong>Notes</strong>
            <p>Aucune note</p>
          </div>
        </div>
      </div>
      <div className="garment-detail-actions">
        <button type="button" onClick={onDelete}>
          Supprimer
        </button>

        <button type="button" onClick={onEdit}>
          Modifier
        </button>

        <button
          type="button"
          onClick={() => setShowTransferOptions(!showTransferOptions)}
          aria-expanded={showTransferOptions}
        >
          Transférer
        </button>
      </div>

      {showTransferOptions && (
        <div className="garment-transfer-options">
          <p>Transférer vers :</p>

          <button type="button" onClick={() => onTransfer("family")}>
            Stock familial
          </button>

          <button type="button" onClick={() => onTransfer("sell")}>
            Stock à vendre
          </button>

          <button type="button" onClick={() => onTransfer("donate")}>
            Stock à donner
          </button>
        </div>
      )}
    </article>
  )
}
