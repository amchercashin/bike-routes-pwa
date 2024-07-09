const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function collectProjectInfo(projectPath) {
  const projectInfo = {
    structure: "",
    key_files: {}
  };

  // Collect and filter project structure
  const fullStructure = await generateTree(projectPath);
  const filteredStructure = await filterStructure(fullStructure);
  projectInfo.structure = filteredStructure.join('\n');

  // Collect key files content based on user selection
  for (const file of filteredStructure) {
    if (file.endsWith('/')) continue; // Skip directories
    const filePath = path.join(projectPath, file.trim());
    try {
      const include = await question(`Include content of ${file}? (y/n): `);
      if (include.toLowerCase() === 'y') {
        const content = await fs.readFile(filePath, 'utf-8');
        projectInfo.key_files[file] = content;
      }
    } catch (error) {
      console.log(`File not found or couldn't be read: ${file}`);
    }
  }

  return projectInfo;
}

async function generateTree(dir, prefix = '') {
  let tree = [];
  const files = await fs.readdir(dir);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    const isLast = i === files.length - 1;
    const marker = isLast ? '└── ' : '├── ';

    const item = prefix + marker + file + (stats.isDirectory() ? '/' : '');
    tree.push(item);

    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree = tree.concat(await generateTree(filePath, newPrefix));
    }
  }

  return tree;
}

async function filterStructure(structure) {
  console.log("Project structure:");
  structure.forEach((item, index) => console.log(`${index + 1}: ${item}`));

  const selection = await question("Enter the numbers of items to include (comma-separated, or 'all'): ");
  if (selection.toLowerCase() === 'all') {
    return structure;
  }

  const selectedIndices = selection.split(',').map(num => parseInt(num.trim()) - 1);
  return structure.filter((_, index) => selectedIndices.includes(index));
}

async function saveProjectInfo(projectInfo, outputFile) {
  await fs.writeFile(outputFile, JSON.stringify(projectInfo, null, 2));
}

async function main() {
  try {
    const projectPath = await question("Enter the path to your PWA project: ");
    const projectInfo = await collectProjectInfo(projectPath);
    const outputFile = await question("Enter the name for the output file (e.g., project_info.json): ");

    await saveProjectInfo(projectInfo, outputFile);
    console.log(`Project information has been saved to ${outputFile}`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close();
  }
}

main();