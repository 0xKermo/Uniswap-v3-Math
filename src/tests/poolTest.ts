import { FeeAmount, TICK_SPACINGS } from '../constants'
import { nearestUsableTick } from '../utils/nearestUsableTick'
import { TickMath } from '../utils/tickMath'
import { Pool } from '../entities/pool'
import JSBI from 'jsbi'
import { NEGATIVE_ONE } from '../internalConstants'
import { Token } from '../entities/token'
import { CurrencyAmount } from '../entities/fractions'
import { formatUnits } from 'ethers'


async function test() {

  const DAI:Token = {
    id: 0,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'DAI Stablecoin',
    symbol: 'DAI',
    decimals: 18,
  }

  const USDC:Token = {
    id: 1,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC Stablecoin',
    symbol: 'USDC',
    decimals: 6,
  }

  const WBTC:Token = {
    id: 2,
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    decimals: 8,
  }

  const WETH:Token = {
    id: 3,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
  }

  const pool = new Pool(WBTC, WETH, FeeAmount.LOW, JSBI.BigInt(31406419003352759208900526497389688), JSBI.BigInt(1361706860562765400), 257816, [
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
  const inputAmount = CurrencyAmount.fromRawAmount(WETH,'1000000000000000000') // 1 WETH
  console.log(inputAmount)
  const outputAmount = await pool.getOutputAmount(inputAmount)
  const inputAmount2 = await pool.getInputAmount(inputAmount)
  console.log("output", formatUnits(outputAmount.quotient.toString(),WBTC.decimals))
  console.log("input", formatUnits(inputAmount2.quotient.toString(), WBTC.decimals))
}

test()