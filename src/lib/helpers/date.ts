/**
 * Return a date range (as two-date array) from a initial date and number of days.
 * The time component is stripped from the original `date`. `days` may be positive
 * (future) or negative (past). Range is always returned in ascending order.
 */
export function getUTCDateRange(date: Date, days: number) {
	const d1 = getUTCMidnight(date);
	const d2 = new Date(d1);
	d2.setUTCDate(d2.getUTCDate() + days - Math.sign(days));
	return days > 0 ? [d1, d2] : [d2, d1];
}

/**
 * Return a new date at midnight UTC of the original date (time component stripped)
 */
export function getUTCMidnight(date: Date) {
	return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
