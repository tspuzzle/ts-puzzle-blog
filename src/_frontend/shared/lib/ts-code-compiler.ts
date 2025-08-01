import ts from 'typescript'

const librariesCache: { [key: string]: string } = {}

const libraryES5 = `${process.env.NEXT_PUBLIC_SERVER_URL}/ts-libs/lib.es5.d.ts`
const libraryDOM = `${process.env.NEXT_PUBLIC_SERVER_URL}/ts-libs/lib.dom.d.ts`
const libraryES2015_Symbol = `${process.env.NEXT_PUBLIC_SERVER_URL}/ts-libs/lib.es2015.symbol.d.ts`

const libraries = {
  ['node_modules/@typescript/lib-es5/ts.ts']: {
    path: libraryES5,
  },
  ['node_modules/@typescript/lib-dom/ts.ts']: {
    path: libraryDOM,
  },
  ['node_modules/@typescript/lib-es2015/symbol-ts.ts']: {
    path: libraryES2015_Symbol,
  },
}

export const populateTypescriptLibrariesCache = async () => {
  await Promise.all(
    Object.entries(libraries).map(async ([key, value]) => {
      if (librariesCache[key]) {
        return
      }
      const result = await fetch(value.path)
      librariesCache[key] = await result.text()
    }),
  )
}

export type CompileResult = {
  success: boolean
  errors: string[]
}

export const inferTypeFromCode = async (code: string, inferredType: string) => {
  await populateTypescriptLibrariesCache()
  const fileName = 'file.ts'

  // Create a compiler host
  const compilerHost: ts.CompilerHost = {
    fileExists: () => true,
    readFile: () => '',
    getSourceFile: (filename) => {
      if (filename === fileName) {
        return ts.createSourceFile(filename, code, ts.ScriptTarget.ES5)
      }
      if (filename in librariesCache) {
        return ts.createSourceFile(filename, librariesCache[filename], ts.ScriptTarget.ES2015)
      }
      throw new Error(`File not found: ${filename}`)
    },
    getDefaultLibFileName: () => 'lib.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '',
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => '\n',
  }

  // Create the program for checking the code with appropriate lib (including Array, String, etc.)
  const program = ts.createProgram(
    [fileName],
    {
      // Include the default TypeScript libraries (e.g., `esnext`, `dom`, `es2015`, etc.)
      lib: ['lib.es5.ts', 'lib.dom.ts', 'lib.es2015.symbol.ts'], // or ['esnext', 'es2015'] for built-in global types
    },
    compilerHost,
  )
  const checker = program.getTypeChecker()
  const sourceFile = program.getSourceFile(fileName)
  let resolvedTypeString: string | undefined

  if (sourceFile) {
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === inferredType) {
        const type = checker.getTypeFromTypeNode(node.type)
        resolvedTypeString = checker.typeToString(type)
      }
    })
  }

  return resolvedTypeString
}

export async function compileTypescriptCode(code: string): Promise<CompileResult> {
  await populateTypescriptLibrariesCache()
  const fileName = 'file.ts'

  // Create a compiler host
  const compilerHost: ts.CompilerHost = {
    fileExists: () => true,
    readFile: () => '',
    getSourceFile: (filename) => {
      if (filename === fileName) {
        return ts.createSourceFile(filename, code, ts.ScriptTarget.ES5)
      }
      if (filename in librariesCache) {
        return ts.createSourceFile(filename, librariesCache[filename], ts.ScriptTarget.ES2015)
      }
      throw new Error(`File not found: ${filename}`)
    },
    getDefaultLibFileName: () => 'lib.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '',
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => '\n',
  }

  // Create the program for checking the code with appropriate lib (including Array, String, etc.)
  const program = ts.createProgram(
    [fileName],
    {
      // Include the default TypeScript libraries (e.g., `esnext`, `dom`, `es2015`, etc.)
      lib: ['lib.es5.ts', 'lib.dom.ts', 'lib.es2015.symbol.ts'], // or ['esnext', 'es2015'] for built-in global types
    },
    compilerHost,
  )

  // Get the diagnostics (type checking, syntax errors)
  const diagnostics = ts.getPreEmitDiagnostics(program)

  // If there are errors, return them
  if (diagnostics.length > 0) {
    const errors = diagnostics.map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      return message
    })

    return { success: false, errors }
  } else {
    // If no errors, return success
    return { success: true, errors: [] }
  }
}
