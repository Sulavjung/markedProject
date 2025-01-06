interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "Label Creator",
  github: {
    title: "React Shadcn Starter",
    url: "https://github.com/sulavJung",
  },
  author: {
    name: "Sulav",
    url: "https://github.com/sulavJung/",
  },
};
