import { ImgHTMLAttributes } from "react"
import styles from "./Avatar.module.css"

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	hasBorder?: boolean;
}

export const Avatar = ({ hasBorder = true, ...props }: IAvatarProps) => {
	// Conceito de RestProps
	console.log(props);

	return (
		<img
			className={hasBorder ? styles.avatarWithBorder : styles.avatar}
			{...props}
		/>
	)
}