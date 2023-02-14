import { JtsDocument } from '@eagle-io/timeseries'
import { Converter } from './converter'
import { SampleConverter } from './lib/sample/sample-converter'
import { QuantAQModulairConverter } from './lib/quantaq-modulair/quantaq-modulair-converter'
import { CubeNoiseConverter } from './lib/cube-noise/cube-noise-converter'
import { SyscomVibrationConverter } from './lib/syscom-vibration/syscom-vibration-converter'
import { SampleWithZoneConverter } from './lib/sample-with-zone/sample-with-zone-converter'

interface ConverterInput {
  filename: string,
  size: string,
  modifiedTime: string,
  receivedTime: string,
  payload: string,
  timezone: string
}

function convert (converter: Converter, input: ConverterInput): JtsDocument {
  const payload = Buffer.from(input.payload, 'base64')
  const output: JtsDocument = converter.convert(payload, input.timezone)

  console.log(`Converted ${input.filename} [${input.size} bytes] to ${output.series.length} series in zone '${input.timezone}' with ${output.series.reduce((sum, current) => sum + current.length, 0)} fields in total`)
  console.log(`INPUT: ${payload.toString()}`)
  console.log(`OUTPUT: ${output.toString()}`)

  return output
}

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const sampleConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new SampleConverter(), input)
}

export const sampleWithZoneConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new SampleWithZoneConverter(), input)
}

export const quantAqModulairConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new QuantAQModulairConverter(), input)
}

export const cubeNoiseConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new CubeNoiseConverter(), input)
}

export const syscomVibrationConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new SyscomVibrationConverter(), input)
}
