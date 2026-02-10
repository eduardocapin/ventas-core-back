/**
 * Sync DB schema to SSOT docs (Tablas_Columnas_Alias.md, Diccionario.md, Historial_DB.md).
 * Uses .env DB_* from backend root. Run from backend root (paths.config.json → backend_path): npm run db:sync-docs
 * Options: --dry-run (print only), --source=db (default) | entities (entities not implemented yet).
 *
 * CANONICAL COPY: This file lives in IA_MANAGER_TEMPLATE/scripts/. When initializing the template
 * or restoring the script, copy it to the backend root (paths.config.json → backend_path)/scripts/sync-schema-to-docs.ts
 * (e.g. run from backend: npm run template:init-sync-script).
 * The script never contains connection data; all DB_* must come from .env.
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE_CONTEXT = path.join(ROOT, 'IA_MANAGER_TEMPLATE', '01_GLOBAL_CONTEXT');
const TABLAS_FILE = path.join(TEMPLATE_CONTEXT, 'Tablas_Columnas_Alias.md');
const DICCIONARIO_FILE = path.join(TEMPLATE_CONTEXT, 'Diccionario.md');
const HISTORIAL_FILE = path.join(TEMPLATE_CONTEXT, 'Historial_DB.md');

function loadEnv(): void {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
          val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

type DbType = 'mysql' | 'mssql';

interface ColumnMeta {
  tableName: string;
  columnName: string;
  dataType: string;
  ordinalPosition: number;
}

function mapDataTypeToDoc(dataType: string): string {
  const t = (dataType || '').toLowerCase();
  if (['int', 'smallint', 'bigint', 'tinyint', 'integer'].includes(t)) return 'int';
  if (['varchar', 'nvarchar', 'char', 'nchar', 'text', 'ntext', 'varbinary'].includes(t)) return 'string';
  if (['decimal', 'numeric', 'float', 'real', 'double'].includes(t)) return 'decimal';
  if (['bit'].includes(t)) return 'boolean';
  if (['date'].includes(t)) return 'date';
  if (['datetime', 'datetime2', 'timestamp', 'smalldatetime'].includes(t)) return 'datetime';
  if (['json', 'jsonb'].includes(t)) return 'json';
  return 'string';
}

/** Table name to entity name (PascalCase, singularized loosely). */
function tableToEntityName(tableName: string): string {
  const s = tableName.trim();
  if (!s) return 'Entity';
  const last = s.slice(-1).toLowerCase();
  const rest = s.slice(0, -1);
  if (last === 's' && rest.length > 1) return rest.charAt(0).toUpperCase() + rest.slice(1).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** Table name to term for Diccionario (e.g. Pedidos -> Pedido, PedidosDetalle -> PedidosDetalle). */
function tableToTerm(tableName: string): string {
  const entity = tableToEntityName(tableName);
  return entity;
}

const REQUIRED_ENV = ['DB_TYPE', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'] as const;

function requireDbEnv(): { dbType: DbType; host: string; port: number; user: string; password: string; database: string } {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k] || process.env[k]!.trim() === '');
  if (missing.length > 0) {
    console.error('Missing required environment variables (set them in .env at backend root):', missing.join(', '));
    console.error('Required: DB_TYPE (mysql|mssql), DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME.');
    process.exit(1);
  }
  const dbType = (process.env.DB_TYPE!.toLowerCase() === 'mssql' ? 'mssql' : 'mysql') as DbType;
  const port = parseInt(process.env.DB_PORT!.trim(), 10);
  if (Number.isNaN(port)) {
    console.error('DB_PORT must be a number.');
    process.exit(1);
  }
  return {
    dbType,
    host: process.env.DB_HOST!.trim(),
    port,
    user: process.env.DB_USERNAME!.trim(),
    password: process.env.DB_PASSWORD!.trim(),
    database: process.env.DB_NAME!.trim(),
  };
}

