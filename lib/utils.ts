import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {Updater} from '@tanstack/vue-table';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
    ref.value
        = typeof updaterOrValue === 'function'
        ? updaterOrValue(ref.value)
        : updaterOrValue
}


export function convertToVietnamTime(minutes: number, mode: "single" | "string", showHour: boolean = true): any {
    let hours: number = Math.floor(minutes / 60);
    minutes %= 60;
    if (minutes <= 60 && mode === "single") return hours + minutes / 60;
    if (hours >= 24) hours -= 24;
    if (mode === "string" && showHour) {
        if (hours == 0) {
            return `${minutes}m`;
        }
        return `${hours}h${minutes}m`;
    } else {
        return {hours, minutes};
    }
}
