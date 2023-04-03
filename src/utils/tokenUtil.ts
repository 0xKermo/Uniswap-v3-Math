import invariant from 'tiny-invariant'
import { Token } from '../entities'

export function sortsBefore(inputToken: Token, outputToken: Token): boolean {
    invariant(inputToken.address.toLowerCase() !== outputToken.address.toLowerCase(), 'ADDRESSES')
    return inputToken.address.toLowerCase() < outputToken.address.toLowerCase()
}


export function equals(tokenA: Token, inputToken: Token): boolean {
    return tokenA.address.toLowerCase() === inputToken.address.toLowerCase()
}