async function fetchSchemaFromDb(dbType: DbType): Promise<ColumnMeta[]> {
  const { host, port, user, password, database } = requireDbEnv();

  if (dbType === 'mysql') {
    const mysql = await import('mysql2/promise');
    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    try {
      const [rows] = await conn.query(
        `SELECT TABLE_NAME as tableName, COLUMN_NAME as columnName, DATA_TYPE as dataType, ORDINAL_POSITION as ordinalPosition
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = ?
         ORDER BY TABLE_NAME, ORDINAL_POSITION`,
        [database],
      );
      return (rows as ColumnMeta[]).map((r: any) => ({
        tableName: r.tableName || r.TABLE_NAME,
        columnName: r.columnName || r.COLUMN_NAME,
        dataType: (r.dataType || r.DATA_TYPE || 'varchar').toLowerCase(),
        ordinalPosition: r.ordinalPosition ?? r.ORDINAL_POSITION ?? 0,
      }));
    } finally {
      await conn.end();
    }
  }

  if (dbType === 'mssql') {
    const sql = await import('mssql');
    const config = {
      user,
      password,
      server: host,
      port,
      database,
      options: { encrypt: false, trustServerCertificate: true },
    };
    const pool = await sql.connect(config);
    try {
      const result = await pool.request().query(`
        SELECT TABLE_NAME as tableName, COLUMN_NAME as columnName, DATA_TYPE as dataType, ORDINAL_POSITION as ordinalPosition
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_CATALOG = DB_NAME()
        ORDER BY TABLE_NAME, ORDINAL_POSITION
      `);
      const rows = result.recordset || [];
      return rows.map((r: any) => ({
        tableName: r.tableName || r.TABLE_NAME,
        columnName: r.columnName || r.COLUMN_NAME,
        dataType: (r.dataType || r.DATA_TYPE || 'varchar').toLowerCase(),
        ordinalPosition: r.ordinalPosition ?? r.ORDINAL_POSITION ?? 0,
      }));
    } finally {
      await pool.close();
    }
  }

  throw new Error(`Unsupported DB_TYPE: ${dbType}. Use mysql or mssql.`);
}

function groupColumnsByTable(columns: ColumnMeta[]): Map<string, ColumnMeta[]> {
  const map = new Map<string, ColumnMeta[]>();
  for (const col of columns) {
    const list = map.get(col.tableName) || [];
    list.push(col);
    map.set(col.tableName, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.ordinalPosition - b.ordinalPosition);
  }
  return map;
}

interface ParsedTable {
  tableName: string;
  sectionIndex: number;
  entityName: string;
  existingColumns: Set<string>;
  rawBlock: string;
}

function buildTableBlock(
  tableName: string,
  columns: ColumnMeta[],
  sectionNumber: number,
  entityNameOverride?: string,
): string {
  const entityName = entityNameOverride || tableToEntityName(tableName);
  const moduleName = tableName.toLowerCase().replace(/\s+/g, '-');
  let out = `### 1.${sectionNumber} ${entityName} (módulo ${moduleName})\n\n`;
  out += `| Concepto | Valor |\n| :--- | :--- |\n`;
  out += `| **Tabla BD** | ${tableName} |\n`;
  out += `| **Entidad** | ${entityName} |\n`;
  out += `| **Descripción** | (generado por script – revisar) |\n`;
  out += `| **Alias en pantalla** | (revisar) |\n\n`;
  out += `**Columnas:**\n\n`;
  out += `| Campo (BD / DTO) | Tipo | Significado | Alias en pantalla |\n| :--- | :--- | :--- | :--- |\n`;
  for (const col of columns) {
    const docType = mapDataTypeToDoc(col.dataType);
    out += `| ${col.columnName} | ${docType} | (revisar) | (revisar) |\n`;
  }
  out += '\n---\n\n';
  return out;
}

function buildNewColumnsRows(columns: ColumnMeta[], existingColumns: Set<string>): string {
  const newCols = columns.filter((c) => !existingColumns.has(c.columnName));
  if (newCols.length === 0) return '';
  let rows = '';
  for (const col of newCols) {
    const docType = mapDataTypeToDoc(col.dataType);
    rows += `| ${col.columnName} | ${docType} | (revisar) | (revisar) |\n`;
  }
  return rows;
}

