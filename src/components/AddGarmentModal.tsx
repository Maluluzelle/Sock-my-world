type AddGarmentModalProps = {
  onClose: () => void
}

export function AddGarmentModal({ onClose }: AddGarmentModalProps) {
  return (
    <div className="child-edit-overlay">
      <div className="child-edit-modal">
        <h2>Ajouter un vêtement</h2>

        <p>Renseignons les informations du vêtement.</p>

        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  )
}