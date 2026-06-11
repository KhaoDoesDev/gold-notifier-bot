import { formatThaiDateTime } from "./utils";
// import type { WebhookRequestBody } from '@line/bot-sdk';

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const signFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'exceptZero'
});

export default {
	async fetch(req) {
		// For webhook events from LINE Messaging API, mostly used when you want to get your user id.
		// if (req.method === "POST") {
		// 	const body = await req.json<WebhookRequestBody>();
		// 	console.log("Received webhook event:", JSON.stringify(body, null, 2));
		// 	return new Response("OK");
		// }

		return new Response(`Contact: khao@khaodoes.dev`);
	},
	async scheduled(event, env, ctx): Promise<void> {
		console.log(`Scheduled event triggered at ${new Date().toLocaleString()}`);
		const goldRes = await fetch("https://www.goldtraders.or.th/api/GoldPrices/Latest", {
			headers: {
				"User-Agent": "Khao's Gold Notifier Bot 0.0.1 (khao@khaodoes.dev)"
			}
		});

		if (!goldRes.ok) {
			console.error(`Failed to fetch gold prices: ${goldRes.status} ${goldRes.statusText}`);
			return;
		}
		const data = await goldRes.json<GoldResponse>();

		const lastUpdatePriceSeq = await env.GOLD_KV.get("lastUpdatePriceSeq");
    if (lastUpdatePriceSeq === data.priceSeq.toString()) return;
		await env.GOLD_KV.put("lastUpdatePriceSeq", data.priceSeq.toString());

		await fetch("https://api.line.me/v2/bot/message/push", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`
			},
			body: JSON.stringify({
				to: env.LINE_USER_ID,
        messages: [
          {
            type: "text",
            text: [
							'ราคาซื้อทองคำ ' + formatThaiDateTime(new Date(data.asTime)) + ' (ครั้งที่ ' + data.priceSeq + ')',
							'',
							'ทองคำแท่ง' + amountFormatter.format(data.bL_BuyPrice),
							'ทองรูปพรรณ' + amountFormatter.format(data.oM965_BuyPrice),
							'',
							'เทียบกับครั้งก่อน ' + signFormatter.format(data.priceChangeFromPrevRow)
						].join("\n")
          }
        ]
      })
		});

		console.log(`Sent price update for priceSeq ${data.priceSeq} at ${new Date(data.asTime).toLocaleString()}`);
	},
} satisfies ExportedHandler<Env>;
