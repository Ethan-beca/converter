import * as fs from 'fs'
import { AecomNoiseConverter } from '../aecom-noise-converter'

describe('Unit test for Aecom Noise converter', function () {
  it('converts sample file', async () => {
    const converter = new AecomNoiseConverter()
    const buff = fs.readFileSync('lib/aecom-noise/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].values).toEqual([22.3, 21.6, 21.3, 21.8])
    expect(result.series[0].first.timestamp).toEqual(new Date('2023/01/08 00:00:00'))
  })
})
