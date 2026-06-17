export interface ParsedArgs {
  dir?: string;
  auth?: "better-auth" | "authjs" | "clerk" | "auth0" | "skip";
  db?: "postgresql" | "skip";
  ui?: "shadcn" | "skip";
  docker?: boolean;
  email?: "resend" | "skip";
  install?: boolean;
  yes?: boolean;
  help?: boolean;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = {};
  const list = argv.slice(2);
  let dirSet = false;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    if (item === "-h" || item === "--help") {
      args.help = true;
    } else if (item === "-y" || item === "--yes") {
      args.yes = true;
    } else if (item === "--docker") {
      args.docker = true;
    } else if (item === "--install") {
      args.install = true;
    } else if (item === "--no-install") {
      args.install = false;
    } else if (item === "--auth") {
      const val = list[i + 1];
      if (val && !val.startsWith("-")) {
        if (["better-auth", "authjs", "clerk", "auth0", "skip"].includes(val)) {
          args.auth = val as any;
        }
        i++;
      }
    } else if (item === "--db") {
      const val = list[i + 1];
      if (val && !val.startsWith("-")) {
        if (["postgresql", "skip"].includes(val)) {
          args.db = val as any;
        }
        i++;
      }
    } else if (item === "--ui") {
      const val = list[i + 1];
      if (val && !val.startsWith("-")) {
        if (["shadcn", "skip"].includes(val)) {
          args.ui = val as any;
        }
        i++;
      }
    } else if (item === "--email") {
      const val = list[i + 1];
      if (val && !val.startsWith("-")) {
        if (["resend", "skip"].includes(val)) {
          args.email = val as any;
        }
        i++;
      }
    } else if (item && !item.startsWith("-") && !dirSet) {
      args.dir = item;
      dirSet = true;
    }
  }

  return args;
}

export function printHelp() {
  console.log(`
  Usage: create-g-stack [dir] [options]

  Options:
    dir                  Target directory to scaffold the project (e.g. ., my-app)
    --auth <provider>    better-auth | authjs | clerk | auth0 | skip
    --db <database>      postgresql | skip
    --ui <ui_framework>  shadcn | skip
    --email <provider>   resend | skip
    --docker             Initialize Docker configuration (Dockerfile, docker-compose.yml)
    --install            Force dependency installation
    --no-install         Skip dependency installation
    -y, --yes            Use default options for any unspecified choices
    -h, --help           Display this help message
  `);
}
