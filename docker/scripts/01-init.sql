-- Create user if not exists
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'postgres') THEN
      CREATE ROLE postgres WITH LOGIN PASSWORD 'Y2hhbmdlbWUK';
   END IF;
END
$do$;

-- Grant privileges
ALTER ROLE postgres WITH SUPERUSER;
ALTER ROLE postgres WITH CREATEDB;
ALTER ROLE postgres WITH CREATEROLE;
ALTER ROLE postgres WITH REPLICATION;

-- Create database if it doesn't exist
CREATE DATABASE postgres WITH OWNER = postgres;

-- Connect to the new database and set up permissions
\c postgres;

-- Grant all privileges on all tables to dglotto
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;