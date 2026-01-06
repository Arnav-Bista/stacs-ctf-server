-- Migration: Add join_key column to existing teams table
-- 2025 CTF database will not work with 2026 CTF without this migration
ALTER TABLE teams ADD COLUMN join_key TEXT;