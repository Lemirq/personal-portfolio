import { cn } from '../utils/cn';

interface LogoProps {
	variant?: 'black' | 'white';
	pathClassName?: string;
	svgPathName?: string;
	size: string;
}

const Logo = ({ variant, pathClassName, size, svgPathName }: LogoProps) => {
	if (variant === 'black') {
		return (
			<svg width={size} height={size} viewBox="0 0 145 125" xmlns="http://www.w3.org/2000/svg" className={cn('group', svgPathName)}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M56.0583 56.7265L72.7693 28.9571L95.9812 28.937L56.0312 96.7368L0 0H23.2009L56.0583 56.7265Z"
					className={cn('fill-black', pathClassName)}
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M74.3425 0.917236V20.945ZM74.3425 20.945H110.167L61.3707 104.972L72.9712 125L145 0.917236H74.3425"
					className={cn('fill-black', pathClassName)}
				/>
			</svg>
		);
	}
	return (
		<svg width={size} height={size} viewBox="0 0 145 125" xmlns="http://www.w3.org/2000/svg" className={cn('group', svgPathName)}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M56.0583 56.7265L72.7693 28.9571L95.9812 28.937L56.0312 96.7368L0 0H23.2009L56.0583 56.7265Z"
				className={cn('fill-white', pathClassName)}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M74.3425 0.917236V20.945ZM74.3425 20.945H110.167L61.3707 104.972L72.9712 125L145 0.917236H74.3425"
				className={cn('fill-white', pathClassName)}
			/>
		</svg>
	);
};

export default Logo;
