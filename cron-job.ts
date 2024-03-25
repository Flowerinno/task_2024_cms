import express from 'express'
import { CronJob } from 'cron'
import { importFeedJob } from './utils/cron/feedCron'

//cron job checks the feed every minute
//this is kinda trash, vercel and other services have their own cron jobs (merchant etc.). just a simple workaround

enum CRON {
  EVERY_SECOND = '* * * * * *',
  EVERY_10_SECONDS = '*/10 * * * * *',
  EVERY_MINUTE = '*/1 * * * *',
  EVERY_5_MINUTES = '0 */5 * * * *',
}

console.log('CRON REGISTERED')
const feedCron = new CronJob(CRON.EVERY_MINUTE, importFeedJob, null, false, 'Europe/Kyiv')

const app = express()

feedCron.start()

app.listen(8090, () => {
  console.log('Cron job started on port 8090')
})
