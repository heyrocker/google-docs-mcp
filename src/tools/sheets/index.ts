import type { FastMCP } from 'fastmcp';
import { register as readSpreadsheet } from './readSpreadsheet.js';
import { register as writeSpreadsheet } from './writeSpreadsheet.js';
import { register as batchWrite } from './batchWrite.js';
import { register as appendSpreadsheetRows } from './appendSpreadsheetRows.js';
import { register as clearSpreadsheetRange } from './clearSpreadsheetRange.js';
import { register as getSpreadsheetInfo } from './getSpreadsheetInfo.js';
import { register as addSpreadsheetSheet } from './addSpreadsheetSheet.js';
import { register as createSpreadsheet } from './createSpreadsheet.js';
import { register as listGoogleSheets } from './listGoogleSheets.js';

// Formatting & validation
import { register as formatCells } from './formatCells.js';
import { register as readCellFormat } from './readCellFormat.js';
import { register as copyFormatting } from './copyFormatting.js';
import { register as freezeRowsAndColumns } from './freezeRowsAndColumns.js';
import { register as setDropdownValidation } from './setDropdownValidation.js';

export function registerSheetsTools(server: FastMCP) {
  readSpreadsheet(server);
  writeSpreadsheet(server);
  batchWrite(server);
  appendSpreadsheetRows(server);
  clearSpreadsheetRange(server);
  getSpreadsheetInfo(server);
  addSpreadsheetSheet(server);
  createSpreadsheet(server);
  listGoogleSheets(server);

  // Formatting & validation
  formatCells(server);
  readCellFormat(server);
  copyFormatting(server);
  freezeRowsAndColumns(server);
  setDropdownValidation(server);
}
