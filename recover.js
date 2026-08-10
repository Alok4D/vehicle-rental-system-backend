const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function recover() {
  const logPath = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\225f01ef-5efb-44c3-aa43-6fd3f9b05e55\\.system_generated\\logs\\transcript_full.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const recoveredFiles = new Set();
  const fileContents = new Map();

  for await (const line of rl) {
    const data = JSON.parse(line);
    if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
      for (const call of data.tool_calls) {
        if (call.function.name === 'default_api:write_to_file') {
          const args = JSON.parse(call.function.arguments);
          if (args.TargetFile && args.CodeContent && args.TargetFile.includes('vehicle-rental-system-backend')) {
            fileContents.set(args.TargetFile, args.CodeContent);
          }
        }
      }
    }
  }

  for (const [filePath, content] of fileContents.entries()) {
    console.log('Recovering:', filePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }
}

recover().catch(console.error);