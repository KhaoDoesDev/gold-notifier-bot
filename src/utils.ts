export function formatThaiDateTime(date: Date): string {
	const months = [
		"มกราคม",
		"กุมภาพันธ์",
		"มีนาคม",
		"เมษายน",
		"พฤษภาคม",
		"มิถุนายน",
		"กรกฎาคม",
		"สิงหาคม",
		"กันยายน",
		"ตุลาคม",
		"พฤศจิกายน",
		"ธันวาคม"
	];

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear() + 543;
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");

	return `${day} ${month} ${year} เวลา ${hour}:${minute} น.`;
}
