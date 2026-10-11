import rabbit from "../assets/avatars/rabbit.png"
import bear from "../assets/avatars/bear.png"
import cat from "../assets/avatars/cat.png"

type Animal = "rabbit" | "bear" | "cat"

type ChildAvatarProps = {
  animal: Animal
  size?: number
}

const avatarImages = {
  rabbit,
  bear,
  cat,
}

export function ChildAvatar({
  animal,
  size = 64,
}: ChildAvatarProps) {
  return (
    <img
      src={avatarImages[animal]}
      alt=""
      width={size}
      height={size}
      style={{
        display: "block",
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  )
}