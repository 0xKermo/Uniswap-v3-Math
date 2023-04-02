import { FeeAmount , TICK_SPACINGS} from '../constants'
import { nearestUsableTick } from '../utils/nearestUsableTick'
import { TickMath } from '../utils/tickMath'
import { Pool } from '../entities/pool'
import JSBI from 'jsbi'
import { NEGATIVE_ONE } from '../internalConstants'
import { Token } from '../entities/token'
import { CurrencyAmount } from '../entities/fractions'

async function test() {
  
    const DAI = new Token( '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')
    const USDC = new Token( '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')
    const WBTC = new Token( '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped Bitcoin')
    const ETH = new Token( '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether')
    const MATIC = new Token('0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',18,'MATIC','MATIC Token')
    const pool = new Pool(MATIC, ETH, FeeAmount.LOW, JSBI.BigInt(1959460926810952868372253795), JSBI.BigInt(1401993316430687692316622), -73997, [
      {
        index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[FeeAmount.LOW]),
        liquidityNet: JSBI.BigInt(0),
        liquidityGross: JSBI.BigInt(0)
      },
      {
        index: nearestUsableTick(TickMath.MAX_TICK, TICK_SPACINGS[FeeAmount.LOW]),
        liquidityNet: JSBI.multiply(JSBI.BigInt(0), NEGATIVE_ONE),
        liquidityGross: JSBI.BigInt(0)
      }
    ])
    const inputAmount = CurrencyAmount.fromRawAmount(ETH, 1000000000000000000)
    const outputAmount = await pool.getOutputAmount(inputAmount)
    console.log("output",outputAmount.quotient.toString())
    
}

test()