function parseTablasColumnasAliasFull(content: string): { beforeTablas: string; afterVistas: string; tables: ParsedTable[] } {
  const tablasStart = content.indexOf('## 1. Tablas (entidades principales)');
  const vistasStart = content.indexOf('## 2. Vistas');
  if (tablasStart === -1 || vistasStart === -1) {
    throw new Error('Tablas_Columnas_Alias.md: could not find "## 1. Tablas" or "## 2. Vistas"');
  }
  const beforeTablas = content.slice(0, tablasStart);
  const tablasSection = content.slice(tablasStart, vistasStart);
  const afterVistas = content.slice(vistasStart);

  const tables: ParsedTable[] = [];
  const sectionRegex = /### 1\.(\d+)\s+([^\n(]+)(?:\([^)]*\))?\s*\n\n([\s\S]*?)(?=\n---\n\n### 1\.\d+|\n---\n\n## 2\. Vistas|$)/g;
  let m: RegExpExecArray | null;
  while ((m = sectionRegex.exec(tablasSection)) !== null) {
    const block = m[0];
    const tableMatch = block.match(/\|\s*\*\*Tabla BD\*\*\s*\|\s*([^|]+)\|/);
    const tableName = tableMatch ? tableMatch[1].trim() : '';
    const entityMatch = block.match(/\|\s*\*\*Entidad\*\*\s*\|\s*([^|]+)\|/);
    const entityName = entityMatch ? entityMatch[1].trim() : tableToEntityName(tableName);
    const colTableMatch = block.match(/\*\*Columnas:\*\*\s*\n\n(\| [^|]+\|[^]*?)(?=\n\n---|$)/s);
    const existingColumns = new Set<string>();
    if (colTableMatch) {
      const tableRows = colTableMatch[1].split('\n').slice(2);
      for (const row of tableRows) {
        const cellMatch = row.match(/\|\s*([^|]+)\s*\|/);
        if (cellMatch) {
          const cell = cellMatch[1].trim();
          const colName = cell.split('/')[0].trim().split(' ')[0].trim();
          if (colName && !colName.startsWith(':')) existingColumns.add(colName);
        }
      }
    }
    tables.push({
      tableName,
      sectionIndex: parseInt(m[1], 10),
      entityName,
      existingColumns,
      rawBlock: block + '\n---\n\n',
    });
  }
  return { beforeTablas, afterVistas, tables };
}

function mergeTablasContentCorrect(
  beforeTablas: string,
  afterVistas: string,
  existingTables: ParsedTable[],
  schemaByTable: Map<string, ColumnMeta[]>,
): string {
  const existingByTableName = new Map<string, ParsedTable>();
  for (const t of existingTables) existingByTableName.set(t.tableName, t);

  const allTableNames = new Set<string>(schemaByTable.keys());
  for (const t of existingTables) allTableNames.add(t.tableName);

  const sortedTableNames = Array.from(allTableNames).sort();
  let sectionNumber = 1;
  let newContent = beforeTablas + '## 1. Tablas (entidades principales)\n\nPara cada tabla: **Nombre técnico (tabla BD)**, **Descripción**, **Alias en pantalla** y **Columnas** (Campo BD/DTO | Tipo | Significado | Alias en pantalla).\n\n---\n\n';

  for (const tableName of sortedTableNames) {
    const existing = existingByTableName.get(tableName);
    const columns = schemaByTable.get(tableName) || [];

    if (!existing) {
      newContent += buildTableBlock(tableName, columns, sectionNumber);
      sectionNumber++;
      continue;
    }

    const newColsRows = buildNewColumnsRows(columns, existing.existingColumns);
    if (newColsRows) {
      const block = existing.rawBlock;
      const sep = '\n---\n\n';
      const lastSep = block.lastIndexOf(sep);
      const beforeSep = lastSep === -1 ? block : block.slice(0, lastSep);
      const afterSep = lastSep === -1 ? '' : block.slice(lastSep);
      newContent += beforeSep + '\n' + newColsRows.trim() + afterSep;
    } else {
      newContent += existing.rawBlock;
    }
    sectionNumber++;
  }

  newContent += afterVistas;
  return newContent;
}

function getExistingTermsFromDiccionario(content: string): Set<string> {
  const terms = new Set<string>();
  const tableStart = content.indexOf('| Término | Definición |');
  if (tableStart === -1) return terms;
  const tableEnd = content.indexOf('\n\n---', tableStart);
  const section = tableEnd === -1 ? content.slice(tableStart) : content.slice(tableStart, tableEnd);
  const rows = section.split('\n').slice(2);
  for (const row of rows) {
    const m = row.match(/\|\s*\*\*([^*]+)\*\*\s*\|/);
    if (m) terms.add(m[1].trim());
  }
  return terms;
}

