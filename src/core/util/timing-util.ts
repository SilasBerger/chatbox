import {TYPING_SPEED_CHARACTERS_PER_MINUTE} from "../constants";

export const sleep = async (duration: number) => {
  await new Promise(resolve => setTimeout(resolve, duration));
}

export const typingDelayMsPerCharacter = () => {
  return (1 / TYPING_SPEED_CHARACTERS_PER_MINUTE) * 60000;
}
