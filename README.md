# Oxigraph as Web Worker Demo

- Readme.md written by Claude 3.7 Sonnet
- Similar: [quadstore-browser](https://github.com/quadstorejs/quadstore-browser)

This project demonstrates how to use [Oxigraph](https://github.com/oxigraph/oxigraph), a knowledge graph store, in a web browser through a Web Worker. This approach allows for efficient RDF data processing without blocking the main thread, making it ideal for handling RDF data in browser applications. By running Oxigraph in a Web Worker, users can interact with the UI while complex RDF operations run in the background.

## Features

- Load RDF data in Turtle format
- Execute SPARQL queries
- Process data in a separate thread using Web Workers
- Simple user interface for interaction
- Non-blocking UI during RDF processing operations
- Promise-based communication between main thread and worker

## Getting Started

### Prerequisites

- Node.js and npm installed

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

The project uses the following dependencies:
- oxigraph: ^0.4.4 - RDF store implementation
- n3: ^1.23.1 - RDF data manipulation library
- vite: ^6.0.4 - Build tool and development server

## Usage

The demo provides a simple interface with two main functions:

1. **Loading Data**: Enter Turtle-formatted RDF data in the first text area and click "Load Data"
2. **Running Queries**: Enter a SPARQL query in the second text area and click "Run Query"

The results will be displayed in the results section below.

### Example Data (Pre-filled)

The demo comes with an example dataset about "The Mad Hatter's Tea Party" in Turtle format.

### Example Query (Pre-filled)

A simple query to retrieve all triples from the store is provided:

```sparql
SELECT * WHERE {
  ?s ?p ?o
}
```

## How It Works

This demo implements a pattern for using WASM-based libraries in a separate thread:

1. The main application initializes a Web Worker
2. The Web Worker loads and initializes the Oxigraph WASM module
3. The main thread sends messages to the worker to load data or execute queries
4. The worker processes these requests and returns results to the main thread

This architecture prevents the UI from freezing during data processing operations.

## Project Structure

- `index.html` - Main UI and client-side communication code
- `src/worker.js` - Web Worker implementation that interfaces with Oxigraph
- `vite.config.js` - Configuration for the Vite build tool
- `package.json` - Project metadata and dependencies

## Technical Details

- Uses Vite for bundling and development
- Implements a promise-based messaging system between the main thread and worker
- Leverages Oxigraph's WASM build for in-browser RDF processing
- Uses the N3.js DataFactory for RDF term handling

### Communication Flow

1. The main thread sends a message to the worker with a unique ID
2. The message is processed by the worker (load data or run query)
3. The worker sends back a response with the same ID
4. The main thread resolves or rejects the promise associated with the ID
5. The result is displayed in the UI

This pattern ensures that all communication is tracked and properly handled, preventing race conditions.

## Extending the Project

Here are some ideas for extending this demo:

1. **Add support for other RDF formats**:
   - Implement loaders for JSON-LD, RDF/XML, and N-Triples
   - Add format selection in the UI

2. **Enhance the query interface**:
   - Create a SPARQL query builder UI
   - Add syntax highlighting for SPARQL queries
   - Save and load queries from local storage

3. **Visualization features**:
   - Add graph visualization of query results
   - Implement interactive exploration of the knowledge graph

4. **Performance optimizations**:
   - Add batch loading for large datasets
   - Implement streaming results for large query results

## License

This project is available under the MIT License.

## Acknowledgments

- [Oxigraph](https://github.com/oxigraph/oxigraph) - The RDF store powering this demo
- [N3.js](https://github.com/rdfjs/N3.js) - For RDF data manipulation
- Author: Cristian Vasquez