function appendDiccionarioRows(content: string, newTables: { tableName: string; columns: ColumnMeta[] }[]): string {
  const existingTerms = getExistingTermsFromDiccionario(content);
  const tableStart = content.indexOf('| Término | Definición |');
  if (tableStart === -1) return content;
  const headerEnd = content.indexOf('\n', content.indexOf('\n', tableStart) + 1) + 1;
  const rest = content.slice(headerEnd);
  const nextSection = rest.indexOf('\n\n---');
  const insertPos = headerEnd + (nextSection === -1 ? rest.length : nextSection);
  const before = content.slice(0, insertPos);
  const after = content.slice(insertPos);
  const toAdd: string[] = [];
  for (const { tableName, columns } of newTables) {
    const term = tableToTerm(tableName);
    if (existingTerms.has(term)) continue;
    existingTerms.add(term);
    const attrs = columns.map((c) => c.columnName).join(', ');
    toAdd.push(`| **${term}** | Entidad de BD (tabla ${tableName}). Generado por script – revisar. | ${attrs}. |`);
  }
  if (toAdd.length === 0) return content;
  return before + '\n' + toAdd.join('\n') + after;
}

function appendHistorialEntry(content: string, tablesAffected: string[]): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const row = `| **${dateStr}** | Script sync-schema-to-docs | Documentación | Actualización de Tablas_Columnas_Alias (y Diccionario si aplica) desde introspección del esquema BD. Tablas: ${tablesAffected.join(', ') || 'ninguna nueva'}. Sin cambios de esquema físico. |`;
  const tableStart = content.indexOf('## 📝 REGISTRO DE MIGRACIONES Y CAMBIOS');
  if (tableStart === -1) return content;
  const sepLine = content.indexOf('| :--- | :--- | :--- | :--- |', tableStart);
  if (sepLine === -1) return content;
  const insertPos = content.indexOf('\n', sepLine) + 1;
  return content.slice(0, insertPos) + row + '\n' + content.slice(insertPos);
}

function main(): void {
  loadEnv();
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const source = args.find((a) => a.startsWith('--source='))?.split('=')[1] || 'db';
  if (source !== 'db') {
    console.error('Only --source=db is implemented. --source=entities is not yet available.');
    process.exit(1);
  }

  const { dbType } = requireDbEnv();
  if (dbType !== 'mysql' && dbType !== 'mssql') {
    console.error('DB_TYPE must be mysql or mssql.');
    process.exit(1);
  }

  (async () => {
    console.log('Fetching schema from database...');
    const columns = await fetchSchemaFromDb(dbType);
    const schemaByTable = groupColumnsByTable(columns);
    console.log(`Found ${schemaByTable.size} tables.`);

    let tablasContent = fs.readFileSync(TABLAS_FILE, 'utf-8');
    const parsed = parseTablasColumnasAliasFull(tablasContent);
    const existingByTable = new Map(parsed.tables.map((t) => [t.tableName, t]));

    const newTables: { tableName: string; columns: ColumnMeta[] }[] = [];
    for (const [tableName, cols] of schemaByTable) {
      if (!existingByTable.has(tableName)) newTables.push({ tableName, columns: cols });
    }

    const mergedTablas = mergeTablasContentCorrect(
      parsed.beforeTablas,
      parsed.afterVistas,
      parsed.tables,
      schemaByTable,
    );

    if (dryRun) {
      console.log('\n[DRY RUN] Would write Tablas_Columnas_Alias.md (length:', mergedTablas.length, ')');
      if (newTables.length) console.log('New tables would be added to Diccionario:', newTables.map((t) => t.tableName));
      return;
    }

    fs.writeFileSync(TABLAS_FILE, mergedTablas, 'utf-8');
    console.log('Written', TABLAS_FILE);

    if (newTables.length > 0) {
      let dicContent = fs.readFileSync(DICCIONARIO_FILE, 'utf-8');
      dicContent = appendDiccionarioRows(dicContent, newTables);
      fs.writeFileSync(DICCIONARIO_FILE, dicContent, 'utf-8');
      console.log('Updated Diccionario.md with', newTables.length, 'new entity/entities.');
    }

    const tablesAffected = newTables.map((t) => t.tableName);
    let histContent = fs.readFileSync(HISTORIAL_FILE, 'utf-8');
    histContent = appendHistorialEntry(histContent, tablesAffected);
    fs.writeFileSync(HISTORIAL_FILE, histContent, 'utf-8');
    console.log('Updated Historial_DB.md.');
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

main();
