export function formatChildAge(birthDate: string): string {
  const today = new Date()
  const birth = new Date(`${birthDate}T12:00:00`)

  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth())

  if (today.getDate() < birth.getDate()) {
    months--
  }

  months = Math.max(0, months)

  if (months < 36) {
    return `${months} mois`
  }

  return `${Math.floor(months / 12)} ans`
}