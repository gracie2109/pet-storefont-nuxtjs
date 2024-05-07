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

interface GroupedData {
    [key: string]: IPermissions[];
}

interface ResponseItem {
    [key: string]: IPermissions[];
}

interface IPermissions {
    name: string,
    status: boolean,
    pername: string,
    _id:string,
    id:string
}
export function groupByPermissions(data: any[]): ResponseItem[] {
    const response: ResponseItem[] = [];
    const groupedData: GroupedData = {};
    if (!data) return [];

    data.forEach((item) => {
        const permissionName = item.name.split('.')[1];
        const perName = item.name.split('.')[2];
        if (!groupedData[permissionName]) {// @ts-ignore
            groupedData[permissionName] = new Set<string>();
        }// @ts-ignore
        groupedData[permissionName].add(perName);
    });

    const allPerNames = new Set<string>();
    for (const permissionName in groupedData) {
        for (const perName of groupedData[permissionName]) {
            // @ts-ignore
            allPerNames.add(perName);
        }
    }

    const sortedPerNames = Array.from(allPerNames);

    for (const permissionName in groupedData) {
        const permissionArray: (string | null)[] = [];
        for (const perName of sortedPerNames) {// @ts-ignore
            permissionArray.push(groupedData[permissionName].has(perName) ? perName : null);
        }
        const permissionItemArray = permissionArray.map((perName) => {
            const foundItem = data.find((item) => item.name.split('.')[1] === permissionName && item.name.split('.')[2] === perName);
            const newItem = {...foundItem, indentity:permissionName}
            return foundItem ? newItem : null;
        });// @ts-ignore
        // @ts-ignore
        const permissionObject: ResponseItem = {
            // @ts-ignore
            [permissionName]: permissionItemArray ,

        };
        response.push(permissionObject);
    }

    return response;
}