{ pkgs, ... }:

{
  languages = {
    javascript = {
      enable = true;
      package = pkgs.nodejs_24;
      corepack = {
        enable = true;
      };
    };
  };

  git-hooks = {
    enable = true;
    hooks = {
      convco = {
        enable = true;
      };
    };
  };
}
