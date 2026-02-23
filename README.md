# Google Docs, Sheets & Drive MCP Server

![Demo Animation](assets/google.docs.mcp.1.gif)

Connect Claude Desktop, Cursor, or any MCP client to your Google Docs, Google Sheets, and Google Drive.

---

## Quick Start

### 1. Create a Google Cloud OAuth Client

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the **Google Docs API**, **Google Sheets API**, and **Google Drive API**
4. Configure the **OAuth consent screen** (External, add your email as a test user)
5. Create an **OAuth client ID** (Desktop app type)
6. Copy the **Client ID** and **Client Secret** from the confirmation screen

> Need more detail? See [step-by-step instructions](#google-cloud-setup-details) at the bottom of this page.

### 2. Authorize

```bash
GOOGLE_CLIENT_ID="your-client-id" \
GOOGLE_CLIENT_SECRET="your-client-secret" \
npx -y google-docs-mcp auth
```

This opens your browser for Google authorization. After you approve, the refresh token is saved to `~/.config/google-docs-mcp/token.json`.

### 3. Add to Your MCP Client

**Claude Desktop / Cursor / Windsurf:**

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "google-docs-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

The server starts automatically when your MCP client needs it.

---

## What Can It Do?

### Google Docs

| Tool                          | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `readDocument`                | Read content as plain text, JSON, or markdown |
| `appendText`                  | Append text to a document                     |
| `insertText`                  | Insert text at a specific position            |
| `deleteRange`                 | Remove content by index range                 |
| `listDocumentTabs`            | List all tabs in a multi-tab document         |
| `replaceDocumentWithMarkdown` | Replace entire document content from markdown |
| `appendMarkdownToGoogleDoc`   | Append markdown-formatted content             |
| `applyTextStyle`              | Bold, italic, colors, font size, links        |
| `applyParagraphStyle`         | Alignment, spacing, indentation               |
| `insertTable`                 | Create tables                                 |
| `insertPageBreak`             | Insert page breaks                            |
| `insertImage`                 | Insert images from URLs or local files        |

### Comments

| Tool             | Description                            |
| ---------------- | -------------------------------------- |
| `listComments`   | View all comments with author and date |
| `getComment`     | Get a specific comment with replies    |
| `addComment`     | Create a comment anchored to text      |
| `replyToComment` | Reply to an existing comment           |
| `resolveComment` | Mark a comment as resolved             |
| `deleteComment`  | Remove a comment                       |

### Google Sheets

| Tool                    | Description                            |
| ----------------------- | -------------------------------------- |
| `readSpreadsheet`       | Read data from a range (A1 notation)   |
| `writeSpreadsheet`      | Write data to a range                  |
| `appendSpreadsheetRows` | Add rows to a sheet                    |
| `clearSpreadsheetRange` | Clear cell values                      |
| `createSpreadsheet`     | Create a new spreadsheet               |
| `addSpreadsheetSheet`   | Add a sheet/tab                        |
| `getSpreadsheetInfo`    | Get metadata and sheet list            |
| `listGoogleSheets`      | Find spreadsheets                      |
| `formatCells`           | Bold, colors, alignment on cell ranges |
| `freezeRowsAndColumns`  | Pin header rows/columns                |
| `setDropdownValidation` | Add/remove dropdown lists on cells     |

### Google Drive

| Tool                 | Description                                 |
| -------------------- | ------------------------------------------- |
| `listDocuments`      | List documents, optionally filtered by date |
| `searchGoogleDocs`   | Search by name or content                   |
| `getDocumentInfo`    | Get document metadata                       |
| `createDocument`     | Create a new document                       |
| `createFromTemplate` | Create from an existing template            |
| `createFolder`       | Create a folder                             |
| `listFolderContents` | List folder contents                        |
| `getFolderInfo`      | Get folder metadata                         |
| `moveFile`           | Move a file to another folder               |
| `copyFile`           | Duplicate a file                            |
| `renameFile`         | Rename a file                               |
| `deleteFile`         | Move to trash or permanently delete         |

---

## Usage Examples

### Google Docs

```
"Read document ABC123 as markdown"
"Append 'Meeting notes for today' to document ABC123"
"Make the text 'Important' bold and red in document ABC123"
"Replace the entire document with this markdown: # Title\n\nNew content here"
"Insert a 3x4 table at index 50 in document ABC123"
```

### Google Sheets

```
"Read range A1:D10 from spreadsheet XYZ789"
"Write [[Name, Score], [Alice, 95], [Bob, 87]] to range A1 in spreadsheet XYZ789"
"Create a new spreadsheet titled 'Q1 Report'"
"Format row 1 as bold with a light blue background in spreadsheet XYZ789"
"Freeze the first row in spreadsheet XYZ789"
"Add a dropdown with options [Open, In Progress, Done] to range C2:C100"
```

### Google Drive

```
"List my 10 most recent Google Docs"
"Search for documents containing 'project proposal'"
"Create a folder called 'Meeting Notes' and move document ABC123 into it"
```

### Markdown Workflow

The server supports a full round-trip markdown workflow:

1. Read a document as markdown: `readDocument` with `format='markdown'`
2. Edit the markdown locally
3. Push changes back: `replaceDocumentWithMarkdown`

Supported: headings, bold, italic, strikethrough, links, bullet/numbered lists, horizontal rules.

---

## Authentication Options

### OAuth (Default)

Pass your Google Cloud OAuth client credentials as environment variables:

| Variable               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth client ID from Google Cloud Console     |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret from Google Cloud Console |

### Service Account (Enterprise)

For Google Workspace with domain-wide delegation:

| Variable                  | Description                                 |
| ------------------------- | ------------------------------------------- |
| `SERVICE_ACCOUNT_PATH`    | Path to the service account JSON key file   |
| `GOOGLE_IMPERSONATE_USER` | Email of the user to impersonate (optional) |

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "google-docs-mcp"],
      "env": {
        "SERVICE_ACCOUNT_PATH": "/path/to/service-account-key.json",
        "GOOGLE_IMPERSONATE_USER": "user@yourdomain.com"
      }
    }
  }
}
```

### Token Storage

OAuth refresh tokens are stored in `~/.config/google-docs-mcp/token.json` (respects `XDG_CONFIG_HOME`). To re-authorize, run the `auth` command again or delete the token file.

### Multiple Google Accounts

Set `GOOGLE_MCP_PROFILE` to store tokens in a profile-specific subdirectory. This allows using different Google accounts for different projects:

| Variable             | Description                                        |
| -------------------- | -------------------------------------------------- |
| `GOOGLE_MCP_PROFILE` | Profile name for isolated token storage (optional) |

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "npx",
      "args": ["-y", "google-docs-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "...",
        "GOOGLE_CLIENT_SECRET": "...",
        "GOOGLE_MCP_PROFILE": "work"
      }
    }
  }
}
```

