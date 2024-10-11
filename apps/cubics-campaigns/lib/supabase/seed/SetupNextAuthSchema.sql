-- #### IMPORTANT: RUN BEFORE SetupProfilesTable.sql
--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA next_auth;

GRANT USAGE ON SCHEMA next_auth TO service_role;

GRANT ALL ON SCHEMA next_auth TO postgres;

--
-- Create users table
--
CREATE TABLE IF NOT EXISTS next_auth.users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    NAME text,
    email text,
    "emailVerified" TIMESTAMP WITH TIME ZONE,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

GRANT ALL ON TABLE next_auth.users TO postgres;

GRANT ALL ON TABLE next_auth.users TO service_role;

--- uid() function to be used in RLS policies
CREATE FUNCTION next_auth.uid() RETURNS uuid LANGUAGE SQL STABLE AS $$
SELECT
    COALESCE(
        NULLIF(
            current_setting('request.jwt.claim.sub', TRUE),
            ''
        ),
        (
            NULLIF(current_setting('request.jwt.claims', TRUE), '') :: jsonb ->> 'sub'
        )
    ) :: uuid $$;

--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS next_auth.sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users (id) MATCH SIMPLE ON
    UPDATE
        NO ACTION ON
    DELETE
        CASCADE
);

GRANT ALL ON TABLE next_auth.sessions TO postgres;

GRANT ALL ON TABLE next_auth.sessions TO service_role;

--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS next_auth.accounts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    TYPE text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    credential_keys text [ ],
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users (id) MATCH SIMPLE ON
    UPDATE
        NO ACTION ON
    DELETE
        CASCADE
);

GRANT ALL ON TABLE next_auth.accounts TO postgres;

GRANT ALL ON TABLE next_auth.accounts TO service_role;

-- 
-- Function to update users.emailVerified if provider is 'google'
-- 
CREATE
OR REPLACE FUNCTION next_auth.update_email_verified_google() RETURNS TRIGGER AS $$ BEGIN
    -- Check if the provider is 'google'
    IF NEW .provider = 'google' THEN -- Update the emailVerified field with the current timestamp
    UPDATE
        next_auth.users
    SET
        "emailVerified" = NOW()
    WHERE
        id = NEW."userId";

END IF;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

-- 
-- Trigger to call the function on insert into next_auth.accounts
-- 
CREATE TRIGGER trigger_update_email_verified_google AFTER
INSERT
    ON next_auth.accounts FOR EACH ROW EXECUTE FUNCTION next_auth.update_email_verified_google();

--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
    identifier text,
    token text,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);

GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;

GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;