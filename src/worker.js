import init, { Store } from 'oxigraph'
import { DataFactory } from 'n3'

const { namedNode, blankNode, literal, defaultGraph, quad } = DataFactory

let store = null
self.onmessage = async function (e) {
  const { type, payload, id } = e.data

  if (!store) {
    await init() // Ensure WASM is initialized
    store = new Store() // Create a new store instance
  }

  if (type === 'LOAD_DATA') {
    console.log('Loading data in worker:', payload)
    try {
      await store.load(payload, 'text/turtle')
      self.postMessage({
        type: 'RESULT',
        payload: 'Data loaded successfully!',
        id,
      })
    } catch (error) {
      self.postMessage({ type: 'ERROR', payload: error.message, id })
    }
  } else if (type === 'RUN_QUERY') {
    try {
      const results = doSelect({ store, query: payload })
      self.postMessage({
        type: 'RESULT',
        payload: results,
        id,
      })
    } catch (error) {
      console.error('Error running query:', error)
      self.postMessage({ type: 'ERROR', payload: error.message, id })
    }
  } else {
    self.postMessage({ type: 'ERROR', payload: 'Unknown message type', id })
  }
}

function doSelect ({ store, query }) {
  const result = []
  for (const binding of store.query(query)) {
    const item = Object.fromEntries(binding)
    for (const [varName, term] of Object.entries(item)) {
      item[varName] = termInstance(term)
    }
    result.push(item)
  }
  return result
}

function termInstance (term) {
  if (term.termType === 'Literal') {
    return literal(term.value, term.language || term.datatype)
  } else if (term.termType === 'NamedNode') {
    return namedNode(term.value)
  } else if (term.termType === 'BlankNode') {
    return blankNode(term.value)
  } else if (term.termType === 'DefaultGraph') {
    return defaultGraph()
  } else {
    return term
  }
}

self.postMessage({ type: 'WORKER_READY' })
