#!/usr/bin/env python3
import csv
import sqlite3
import sys

CSV_FILE = "flags.csv"
DB_FILE = "database.db"

conn = sqlite3.connect(DB_FILE)
cur = conn.cursor()

inserted = 0
skipped = 0

with open(CSV_FILE, newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        uuid = row["UUID"].strip()
        flag = row["Flag"].strip()
        points = row["Points"].strip()

        if flag == "?":
            print(f"SKIP  [{uuid}] '{row['Name']}' — flag not set")
            skipped += 1
            continue

        try:
            cur.execute(
                "INSERT INTO flags (id, flag, points) VALUES (?, ?, ?)",
                (uuid, flag, int(points)),
            )
            print(f"OK    [{uuid}] '{row['Name']}' ({points} pts)")
            inserted += 1
        except sqlite3.IntegrityError as e:
            print(f"SKIP  [{uuid}] '{row['Name']}' — {e}")
            skipped += 1

conn.commit()
conn.close()

print(f"\nDone: {inserted} inserted, {skipped} skipped.")
