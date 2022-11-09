
export default function getPadTime(time) {
  return (
    time.toString().padStart(2,"0")
  )
}
