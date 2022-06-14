import { CommandInt } from '../interfaces/CommandInt'
import { help } from './help'
import { snipe } from './snipe'
import { stop } from './stop'
export const CommandList: CommandInt[] = [help, snipe, stop]