Tokens are stored per profile:

```
~/.config/google-docs-mcp/
├── token.json              # default (no profile)
├── work/token.json         # GOOGLE_MCP_PROFILE=work
├── personal/token.json     # GOOGLE_MCP_PROFILE=personal
```

Without `GOOGLE_MCP_PROFILE`, behavior is unchanged.

---

## Known Limitations

- **Comment anchoring:** Programmatically created comments appear in the comment list but aren't visibly anchored to text in the Google Docs UI. This is a Google Drive API limitation.
- **Comment resolution:** Resolved status may not persist in the Google Docs UI.
- **Converted documents:** Docs converted from Word may not support all API operations.
- **Markdown tables/images:** Not yet supported in the markdown-to-Docs conversion.
- **Deeply nested lists:** Lists with 3+ nesting levels may have formatting quirks.

## Troubleshooting

- **Server won't start:**
  - Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in the `env` block of your MCP config.
  - Try running manually: `npx google-docs-mcp` and check stderr for errors.
- **Authorization errors:**
  - Ensure Docs, Sheets, and Drive APIs are enabled in Google Cloud Console.
  - Confirm your email is listed as a Test User on the OAuth consent screen.
  - Re-authorize: `npx google-docs-mcp auth`
  - Delete `~/.config/google-docs-mcp/token.json` and re-authorize if upgrading.
- **Tab errors:**
  - Use `listDocumentTabs` to see available tab IDs.
  - Omit `tabId` for single-tab documents.

---

## Google Cloud Setup Details

<details>
<summary>Step-by-step Google Cloud Console instructions</summary>

1. **Go to Google Cloud Console:** Open [console.cloud.google.com](https://console.cloud.google.com/)
2. **Create or Select a Project:** Click the project dropdown > "NEW PROJECT". Name it (e.g., "MCP Docs Server") and click "CREATE".
3. **Enable APIs:**
   - Navigate to "APIs & Services" > "Library"
   - Search for and enable: **Google Docs API**, **Google Sheets API**, **Google Drive API**
4. **Configure OAuth Consent Screen:**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" and click "CREATE"
   - Fill in: App name, User support email, Developer contact email
   - Click "SAVE AND CONTINUE"
   - Add scopes: `documents`, `spreadsheets`, `drive`
   - Click "SAVE AND CONTINUE"
   - Add your Google email as a Test User
   - Click "SAVE AND CONTINUE"
5. **Create Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "+ CREATE CREDENTIALS" > "OAuth client ID"
   - Application type: "Desktop app"
   - Click "CREATE"
   - Copy the **Client ID** and **Client Secret**

</details>

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, architecture overview, and guidelines.

## License

MIT -- see [LICENSE](LICENSE) for details.
