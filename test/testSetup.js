/* eslint-env jest */
import serializer from 'jest-glamor-react'
import { sheet } from 'emotion'
import prettyCSS from './pretty-css'

expect.addSnapshotSerializer(serializer(sheet))

expect.addSnapshotSerializer(prettyCSS)
