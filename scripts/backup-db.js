const fs = require('fs');
const path = require('path');

function backup() {
  const dbPath = path.join(__dirname, '../prisma/dev.db');
  const backupDir = path.join(__dirname, '../backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `dev_backup_${timestamp}.db`);

  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, backupPath);
    console.log(`Database backup completed successfully: ${backupPath}`);
  } else {
    console.error(`Source database not found at: ${dbPath}`);
  }
}

backup();
