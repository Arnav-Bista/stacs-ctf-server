# The CTF Platform for STACS Devs

## Running it 

This is a NextJS project. 

```bash 
pnpm run build
pnpm run start
```

or 
```bash
pnpm run dev
```

for a dev server. 

## Hosting it

This server can be hosted anywhere as it does not have specific dependencies on
the university infrastructure. 

### Self Hosted / External Service 

You may choose to host this on a private server or on your own machine. When
using a third party infra provider (DigitalOcean, AWS, etc.) just follow the
instructinos on their page. Chances are, you'll have to setup nginx as a
reverse proxy, purchase a domain (or redirect a subdomain of the STACS Domain)
to point to that IP address and configure appropriate permissions and auth for
that server.

The largest upside is that we can use ANY domain such as ctf.standrewscs.com (yes we should own that).

### Teaching Service 

Login to your specific teaching server and follow the instructions on [CS Web Service](https://wiki.cs.st-andrews.ac.uk/index.php?title=Web_Service).

The idea is run the server in your teaching service, and then redirect your
<username>.teaching.cs.st-andrews.ac.uk to point to your website. People
outside eduroam cannot access the server. 

## Adding Problems

Problems are organised into **categories**. Each category lives in its own file
under `app/problems/` (e.g. `forensics.ts`, `crypto.tsx`, `malware.ts`) and
exports a default `Category` object.

### 1. Pick (or create) a category

- To add a problem to an **existing** category, open its file in
  `app/problems/` and append to the `questions` array.
- To create a **new** category, make a new file in `app/problems/` that exports
  a `Category` (see `forensics.ts` for a minimal reference), then register it
  in `app/problems/problems.ts` by importing it and adding it to
  `allCategories`.

### 2. Define the question

Every question follows the `Question` type in `app/problems/types.ts`:

```ts
{
  id: string;            // any unique string — ties the question to its flag
  title: ReactNode;
  description: ReactNode;
  code?: ReactNode;      // optional code block / snippet
  hints?: string[] | ReactNode;
  points: number;
  attachments?: Attachment[];  // files/images under /public
  link?: string;               // external link (e.g. to a deployed service)
  api?: API;                   // API spec if the problem has an endpoint
  lockedPassword?: string;     // gate the question behind a password
  lockedHint?: string;
}
```

The `id` just has to be unique across all questions — a UUID is the easy
default since uniqueness is guaranteed (`uuidgen`, `python -c "import uuid;
print(uuid.uuid4())"`, or any online v4 generator), but any string you pick
works as long as nothing else in `flags.csv` is using it.

### 3. Add any attachments

Drop files/images into `public/` and reference them by path, e.g.
`url: "/my-file.png"`. Use subdirectories for problems with many assets
(see `public/arg-1`, `public/buffers`, `public/malware`, etc.).

### 4. Register the flag

Append a row to `flags.csv` at the repo root:

```
UUID,Category,Name,Points,Flag
<question-id>,<Category>,<Title>,<Points>,flag_{...}
```

- `UUID`, `Points`, and `Category` must match what's in the `.ts` file.
- Put `?` in the `Flag` column if the flag isn't finalised yet — the import
  script will skip it.

Then sync the CSV into the SQLite DB:

```bash
python insert_flags.py
```

`insert_flags.py` is idempotent — it inserts new flags, updates changed ones,
and skips the rest. Rerun it any time you edit a flag or points value.

### 5. (Optional) Add a custom problem page

For problems that need their own UI or backend (SQLi, XSS, JWT, etc.), create:

- A page under `app/problems/<slug>/` (see `app/problems/sqli/`,
  `app/problems/paper-trail/`, `app/problems/clean-thoughts/`).
- An API route under `app/api/problems/<slug>/` if the problem needs server
  state.

Link to it from the question via the `link` field, or describe the endpoint
via the `api` field so it's rendered in the question UI.

### 6. Verify

- `pnpm run dev` and visit `/problems/<category-slug>` — your question should
  render with the right title, points, and attachments.
- Submit the flag at `/submit` with a team to confirm the DB row is wired up
  correctly.

## Database

SQLite file: `database.db` at the repo root. The schema is created on first run
by `app/lib/db.ts`. The main tables are:

- `flags` — problem id → flag string + points
- `teams` — team name + `join_key` (shared secret for team members)
- `team_flags` — which team captured which flag and when
- `config` — misc key/value server config
- `xss_comments` — storage for the XSS challenge

Migrations between CTF years live in `app/lib/migration.sql`. Apply them
manually against an existing DB:

```bash
sqlite3 database.db < app/lib/migration.sql
```



