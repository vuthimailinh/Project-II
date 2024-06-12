import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function formatNumberWithDots(num: number): string {
    // Convert the number to a string
    let numStr = num.toString();

    // Reverse the string
    let reversedStr = numStr.split('').reverse().join('');

    // Insert dots every three characters
    let formattedReversedStr = '';
    for (let i = 0; i < reversedStr.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedReversedStr += '.';
        }
        formattedReversedStr += reversedStr[i];
    }

    // Reverse the string back to its original order
    let formattedStr = formattedReversedStr.split('').reverse().join('');

    // Append 'D' at the end
    return formattedStr;
}

export { formatNumberWithDots };
// Example usage
