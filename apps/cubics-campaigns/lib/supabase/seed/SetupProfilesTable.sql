-- #### IMPORTANT: ONLY RUN THIS IF YOU HAVE RUN SetupNextAuthSchema.sql

-- Note: This table contains user data. Users should only be able to view and update their own data.
CREATE TABLE profiles (
  -- UUID from next_auth.users
  id uuid NOT NULL primary key,
  NAME text,
  email text,
  image text,
  constraint "profiles_id_fkey" foreign key ("id") references next_auth.users (id) match simple ON
  UPDATE
    no action ON
  DELETE
    CASCADE -- if a user is deleted in NextAuth they will also be deleted in our public table.
);

ALTER TABLE
  profiles enable ROW LEVEL security;

CREATE policy "Can view own profile data." ON profiles FOR
SELECT
  USING (next_auth.uid () = id);

CREATE policy "Can update own profile data." ON profiles FOR
UPDATE
  USING (next_auth.uid () = id);

-- This trigger automatically creates a user entry when a new user signs up via NextAuth.
CREATE FUNCTION PUBLIC .handle_new_user () returns TRIGGER AS $$ BEGIN
  INSERT INTO
    PUBLIC .profiles (id, NAME, email, image)
  VALUES
    (NEW .id, NEW .name, NEW .email, NEW .image);

RETURN NEW;

END;

$$ LANGUAGE plpgsql security definer;

CREATE TRIGGER on_auth_user_created after
INSERT
  ON next_auth.users FOR each ROW EXECUTE PROCEDURE PUBLIC .handle_new_user ();