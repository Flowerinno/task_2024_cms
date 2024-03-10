import express from "express";
import { CronJob } from "cron";
import { importFeedJob } from "./utils/cron/feedCron";

//cron job for checks the feed every 5 minutes
//this is kinda trash, but it's just for this project, vercel and other services have their own cron jobs (merchant etc.)

const EVERY_SECOND = "* * * * * *";
const EVERY_5_MINUTES = "0 */5 * * * *";

console.log("CRON REGISTERED");

const feedCron = new CronJob(
	EVERY_5_MINUTES,
	importFeedJob,
	null,
	false,
	"Europe/Kyiv"
);

const app = express();

feedCron.start();

app.listen(8090, () => {
	console.log("Cron job is started on port 8090");
});
