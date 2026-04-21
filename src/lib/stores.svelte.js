/**
 * NOC Portfolio — Global State Store
 * Uses Svelte 5 reactive state ($state rune via .svelte.js module)
 */

/** @type {{ value: boolean }} */
export const executiveMode = $state({ value: false });

/** @type {{ value: boolean }} */
export const audioEnabled = $state({ value: false });

/** @type {{ value: boolean }} */
export const isCommandPaletteOpen = $state({ value: false });

/** @type {{ value: boolean }} */
export const isIdle = $state({ value: false });

/** @type {{ value: string | null }} */
export const visitorCity = $state({ value: null });

/** @type {{ value: string | null }} */
export const visitorISP = $state({ value: null });

/** @type {{ value: boolean }} */
export const bootComplete = $state({ value: false });

/** @type {{ value: number }} */
export const idleTimer = $state({ value: 0 });

/** @type {{ value: string }} */
export const activeSection = $state({ value: 'hero' });

/** @type {{ value: boolean }} */
export const tourActive = $state({ value: false });

/** @type {{ value: number }} */
export const tourStep = $state({ value: 0 });

/**
 * Career start date — Feb 1, 2024
 */
export const CAREER_START = new Date('2024-02-01T00:00:00+05:30');

/**
 * Compute career uptime from start date
 * @param {Date} now
 */
export function getUptime(now) {
    const diff = now.getTime() - CAREER_START.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        formatted: `${years}Y ${months}M ${days}D`,
        fullFormatted: `${years}Y · ${months}M · ${days}D · ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };
}
