import type { Garment } from "../types/Garment"
import { garmentTypeLabels } from "../data/garmentLabels"

type GarmentTypeListProps = {
  type: string
  garments: Garment[]
  onSelectGarment: (garmentId: number) => void
}

export function GarmentTypeList({
  type,
  garments,
  onSelectGarment,
}: GarmentTypeListProps) {
  const matchingGarments = garments.filter(
    (garment) => garment.type === type
  )

  return (
    <section className="garment-type-list">
      <h2>{garmentTypeLabels[type] ?? type}</h2>

      <p>
        {matchingGarments.length} vêtement
        {matchingGarments.length > 1 ? "s" : ""}
      </p>

      {matchingGarments.length === 0 ? (
        <p>Aucun vêtement enregistré pour ce type.</p>
      ) : (
        <ul>
          {matchingGarments.map((garment) => (
            <li key={garment.id}>
              <button
                type="button"
                onClick={() => onSelectGarment(garment.id)}
              >
                {garment.photo && (
                  <img
                    src={garment.photo}
                    alt=""
                    width={80}
                    height={80}
                  />
                )}

                <span>
                  {garmentTypeLabels[garment.type] ?? garment.type}
                  {garment.brand ? ` · ${garment.brand}` : ""}
                </span>

                <span>{garment.size}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}