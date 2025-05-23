import { storage } from "@vendetta/plugin"
import { findByStoreName } from "@vendetta/metro"
import nitroChecks from "./patches/nitroChecks"
import sendMessage from "./patches/sendMessage"

storage.emojiSize ??= 48
storage.hyperlink ??= true
storage.haveNitro ??= findByStoreName("UserStore").getCurrentUser()?.premiumType !== null
storage.forceMoji ??= false

if(typeof storage.emojiSize === "string") storage.emojiSize = parseInt(storage.emojiSize)

const patches = [
  ...nitroChecks,
  ...sendMessage,
]

export const onUnload = () => patches.forEach(p => p())
export { default as settings } from "./settings"
