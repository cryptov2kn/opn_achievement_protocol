import deployment from '@/contracts/localhost.json'

export const addresses = {
  issuer: deployment.IssuerRegistry,
  event: deployment.EventRegistry,
  achievement: deployment.AchievementRegistry,
  sbt: deployment.AchievementSBT,
}